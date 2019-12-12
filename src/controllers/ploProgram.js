const log = require('../logger');
const { Plo } = require('../models').db;
const { Program } = require('../models').db;
module.exports = {
  create(req, res) {
    try {
      log.info('Creating a program-plo mapping');
      const { programId, plos } = req.body;
      Program.findByPk(programId)
        .then(program => {
          if (!program)
            return res.status(404).send({ message: 'Program not found' });
          log.debug('Program found');
          let promises = [];
          plos.forEach(plo => {
            let promise = Plo.create({
              id: plo.id,
              threshold: plo.threshold,
              ProgramId: programId
            }).then(() => log.debug('Plo added'));
            promises.push(promise);
          });
          Promise.all(promises)
            .then(() => {
              log.info('Program plos have been added');
              return res
                .status(200)
                .send({ message: 'Program plos have been added' });
            })
            .catch(err => {
              log.error('Promise.all rejected one of the promises', err);
              return res
                .status(500)
                .send({ error: 'Unexpected error occured' });
            });
        })
        .catch(error => {
          log.error('Exception while finding program', error);
          return res.status(400).send({ error });
        });
    } catch (err) {
      log.error('Plo program controller exception', err);
      return res.status(500).send({ error: err.message });
    }
  }
};
