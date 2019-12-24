const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateQuizInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";
  data.endDate = !isEmpty(data.endDate) ? data.endDate : "";
  data.perToPass = !isEmpty(data.perToPass) ? data.perToPass : "";

  //Id checks
  data.duration = data.duration.toString();
  if (Validator.isEmpty(data.duration)) {
    errors.duration = "Duration field is required";
  } else if (!Validator.isNumeric(data.duration)) {
    errors.duration = "Duration must be integer";
  }

  let perToPass = data.perToPass.toString();
  if (Validator.isEmpty(perToPass)) {
    errors.perToPass = "perToPass field is required";
  } else if (!Validator.isNumeric(perToPass)) {
    errors.perToPass = "PerToPass must be integer";
  } else if (data.perToPass < 0 || data.perToPass > 100) {
    errors.perToPass = "perToPass must be between 0 to 100";
  }
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (data.name.toString().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!Validator.isISO8601(data.startDate)) {
    errors.startDate = "It must be Date URI";
  }

  if (!Validator.isISO8601(data.endDate)) {
    errors.endDate = "It must be Date URI";
  }

  if (data.groups == undefined || data.groups.length === 0) {
    errors.groups = "Select atleast one group";
  }

  if (
    !(errors.startDate && errors.endDate) &&
    new Date(data.endDate).getTime() <= new Date(data.startDate).getTime()
  ) {
    errors.endDate = "End Date must be greater than Start Date";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
