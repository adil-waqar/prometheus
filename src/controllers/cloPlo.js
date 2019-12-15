const log = require('../logger');
const { Course } = require('../models').db;
const { CoursePlo } = require('../models').db;
const { Plo } = require('../models').db;
const { Clo, Semester } = require('../models').db;
const { CloPloMapping, OfferedCourse } = require('../models').db;

module.exports = {
  create: async (req, res) => {
    try {
      const { mapping, programId, term, year } = req.body;
      const courseId = req.params.courseId;
      let semester = await Semester.findOne({
        where: {
          term,
          year
        }
      });
      if (!semester)
        return res.status(404).send({ message: 'Semester not offered yet' });
      let offering = await OfferedCourse.findOne({
        where: {
          termId: semester.id,
          courseId
        }
      });
      if (!offering)
        return res.status(404).send({ message: 'Course not offered yet' });
      let CloPloMappings = [];
      for (let map of mapping) {
        let plo = await Plo.findOne({
          where: {
            programId,
            no: map.plo
          }
        });
        if (!plo)
          return res.status(404).send({ message: 'Plo does not exist' });
        let coursePlo = await CoursePlo.findOne({
          where: {
            courseId,
            ploId: plo.id
          }
        });
        if (!coursePlo)
          return res.status(404).send({ message: 'Plo not mapped to course' });
        let clo = await Clo.findOne({
          where: {
            no: map.clo,
            offeredCourseId: offering.id
          }
        });
        if (!clo)
          return res.status(404).send({ message: 'Clo does not exist' });
        let cloPloMap = await CloPloMapping.create({
          cloId: clo.id,
          ploId: plo.id
        });
        CloPloMappings.push(cloPloMap);
      }
      log.info('All clos have been mapped to plos');
      return res
        .status(201)
        .send({ message: 'All clos have been mapped to plos', CloPloMappings });
    } catch (error) {
      log.error(error);
      return res
        .status(400)
        .send({ message: 'Unexpected error occured', error: error.name });
    }
  }
};
