document.addEventListener('DOMContentLoaded', () => {
    const addToFavoriteButtons = document.querySelectorAll('.add-to-favorites');
    const audio = new Audio('../media/favbell.mp3'); 

    addToFavoriteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            const carId = button.getAttribute('data-car-id');
            const isFavorite = button.getAttribute('data-in-favorites') === 'true';
            const icon = button.querySelector('i');

            // Play the sound immediately on click
            audio.play();

            icon.classList.remove('text-white');
            icon.classList.add('text-green-500');
            
            try {
                const response = await fetch('/car/addfav', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ carId: carId, isFavorite: isFavorite })
                });

                const result = await response.json();

                if (response.ok) {
                    // Update the favorite status and button color
                    button.setAttribute('data-in-favorites', !isFavorite);
                    icon.classList.toggle('text-green-500', !isFavorite);
                    icon.classList.toggle('text-white', isFavorite);

                    if (isFavorite) {
                        alert('Car removed from favorites successfully');
                    } else {
                        alert('Car added to favorites successfully');
                    }
                } else {
                    alert(result.message || 'Failed to toggle favorite status');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while toggling the favorite status');
            }
        });
    });
});
