

async function logout() {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to log out');
        }

        alert('Logged out successfully');
        window.location.href = '/login'; // Redirect to login page
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Failed to log out. Please try again.');
    }
}


document.getElementById('logout').addEventListener('click', logout);

