const log = require('../logger');
const { OfferedCourse } = require('../models').db;
const { CourseAssessment } = require('../models').db;
const { AssessmentResult } = require('../models').db;
const { CloAssessment } = require('../models').db;
const { Student } = require('../models').db;
const { Clo } = require('../models').db;

module.exports = {
  create: async (req, res) => {
    try {
      log.info('Course assessments are being added');
      const { courseId, employeeId, assessments } = req.body;
      let offering = await OfferedCourse.findOne({
        where: {
          courseId,
          employeeId
        }
      });
      if (!offering) {
        log.debug('Employee does not teach the specified course');
        return res
          .status(404)
          .send({ message: 'Employee doesnot teach specified course' });
      }
      log.debug('Employee teaches the course');
      for (let assessment of assessments) {
        let courseAssessment = await CourseAssessment.create({
          offeredCourseId: offering.id,
          type: assessment
        });
      }
      log.info('Course Assessments have been added');
      return res.status(200).send({ message: 'Course Assessments added' });
    } catch (error) {
      log.error('Unexpected error occured', error);
      return res.status(400).send({ message: 'Unexpected error occured' });
    }
  },
  addResult: async (req, res) => {
    try {
      log.info('Results are being added');
      const { courseId, employeeId, classResults } = req.body;
      let offering = await OfferedCourse.findOne({
        where: {
          courseId,
          employeeId
        }
      });
      if (!offering) {
        log.debug('Employee does not teach the specified course');
        return res
          .status(404)
          .send({ message: 'Employee doesnot teach specified course' });
      }
      for (let studentResult of classResults) {
        let student = await Student.findByPk(studentResult.studentId);
        if (!student)
          return res.status(404).send({ message: 'Student not found' });
        let { results } = studentResult;
        for (let result of results) {
          let assessment = await CourseAssessment.findOne({
            where: {
              type: result.assessmentType,
              offeredCourseId: offering.id
            }
          });
          if (!assessment)
            return res.status(404).send({
              message: 'Assessment is not created against the speicified course'
            });
          let assessmentResult = await AssessmentResult.create({
            courseAssessmentId: assessment.id,
            studentId: student.id,
            marks: result.marks,
            outOf: result.outOf
          });
        }
        log.info('Results for student added', student.id);
      }
      log.info('All class results added');
      return res.status(200).send({ message: 'All class results added' });
    } catch (error) {
      log.error(error);
      return res
        .status(400)
        .send({ message: 'Unexpected error while adding results' });
    }
  },
  createCloAssessment: async (req, res) => {
    try {
      log.info('Creating CLO assessments');
      const { criteria } = req.body;
      const courseId = req.params.courseId;
      const cloAssessments = [];
      for (let cloCriteria of criteria) {
        let clo = await Clo.findOne({
          where: {
            courseId,
            no: cloCriteria.clo
          }
        });
        if (!clo) {
          log.debug('Clo is not mapped to the course specified');
          return res
            .status(404)
            .send({ message: 'Clo is not mapped to the course specified' });
        }
        let cloCriteriaInstance = await CloAssessment.create({
          cloId: clo.id,
          quiz: cloCriteria.quiz,
          assignment: cloCriteria.assignment,
          mid: cloCriteria.mid,
          final: cloCriteria.final,
          threshold: cloCriteria.threshold
        });
        cloAssessments.push(cloCriteriaInstance);
      }
      log.info('All CLO assessments have been added');
      return res.status(201).send({
        message: 'All CLO assessments have been added',
        clos: cloAssessments
      });
    } catch (error) {
      log.error(error);
      return res
        .status(400)
        .send({ message: 'Unexpected error occured', error: error.name });
    }
  }
};
