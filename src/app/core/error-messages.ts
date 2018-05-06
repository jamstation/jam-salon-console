const errorMessages = [
	{ code: 'auth/user-not-found', message: 'User not found. Please register.' },
	{ code: 'auth/email-already-in-use', message: 'Email already exists.' }
]

const defaultErrorMessage = { message: 'Something went wrong. Please try again later.' };

export const getErrorMessage = function ( code: string = null )
{
	const error = errorMessages.find( error => error.code === code ) || defaultErrorMessage;
	console.log( code, error.message );
	return error.message;
}
