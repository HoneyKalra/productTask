/*import { parsePhoneNumberFromString } from 'libphonenumber-js';*/
(function () {

    const paymentInfo = {

        formEl: document.getElementById("js-user-details"),
        payBtn: document.getElementById("rzp-button1"),

        clearErrors: function () {
            const errorElements = document.querySelectorAll(".text-red-600");

            errorElements.forEach(element => {
                element.textContent = "";
            })

        },
        showError: function (input, message) {
            const errorElements = document.getElementById(`${input}Error`);
            errorElements.textContent = message;

        },
        validateFields: function () {
            let isValid = true;
            this.clearErrors(); //clear all Errors //

            const formData = new FormData(this.formEl);


            //firstName Validations//
            let firstNameVal = formData.get("firstName");
            let regName = /^[a-zA-Z]+$/;
            if (firstNameVal === "") {
                this.showError("firstName", "FirstName is Required");
                isValid = false;
            }
            else if (!(regName.test(firstNameVal))) {
                this.showError("firstName", "FirstName is not valid");
                isValid = false;
            }
            //lastName Validations//
            let lastNameValue = formData.get("lastName");

            if (lastNameValue === "") {
                this.showError("lastName", "lastName is Required");
                isValid = false;
            }
            else if (!(regName.test(lastNameValue))) {
                this.showError("lastName", "lastName is not valid");
                isValid = false;
            }
            //address validations//
            let addressValue = formData.get("address");
            const regAddress = /^[a-zA-Z0-9\s,'-]*$/;


            if (addressValue === "") {
                this.showError("address", "address is Required");
                isValid = false;
            }
            else if (!(regAddress.test(lastNameValue))) {
                this.showError("lastName", "lastName is not valid");
                isValid = false;
            }


            //city validatidion//
            const cityName = formData.get("city");
            const regCity = /^[a-zA-Z\s]+$/
            if (cityName === "") {
                this.showError("city", "city is Required");
                isValid = false;
            }
            else if (!(regCity.test(cityName))) {
                this.showError("city", "City is not valid");
                isValid = false;
            }
            //state validations//
            const stateName = formData.get("state");
            const regState = /\b(?:AP|AR|AS|BR|CT|GA|GJ|HR|HP|JH|KA|KL|MP|MH|MN|ML|MZ|NL|OR|PB|RJ|SK|TN|TG|TR|UP|UT|WB)\b/;
            if (stateName === "") {
                this.showError("state", "state is Required");
                isValid = false;
            }
            else if (!(regState.test(stateName))) {
                this.showError("state", "state is not valid please provide two main capital letters like PB For Punjab");
                isValid = false;
            }
            //zip validations//
            const zipValue = formData.get("zip")
            const zipRegex = /^[1-9][0-9]{5}$/
            if (zipValue === "") {
                this.showError("Zip", "zip is Required");
                isValid = false;
            }
            else if (!(zipRegex.test(zipValue))) {
                this.showError("zip", "zip is not valid");
                isValid = false;
            }
            //phone number validataion//
            const phoneNumber = formData.get("phone")
            //  const parsedNumber = parsePhoneNumberFromString(phoneNumber, 'IN');//
            if (phoneNumber === "") {
                this.showError("phone", "phone is Required");
                isValid = false;
            }
            /*else if (!parsedNumber.isValid()) {
                this.showError("zip", "zip is not valid");
                isValid = false;
 
            }*/
            return isValid;

        },

        allowToPay: function () {
            var options = {
                "key": "rzp_test_oLh7RL8AyxXGLe", // Enter the Key ID generated from the Dashboard
                "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Acme Corp", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": "order_N9pX9ARdAfmrw6", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response) {
                    const orderDetails = {
                        dummyName: "Honey Kalra",
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        dummyAmount: 30302,
                    }
                    localStorage.setItem("orderDetails", JSON.stringify(orderDetails))
                },
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Honey Kalra", //your customer's name
                    "email": "honey.kalra@example.com",
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new Razorpay(options);
            document.getElementById('rzp-button1').onclick = function (e) {
                rzp1.open();
                e.preventDefault();
            }

        },

        bind: function () {
            this.payBtn.addEventListener("click", (e) => {
                e.preventDefault();

                this.validateFields();
                if (this.validateFields) {
                    this.allowToPay();

                }
            })


        }


    }

    paymentInfo.bind();

















})();
