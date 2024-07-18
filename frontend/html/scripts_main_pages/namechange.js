document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5501/user-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'  // This ensures cookies are sent with the request
        });
        if (response.ok) {
            const userInfo = await response.json();
            document.getElementById('user-name').textContent = userInfo.name;
        } else {
            console.error('Failed to fetch user info');
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
});