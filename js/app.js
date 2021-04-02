'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const employeeEmailInputNode = document.getElementById("employee-emails-input");
	const customerEmailInputNode = document.getElementById("customer-emails-input");

	const employeeEmailInput = new EmailInput(employeeEmailInputNode);
	const customerEmailInput = new EmailInput(customerEmailInputNode);

	setEventListernersForActions(employeeEmailInput);
	setEventListernersForActions(customerEmailInput);

	employeeEmailInput.subscribeToEmailList((response) => {
		console.log(response);
	});
});
