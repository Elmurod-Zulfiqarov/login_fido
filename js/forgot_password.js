let userFname = document.querySelector("#fname");
let userLname = document.querySelector("#lname");
let userEmail = document.querySelector('#email');
let userPassword = document.querySelector('#password');
let checkFname = document.querySelector('#checkFname');
let checkLname = document.querySelector('#checkLname');
let checkEmail = document.querySelector('#checkEmail');
let checkPassword = document.querySelector('#checkPassword');
let resetBtn = document.querySelector('#reset');
let users;

/*get Item from local storage */
if(localStorage.getItem("usersdata") == null)
{
	users = [];
}
else{
	users = JSON.parse(localStorage.getItem("usersdata"));
}

if(resetBtn) {
	resetBtn.addEventListener('click', function(){
        console.log('clicked resetBtn', resetBtn)
        for (let i = 0; i < users.length; i++){
            if (users[i].fname == userFname.value) {
                if(users[i].lname == userLname.value) {
                    if(users[i].email == userEmail.value) {
                        if(validatePassword(userPassword.value) == true) {
                            isReset = confirm(`Ma'lumotlarigiz to'g'ri kiritildi.\nYangi parol saqlansinmi?\nYangi parolingiz: ${userPassword.value}`)
                            if(isReset) {
                                users[i].password = userPassword.value
                                localStorage.setItem("usersdata", JSON.stringify(users));
                                window.location.href = "login.html"
                            }
                        } else{
                            checkPassword.innerHTML = "password must contain an uppercase letter and numbers(at least 6)";
                        }
                    } else{
                        checkEmail.innerHTML = "Your email don't match our records. Please try again."
                    }
                } else{
                    checkLname.innerHTML = "Your last name don't match our records. Please try again."
                }
            } else{
                checkFname.innerHTML = "Your first name don't match our records. Please try again."
            }
        }
	})
}

/*Handling expected errors of fname */
if (userFname) {
    userFname.addEventListener("blur", function(){
        if(validateName(userFname.value) == false){
            checkFname.innerHTML="Name should not contain special characters or Numbers";
            userFname.style.borderColor="red";
        }
    })
    userFname.addEventListener("focus", function(){
        checkFname.innerHTML = "";
    })
}

/*Handling expected errors of Lname */
if (userLname) {
    userLname.addEventListener("blur", function(){
        if(validateName(userLname.value) == false){
            checkLname.innerHTML = "Name should not contain special characters or Numbers";
            userLname.style.borderColor = "red";
        }
    })
    userLname.addEventListener("focus",function(){
        checkLname.innerHTML = "";
    })
}

/*Handling expected errors of email */
if (userEmail) {
    userEmail.addEventListener("blur", function(){
        if(validateEmail(userEmail.value) == false ){
            checkEmail.innerHTML = "This is not a valid email address";
            userEmail.style.borderColor = "red";
        }
    })
    userEmail.addEventListener("focus", function(){
        checkEmail.innerHTML = "";
    })

}

/*Handling expected errors of password */
if (userPassword) {
    userPassword.addEventListener("blur", function(){
        if(validatePassword(userPassword.value) == false){
            checkPassword.innerHTML = "password must contain an uppercase letter and numbers(at least 6)";
            userPassword.style.borderColor = "red";
        }
    })
    userPassword.addEventListener("focus", function(){
        checkPassword.innerHTML = "";
    })

}

/* function of validate Email */
function validateEmail(userEmailInp){
    let userEMailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(userEMailRegex.test(userEmailInp) == true)
    {
        return true;
    }
    else{
        return false;
    }
}

/* function  of validate Name */
function validateName(userName){
    let userNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    if(userNameRegex.test(userName) == true)
    {
        return true;
    }
    else{
        return false;
    }
}

/* function  of validate password */
function validatePassword(userPassword){
    let userpasswordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
    if(userpasswordRegex.test(userPassword) == true)
    {
        return true;
    }
    else{
        return false;
    }
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

if (togglePassword){
    togglePassword.addEventListener("click", function () {
        // toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
            // toggle the eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
    });
}
