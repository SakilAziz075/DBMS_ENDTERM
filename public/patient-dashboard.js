// Handle logout functionality
document.getElementById('logout-btn').addEventListener('click', function(event) {
    event.preventDefault();
    // You can add logout logic here (e.g., clearing sessionStorage or localStorage)
    alert('You have logged out successfully!');
    // Redirect to login page after logout
    window.location.href = 'log-in-page.html';
  });
  