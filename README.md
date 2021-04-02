# email-inputs
![image](https://user-images.githubusercontent.com/81437732/113436823-147a7000-93ee-11eb-8e64-7cc5b9e728d1.png)

Live Demo: https://dhirajsgophane.github.io/email-inputs/

# Overview:
Email Inputs component is a reusable input component which can be used to collect email IDs. It is supported in IE 11 and latest versions of Chrome, Safari, Firefox, and Edge. Following operations are supported:
1. Add email
2. Remove email
3. Get total valid email count
4. Get total number of email count (including invalid emails)
5. Paste one or more emails
6. Replace current list with new list of emails
7. Subscribe to email list changes (Additional and removal of emails)

# Usage:
Insert EmailInput as per below example:
```js
const emailInputNode = document.getElementById("custom-emails-input");
const customEmailInput = new EmailInput(emailInputNode);
```

# Supported API:
## Add Email
Add new email to the list
```js
customEmailInput.addExternalEmail('test@gmail.com')
```

## Get Total Email Count (Valid and Invalid)
```js
customEmailInput.getTotalEntries()
```

## Get Only Valid Emails
```js
customEmailInput.getValidEmailEntriesCount()
```

## Replace existing list with new list
```js
customEmailInput.replaceEmailList(['test1@gmail.com', 'test2@gmail.com'])
```

## Subscribe to email list changes
```js
customEmailInput.subscribeToEmailList(callBackfunction)
```
