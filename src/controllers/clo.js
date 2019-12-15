const log = require('../logger');
const { Clo, CloAssessment, CourseAssessment } = require('../models').db;
const { OfferedCourse, CloResult } = require('../models').db;
const { Semester } = require('../models').db;

module.exports = {
  async create(req, res) {
    try {
      const courseId = req.params.courseId;
      const { clos, term, year } = req.body;
      let termId = await Semester.findOne({
        where: {
          term,
          year
        }
      });
      if (!termId)
        return res.status(404).send({ message: 'Semester not offfered yet' });
      let offering = await OfferedCourse.findOne({
        where: {
          courseId,
          termId: termId.id
        }
      });
      if (!offering)
        return res
          .status(404)
          .send({ message: 'The course has not been offered yet.' });
      for (let clo of clos) {
        await Clo.create({
          no: clo,
          offeredCourseId: offering.id
        });
      }
      log.info('CLOs have been added to course');
      return res
        .status(201)
        .send({ message: 'CLOs have been added to course' });
    } catch (error) {
      log.error(error);
      res.status(400).send({ message: error.message, error: error.name });
    }
  },
  async calculateResults(req, res) {
    try {
      // Pending: Have to verify that incoming req auth matches the employee course
      const courseId = req.params.courseId;
      const term = req.params.term;
      const year = req.params.year;
      // Getting the term id
      let termId = await Semester.findOne({
        where: {
          term,
          year
        }
      });
      if (!termId)
        return res.status(404).send({ message: 'Semester not offfered yet' });
      // Getting a list of Clos against the offered course
      let offering = await OfferedCourse.findOne({
        where: {
          courseId,
          termId: termId.id
        }
      });
      if (!offering)
        return res
          .status(404)
          .send({ message: 'The course has not been offered yet.' });
      let clos = await Clo.findAll({
        where: {
          offeredCourseId: offering.id
        }
      });
      if (clos.length === 0) {
        log.info('No clos exist against the course', courseId);
        return res
          .status(404)
          .send({ message: 'No clos exist against the course', courseId });
      }
      // Getting a list of students enrolled in the course
      let students = await offering.getStudents();
      if (students.length === 0) {
        log.info('Students are not enrolled in this course');
        return res
          .status(404)
          .send({ message: 'Students are not enrolled in this course' });
      }
      // Business logic starts here:
      // Iterate over all clos
      for (let clo of clos) {
        let cloAssessment = await CloAssessment.findOne({
          where: {
            cloId: clo.id
          }
        });
        if (!cloAssessment) {
          log.debug(
            'CLO assessment against the specified CLO is not mapped',
            clo.no
          );
          // Skip this iteration
          continue;
        }
        // Get a list of all assessments against a particular course
        let courseAssessments = await CourseAssessment.findAll({
          where: {
            offeredCourseId: offering.id
          }
        });
        // Iterate over students and for each student aggregate assessments
        for (let student of students) {
          log.debug('Calculating results for', student.id);
          let quiz = 0;
          let quizOutOf = 0;
          let assignmentOutOf = 0;
          let assignment = 0;
          let mid = 0;
          let final = 0;
          let midOutOf = 0;
          let finalOutOf = 0;
          for (let courseAssessment of courseAssessments) {
            let assessmentResult = await courseAssessment.getAssessmentResults({
              where: {
                studentId: student.id
              }
            });
            let courseAssessmentType = courseAssessment.type.split(' ')[0];
            let marks = assessmentResult[0].get('marks');
            let outOf = assessmentResult[0].get('outOf');
            if (courseAssessmentType === 'Quiz') {
              quiz = quiz + marks;
              quizOutOf = quizOutOf + outOf;
            } else if (courseAssessmentType === 'Assignment') {
              assignment = assignment + marks;
              assignmentOutOf = assignmentOutOf + outOf;
            } else if (courseAssessmentType === 'Mid') {
              mid = marks;
              midOutOf = outOf;
            } else {
              final = marks;
              finalOutOf = outOf;
            }
          }

          // Calculate absolute marks
          if (quizOutOf != 0) quiz = (quiz / quizOutOf) * cloAssessment.quiz;
          if (assignmentOutOf != 0)
            assignment =
              (assignment / assignmentOutOf) * cloAssessment.assignment;
          if (midOutOf != 0) mid = (mid / midOutOf) * cloAssessment.mid;
          if (finalOutOf != 0)
            final = (final / finalOutOf) * cloAssessment.final;
          let sum = quiz + assignment + mid + final;
          log.debug(
            'Absolute for student against',
            student.id,
            clo.id,
            quiz,
            assignment,
            mid,
            final,
            sum,
            cloAssessment.threshold
          );

          // Check if pass or fail
          let result = '';
          if (sum >= cloAssessment.threshold) {
            result = 'Pass';
          } else result = 'Fail';
          //Insert into Clo result
          let cloResult = await CloResult.create({
            cloId: clo.id,
            studentId: student.id,
            percentAchieved: sum,
            threshold: cloAssessment.threshold,
            result
          });
        }
      }
      let results = await CloResult.findAll({
        include: [
          {
            model: Clo,
            as: 'CloDetails',
            where: {
              offeredCourseId: offering.id
            }
          }
        ]
      });
      return res.status(200).send(results);
    } catch (error) {
      log.error(error);
      res.status(400).send({ message: error.message, error: error.name });
    }
  },
  retrieveAssessments: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const { term, year } = req.body;
      const semester = await Semester.findOne({
        where: {
          term,
          year
        }
      });
      if (!semester) {
        log.info('Semester is not yet offered');
        return res.status(404).send({ message: 'Semester is not yet offered' });
      }
      const offering = await OfferedCourse.findOne({
        where: {
          termId: semester.id,
          courseId
        }
      });
      if (!offering) {
        log.info('The course is not yet offered');
        return res
          .status(404)
          .send({ message: 'The course is not yet offered' });
      }
      let clos = await offering.getClos();
      if (clos.length === 0) {
        log.info('The course does not have any clos associated');
        return res
          .status(404)
          .send({ message: 'The course does not have any clos associated' });
      }
      let cloAssessments = [];
      for (let clo of clos) {
        let cloAssessment = await clo.getCloAssessment();
        if (!cloAssessment) {
          log.info('Clo assessment not mapped for CLO', clo.no);
          continue;
        }
        cloAssessments.push(cloAssessment);
      }
      return res.status(200).send(cloAssessments);
    } catch (error) {
      log.error(error);
      return res.status(500).send({ name: error.name, message: error.message });
    }
  },
  deleteAssessment: async (req, res) => {
    try {
      const { term, year } = req.body;
      const courseId = req.params.courseId;
      const cloNo = req.params.cloNo;
      let semester = await Semester.findOne({
        where: {
          term,
          year
        }
      });
      if (!semester) {
        log.info('Semester is not offered yet');
        return res.status(404).send({ message: 'Semester is not offered yet' });
      }
      let offering = await OfferedCourse.findOne({
        where: {
          termId: semester.id,
          courseId
        }
      });
      if (!offering) {
        log.info(
          'The course is not offered or the employee does not teach the course'
        );
        return res.status(404).send({
          message:
            'The course is not offered or the employee does not teach the course'
        });
      }
      let clo = await offering.getClos({
        where: {
          no: cloNo
        }
      });
      let cloId = clo[0].dataValues.id;
      let cloAssessment = await CloAssessment.findOne({
        where: {
          cloId
        }
      });
      if (!cloAssessment) {
        log.info('The assessment doesnt exist');
        return res.status(404).send({ message: 'The assessment doesnt exist' });
      }
      await cloAssessment.destroy();
      log.info('Deleted successfully!');
      return res
        .status(200)
        .send({ message: 'Deleted successfullty', cloAssessment });
    } catch (error) {
      log.error(error);
      return res.status(500).send({ name: error.name, message: error.message });
    }
  }
};
