const submitBtn = document.getElementById("submit-btn");
const users = [];
function clearErrors() {
    let errorElements = document.querySelectorAll(".text-red-500");
    errorElements.forEach(element => {
        element.textContent = "";
    })
}
function showError(input, message) {
    const errorElements = document.getElementById(`${input}Error`);
    errorElements.textContent = message;


}
function validateForm() {
    isValid = true;
    clearErrors(); //clear all Errors //
    const formEl = document.getElementById("userForm");
    const formData = new FormData(formEl);
    //firmName Validations//
    let firstNameVal = formData.get("firstName");
    let regName = /^[a-zA-Z]+$/;
    if (firstNameVal === "") {
        showError("firstName", "FirstName is Required");
        isValid = false;
    }
    else if (!(regName.test(firstNameVal))) {
        showError("firstName", "FirstName is not valid");
        isValid = false;
    }
    //lastName Validations//
    let lastNameValue = formData.get("lastName");

    if (lastNameValue === "") {
        showError("lastName", "lastName is Required");
        isValid = false;
    }
    else if (!(regName.test(lastNameValue))) {
        showError("lastName", "lastName is not valid");
        isValid = false;
    }

    //age validation//
    let ageRegex = /^[1-9]\d*$/;
    let ageValue = formData.get("age");
    if (ageValue === "") {
        showError("age", "age is required");
        isValid = false;
    }
    else if (!(ageRegex.test(ageValue))) {
        showError("age", "age is not valid");
        isValid = false;
    }
    // Password Validation
    let passwordValue = formData.get("password");
    if (passwordValue === "") {
        showError("password", "Password is required");
        isValid = false;
    }

    // Confirm Password Validation
    let confirmPasswordValue = formData.get("confirmPassword");
    if (confirmPasswordValue === "") {
        showError("confirmPassword", "Confirm Password is required");
        isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
        showError("confirmPassword", "Passwords do not match");
        isValid = false;
    }

    // Email Validation
    let emailValue = formData.get("email");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
        showError("email", "Email is required");
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        showError("email", "Invalid Email Address");
        isValid = false;
    }

    // Date of Birth Validation
    let dobValue = formData.get("dob");
    if (dobValue === "") {
        showError("dob", "Date of Birth is required");
        isValid = false;
    }

    // Phone Number Validation//
    let phoneNumberValue = formData.get("phoneNumber");
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (phoneNumberValue === "") {
        showError("phoneNumber", "Phone Number is required");
        isValid = false;
    } else if (!phoneRegex.test(phoneNumberValue)) {
        showError("phoneNumber", "Phone Number is not valid")
    }

    // Blood Group Validation
    let bloodGroupValue = formData.get("bloodGroup");
    if (bloodGroupValue === "") {
        showError("bloodGroup", "Blood Group is required");
        isValid = false;
    }

    // Current Address Validation
    let currentAddressValue = formData.get("currentAddress");
    if (currentAddressValue === "") {
        showError("currentAddress", "Current Address is required");
        isValid = false;
    }

    // Permanent Address Validation
    let permanentAddressValue = formData.get("permanentAddress");
    let sameAsPermanentChecked = formData.get("sameAsPermanent") === "on";
    if (!sameAsPermanentChecked && permanentAddressValue === "") {
        showError("permanentAddress", "Permanent Address is required");
        isValid = false;
    }

    // Role Validation
    let roleValue = formData.get("role");
    if (roleValue === "") {
        showError("role", "Role is required");
        isValid = false;
    }

    return isValid;
}
function createUserObject() {
    // Get form elements using FormData
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    // Create User object
    const user = {};

    // Populate User object with form data//

    for (const [key, value] of formData.entries()) {
        user[key] = value;
    }

    // Display User object
    console.log("User Object:", user);
    users.push(user);
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
    form.reset()


}
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    validateForm();
    if (validateForm()) {
        createUserObject();
    }

})