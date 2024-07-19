async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:5501/users', {
            method: 'GET',
            credentials: 'include' 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();

        if (!Array.isArray(users)) {
            throw new Error('Invalid response format');
        }

        const usersContainer = document.getElementById('users-container');

        users.forEach(user => {
            const userForm = document.createElement('form');
            userForm.method = 'POST';
            userForm.action = `http://localhost:5501/update-user/${user._id}`;
            
            userForm.innerHTML = `
                <input type="text" name="name" value="${user.name}" required>
                <input type="email" name="email" value="${user.email}" required>
                <input type="text" name="role" value="${user.role}" required>
                <input type="hidden" name="id" value="${user._id}">
                <button type="submit">Update</button>
            `;

            usersContainer.appendChild(userForm);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

window.onload = fetchUsers;
