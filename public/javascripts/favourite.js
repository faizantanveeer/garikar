document.addEventListener('DOMContentLoaded', () => {
    const addToFavoriteButtons = document.querySelectorAll('.add-to-favorites');
    const audio = new Audio('../media/favbell.mp3');

    addToFavoriteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            const carId = button.getAttribute('data-car-id');
            const isFavorite = button.getAttribute('data-in-favorites') === 'true';
            const icon = button.querySelector('i');
            const flashMessage = document.getElementById('flash-message');

            // Play the sound immediately on click
            audio.play();

            try {
                const response = await fetch('/fav/addfav', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ carId: carId, isFavorite: isFavorite })
                });

                const result = await response.json();

                if (response.redirected) {
                    // If the response indicates a redirection, navigate to the login page
                    window.location.href = response.url;
                    return; // Exit the function to prevent further processing
                }

                if (response.ok) {
                    // Update the favorite status and button icon
                    button.setAttribute('data-in-favorites', !isFavorite);
                    icon.classList.toggle('fa-heart', isFavorite); // Toggle heart icon
                    icon.classList.toggle('fa-minus-circle', !isFavorite); // Toggle minus icon

                    flashMessage.textContent = result.message;
                    flashMessage.classList.remove('bg-red-500'); // Remove error background
                    flashMessage.classList.add('bg-green-500'); // Add success background
                } else {
                    flashMessage.textContent = result.message || 'Failed to toggle favorite status';
                    flashMessage.classList.remove('bg-green-500'); // Remove success background
                    flashMessage.classList.add('bg-red-500'); // Add error background
                }
            } catch (error) {
                console.error('Error:', error);
                flashMessage.textContent = 'An error occurred while toggling the favorite status';
                flashMessage.classList.remove('bg-green-500'); // Remove success background
                flashMessage.classList.add('bg-red-500'); // Add error background
            }

            flashMessage.classList.remove('hidden');
            setTimeout(() => {
                flashMessage.classList.add('hidden');
            }, 2000); // Hide the message after 3 seconds
        });
    });
});
