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
                <div class="activity-container assignment image-container"> 
                <div class="overlay">
                  <div class="homework-information">
                    <h3 class="user-name">Name:</h3>
                    <h3 class="user-email">Email:</h3>
                    <h3 class="user-role">Role:</h3>
                    <input type="text" class="input-user-name" name="name" value="${user.name}" required>
                    <input type="email" class="input-user-email" name="email" value="${user.email}" required>
                    <input type="text" id="roles" class="input-user-role" onfocus="showDropdown()" autocomplete="off" name="role" value="${user.role}" required>
                    <input type="hidden" class="input-user-id" name="id" value="${user._id}">
                    <button type="submit" class="btn-user-update">Update</button>
                    <div class="icon-delete"></div>
                 </div>
                </div>
              </div>
            `;

            usersContainer.appendChild(userForm);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

window.onload = fetchUsers;
