// Callback Function for login validation
function validateLogin(username, password, callback) {
    // Check hardcoded credentials
    if (username === "admin" && password === "12345") {
      callback(true); // Successful login
    } else {
      callback(false); // Failed login
    }
  }
  
  // Handle form submission for login
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
  
    // Get values from the input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Validate the login using a callback function
    validateLogin(username, password, function(isValid) {
      if (isValid) {
        // Redirect to the main page (todo list) if login is successful
        window.location.href = 'todo.html';
      } else {
        // Show an alert if the login fails
        alert("Invalid Credentials! Please try again.");
      }
    });
  });
  