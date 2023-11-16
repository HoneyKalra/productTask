let submitBtn=document.getElementById("js-submit");
let allLists = document.getElementsByClassName("validateList")
// console.log(lists);
function validateForm(e) {
    e.preventDefault();
    let name = document.getElementById('js-username').value
    let email = document.getElementById('js-email').value
    let password = document.getElementById('js-password').value
    let confirmPassword = document.getElementById('js-confirmPassword').value
    // Reset previous error messages
    //resetErrors();//
    console.log(e.target)
    // Validate each field
    if (name === '') {
        displayError("js-username", 'Name is required');
    }
    
    if (email=== '') {
        displayError("js-email", 'Email is required');
    } else if (!isValidEmail(email)) {
        displayError("js-email", 'Invalid email format');
    }
    
    if (password === '') {
        displayError("js-password", 'Password is required');
    } else if (password.length < 8) {
        displayError("js-password", 'Password must be at least 8 characters');
    }
    
    if (confirmPassword=== '') {
        displayError("js-confirmPassword", 'Please confirm your password');
        return
    } else if (password !== confirmPassword) {
        displayError("js-confirmPassword", 'Passwords do not match');
        return
    }

    // If all validations pass, submit the form
    document.getElementById('myForm').submit();
}

function isValidEmail(email) {
    // Use a regular expression to validate email format
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(field, message) {
    
    let errorElement = document.createElement('p');
    
    errorElement.className = 'error';
    errorElement.textContent = message;
    
    let inputField = document.getElementById(field);
    console.log(inputField);
    inputField.parentNode.appendChild(errorElement);
    
}

/*function resetErrors() {
    let errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(function (errorMessage) {
        errorMessage.parentNode.removeChild(errorMessage);
    });
}*/
//event listener//'

for(let lists of allLists){
submitBtn.addEventListener("click",validateForm)
}