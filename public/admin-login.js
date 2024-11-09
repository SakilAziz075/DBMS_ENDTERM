const loginForm = document.getElementById('admin-login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId, password: password })
        });

        const data = await response.json();
        
        if (response.status === 200) {
            alert(data.message);
            window.location.href = '/admin-dashboard.html'; // Redirect to admin dashboard or main admin page
        } else {
            alert(data.message); // Display error message
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Failed to log in');
    }
});
