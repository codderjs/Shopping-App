// Client-side JavaScript

// Function to display alert messages
function showAlert(message, type) {
  alert(message);
}

// Function to display message and redirect after 3 seconds
function showMessageAndRedirect(message, redirectUrl) {
  alert(message);
  setTimeout(function() {
      window.location.href = redirectUrl;
  }, 3000);
}

// Event listener for signup form submission
document.getElementById("signupForm").addEventListener("submit", myFunction);

async function myFunction() {
  const formData = new FormData(this);
  try {
      const response = await fetch("/signUp", {
          method: "POST",
          body: formData
      });
      const data = await response.json();
      if (response.ok) {
          showMessageAndRedirect(data.message, "/index");
      } else {
          showAlert(data.message, "error");
      }
  } catch (error) {
      showAlert("An error occurred. Please try again later.", "error");
  }
};