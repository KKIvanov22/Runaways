document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-container form');
    const loginForm = document.querySelector('.log-in-container form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = registerForm.querySelector('input[placeholder="Enter your Name"]').value;
            const email = registerForm.querySelector('input[placeholder="Enter your Email"]').value;
            const password = registerForm.querySelector('input[placeholder="Enter your Password"]').value;
            const confirmPassword = registerForm.querySelector('input[placeholder="Confirm Password"]').value;

            if (password.length < 8) {
                alert('Password needs to be at least 8 characters long');
                return;
            }

            try {
                const registerData = JSON.stringify({ name, email, password, confirmPassword });

                const response = await fetch('http://localhost:5501/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: registerData,
                });

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                console.error('Error during registration:', error);
            }
        });
    } else {
        console.error('Register form not found');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            try {
                const email = loginForm.querySelector('input[placeholder="Email"]').value;
                const password = loginForm.querySelector('input[placeholder="Password"]').value;

                const loginData = JSON.stringify({ email, password });

                const response = await fetch('http://localhost:5501/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: loginData,
                    credentials: "include"
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message);

                    if (result.redirectUrl) {
                        window.location.href = result.redirectUrl;
                    }
                } else {
                    const errorResult = await response.json();
                    alert(errorResult.message);
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        });
    } else {
        console.error('Login form not found');
    }
});
