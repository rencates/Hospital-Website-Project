document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const warningContainer = document.getElementById('warning-container');
    const adminContainer = document.getElementById('admin-container');
    const logoutBtn = document.getElementById('logout-btn');
    const errorMessage = document.getElementById('error-message');

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const adminUsername = 'admin';
    const adminPassword = 'password';

    let loginAttempts = 0;
    let isLocked = false;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (isLocked) {
            errorMessage.textContent = 'Too many failed attempts. Please wait 10 seconds.';
            return;
        }

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === adminUsername && password === adminPassword) {
            localStorage.setItem('loggedin', 'true');
            loginContainer.style.display = 'none';
            adminContainer.style.display = 'block';
            errorMessage.textContent = '';
        } else {
            loginAttempts++;
            if (loginAttempts >= 3) {
                isLocked = true;
                loginContainer.style.display = 'none';
                warningContainer.style.display = 'block';
                setTimeout(() => {
                    isLocked = false;
                    loginAttempts = 0;
                    warningContainer.style.display = 'none';
                    loginContainer.style.display = 'block';
                    errorMessage.textContent = '';
                }, 10000); // 10 seconds
            } else {
                errorMessage.textContent = `Incorrect username or password. Attempts remaining: ${3 - loginAttempts}`;
            }
        }
    });

    if (localStorage.getItem('loggedin') === 'true') {
        loginContainer.style.display = 'none';
        adminContainer.style.display = 'block';
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedin');
        loginContainer.style.display = 'block';
        adminContainer.style.display = 'none';
    });

    window.showSection = function(sectionId) {
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    };

    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});