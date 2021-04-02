'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const employeeEmailInputNode = document.getElementById("employee-emails-input");
	const customerEmailInputNode = document.getElementById("customer-emails-input");

	const employeeEmailInput = new EmailInput(employeeEmailInputNode);
	const customerEmailInput = new EmailInput(customerEmailInputNode);

	setEventListernersForActions(document.getElementById('employee-emails'), employeeEmailInput);
	setEventListernersForActions(document.getElementById('customer-emails'), customerEmailInput);

	employeeEmailInput.subscribeToEmailList((response) => {
		console.log(response);
	});
});
