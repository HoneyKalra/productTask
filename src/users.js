let Editid = new URLSearchParams(window.location.search).get('id');
//let storageData = JSON.parse(localStorage.getItem('users'));//
//getting elements for event listening//
const submitBtn = document.getElementById("submit-btn");
let fileInput = document.getElementById('fileInput');
let checkBox = document.getElementById('sameAsPermanent');


// Function to get users from localStorage
function getUsersFromLocalStorage() {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
}
// Function to save users to localStorage
function saveUsersToLocalStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
const users = getUsersFromLocalStorage();
//for copying the user data on the time of edit//
users.forEach(element => {
    if (element.id == Editid) {
        document.getElementById('firstName').value = element.firstName;
        document.getElementById('lastName').value = element.lastName;
        document.getElementById('age').value = element.age;
        document.getElementById('gender').value = element.gender;
        document.getElementById('email').value = element.email;
        document.getElementById('phoneNumber').value = element.phoneNumber;
        document.getElementById('dob').value = element.dob;
        document.getElementById('currentAddress').value = element.currentAddress;
        document.getElementById('sameAsPermanent').checked = element.sameAsPermanent;
        document.getElementById('role').value = element.role;
        document.getElementById('bloodGroup').value = element.bloodGroup;
        document.getElementById('permanentAddress').value = element.permanentAddress;

        // Handle the image file
        if (element.image) {
            const imgElement = document.getElementById('imagePreview');
            imgElement.src = element.image;
            imgElement.style.display = 'inline-block';
        }





    }
});
function submitForm(event) {
    event.preventDefault();
    // Clear existing error messages//
    clearErrorMessages();
    // Validate the form fields
    let validationResults = validateForm();
    if (validationResults.isValid) {
        // If validation passes, create user object
        console.log(validationResults.isValid);
        const user = {
            id: new Date().valueOf(),
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value,
            dob: document.getElementById('dob').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            currentAddress: document.getElementById('currentAddress').value,
            sameAsPermanent: document.getElementById('sameAsPermanent').checked,
            role: document.getElementById('role').value,
            image: "",
            bloodGroup: document.getElementById('bloodGroup').value,
            permanentAddress: document.getElementById('permanentAddress').value,
        };
        const selectedFile = document.getElementById("fileInput").files[0];
        console.log(selectedFile);
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                console.log("File loaded");
                // convert image file to base64 string//
                user.image = reader.result;

                saveUsersToLocalStorage(users);

            },
            false,
        );

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);

        }

        //checking if edit has been clicked or not //
        if (Editid) {
            const index = users.findIndex((element) => element.id == Editid);
            if (index !== -1) {
                users[index] = user;//replacing the previous user with updated one//
                // saveUsersToLocalStorage(users);//
                // Redirect to the user list page
                // window.location.href = 'usersList.html';//


            }
        }
        else {
            console.log("push: ");
            console.log(user);
            users.push(user);
            console.log("after push:");
            console.log(users);

            // saveUsersToLocalStorage(users);//
            // Redirect to the user list page
            //window.location.href = 'usersList.html';//
        }
        // Save the updated array to local storage 
        saveUsersToLocalStorage(users);
        // Redirect to the user list page
        window.location.href = 'usersList.html';


    } else {
        // Display error messages for each field
        displayErrorMessages(validationResults.errors);
    }
}
function validateForm() {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'age', 'gender', 'email', 'dob', 'phoneNumber', 'currentAddress', 'role', 'bloodGroup', 'permanentAddress'];
    let isValid = true;
    const errors = {};

    for (const field of requiredFields) {
        const fieldValue = document.getElementById(field).value.trim();
        const errorElement = document.getElementById(`${field}Error`);

        if (fieldValue === '') {
            errors[field] = `Please enter a value for ${getFieldLabel(field)}`;
            isValid = false;
        }
    }
    //validate image//
    const fileInput = document.getElementById('fileInput');
    const fileErrorElement = document.getElementById('fileInputError');

    if (!fileInput.files || fileInput.files.length === 0) {
        errors.fileInput = 'Please choose an image.';
        isValid = false;
    }

    // Validate email format
    const emailValue = document.getElementById('email').value.trim();
    const emailErrorElement = document.getElementById('emailError');
    if (!isValidEmail(emailValue)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }

    // Validate age (must be positive)
    const ageValue = document.getElementById('age').value.trim();
    const ageErrorElement = document.getElementById('ageError');
    if (!isValidAge(ageValue)) {
        errors.age = 'Please enter a valid age';
        isValid = false;
    }

    // Validate phone number 
    const phoneNumberValue = document.getElementById('phoneNumber').value.trim();
    const phoneNumberErrorElement = document.getElementById('phoneNumberError');
    if (!isValidPhoneNumber(phoneNumberValue)) {
        errors.phoneNumber = 'Please enter a valid phone number';
        isValid = false;
    }

    // Validate date of birth (must be in the format YYYY-MM-DD)
    const dobValue = document.getElementById('dob').value.trim();
    const dobErrorElement = document.getElementById('dobError');
    if (!isValidDateOfBirth(dobValue)) {
        errors.dob = 'Please enter a valid date of birth (YYYY-MM-DD)';
        isValid = false;
    }
    // Validate blood group
    const bloodGroupValue = document.getElementById('bloodGroup').value.trim();
    const bloodGroupErrorElement = document.getElementById('bloodGroupError');
    if (bloodGroupValue === '') {
        errors.bloodGroup = 'Please enter a value for Blood Group';
        isValid = false;
    }

    // Validate permanent address (if not same as current address)
    const sameAsPermanent = document.getElementById('sameAsPermanent').checked;
    if (!sameAsPermanent) {
        const permanentAddressValue = document.getElementById('permanentAddress').value.trim();
        const permanentAddressErrorElement = document.getElementById('permanentAddressError');
        if (permanentAddressValue === '') {
            errors.permanentAddress = 'Please enter a value for Permanent Address';
            isValid = false;
        }
    }



    return { isValid, errors };
}

function getFieldLabel(field) {
    // Map field names to their corresponding labels
    const fieldLabels = {
        firstName: 'First Name',
        lastName: 'Last Name',
        age: 'Age',
        gender: 'Gender',
        email: 'Email',
        dob: 'Date of Birth',
        phoneNumber: 'Phone Number',
        currentAddress: 'Current Address',
        role: 'Role',
        parmanentAddress: "parmanent Address",
        bloodGroup: "blood Group"
    };

    return fieldLabels[field] || field;
}

function isValidEmail(email) {
    //  email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidAge(age) {
    // Check if age is positive integer//
    return /^[1-9]\d*$/.test(age);
}

function isValidPhoneNumber(phoneNumber) {
    //  phone number validation regex length is at max 10//
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

function isValidDateOfBirth(dob) {
    // Check if date of birth is in right format//
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dob);
}

function clearErrorMessages() {
    // Clear existing error messages
    const errorElements = document.querySelectorAll('.text-red-500');
    errorElements.forEach((element) => {
        element.textContent = '';
    });
}

function displayErrorMessages(errors) {
    // Display error messages for each field//
    for (const field in errors) {
        const errorElement = document.getElementById(`${field}Error`);
        errorElement.textContent = errors[field];
    }
}
//all event listeners//
submitBtn.addEventListener("click", submitForm)
submitBtn.addEventListener("click", validateForm)
checkBox.addEventListener('change', function () {
    let currentAddress = document.getElementById('currentAddress').value;
    document.getElementById('permanentAddress').value = this.checked ? currentAddress : '';
}
)