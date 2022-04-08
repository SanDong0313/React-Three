const Validator = require('validator');
const isEmpty = require('./is-empty');

function validateNewProject(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Project name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
    validateNewProject,
}
