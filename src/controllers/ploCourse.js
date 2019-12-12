const log = require('../logger');
const { Program } = require('../models').db;
const { Plo } = require('../models').db;
const { Course } = require('../models').db;
const { CoursePlo } = require('../models').db;
module.exports = {
  async create(req, res) {
    try {
      const { programId, mapping } = req.body;
      let program = await Program.findByPk(programId);
      if (!program) {
        log.debug('Program not found');
        return res.status(404).send({ message: 'Program not found' });
      }
      mapping.forEach(async map => {
        try {
          let plo = await Plo.findOne({
            where: {
              id: map.ploId,
              ProgramId: programId
            }
          });
          if (!plo) {
            log.debug('Plo against program does not exist');
            return res
              .status(404)
              .send({ message: 'PLO not found against program' });
          }
          let course = await Course.findOne({
            where: {
              id: map.courseId
            }
          });
          if (!course) {
            log.debug('Course does not exist');
            return res.status(404).send({ message: 'Course not found' });
          }
          let coursePlo = await course.addPlo(plo, {
            through: {
              percentAchieved: map.percentAchieved,
              programId: programId
            }
          });
          log.debug('Plo against course added');
          return res.status(200).send(coursePlo);
        } catch (error) {
          log.error('Error while finding plo', error);
          return res.status(500).send({ message: 'Unexpected error occured' });
        }
      });
    } catch (error) {
      log.error('Create function threw an exception', error);
      return res.status(500).send({ message: 'Unexpected error occured' });
    }
  },
  async retrieve(req, res) {
    try {
      const programId = req.params.programId;
      let program = await Program.findByPk(programId);
      if (!program) {
        log.debug('Program not found');
        return res.status(404).send({ message: 'Program not found' });
      }
      let list = await CoursePlo.findAll({
        where: {
          programId: programId
        }
      });
      return res.status(200).send(list);
    } catch (err) {
      log.error(err);
      return res.status(500).send({ error: err.message });
    }
  }
};
