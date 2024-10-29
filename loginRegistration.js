document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    const button = document.getElementById('btn');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    if (loginForm && registerForm && button && loginBtn && registerBtn) {
        function register() {
            loginForm.style.left = '-400px';
            registerForm.style.left = '50px';
            button.style.left = '110px';
            registerBtn.classList.add('active');
            loginBtn.classList.remove('active');
        }

        function login() {
            loginForm.style.left = '50px';
            registerForm.style.left = '450px';
            button.style.left = '0px';
            loginBtn.classList.add('active');
            registerBtn.classList.remove('active');
        }

        loginBtn.addEventListener('click', login);
        registerBtn.addEventListener('click', register);
        
        loginBtn.classList.add('active');
    } else {
        console.error('One or more elements were not found');
    }
});
