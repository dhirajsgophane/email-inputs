'use strict';

class EmailInput {
	constructor(node) {
		this.referenceNode = node;
		this.addValueKeyStrokes = [13, 44];
		this.observers = [];
		this.init();
		this.removeEmail = this.removeEmail.bind(this);
		this.addExternalEmail = this.addExternalEmail.bind(this);
	}

	//Initialize DOM and add event listners
	init(){
		this.referenceNode.innerHTML = '<div class="email-input"><input type="text" placeholder="add more people..."/></div>';
		this.setEventListers();
	}

	validateEmail(email){
		const emailValidatorRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailValidatorRegex.test(String(email).toLowerCase());
	}

	addEmail(target, value){
		const updatedEmail = value.trim();
		if(updatedEmail) {
			const emailEntry = document.createElement('div');
			emailEntry.classList.add('email-entry');
			if (!this.validateEmail(updatedEmail)) emailEntry.classList.add('invalid');
			emailEntry.innerHTML = '<span class="email-entry-body">' + updatedEmail + '</span><span class="remove-entry">x</span>';
			target.parentNode.insertBefore(emailEntry, target);
			target.value = '';
			const removeEntryTags = this.referenceNode.getElementsByClassName('remove-entry');
			removeEntryTags[removeEntryTags.length - 1].addEventListener('click', (event) => this.removeEmail(event.target.parentNode));
		}
	}

	removeEmail(emailNode){
		this.referenceNode.querySelector('.email-input').removeChild(emailNode);
	}

	handlePaste(event) {
		const {target} = event;
		const clipboardData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;
		event.preventDefault();
		const emailList = clipboardData.getData('Text').split(',');
		emailList.forEach((email) => this.addEmail(target, email));
		this.notifySubscribers();
	}

	setEventListers(){
		this.referenceNode.getElementsByClassName('email-input')[0].addEventListener('click', (event)=> {
			if(event.target.classList.contains('email-input')) event.target.querySelector('input').focus();
		});

		this.referenceNode.getElementsByTagName('input')[0].addEventListener('keypress', (event)=> {
			if(this.addValueKeyStrokes.indexOf(event.keyCode) !== -1) {
				event.preventDefault();
				this.addEmail(event.target, event.target.value);
				this.notifySubscribers();
			}
		});

		this.referenceNode.getElementsByTagName('input')[0]
		.addEventListener('focusout', (event) => {
			this.addEmail(event.target, event.target.value);
			this.notifySubscribers();
		});

		this.referenceNode.getElementsByTagName('input')[0].addEventListener('paste', (event) => this.handlePaste(event));
	}

	getAllEmailNodes() {
		return this.referenceNode.querySelectorAll('.email-entry');
	}

	addExternalEmail(email) {
		const target = this.referenceNode.querySelector('input');
		this.addEmail(target, email);
		this.notifySubscribers();
	}

	getValidEmailEntriesCount() {
		return this.getTotalEntries().length - this.referenceNode.querySelectorAll('.email-entry.invalid').length;
	}

	customerForEach(arrayLikeStructure) {
		const customArray = [];
		for(let i=0; i< arrayLikeStructure.length; i++){
			customArray.push(arrayLikeStructure[i]);
		}
		return customArray;
	}

	// A method to get all entered emails. Both valid and Invalid
	getTotalEntries() {
		return this.customerForEach(this.getAllEmailNodes()).map((emailNode)=> emailNode.innerText);
	}

	// A method to replace all entered emails with new ones
	replaceEmailList(newEmailList) {
		this.getAllEmailNodes().forEach((emailNode) => this.removeEmail(emailNode));
		newEmailList.map((newEmail) => this.addExternalEmail(newEmail));
		this.notifySubscribers();
	}

	// A method to subscribe to email list changes
	subscribeToEmailList(newObserver) {
		this.observers.push(newObserver);
	}

	notifySubscribers() {
		this.observers.forEach((observer) => observer(this.getTotalEntries()));
	}
}