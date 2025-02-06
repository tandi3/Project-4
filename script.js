// Add Workout to Local Storage
document.getElementById('workout-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const workoutType = document.getElementById('workout-type').value;
    const duration = document.getElementById('duration').value;
    const date = document.getElementById('date').value;
  
    const workout = { workoutType, duration, date };
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  
    document.getElementById('success-message').style.display = 'block';
    setTimeout(() => {
      document.getElementById('success-message').style.display = 'none';
    }, 3000);
  
    document.getElementById('workout-form').reset();
  });
  
  // Display Workouts
  document.addEventListener('DOMContentLoaded', function () {
    const workoutList = document.getElementById('workout-list');
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  
    workouts.forEach((workout) => {
      const li = document.createElement('li');
      li.textContent = `${workout.workoutType} - ${workout.duration} mins on ${workout.date}`;
      workoutList.appendChild(li);
    });
  });
  
  // Filter Workouts
document.getElementById('filter-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const filterType = document.getElementById('filter-type').value.toLowerCase();
    const startDate = document.getElementById('filter-start-date').value;
    const endDate = document.getElementById('filter-end-date').value;
  
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const filteredWorkouts = workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
  
      const matchesType =
        !filterType || workout.workoutType.toLowerCase().includes(filterType);
      const matchesStartDate =
        !startDate || workoutDate >= new Date(startDate);
      const matchesEndDate = !endDate || workoutDate <= new Date(endDate);
  
      return matchesType && matchesStartDate && matchesEndDate;
    });
  
    displayWorkouts(filteredWorkouts);
  });
  
  // Display Workouts Function (Refactored)
  function displayWorkouts(workouts) {
    const workoutList = document.getElementById('workout-list');
    workoutList.innerHTML = ''; // Clear existing workouts
  
    if (workouts.length === 0) {
      workoutList.innerHTML = '<li>No workouts match the criteria.</li>';
      return;
    }
  
    workouts.forEach((workout) => {
      const li = document.createElement('li');
      li.textContent = `${workout.workoutType} - ${workout.duration} mins on ${workout.date}`;
      workoutList.appendChild(li);
    });
  }
  
  // Load and Display All Workouts on Page Load
  document.addEventListener('DOMContentLoaded', function () {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    displayWorkouts(workouts);
  });
  
  // Generate Chart Data
function generateChart() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  
    const workoutTypes = {};
    workouts.forEach((workout) => {
      workoutTypes[workout.workoutType] = (workoutTypes[workout.workoutType] || 0) + 1;
    });
  
    const labels = Object.keys(workoutTypes);
    const data = Object.values(workoutTypes);
  
    const ctx = document.getElementById('workoutChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar', // Change to 'pie' or 'line' if needed
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of Workouts',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  // Generate Chart on Page Load
  document.addEventListener('DOMContentLoaded', function () {
    generateChart();
  });
  
  // Handle User Registration
document.getElementById('signup-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
  
    // Save user credentials to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.username === username);
  
    if (userExists) {
      alert('Username already exists. Please choose another one.');
      return;
    }
  
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful! Please log in.');
    window.location.href = 'index.html';
  });
  
  // Handle User Login
  document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username && user.password === password);
  
    if (user) {
      localStorage.setItem('currentUser', username);
      alert('Login successful!');
      window.location.href = 'home.html'; // Redirect to the main app
    } else {
      alert('Invalid username or password. Please try again.');
    }
  });
  
  // Check for Logged-in User
  document.addEventListener('DOMContentLoaded', function () {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.href.includes('index.html')) {
      alert('Please log in to access the app.');
      window.location.href = 'index.html';
    }
  });
  
  document.getElementById('export-csv')?.addEventListener('click', function () {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    if (workouts.length === 0) {
      alert('No workouts to export.');
      return;
    }
  
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Workout Type,Duration (mins),Date\n'; // CSV headers
  
    workouts.forEach((workout) => {
      csvContent += `${workout.workoutType},${workout.duration},${workout.date}\n`;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'workouts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  document.getElementById('logout')?.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    alert('You have been logged out.');
    window.location.href = 'index.html';
  });
  
  // Responsive Navigation Toggle
document.querySelector('.hamburger')?.addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  });
  
  const currentPage = document.body.getAttribute('data-page');
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href').includes(currentPage)) {
    link.classList.add('active');
  }
});
// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset error messages
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;

    // Validate username
    if (usernameInput.value.trim().length < 3) {
      usernameError.textContent = "Username must be at least 3 characters long.";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
      passwordError.textContent =
        "Password must be at least 8 characters long, contain one uppercase letter, and one number.";
      isValid = false;
    }

    // Validate confirm password
    if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    }

    // If all inputs are valid, save data to localStorage
    if (isValid) {
      const userData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
      };

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Display success message
      successMessage.textContent = "Sign-up successful! Redirecting...";
      successMessage.style.color = "green";

      // Redirect after a delay
      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    }
  });
});

    

// Stats Page: Fetch User Data
if (document.body.dataset.page === "stats") {
  const statsList = document.querySelector("#stats-list");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    statsList.innerHTML = `
      <li>Name: ${user.name || "N/A"}</li>
      <li>Email: ${user.email}</li>
      <li>Workouts Completed: ${Math.floor(Math.random() * 50)}</li>
      <li>Total Calories Burned: ${Math.floor(Math.random() * 10000)} kcal</li>
    `;
  } else {
    statsList.innerHTML = `<li>No stats available. Please log in.</li>`;
  }
}

// Logout Functionality
const logoutButton = document.querySelector("#logout");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("You have been logged out.");
    window.location.href = "index.html";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // Validate Password
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length >= minLength && hasUpperCase && hasNumber) {
      return true;
    }
    return false;
  };

  // Login Form Validation
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      const password = document.getElementById("password").value;
      const passwordError = document.getElementById("password-error");

      if (!validatePassword(password)) {
        e.preventDefault();
        passwordError.textContent =
          "Password must be at least 8 characters, contain one uppercase letter, and one number.";
      } else {
        passwordError.textContent = "";
      }
    });
  }

  // Signup Form Validation
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      const password = document.getElementById("signup-password").value;
      const passwordError = document.getElementById("signup-password-error");

      if (!validatePassword(password)) {
        e.preventDefault();
        passwordError.textContent =
          "Password must be at least 8 characters, contain one uppercase letter, and one number.";
      } else {
        passwordError.textContent = "";
      }
    });
  }
});

