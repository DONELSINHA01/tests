let data = [];
function fetched(media_type) {
	var API_KEY = "c114a1f12896d9cd8053ac79992d0de5";
	fetch(
		`https://api.themoviedb.org/3/${media_type}/popular?api_key=${API_KEY}&language=en-US&page=1`
	)
		.then((res) => res.json())
		.then((res) => {
			if (data.length > 1) {
				data = [];
				data.push(...res.results);
				render(media_type);
			} else {
				data.push(...res.results);
				render(media_type);
			}
		})
		.catch((err) => console.error(err));
}
let media_type = "movie";
function render(media_type) {
	console.log(data);
	let container = document.getElementById("container");
	data.map((e) => {
		let box = document.getElementById("box");
		if (box !== null) container.removeChild(box);
	});
	for (let i = 0; i < data.length; i++) {
		console.log(media_type);
		let date = (data[i].release_date || data[i].first_air_date).split(
			"-"
		)[0];
		let div = document.createElement("div");
		div.setAttribute("id", "box");
		div.setAttribute("class", "box");
		let a = "";
		data[i].genre_ids.forEach((res, x) => {
			let genre = genreIds.find((find) => find.id === res);
			if (genre !== undefined) {
				a += genre.name;
				if (x !== data[i].genre_ids.length - 1) {
					a += " | ";
				}
			}
		});
		div.innerHTML = `
<a href="movieDetails.html#${
			data[i].id
		}#${media_type}"><img src="https://image.tmdb.org/t/p/w300/${
			data[i].poster_path
		}" alt="" /></a>
				<p>${data[i].original_title || data[i].original_name}</p>
				<small id="small" class="small">
	            ${a}
	            </small>
				<p class="small">${date}</p>
	`;
		container.appendChild(div);
	}
}
function getGenre(e) {
	if (e === "tv") {
		fetched(e);
		document.getElementById("movies").classList.remove("active");
		document.getElementById("series").classList.add("active");
	} else {
		fetched(e);
		document.getElementById("series").classList.remove("active");
		document.getElementById("movies").classList.add("active");
	}
	console.log(e);
	// render(e);
}
fetched("movie");
