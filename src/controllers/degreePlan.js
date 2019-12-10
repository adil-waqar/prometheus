const { Program } = require('../models');
const { Course } = require('../models');

module.exports = {
  create(req, res) {
    const { degreePlan, program } = req.body;
    Program.findByPk(program).then(program => {
      if (!program)
        return res.status(404).send({ message: 'Program not found' });
      degreePlan.forEach(semester => {
        let semesterNo = semester.semester;
        semester.courses.forEach(course => {
          Course.findByPk(course.id).then(course => {
            if (!course)
              return res.status(404).send({ message: 'Course not found' });
            Program.addCourse(course, { through: { semesterNo } })
              .then(ProgramCourse => {
                console.log(`Course against program added: ${ProgramCourse}`);
              })
              .catch(err => res.status(403).send({ err }));
            // Adding prereqs
            course.PreReq.forEach(prereq => {
              // Finding prereq in courses
              Course.findByPk();
            });
          });
        });
      });
    });
    res.status(200).send({ message: '' });
  }
};
