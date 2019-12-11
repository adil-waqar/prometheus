const { Program } = require('../models').db;
const { Course } = require('../models').db;
const { DegreePlans } = require('../models').db;
const log = require('../logger');

module.exports = {
  create(req, res) {
    try {
      const { degreePlan, program } = req.body;
      Program.findByPk(program)
        .then(program => {
          if (!program)
            return res.status(404).send({ message: 'Program not found' });
          degreePlan.forEach(semester => {
            let semesterNo = semester.semester;
            semester.courses.forEach(courseBody => {
              Course.findByPk(courseBody.id).then(course => {
                if (!course)
                  return res.status(404).send({ message: 'Course not found' });
                program
                  .addCourse(course, { through: { semesterNo } })
                  .then(ProgramCourse => {
                    log.debug(
                      'Course against program added:',
                      ProgramCourse[0].dataValues
                    );
                    // Adding prereq
                    courseBody.preReq.forEach(prereq => {
                      // Finding prereq in courses
                      Course.findByPk(prereq).then(preq => {
                        if (!preq)
                          return res.status(404).send({
                            message: 'Prerequisite not found'
                          });
                        course.addPreRequisites(preq).then(coursePrereq => {
                          log.debug(
                            'Prerequisite against course added:',
                            coursePrereq[0].dataValues
                          );
                        });
                      });
                    });
                  })
                  .catch(err => res.status(400).send({ err }));
              });
            });
          });
          return res
            .status(200)
            .send({ message: 'Degree plan has been set successfully' });
        })
        .catch(error => {
          log.debug(error);
          return res.status(400).send({ error });
        });
    } catch (err) {
      log.error(err);
      return res.status(500).send({ error: err.message });
    }
  },
  retrieve(req, res) {
    try {
      const program = req.params.programId;
      Program.findAll({
        include: [
          {
            model: Course,
            include: ['PreRequisites']
          }
        ]
      }).then(ProgramCourse => {
        log.debug(ProgramCourse[0].dataValues);
        res.status(200).send(ProgramCourse);
      });
    } catch (err) {
      log.error(err);
      return res.status(500).send({ error: err.message });
    }
  }
};
