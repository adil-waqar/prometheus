const {
  Program,
  CloPloMapping,
  CoursePlo,
  Clo,
  Semester,
  OfferedCourse,
  Plo,
  PloResult
} = require('../models').db;
const log = require('../logger');

module.exports = {
  async calculate(req, res) {
    try {
      const programId = req.params.programId;
      // Get the semester id
      const { term, year } = req.body;
      let semester = await Semester.findOne({
        where: {
          term,
          year
        }
      });
      // Get all of student that belong to the program
      let program = await Program.findOne({
        where: {
          id: programId
        }
      });
      if (!program) {
        log.info('Program does not exist');
        return res.status(404).send({ message: 'Program does not exist' });
      }
      let students = await program.getStudents();
      if (students.length === 0) {
        log.info('Students do not exist in the program');
        return res
          .status(404)
          .send({ message: 'Students do not exist in the program' });
      }
      for (student of students) {
        let results = await student.getClos();
        if (results.length === 0) {
          log.info('Student result doesnot exist');
          return res
            .status(404)
            .send({ message: 'Student result does not exist' });
        }
        for (let result of results) {
          // 1. Check which PLO is mappped to this CLO
          let cloResult = result.dataValues.CloResult;
          let cloPloMap = await CloPloMapping.findOne({
            where: {
              cloId: cloResult.cloId
            }
          });
          if (!cloPloMap) {
            log.info('Clo is not mapped to any plo');
            return res
              .status(404)
              .send({ message: 'Clo not mapped to any plo' });
          }
          //2. Fetching courseId
          let clo = await Clo.findByPk(cloResult.cloId);
          if (!clo) {
            log.info('Clo not mapped to any course');
            return res.status(404).send('Clo not mapped to any course');
          }
          // log.debug(clo);
          //3. Find the course offering id
          let offering = await OfferedCourse.findByPk(clo.offeredCourseId);
          if (!offering) {
            log.info('Offering Id not found');
            return res.status(404).send('Offering Id not found');
          }
          //4. Check from which course have you achieved this
          let coursePlo = await CoursePlo.findOne({
            where: {
              ploId: cloPloMap.ploId,
              courseId: offering.courseId
            }
          });
          if (!coursePlo) {
            log.info('Plo is not mapped to a course');
            return res
              .status(404)
              .send({ message: 'Plo is not mapped to a course' });
          }
          // Check if the student is pass or fail
          let plo = await Plo.findByPk(cloPloMap.ploId);
          if (!plo) {
            log.info('Plo not found');
            return res.status(404).send('Plo not found');
          }
          let status = '';
          let percentAchieved = coursePlo.dataValues.percentAchieved;
          let threshold = plo.threshold;
          if (cloResult.result === 'Pass') {
            if (percentAchieved >= threshold) {
              status = 'Pass';
            } else {
              status = 'Fail';
            }
          } else status = 'Fail';
          let ploResult = await PloResult.findOne({
            where: {
              studentId: student.id,
              ploId: cloPloMap.ploId
            }
          });
          if (!ploResult) {
            let ploInstance = await PloResult.create({
              studentId: student.id,
              ploId: cloPloMap.ploId,
              percentAchieved: status === 'Pass' ? percentAchieved : 0,
              threshold,
              result: status
            });
            log.debug('Plo result created for', student.id, ploInstance);
          } else {
            let updatedPercentAchieved =
              percentAchieved + ploResult.dataValues.percentAchieved;
            let updatedResult = '';
            if (updatedPercentAchieved >= threshold) {
              updatedResult = 'Pass';
            } else {
              updatedResult = 'Fail';
            }
            let updatedPloResult = await ploResult.update({
              percentAchieved: updatedPercentAchieved,
              result: updatedResult
            });
            log.debug(
              'PLO result for student updated',
              student.id,
              updatedPloResult
            );
          }
        }
      }
      return res
        .status(201)
        .send({ message: 'PLO results have been calculated' });
    } catch (error) {
      log.error(error);
      return res.status(500).send({ name: error.name, error: error.message });
    }
  }
};
