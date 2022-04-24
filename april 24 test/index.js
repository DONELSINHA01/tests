const container = document.getElementById("container");
const Display = fetch("https://reqres.in/api/users?page=2")
	.then((e) => e.json())
	.then((e) => {
		console.log(e.data);
		e.data.forEach((e) => {
			container.innerHTML += `<div class="detail">
<div class="upper">
    <img src=${e.avatar} alt="">
    <span id="ids">${e.id}</span>
</div>
<div class="lower">
    <h4 id="firstname">${e.first_name} ${e.last_name}</h4>
    <h4 id="lastname">${e.email}</h4>
</div>
</div>`;
		});
	});
