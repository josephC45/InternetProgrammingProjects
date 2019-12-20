const creditCheck =
    '<fieldset>' +
    '<legend>Credit Card Section</legend>' +
    'First Name:<input type="text" name="First_Name" size="15" maxlength="30" id="first_name" />' + '<br>' +
    'Last Name:<input type="text" name="Last_Name" size="15" maxlength="30" id="last_name" required />' + '<br>' +
    'Address:<input type="text" name="Address" size="15" maxlength="30" id="address" required />' + '<br>' +
    'City:<input type="text" name="City" size="15" maxlength="30" id="city" required />' + '<br>' +
    'Zip Code:<input type="text" name="zip" size="15" maxlength="30" id="zip" required />' + '<br>' +
    'Email Address:<input type="text" name="email" size="15" maxlength="30" id="email" required />' + '<br>' +
    'Name On Card:<input type="text" name="CardName" size="15" maxlength="30" id="card_name" requried/>' + '<br>' +
    'Card Number:<input type="text" name="credit_card" size="15" maxlength="30" id="credit_card" required />' + '<br>' +
    '<a href="https://en.wikipedia.org/wiki/Card_security_code" target="_blank">CVV2/CVC:</a>' + '<input type="text" name="cvc" size="15" maxlength="30" id="cvc" required />' + '<br>' +

    '<p>Select a state</p>' +
    '<select id="select" name="sel">' +
    '<option value="0">Select State</option>' +
    '<option value="Alabama">Alabama</option>' +
    '<option value="Alaska">Alaska</option>' +
    '<option value="Arizona">Arizona</option>' +
    '<option value="Arkansas">Arkansas</option>' +
    '<option value="California">California</option>' +
    '<option value="Colorado">Colorado</option>' +
    '<option value="Connecticut">Connecticut</option>' +
    '<option value="Deleware">Delaware</option>' +
    '<option value="WashingTon Dc">Washington DC</option>' +
    '<option value="Florida">Florida</option>' +
    '<option value="Georgia">Georgia</option>' +
    '<option value="Hawaii">Hawaii</option>' +
    '<option value="Idaho">Idaho</option>' +
    '<option value="Illinois">Illinois</option>' +
    '<option value="Indiana">Indiana</option>' +
    '<option value="Iowa">Iowa</option>' +
    '<option value="Kansas">Kansas</option>' +
    '<option value="Kentucky">Kentucky</option>' +
    '<option value="Louisiana">Louisiana</option>' +
    '<option value="Maine">Maine</option>' +
    '<option value="Maryland">Maryland</option>' +
    '<option value="Massachusetts">Massachusetts</option>' +
    '<option value="Michigan">Michigan</option>' +
    '<option value="Minnesota">Minnesota</option>' +
    '<option value="Mississippi">Mississippi</option>' +
    '<option value="Missouri">Missouri</option>' +
    '<option value="Montana">Montana</option>' +
    '<option value="Nebraska">Nebraska</option>' +
    '<option value="Nevada">Nevada</option>' +
    '<option value="New Hampshire">New Hampshire</option>' +
    '<option value="New Jersey">New Jersey</option>' +
    '<option value="New Mexico">New Mexico</option>' +
    '<option value="New York">New York</option>' +
    '<option value="North Carolina">North Carolina</option>' +
    '<option value="North Dakota">North Dakota</option>' +
    '<option value="Ohio">Ohio</option>' +
    '<option value="Oklahoma">Oklahoma</option>' +
    '<option value="Oregon">Oregon</option>' +
    '<option value="Pennsylvania">Pennsylvania</option>' +
    '<option value="Rhode Island">Rhode Island</option>' +
    '<option value="South Carolina">South Carolina</option>' +
    '<option value="South Dakota">South Dakota</option>' +
    '<option value="Tennessee">Tennessee</option>' +
    '<option value="Texas">Texas</option>' +
    '<option value="Utah">Utah</option>' +
    '<option value="Vermont">Vermont</option>' +
    '<option value="Virginia">Virginia</option>' +
    '<option value="Washington">Washington</option>' +
    '<option value="West Virginia">West Virginia</option>' +
    '<option value="Wisconsin">Wisconsin</option>' +
    '<option value="Wyoming">Wyoming</option>' +
    '</select>' + '<br>' +

    'Expiration Date <input type="month" name="expiration_date" value="2019-04" min="2017-01" max="2020-12" id="expiration" />' +

    '</fieldset>';


const paypal =
    '<fieldset>' +
    '<legend>PayPal Section</legend>' +
    'Email Address:<input type="text" name="emails" size="15" maxlength="30" id="emails" required />' + '<br>' +
    'Password <input type="password" name="Password" size="15" maxlength="30" id="password" required />' +
    '</fieldset>';


document.getElementById("paymentinfo").innerHTML = creditCheck;
//updateForm updates the webpage depending on which radio button was pressed
function updateForm(control) {

    if (control.checked === document.getElementById("credit").checked) {
        document.getElementById("paymentinfo").innerHTML = creditCheck;
    } else {
        document.getElementById("paymentinfo").innerHTML = paypal;
    }

} //end updateForm

//Validates whether or not a number has been entered into the respected textfields. 
function testNumber(num) {
    if (/^[0-9]+$/.test(num)) {
        return true;
    } else {
        alert("Please enter a number.")
        return false;
    }
} //end testNumber

//Tests the length of the input.
function testLength(value, length, exactLength) {

    if (exactLength) {
        if (value.length == length) {
            return true;
        } else {
            return false;
        }
    } else {
        if (value.length >= length) {
            return true;
        } else {
            return false;
        }
    }
} //end testLength

//Validates the zipcode and the cvc inputs
function validateControl(control, name, length) {
    let val = document.getElementById(control).value;
    if (testNumber(val)) {
        if (testLength(val, length, true)) {
            return true;
        }
    }
    alert("Incorrect input for the " + document.getElementById(name).getAttribute("name") + " text field.");
    return false;
} //end validateControl

//Validates the email through the use of a regex expression
function validateEmail(email) {
    let val = document.getElementById(email).value;
    if (/^[A-Za-z]+@[a-z]+\.[a-z]{3}$/.test(val)) {
        return true;
    } else {
        alert("Invalid email");
        return false;
    }
} //end validateEmail

//Validates the credit card number.
function validateCreditCard(value) {
    let reg = value.replace(/\s+/g, "");
    if (testNumber(reg)) {
        var swi = reg.charAt(0);
        if (swi == 3) {
            if (testLength(reg, 15, true)) {
                return true;
            } else {
                alert("This is not a valid AMEX card.");
                return false;
            }
        } else if (swi == 4 || swi == 5 || swi == 6) {
            if (testLength(reg, 16, true)) {
                return true;
            } else {
                alert("This is an invalid Discover, Master, or Visa card.");
                return false;
            }
        }
    }
    alert("The credit cards we accept do not start with " + swi + ".");
    return false;
} //end validateCreditCard

//Validates whether the user has chosen a state or not
function validateStates() {
    let choice = document.forms["frm"]["sel"];
    let choiceValue = choice.options[choice.selectedIndex].value;
    if (choiceValue != 0) {
        return true;
    } else {
        alert("Please select a state.");
        return false;
    }
} //end validateStates

//Validates the password by calling the testLength function
function validatePassword(value, minlength) {
    let val = document.getElementById(value).value;
    if (testLength(val, minlength, false)) {
        return true;
    } else {
        alert("Please enter a password with a minimum length of " + minlength + ".");
        return false;
    }
} //end validatePassword

//Validates the specified date with the current date.
function validateDate(value) {
    var currentDay = new Date();
    var specifiedDate = new Date(value);
    var specifiedMonth = specifiedDate.getMonth() + 1;
    var specifiedYear = specifiedDate.getFullYear();
    var currentMonth = currentDay.getMonth();
    var currentYear = currentDay.getFullYear();

    if ((specifiedYear == currentYear) && (specifiedMonth > currentMonth)) {
        return true;
    } else if (specifiedYear > currentYear) {
        return true;
    } else {
        alert("Enter a valid month/year.");
        return false;
    }
} //end validateDate

//validateForm checks all the fields to see if they are adequate
function validateForm() {
    if (document.getElementById("credit").checked) {
        if (validateControl("zip", "zip", 5) == false) {
            return false;
        } else if (validateControl("cvc", "cvc", 3) == false) {
            return false;
        } else if (validateEmail("email") == false) {
            return false;
        } else if (validateCreditCard(document.getElementById("credit_card").value) == false) {
            return false;
        } else if (validateStates() == false) {
            return false;
        } else if (validateDate(document.getElementById("expiration").value) == false) {
            return false;
        } else {
            alert("Everything submitted successfully");
            return true;
        }

    } else {
        if (validateEmail("emails") == false) {
            return false;
        } else if (validatePassword("password", 5) == false) {
            return false;
        } else {
            alert("Everything submitted successfully");
            return true;
        }
    }
} //end validateForm