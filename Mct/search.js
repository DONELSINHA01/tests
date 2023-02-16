var API_KEY = "c114a1f12896d9cd8053ac79992d0de5";
let data = [];
let container = document.getElementById("container");
function render(media_type) {
	let btnContainer = document.createElement("div");
	// btnContainer.innerHTML = ``;
	btnContainer.setAttribute("id", "btnContainer");
	btnContainer.setAttribute("class", "btnContainer");
	btnContainer.innerHTML = " ";
	let btn = "";
	let pageLength = data[0].totalPage > 3 ? 3 : data[0].totalPage;
	for (let btnIndex = 1; btnIndex <= pageLength; btnIndex++) {
		btn += `<button class="btn" onclick=getPage(${btnIndex})>${btnIndex}</button>`;
	}
	btnContainer.innerHTML = `
        <button class="btn">«</button>
				${btn}
				<button class="btn">»</button>`;
	container.appendChild(btnContainer);
	for (let i = 0; i < data[0].totalData.length; i++) {
		let date = (
			data[0].totalData[i].release_date ||
			data[0].totalData[i].first_air_date
		).split("-")[0];
		let div = document.createElement("div");
		div.setAttribute("id", "box");
		div.setAttribute("class", "box");
		let a = "";
		data[0].totalData[i].genre_ids.forEach((res, x) => {
			let genre = genreIds.find((find) => find.id === res);
			// console.log(genre);
			if (genre !== undefined) {
				a += genre.name;
				if (x !== data[0].totalData[i].genre_ids.length - 1) {
					a += " | ";
				}
			}
		});

		div.innerHTML = `
	<a href="movieDetails.html#${
		data[0].totalData[i].id
	}#${media_type}"><img src="https://image.tmdb.org/t/p/w300/${
			data[0].totalData[i].poster_path
		}" alt="" /></a>
				<p>${
					data[0].totalData[i].original_title ||
					data[0].totalData[i].original_name
				}</p>
				<small id="small" class="small">
	            ${a}
	            </small>
				<p class="small">${date}</p>
	`;
		container.appendChild(div);
		// container.appendChild(btnContainer);
	}
}
function getPage(pageNo) {
	console.log("getPage", pageNo);
	callSearch(pageNo);
}
function callSearch(pageNo = 1) {
	console.log("callSearch", pageNo);
	let media_type = document.getElementById("selectfromsearch").value;
	let inputData = document.getElementById("inputfromsearch").value;
	let btnContainer = document.createElement("div");
	btnContainer.innerHTML = ``;
	data[0] !== undefined &&
		data[0].totalData.map((e) => {
			let box = document.getElementById("box");
			if (box !== null) container.removeChild(box);
		});
	data = [];
	fetchsearch(media_type, inputData, pageNo);
}
function fetchsearch(media_type, inputData, pageNo) {
	console.log("fetcheSearch", media_type, inputData, pageNo);
	let img = document.createElement("img");
	img.src = "./images/snipper.gif";
	img.setAttribute("id", "imgs");
	container.appendChild(img);
	fetch(
		`https://api.themoviedb.org/3/search/${media_type}?api_key=${API_KEY}&language=en-US&page=${pageNo}&query=${inputData}&include_adult=false`
	)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			data.push({
				totalData: [...res.results],
				totalPage: res.total_pages,
			});
		})
		.then(() => {
			console.log("data==>", data);
			document.getElementById("imgs").remove();
			// let inputData = document.getElementById("inputfromsearch");
			// inputData.value = "";
			render(media_type);
		});
}
