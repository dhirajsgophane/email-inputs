'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmailInput = function () {
	function EmailInput(node) {
		_classCallCheck(this, EmailInput);

		this.referenceNode = node;
		this.addValueKeyStrokes = [13, 44];
		this.observers = [];
		this.init();
		this.removeEmail = this.removeEmail.bind(this);
		this.addExternalEmail = this.addExternalEmail.bind(this);
	}

	//Initialize DOM and add event listners


	_createClass(EmailInput, [{
		key: 'init',
		value: function init() {
			this.referenceNode.innerHTML = '<div class="email-input"><input type="text" placeholder="add more people..."/></div>';
			this.setEventListers();
		}
	}, {
		key: 'validateEmail',
		value: function validateEmail(email) {
			var emailValidatorRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return emailValidatorRegex.test(String(email).toLowerCase());
		}
	}, {
		key: 'addEmail',
		value: function addEmail(target, value) {
			var _this = this;

			var updatedEmail = value.trim();
			if (updatedEmail) {
				var emailEntry = document.createElement('div');
				emailEntry.classList.add('email-entry');
				if (!this.validateEmail(updatedEmail)) emailEntry.classList.add('invalid');
				emailEntry.innerHTML = '<span class="email-entry-body">' + updatedEmail + '</span><span class="remove-entry">x</span>';
				target.parentNode.insertBefore(emailEntry, target);
				target.value = '';
				var removeEntryTags = this.referenceNode.getElementsByClassName('remove-entry');
				removeEntryTags[removeEntryTags.length - 1].addEventListener('click', function (event) {
					return _this.removeEmail(event.target.parentNode);
				});
			}
		}
	}, {
		key: 'removeEmail',
		value: function removeEmail(emailNode) {
			this.referenceNode.querySelector('.email-input').removeChild(emailNode);
		}
	}, {
		key: 'handlePaste',
		value: function handlePaste(event) {
			var _this2 = this;

			var target = event.target;

			var clipboardData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;
			event.preventDefault();
			var emailList = clipboardData.getData('Text').split(',');
			emailList.forEach(function (email) {
				return _this2.addEmail(target, email);
			});
			this.notifySubscribers();
		}
	}, {
		key: 'setEventListers',
		value: function setEventListers() {
			var _this3 = this;

			this.referenceNode.getElementsByClassName('email-input')[0].addEventListener('click', function (event) {
				if (event.target.classList.contains('email-input')) event.target.querySelector('input').focus();
			});

			this.referenceNode.getElementsByTagName('input')[0].addEventListener('keypress', function (event) {
				if (_this3.addValueKeyStrokes.indexOf(event.keyCode) !== -1) {
					event.preventDefault();
					_this3.addEmail(event.target, event.target.value);
					_this3.notifySubscribers();
				}
			});

			this.referenceNode.getElementsByTagName('input')[0].addEventListener('focusout', function (event) {
				_this3.addEmail(event.target, event.target.value);
				_this3.notifySubscribers();
			});

			this.referenceNode.getElementsByTagName('input')[0].addEventListener('paste', function (event) {
				return _this3.handlePaste(event);
			});
		}
	}, {
		key: 'getAllEmailNodes',
		value: function getAllEmailNodes() {
			return this.referenceNode.querySelectorAll('.email-entry');
		}
	}, {
		key: 'addExternalEmail',
		value: function addExternalEmail(email) {
			var target = this.referenceNode.querySelector('input');
			this.addEmail(target, email);
			this.notifySubscribers();
		}
	}, {
		key: 'getValidEmailEntriesCount',
		value: function getValidEmailEntriesCount() {
			return this.getTotalEntries().length - this.referenceNode.querySelectorAll('.email-entry.invalid').length;
		}
	}, {
		key: 'customerForEach',
		value: function customerForEach(arrayLikeStructure) {
			var customArray = [];
			for (var i = 0; i < arrayLikeStructure.length; i++) {
				customArray.push(arrayLikeStructure[i]);
			}
			return customArray;
		}

		// A method to get all entered emails. Both valid and Invalid

	}, {
		key: 'getTotalEntries',
		value: function getTotalEntries() {
			return this.customerForEach(this.getAllEmailNodes()).map(function (emailNode) {
				return emailNode.innerText;
			});
		}

		// A method to replace all entered emails with new ones

	}, {
		key: 'replaceEmailList',
		value: function replaceEmailList(newEmailList) {
			var _this4 = this;

			this.getAllEmailNodes().forEach(function (emailNode) {
				return _this4.removeEmail(emailNode);
			});
			newEmailList.map(function (newEmail) {
				return _this4.addExternalEmail(newEmail);
			});
			this.notifySubscribers();
		}

		// A method to subscribe to email list changes

	}, {
		key: 'subscribeToEmailList',
		value: function subscribeToEmailList(newObserver) {
			this.observers.push(newObserver);
		}
	}, {
		key: 'notifySubscribers',
		value: function notifySubscribers() {
			var _this5 = this;

			this.observers.forEach(function (observer) {
				return observer(_this5.getTotalEntries());
			});
		}
	}]);

	return EmailInput;
}();