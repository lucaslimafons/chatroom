const _ = require('lodash');
const messages = require('../helpers/messages');

class BaseService {
  getErrors(error) {
    if (error.data && error.data.status && error.data.errors && error.data.errors.length > 0) {
      return { status: error.data.status, errors: error.data.errors };
    }

    let errors = [];
    let status = "";
    if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
       if (error.errors.length > 0) {
          _.forEach(error.errors, (item) => {
             errors.push({
                field: item.path,
                message: item.message
             })
          });
       }

       status = 422;
    } else if (error.name == "StatusCodeError") {
       if (error.error.errors.length > 0) {
          _.forEach(error.error.errors, (item) => {
             errors.push({
                field: item.path,
                message: item.description
             })
          });
       }

       status = 400;
    } else {
       errors.push({
          field: error.data && error.data.field ? error.data.field : null,
          message: error.message ? error.message : messages.error_try_again
       });
       status = error.data && error.data.status ? error.data.status : 500;
    }

    return { status: status, errors: errors };
  }
}

module.exports = BaseService;
