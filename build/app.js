'use strict';

document.addEventListener('DOMContentLoaded', function () {
	var employeeEmailInputNode = document.getElementById("employee-emails-input");
	var customerEmailInputNode = document.getElementById("customer-emails-input");

	var employeeEmailInput = new EmailInput(employeeEmailInputNode);
	var customerEmailInput = new EmailInput(customerEmailInputNode);

	setEventListernersForActions(document.getElementById('employee-emails'), employeeEmailInput);
	setEventListernersForActions(document.getElementById('customer-emails'), customerEmailInput);

	employeeEmailInput.subscribeToEmailList(function (response) {
		console.log(response);
	});
});