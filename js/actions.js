document.querySelector('tbody').innerHTML = "";
let userLogin = JSON.parse(localStorage.getItem("userLogin"));

console.log(userLogin)
for (let i = 0; i < userLogin.actions.length; i++) {
	document.querySelector('tbody').innerHTML += `
	<tr>
		<td>${i+1}</td>
		<td>${userLogin.actions[i].fname}</td>
		<td>${userLogin.actions[i].lname}</td>
		<td>${userLogin.actions[i].email}</td>
		<td>${userLogin.actions[i].password}</td>
		<td>${userLogin.actions[i].register}</td>
		<td>${userLogin.actions[i].login}</td>
		<td>${userLogin.actions[i].update}</td>
		<td>${userLogin.actions[i].action_date}</td>
	</tr>
	`
}
