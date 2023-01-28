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

//Look up ways to validate email without RegEx
const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validateSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must be filled';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}

	if (isEmpty(data.firstName)) errors.firstName = 'Must be filled';
	if (isEmpty(data.lastName)) errors.lastName = 'Must be filled';
	if (isEmpty(data.phoneNumber)) errors.phoneNumber = 'Must be filled';
	if (isEmpty(data.country)) errors.country = 'Must be filled';

	if (isEmpty(data.password)) errors.password = 'Must be filled';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';
	if (isEmpty(data.username)) errors.username = 'Must be filled';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};