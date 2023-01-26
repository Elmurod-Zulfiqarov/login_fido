let userFname = document.querySelector("#fname");
let userLname = document.querySelector("#lname");
let userEmail = document.querySelector('#email');
let userPassword = document.querySelector('#password');
let checkFname = document.querySelector('#checkFname');
let checkLname = document.querySelector('#checkLname');
let checkEmail = document.querySelector('#checkEmail');
let checkPassword = document.querySelector('#checkPassword');
let registerBtn = document.querySelector("#register");
let checkRegister = document.querySelector('#checkRegister')
let existEmail = true;
let users;


/*get Item from local storage */
if(localStorage.getItem("usersdata") == null)
{
    users = [];
}
else{
    users = JSON.parse(localStorage.getItem("usersdata"))
}

/* add to local storage */
if(registerBtn){
    registerBtn.addEventListener('click', function(){

        if(validateName(userFname.value) == true)
        {
            if(validateName(userLname.value) == true)
            {
                if (validateEmail(userEmail.value) == true)
                {
                    for (let i = 0; i < users.length; i++) {
                        if(users[i].email == userEmail.value){
                            existEmail = false;
                            break;
                        }
                        existEmail = true;
                    }
                    if(existEmail == true) {
                        if(validatePassword(userPassword.value) == true)
                        {
                            let user={
                                fname: userFname.value,
                                lname: userLname.value,
                                email: userEmail.value,
                                password: userPassword.value,
                                actions: [
                                    {
                                        fname: userFname.value,
                                        lname: userLname.value,
                                        email: userEmail.value,
                                        password: userPassword.value,
                                        register: "User Register",
                                        login: null,
                                        update: null,
                                        action_date: Date()
                                    }
                                ]
                            }
                            users.push(user);
                            localStorage.setItem("usersdata", JSON.stringify(users));
                            window.location.href="login.html";
                        }
                        else
                        {
                            checkPassword.innerHTML="password must contain an uppercase letter and numbers";
                            userPassword.style.borderColor="red";
                        }
                    }
                    else{
                        checkEmail.innerHTML="This is not a valid email address. That used by other User";
                        userEmail.style.borderColor="red";
                    }
                }
                else
                {
                    checkEmail.innerHTML="This is not a valid email address";
                    userEmail.style.borderColor="red";
                }
            }
            else
            {
                checkLname.innerHTML="Name should not contain special characters or Numbers";
                userLname.style.borderColor="red";

            }
        }
        else
        {
            checkFname.innerHTML="Name should not contain special characters or Numbers";
            userFname.style.borderColor="red";
        }
    })
}

/*Handling expected errors of fname */
if(userFname){
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
if(userLname) {
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
if(userEmail){
    userEmail.addEventListener("blur", function(){
        if(validateEmail(userEmail.value) == false ){
            checkEmail.innerHTML = "This is not a valid email address";
            userEmail.style.borderColor = "red";
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == userEmail.value) {
                existEmail = false
                checkEmail.innerHTML = "This is not a valid email address. That used by other User";
                userEmail.style.borderColor = "red";
            }
        }
    })
    userEmail.addEventListener("focus", function(){
         checkEmail.innerHTML = "";
    })
}

/*Handling expected errors of password */
if(userPassword){
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
