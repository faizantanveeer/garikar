const carFlash = document.getElementById('car-name-flash');
if (carFlash) {
	setTimeout(() => {
		carFlash.classList.add('hidden');
	}, 3000);
}

async function searchCars() {
	const query = document.getElementById('searchInput').value;
	const response = await fetch(`/car/search?q=${query}`);
	const results = await response.json();
	const searchResultsDiv = document.getElementById('searchResults');
	const searchButton = document.getElementById('searchButton');

	searchText.innerHTML =
		'<h1 class="font-semibold mt-5 mb-3 text-3xl">Search Results:</h1>';
	searchResultsDiv.innerHTML = results
		.map(
			(car) => `
				
				<div class="card bg-slate-600 w-auto rounded-lg cursor-pointer flex flex-col">
					<div class="w-60 h-52 rounded-tl-lg rounded-tr-lg">
						<img class="object-cover h-52 w-60 rounded-tl-lg rounded-tr-lg" onclick="window.location.href = '/car/getcar/${car._id}'" src="${car.image}" alt="${car.make} ${car.model}"/>
					</div>
					<div class="pl-4 pr-5 pt-2 pb-2 flex items-center justify-between">
						<div onclick="window.location.href = '/car/getcar/${car._id}'">
							<p class="text-white font-semibold">${car.make} ${car.model}</p>
							<p class="text-white font-semibold">${car.pricePerDay} PKR</p>
						</div>
						
					</div>
				</div>
			`
		)
		.join('');
}
