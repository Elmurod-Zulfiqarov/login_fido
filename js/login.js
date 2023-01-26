let userEmail = document.querySelector('#email');
let userPassword = document.querySelector('#password');
let checkEmail = document.querySelector('#checkEmail');
let checkPassword = document.querySelector('#checkPassword');
let loginBtn = document.querySelector("#login");
let checkLogin = document.querySelector('#checkLogin')
let users, userLogin, isBlock;
let count = 0;

localStorage.setItem("userLogin", JSON.stringify(userLogin));

if(localStorage.getItem("isBlock") == null)
{
	isBlock = false;
} else{
    isBlock = JSON.parse(localStorage.getItem("isBlock"))
}

if(localStorage.getItem("usersdata") == null)
{
    users = [];
}
else{
    users = JSON.parse(localStorage.getItem("usersdata"))
}

/* search in local storage */
if(loginBtn){
    loginBtn.addEventListener("click", function(){
        if(count > 12){
            isBlock = true;
            localStorage.setItem("isBlock", JSON.stringify(isBlock))
        }
        console.log(count)
        console.log("blok user:  ", isBlock)
        if(!isBlock) {
            if(userEmail.value == "")
            {
                checkEmail.innerHTML = "Please enter your email";
            }
            if( userPassword.value == "")
            {
                checkPassword.innerHTML = "Please enter your password";
            }

            if (users.length > 0) {
                for(let i = 0; i < users.length; i++)
                {
                    if(userEmail.value != "" && userPassword.value != "" )
                    {
                        if(userEmail.value == users[i].email && userPassword.value == users[i].password)
                        {
                            // actions update
                            userLogin = users[i];
                            users[i].actions.push(
                                {
                                    fname: userLogin.fname,
                                    lname: userLogin.lname,
                                    email: userLogin.email,
                                    password: userLogin.password,
                                    register: null,
                                    login: "User Login",
                                    update: null,
                                    action_date: Date()
                                }
                            )
                            localStorage.setItem("userLogin", JSON.stringify(userLogin));
                            localStorage.setItem("usersdata", JSON.stringify(users));
                            window.location.href = "profile.html"
                        }
                        else {
                            count++;
                            checkLogin.innerHTML = "Your email and password don't match our records. Please try again."
                        }
                    }
                }
            } else {
                count++;
                checkLogin.innerHTML = "Your Don't have an account!!! Please resgister"
            }
        } else{
            alert("Siz login qilishda ko'p adashganingiz uchun, sayt sizni BOT deb o'ylab block qildi !");
        }

    })
}

/*Handling expected errors of email */
if(userEmail){
    userEmail.addEventListener("blur", function(){
        if(userEmail.value == "" ){
            checkEmail.innerHTML = "Please enter your email";
            userEmail.style.borderColor="red";
        }
        // else if(validateEmail(userEmail.value) == true ) {

        // }
    })
    userEmail.addEventListener("focus", function(){
        checkEmail.innerHTML = "";
        userEmail.style.borderColor = "#237eee";
    })
}

/*Handling expected errors of password */
if(userPassword){
    userPassword.addEventListener("blur",function(){
        if(userPassword.value == ""){
            checkPassword.innerHTML = "Please enter your password";
            userPassword.style.borderColor = "red";
        }
    })
    userPassword.addEventListener("focus",function(){
        checkPassword.innerHTML = "";
        userPassword.style.borderColor = "#237eee";
    })
}
