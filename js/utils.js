'use strict';

const generateRandomAphanumericString = () => {
	return Math.random().toString(36).substring(2);
};

const generateRandomString = () => {
	return generateRandomAphanumericString().replace(/[0-9]/g,'');
};

const generateRandomEmail = () => {
	return generateRandomAphanumericString() + '@' + generateRandomString() + '.com';
};

const showTotalCountAlert = (emailInputObj) => {
	const totalValidEmailCount = emailInputObj.getValidEmailEntriesCount();
	alert('Total ' + totalValidEmailCount + ' valid ' + (totalValidEmailCount === 1 ? 'email' : 'emails'));
};

const setEventListernersForActions = (emailInputObj) => {
	const currentEmailForm = emailInputObj.referenceNode.closest('.email-form');

	// Event listener to Add Random email on click of button
	currentEmailForm.querySelector('button.add-email').addEventListener('click', () => emailInputObj.addExternalEmail(generateRandomEmail()));

	//Event listener to get total valid email count
	currentEmailForm.querySelector('button.get-emails-count').addEventListener('click', () => showTotalCountAlert(emailInputObj));
};