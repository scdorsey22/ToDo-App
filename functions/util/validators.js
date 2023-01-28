const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};

exports.validateLoginData = (data) => {
   let errors = {};
   if (isEmpty(data.email)) errors.email = 'Must be filled';
   if (isEmpty(data.password)) errors.password = 'Must be filled';
   return {
       errors,
       valid: Object.keys(errors).length === 0 ? true : false
    };
};