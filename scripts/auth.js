document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-container form');
    const loginForm = document.querySelector('.log-in-container form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            try {
                const name = registerForm.querySelector('input[placeholder="Enter your Name"]').value;
                const email = registerForm.querySelector('input[placeholder="Enter your Email"]').value;
                const password = registerForm.querySelector('input[placeholder="Enter your Password"]').value;
                const confirmPassword = registerForm.querySelector('input[placeholder="Confirm Password"]').value;

                const registerData = JSON.stringify({ name, email, password, confirmPassword });

                console.log('Register data:', registerData); // Debug log

                const response = await fetch('http://localhost:5501/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: registerData,
                });

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                console.error('Error during registration:', error); // Debug log
            }
        });
    } else {
        console.error('Register form not found'); // Debug log
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            try {
                const email = loginForm.querySelector('input[placeholder="Email"]').value;
                const password = loginForm.querySelector('input[placeholder="Password"]').value;

                const loginData = JSON.stringify({ email, password });

                console.log('Login data:', loginData); // Debug log

                const response = await fetch('http://localhost:5501/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: loginData,
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message);
                    if (result.redirectUrl) {
                        window.location.href = result.redirectUrl; // Redirect to the URL provided by the server
                    }
                } else {
                    const errorResult = await response.json();
                    alert(errorResult.message);
                }
            } catch (error) {
                console.error('Error during login:', error); // Debug log
            }
        });
    } else {
        console.error('Login form not found'); // Debug log
    }
});
