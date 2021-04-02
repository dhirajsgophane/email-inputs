'use strict';

var generateRandomAphanumericString = function generateRandomAphanumericString() {
	return Math.random().toString(36).substring(2);
};

var generateRandomString = function generateRandomString() {
	return generateRandomAphanumericString().replace(/[0-9]/g, '');
};

var generateRandomEmail = function generateRandomEmail() {
	return generateRandomAphanumericString() + '@' + generateRandomString() + '.com';
};

var showTotalCountAlert = function showTotalCountAlert(emailInputObj) {
	var totalValidEmailCount = emailInputObj.getValidEmailEntriesCount();
	alert('Total ' + totalValidEmailCount + ' valid ' + (totalValidEmailCount === 1 ? 'email' : 'emails'));
};

var setEventListernersForActions = function setEventListernersForActions(currentEmailForm, emailInputObj) {

	// Event listener to Add Random email on click of button
	currentEmailForm.querySelector('button.add-email').addEventListener('click', function () {
		return emailInputObj.addExternalEmail(generateRandomEmail());
	});

	//Event listener to get total valid email count
	currentEmailForm.querySelector('button.get-emails-count').addEventListener('click', function () {
		return showTotalCountAlert(emailInputObj);
	});
};