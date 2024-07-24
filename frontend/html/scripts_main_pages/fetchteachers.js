async function fetchTeachers() {
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

        const teachersContainer = document.querySelector('.js-card-container');

        users.forEach(user => {
            // Create card for teachers container if user is a teacher
            if (user.role === 'teacher') {
                const teacherCard = document.createElement('div');
                teacherCard.classList.add('card');
                teacherCard.innerHTML = `
                    <div class="card-user-info">
                        <img src="images_main_pages/user icon.png" />
                        <h2>${user.name} <span>(${user.class})</span></h2>
                    </div>
                `;
                teachersContainer.appendChild(teacherCard);
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

window.onload = fetchTeachers;
