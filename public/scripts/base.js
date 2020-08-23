class BaseService {
   getErrors(error) {
      let errors = [];

      if (error && error.response) {
         if (error.response.status != 200) {
            errors = error.response.data.errors;
         }
      }

      return errors;
   }
}

const baseService = new BaseService();
