document.addEventListener('DOMContentLoaded', () => {
	const filterButtons = document.querySelectorAll('.filter-make');
	const carList = document.querySelector('#carList'); // Adjust selector to match your HTML structure

	filterButtons.forEach((button) => {
		button.addEventListener('click', async (event) => {
			event.preventDefault();

			const make = button.getAttribute('data-make');
			const queryParam = make === 'All' ? '' : `?make=${make}`; // Handle "All" case

			try {
				const response = await fetch(`/car/bookcar${queryParam}`);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const html = await response.text();

				// Update the car list with the new HTML
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = html;
				const newCarList = tempDiv.querySelector('#carList').innerHTML;
				carList.innerHTML = newCarList;
			} catch (error) {
				console.error('Error:', error);
			}
		});
	});
});
