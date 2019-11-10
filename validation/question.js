const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateQuestionInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.type = !isEmpty(data.type) ? data.type : ""; 
    data.category = !isEmpty(data.category) ? data.category : "";
    data.question = !isEmpty(data.question) ? data.question : "";
    data.o1 = !isEmpty(data.o1) ? data.o1 : "";
    data.o2 = !isEmpty(data.o2) ? data.o2 : "";
    data.o3 = !isEmpty(data.o3) ? data.o3 : "";
    data.o4 = !isEmpty(data.o4) ? data.o4 : "";
    data.difficulty = !isEmpty(data.difficulty) ? data.difficulty : "";
  
    if(Validator.isEmpty(data.type)){
        errors.type = "Type field is required";
    }
    if(Validator.isEmpty(data.category)){
        errors.category = "Category field is required";
    }
    if(Validator.isEmpty(data.question)){
        errors.question = "Question field is required";
    }
    if(Validator.isEmpty(data.o1)){
        errors.o1 = "Option-1 field is required";
    }
    if(Validator.isEmpty(data.o2)){
        errors.o2 = "Option-2 field is required";
    }
    if(Validator.isEmpty(data.o3)){
        errors.o3 = "Option-3 field is required";
    }
    if(Validator.isEmpty(data.o4)){
        errors.o4 = "Option-4 field is required";
    }
    if(Validator.isEmpty(data.difficulty)){
        errors.o4 = "Difficulty field is required";
    }
    console.log(data.ans.length);
    if(data.ans.length===0){
        errors.ans = "please check atleast one ans";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};