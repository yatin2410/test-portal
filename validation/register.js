const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.Id = !isEmpty(data.Id) ? data.Id : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.group = !isEmpty(data.group) ? data.group : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //Id checks
  data.Id = data.Id.toString();
  if (Validator.isEmpty(data.Id)) {
    errors.Id = "Id field is required";
  } else if (!Validator.isNumeric(data.Id) || data.Id.toString().length !== 9) {
    errors.Id = "Id must be 9 digits Number";
  }

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (data.name.toString().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Email checks
  if (Validator.isEmpty(data.group)) {
    errors.group = "Group field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
