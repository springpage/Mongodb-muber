const mongoose = require('mongoose');

before(done => {
  console.log('Enter test environment');
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection.once('open', () => done()).on('error', error => {
    console.warn('Warning', error);
  });
});

beforeEach(done => {

  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => {
      console.log('Resolve in drop db');
      done();
      console.log('After resolve in drop db');
    })
    .catch(() => {
      console.log('Reject in drop db');
      done();
    });
});
