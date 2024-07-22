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
        const teachersContainer = document.querySelector('.js-card-container');

        users.forEach(user => {
            // Create user form for the main users container
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
                            <h3 class="user-class">Class:</h3>
                            <input type="text" class="input-user-name" name="name" value="${user.name}" required>
                            <input type="email" class="input-user-email" name="email" value="${user.email}" required>
                            <input type="text" class="input-user-class" name="class" value="${user.class || 'no_class'}" required>
                            <select name="role" class="input-user-role" required>
                                <option value="student" ${user.role === 'student' ? 'selected' : ''}>Student</option>
                                <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
                                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                            </select>
                            <input type="hidden" class="input-user-id" name="id" value="${user._id}">
                            <button type="submit" class="btn-user-update">Update</button>
                            <div class="icon-delete" data-user-id="${user._id}"></div>
                        </div>
                    </div>
                </div>
            `;

            userForm.addEventListener('submit', async function(event) {
                event.preventDefault(); 

                const formData = new FormData(userForm);
                const data = {};
                formData.forEach((value, key) => (data[key] = value));

                try {
                    const updateResponse = await fetch(userForm.action, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (!updateResponse.ok) {
                        throw new Error(`HTTP error! Status: ${updateResponse.status}`);
                    }

                    const result = await updateResponse.json();
                    console.log('Update successful:', result);

                    alert(result.message);

                } catch (updateError) {
                    console.error('Error updating user:', updateError);
                    alert('Error updating user');
                }
            });

            const deleteIcon = userForm.querySelector('.icon-delete');
            deleteIcon.addEventListener('click', async function() {
                const userId = deleteIcon.getAttribute('data-user-id');

                try {
                    const deleteResponse = await fetch(`http://localhost:5501/delete-user/${userId}`, {
                        method: 'DELETE',
                        credentials: 'include'
                    });

                    if (!deleteResponse.ok) {
                        throw new Error(`HTTP error! Status: ${deleteResponse.status}`);
                    }

                    const result = await deleteResponse.json();
                    console.log('Delete successful:', result);

                    alert(result.message);

                    userForm.remove();
                } catch (deleteError) {
                    console.error('Error deleting user:', deleteError);
                    alert('Error deleting user');
                }
            });

            usersContainer.appendChild(userForm);

            // Create card for teachers container if user is a teacher
            if (user.role === 'teacher') {
                const teacherCard = document.createElement('div');
                teacherCard.classList.add('card');
                teacherCard.innerHTML = `
                    <div class="card-user-info">
                        <img src="images_main_pages/user icon.png" />
                        <h2>${user.name}</h2>
                    </div>
                `;
                teachersContainer.appendChild(teacherCard);
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

window.onload = fetchUsers;
