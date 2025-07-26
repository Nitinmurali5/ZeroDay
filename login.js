// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Password toggle functionality
    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            passwordToggle.textContent = '👁️';
        }
    });

    // Load remembered credentials
    if (localStorage.getItem('rememberMe') === 'true') {
        document.getElementById('username').value = localStorage.getItem('rememberedUsername') || '';
        document.getElementById('userRole').value = localStorage.getItem('rememberedRole') || '';
        rememberMeCheckbox.checked = true;
    }

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const userRole = document.getElementById('userRole').value;
        const rememberMe = rememberMeCheckbox.checked;

        // Validation
        if (!userRole) {
            showMessage('Please select your role.', 'error');
            return;
        }

        if (!username) {
            showMessage('Please enter your username.', 'error');
            return;
        }

        if (username.length < 3 || username.length > 20) {
            showMessage('Username must be between 3-20 characters.', 'error');
            return;
        }

        if (!/^[A-Za-z0-9_]+$/.test(username)) {
            showMessage('Username can only contain letters, numbers, and underscores.', 'error');
            return;
        }

        if (!password) {
            showMessage('Please enter your password.', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long.', 'error');
            return;
        }

        // Show loading state
        loginButton.disabled = true;
        document.querySelector('.login-text').style.display = 'none';
        document.querySelector('.login-spinner').style.display = 'inline';

        // Simulate login process
        setTimeout(() => {
            // Handle remember me
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('rememberedUsername', username);
                localStorage.setItem('rememberedRole', userRole);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('rememberedUsername');
                localStorage.removeItem('rememberedRole');
            }

            // Store login session
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            localStorage.setItem('userRole', userRole);

            showMessage(`Welcome ${username}! Login successful.`, 'success');

            // Redirect based on role after showing success message
            setTimeout(() => {
                if (userRole === 'admin') {
                    window.location.href = 'index.html'; // Announcements for admin
                } else {
                    window.location.href = 'complaints.html'; // Complaints for students
                }
            }, 1000);
        }, 1500);
    });

    // Forgot password functionality
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset functionality would be implemented here.\n\nFor demo purposes:\n- Any username (3-20 chars)\n- Any password (6+ chars)');
    });

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.padding = '15px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.marginBottom = '20px';
        messageDiv.style.fontWeight = 'bold';

        if (type === 'success') {
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else if (type === 'error') {
            messageDiv.style.background = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }

        // Insert at the top of the login form
        const loginForm = document.querySelector('.login-form');
        loginForm.insertBefore(messageDiv, loginForm.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});