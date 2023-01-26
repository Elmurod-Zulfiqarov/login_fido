let backPageBtn = document.querySelector("#backPage");
let myFname = document.querySelector("#Myfname");
let myLname = document.querySelector("#Mylname");
let myEmail = document.querySelector('#Myemail');
let myPassword = document.querySelector('#Mypassword');
let editBtn = document.querySelector('#edit');
let editSpace = document.querySelector('#editSpace');
let deleteBtn = document.querySelector('#delete');

let users, userLogin, updateBtn;
let existEmail = true;
let cansel = false;

/*get Item from local storage */
if(localStorage.getItem("usersdata") == null)
{
	users = [];
}
else{
	users = JSON.parse(localStorage.getItem("usersdata"));
}

if(localStorage.getItem("userLogin") == null)
{
	window.location.href = 'index.html'
}
else{
	userLogin = JSON.parse(localStorage.getItem("userLogin"))
	myFname.textContent = userLogin.fname,
	myLname.textContent = userLogin.lname,
	myEmail.textContent = userLogin.email,
	myPassword.textContent = userLogin.password
}

if(backPageBtn){
	backPageBtn.addEventListener('click', function(){
		if(confirm("Asosiy sahifaga(index.html) qaytish")){
			window.location.href = "index.html"
		}
	})
}

if(deleteBtn){
deleteBtn.addEventListener('click', function(){
	let isDelete = confirm("Diqqat!\n Rostan ham hisobingizni o'chirmoqchimisiz?\n(Bunda sizning barcha ma'lumotlaringiz o'chib ketadi)")
	if (isDelete) {
		for (let i = 0; i < users.length; i++){
			if (users[i].email == myEmail.innerHTML && users[i].password == myPassword.innerHTML) {
				console.log(users)
				users.splice(i, 1);
				console.log(users)
				localStorage.setItem("usersdata", JSON.stringify(users));
				window.location.href = "index.html";
			}
		}
	} else{
		console.log("Don't deleted account", isDelete)
	}
})

}

if(editBtn) {
	editBtn.addEventListener('click', function(){
		if (!cansel) {
			editBtn.textContent = 'cancel';
			cansel = true;
			editSpace.innerHTML = `
			<form name="editForm">
				<div class="mb-2">
					<input type="text" id="fname" name="fname" class="form-control form-control-lg" placeholder="first name" required/>
					<small id="checkFname" style="color: red;"></small>
				</div>

				<div class="mb-2">
					<input type="text" id="lname" name="lname" class="form-control form-control-lg" placeholder="last name" required/>
					<small id="checkLname" style="color: red;"></small>
				</div>

				<div class="mb-2">
					<input type="email" id="email" name="email" class="form-control form-control-lg" placeholder="email" required/>
					<small id="checkEmail" style="color: red;"></small>
				</div>

				<div class="mb-2">
				<div class="input-group mb-2">
					<input type="password" id="password" name="password" class="form-control form-control-lg" placeholder="password" autocomplete="on" required/>
					<span class="input-group-text" id="basic-addon2">
						<i class="far fa-eye" id="togglePassword"
					style="cursor: pointer"></i>
					</span>
				</div>
				<small id="checkPassword" style="color: red;"></small>
				</div>

				<div class="d-grid gap-2 mb-2">
					<button type="button" id="update" class="btn btn-primary">
						update
					</button>
				</div>
			</form>
		`
		let userFname = document.querySelector("#fname");
		let userLname = document.querySelector("#lname");
		let userEmail = document.querySelector('#email');
		let userPassword = document.querySelector('#password');
		let checkFname = document.querySelector('#checkFname');
		let checkLname = document.querySelector('#checkLname');
		let checkEmail = document.querySelector('#checkEmail');
		let checkPassword = document.querySelector('#checkPassword');
		updateBtn = document.querySelector('#update');

		userFname.value = myFname.textContent;
		userLname.value = myLname.textContent;
		userEmail.value = myEmail.textContent;
		userPassword.value = myPassword.textContent;

		if(updateBtn){
			updateBtn.addEventListener('click',  function(){
				userFname = document.querySelector("#fname").value;
				userLname = document.querySelector("#lname").value;
				userEmail = document.querySelector('#email').value;
				userPassword = document.querySelector('#password').value;

				// check email !!!
				for (let i = 0; i < users.length; i++) {
					if(users[i].email == userEmail && myEmail.textContent == userEmail ){
						existEmail = true;
						break;
					}
					if(users[i].email == userEmail){
						existEmail = false;
					}
				}

				for (let i = 0; i < users.length; i++) {
					if(users[i].email == myEmail.textContent && users[i].password == myPassword.textContent){
						if(validateName(userFname) == true){
							if(validateName(userLname) == true){
								if (validateEmail(userEmail) == true){
									if(existEmail) {
										if(validatePassword(userPassword) == true){
											checkEmail.innerHTML = "";
											checkPassword.innerHTML = "";
											checkFname.innerHTML = "";
											checkLname.innerHTML = "";
											// content update
											myFname.textContent = userFname
											myLname.textContent =  userLname
											myEmail.textContent =  userEmail
											myPassword.textContent =  userPassword
											// user update
											users[i].fname = userFname;
											users[i].lname = userLname;
											users[i].email = userEmail;
											users[i].password = userPassword;
											// login update
											console.log(users[i])
											userLogin = users[i];
											// update actions
											users[i].actions.push(
												{
													fname: userFname,
													lname: userLname,
													email: userEmail,
													password: userPassword,
													register: null,
													login: null,
													update: "User updated",
													action_date: Date()
												}
											)
											localStorage.setItem("usersdata", JSON.stringify(users));
											localStorage.setItem("userLogin", JSON.stringify(userLogin));
										} else{
											checkPassword.innerHTML="password must contain an uppercase letter and numbers";
											userPassword.style.borderColor="red";
										}
									} else{
										checkEmail.innerHTML="This is not a valid email address. That used by other User";
										this.userEmail.style.borderColor="red";
									}
								} else{
									checkEmail.innerHTML="This is not a valid email address";
									userEmail.style.borderColor="red";
								}
							} else{
								checkLname.innerHTML="Name should not contain special characters or Numbers";
								userLname.style.borderColor="red";
							}
						} else{
							checkFname.innerHTML="Name should not contain special characters or Numbers";
							userFname.style.borderColor="red";
						}
					}
				}

				// editBtn.textContent = 'edit';
				// cansel = false;
				// editSpace.innerHTML = '';

			})
		}

		/*Handling expected errors of fname */
		if (userFname) {
			userFname.addEventListener("blur", function(){
				if(validateName(userFname.value) == false){
					checkFname.innerHTML="Name should not contain special characters or Numbers";
					userFname.style.borderColor="red";
				} else {
					checkFname.innerHTML = ""
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
				} else {
					checkLname.innerHTML = ""
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
				} else {
					checkEmail.innerHTML = ""
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
					checkPassword.innerHTML = "password must contain an uppercase letter and numbers";
					userPassword.style.borderColor = "red";
				} else {
					checkPassword.innerHTML = ""
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
				return false
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

		} else {
			editBtn.textContent = 'edit';
			cansel = false;
			editSpace.innerHTML = '';
		}
	})
}
