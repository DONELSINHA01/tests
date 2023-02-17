console.log(window.location.hash);
let a = window.location.hash;
let id = a.split("#")[1];
let media_type = a.split("#")[2];

console.log(media_type);
// function movieDetails(id) {
// 	console.log(id);
// 	// render();
// }

// function render() {
// 	// let box = document.getElementById("detailsBody");
// 	// box.innerHTML = "errrrr";
// 	console.log("inside render");
// 	// }
var API_KEY = "c114a1f12896d9cd8053ac79992d0de5";
// 	let detailsBody = document.getElementById("detailsBody");
// 	let bgImgContainer = document.getElementById("bgImgContainer");
// 	// let p = document.getElementById("p");
// 	// p.innerText = "hbytf";
// 	console.log(detailsBody);
// 	console.log(bgImgContainer);
// 	bgImgContainer.style.backgroundImage = `url('./images/dp.jpg')`;

fetch(
	`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
)
	.then((res) => res.json())
	.then((res) => {
		console.log(res);
		let detailsBody = document.getElementById("detailsBody");
		let bgImgContainer = document.getElementById("bgImgContainer");
		let frontImg = document.getElementById("frontImg");
		let titleh3 = document.getElementById("titleh3");
		let genre = document.getElementById("genre");
		let language = document.getElementById("language");
		let lengths = document.getElementById("length");
		let dates = document.getElementById("date");
		let percentages = document.getElementById("percentage");
		let cast = document.getElementById("cast");
		let overview = document.getElementById("overview");
		// 	// 		console.log(bgImgContainer);
		// 	//         detailsBody.appendChild()
		// 	// bgImgContainer.setAttribute("class", "bgImgContainer");
		// 	// bgImgContainer.setAttribute("id", "bgImgContainer");
		bgImgContainer.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${res.poster_path}")`;
		frontImg.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${res.poster_path}`;
		let a = "";
		res.genres.forEach((re, x) => {
			// let genree = genreIds.find((find) => find.id === re);
			// console.log(genre);
			// if (genree !== undefined) {
			a += re.name;
			if (x !== res.genres.length - 1) {
				a += " | ";
			} else {
				genre.innerText = a;
			}
			// console.log(a);
			// }
		});
		let spokenLanguage = "";
		res.spoken_languages.forEach((e, ind) => {
			spokenLanguage += e.name;
			if (ind !== res.spoken_languages.length - 1) {
				spokenLanguage += " , ";
			} else {
				language.innerText = spokenLanguage;
			}
		});
		titleh3.innerText = res.original_title || res.original_name;
		lengths.innerText = res.runtime || `${res.number_of_episodes} episode`;
		let date = "";
		let temp =
			(res.release_date !== undefined && res.release_date.split("-")) ||
			(res.first_air_date !== undefined && res.first_air_date.split("-"));
		date += `${temp[2]} ${months[temp[1] - 1]} ${temp[0]}`;
		dates.innerText = date;
		percentages.innerText = `${res.vote_average.toFixed(1) * 10}%`;
		fetch(
			`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`
		)
			.then((e) => e.json())
			.then((e) => {
				console.log(e.cast);
				e.cast !== undefined &&
					e.cast.map((item, ind) => {
						if (ind > 4) {
							return;
						}
						let div = document.createElement("castDetails");
						div.setAttribute("id", "castDetails");
						div.setAttribute("class", "castDetails");
						div.innerHTML = `
                    					<img
						src="https://image.tmdb.org/t/p/w45/${item.profile_path}"
						alt=""
					/>
					<p>${item.original_name}</p>
                `;
						cast.appendChild(div);
					});
			});
		overview.innerText = res.overview;
		// 	// let box = document.createElement("div");
		// 	// box.setAttribute("class", "box");
		// 	// box.setAttribute("id", "box");
		// 	// // 	detailsBody.innerHTML = `
		// 	// // ${bgImgContainer}
		// 	// // 	<div class="box"></div>
		// 	// //     `;
		// 	// detailsBody.appendChild(bgImgContainer);
		// 	// document.appendChild("detailsBody");
		// 	// window.location.href = "movieDetails.html";
	});
// 	// 	.catch((err) => console.error(err));
// 	// console.log(id);
// }
// // // movieDetails(505642);

