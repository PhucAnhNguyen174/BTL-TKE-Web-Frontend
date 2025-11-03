// ===================================
// Authentication Utility - AutoTrade
// ===================================
// Purpose: Centralized user authentication and session management using localStorage
// This file provides helper functions for login, logout, and user management

// ===================================
// User Management Functions
// ===================================

/**
 * Get all registered users from localStorage
 * @returns {Array} Array of user objects
 */
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]');
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return [];
  }
}

/**
 * Save users array to localStorage
 * @param {Array} users - Array of user objects
 */
function saveUsers(users) {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
}

/**
 * Get currently logged in user
 * @returns {Object|null} Current user object or null
 */
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  } catch (error) {
    console.error('Error reading current user from localStorage:', error);
    return null;
  }
}

/**
 * Set current logged in user
 * @param {Object} user - User object to set as current
 */
function setCurrentUser(user) {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting current user in localStorage:', error);
  }
}

/**
 * Log out current user
 */
function logout() {
  localStorage.removeItem('currentUser');
}

/**
 * Check if user is currently logged in
 * @returns {boolean} True if user is logged in
 */
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// ===================================
// Authentication Functions
// ===================================

/**
 * Register a new user
 * @param {string} fullname - User's full name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} Result object with success status and message
 */
function registerUser(fullname, email, password) {
  const users = getUsers();
  
  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();
  
  // Check if email already exists
  const existingUser = users.find(user => 
    user.email.toLowerCase() === normalizedEmail
  );
  
  if (existingUser) {
    console.log('❌ Registration failed: Email already exists');
    console.log('Existing user:', existingUser);
    return {
      success: false,
      message: 'Email already registered! This account was created on ' + new Date(existingUser.createdAt).toLocaleDateString() + '. Please login instead.',
      existingUser: {
        email: existingUser.email,
        fullname: existingUser.fullname,
        createdAt: existingUser.createdAt
      }
    };
  }
  
  // Validate input
  if (!fullname || fullname.trim().length < 2) {
    return {
      success: false,
      message: 'Full name must be at least 2 characters!'
    };
  }
  
  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters!'
    };
  }
  
  // Create new user (trim password again here for safety)
  const newUser = {
    id: Date.now(),
    fullname: fullname.trim(),
    email: normalizedEmail,
    password: (String(password) || '').trim(), // Note: In production, passwords should be hashed
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  console.log('✅ User registered successfully:', newUser.email);
  
  return {
    success: true,
    message: 'Registration successful!',
    user: newUser
  };
}

/**
 * Validate user login credentials
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object|null} User object if valid, null otherwise
 */
function validateLogin(email, password) {
  const users = getUsers();
  
  // Debug logging
  // Normalize inputs to avoid mismatches due to stray whitespace
  email = (email || '').trim();
  password = (password || '').trim();

  console.log('=== Login Validation Debug ===');
  console.log('Input email:', email);
  console.log('Input password:', password);
  console.log('Total users:', users.length);
  
  const foundUser = users.find(user => {
  const emailMatch = user.email.toLowerCase() === email.toLowerCase();
    const passwordMatch = user.password === password;
    
    console.log(`Checking user: ${user.email}`);
    console.log(`  Email match: ${emailMatch} (${user.email.toLowerCase()} vs ${email.toLowerCase()})`);
    console.log(`  Password match: ${passwordMatch} (${user.password} vs ${password})`);
    
    return emailMatch && passwordMatch;
  });
  
  console.log('Found user:', foundUser);
  console.log('===========================');
  
  return foundUser || null;
}

/**
 * Login user and create session
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} Result object with success status and message
 */
function loginUser(email, password) {
  const user = validateLogin(email, password);
  
  if (!user) {
    return {
      success: false,
      message: 'Incorrect email or password.'
    };
  }
  
  // Create user session
  setCurrentUser({
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    loginAt: new Date().toISOString()
  });
  
  return {
    success: true,
    message: 'Login successful!',
    user: getCurrentUser()
  };
}

// ===================================
// User Profile Functions
// ===================================

/**
 * Get user profile by ID
 * @param {number} userId - User ID
 * @returns {Object|null} User object without password
 */
function getUserProfile(userId) {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;
  
  // Return user without password
  const { password, ...userProfile } = user;
  return userProfile;
}

/**
 * Update user profile
 * @param {number} userId - User ID
 * @param {Object} updates - Object with fields to update
 * @returns {Object} Result object with success status
 */
function updateUserProfile(userId, updates) {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return {
      success: false,
      message: 'User not found'
    };
  }
  
  // Update allowed fields only
  const allowedFields = ['fullname', 'email'];
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      users[userIndex][field] = updates[field];
    }
  });
  
  users[userIndex].updatedAt = new Date().toISOString();
  saveUsers(users);
  
  // Update current user if it's the same user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser({
      ...currentUser,
      fullname: users[userIndex].fullname,
      email: users[userIndex].email
    });
  }
  
  return {
    success: true,
    message: 'Profile updated successfully'
  };
}

// ===================================
// Export functions for use in other scripts
// ===================================
// Note: These are global functions available to all scripts
// ===================================
// Login Page Script - AutoTrade
// ===================================
// Purpose: Client-side validation, remember me functionality, and authentication using localStorage
// Note: auth.js must be loaded before this script

// ===================================
// Toast Notification System
// ===================================
function createToastContainer() {
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(type, title, message, duration = 5000) {
  createToastContainer();
  const container = document.querySelector('.toast-container');
  
  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${icons[type]}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close">
      <i class="fa-solid fa-times"></i>
    </button>
    <div class="toast-progress"></div>
  `;
  
  container.appendChild(toast);
  
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('toast-hiding');
    setTimeout(() => toast.remove(), 300);
  });
  
  setTimeout(() => {
    toast.classList.add('toast-hiding');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===================================
// DOM Elements - Login Page
// ===================================
// Only run login page code if we're on the login page
if (document.getElementById('loginForm')) {
  const loginForm = document.getElementById('loginForm');
  const emailEl = document.getElementById('email');
  const passEl = document.getElementById('password');
  const alertEl = document.getElementById('alert');
  const loginBtn = document.getElementById('loginBtn');
  const googleBtn = document.getElementById('googleBtn');
  const facebookBtn = document.getElementById('facebookBtn');
  const xBtn = document.getElementById('xBtn');
  const telegramBtn = document.getElementById('telegramBtn');
  const togglePassword = document.getElementById('togglePassword');
  const rememberMeCheckbox = document.getElementById('rememberMe');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const successOverlay = document.getElementById('successOverlay');
  const postLoginRedirect = '../../../main/main.html#landingAnimation'; // Landing page after successful auth

  // ===================================
  // Toggle Password Visibility
  // ===================================
  if (togglePassword && passEl) {
    console.log('Login: Toggle password button found:', togglePassword);
    console.log('Login: Password input found:', passEl);
    
    togglePassword.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent form submission
      e.stopPropagation(); // Stop event bubbling
      
      console.log('Login: Toggle password clicked!');
      const type = passEl.type === 'password' ? 'text' : 'password';
      passEl.type = type;
      console.log('Login: Password type changed to:', type);
      
      const icon = togglePassword.querySelector('i');
      
      // Replace classes properly
      if (type === 'text') {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  } else {
    console.warn('Login: Toggle password elements not found:', {
      togglePassword: !!togglePassword,
      passEl: !!passEl
    });
  }

// ===================================
// Load Remembered Email & Check if Already Logged In
// ===================================
window.addEventListener('DOMContentLoaded', () => {
  // Check if user is already logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    // If a session exists, show a non-blocking notice with actions instead of auto-redirecting.
    console.log('User already logged in:', currentUser);
    showAlert(`You're already logged in as ${currentUser.fullname} (${currentUser.email}).`, 'success');

    // Create action buttons (Continue / Logout) and append to alert
    const actionContainer = document.createElement('div');
    actionContainer.style.marginTop = '10px';
    actionContainer.style.display = 'flex';
    actionContainer.style.gap = '8px';
    actionContainer.style.justifyContent = 'center';

  const continueLink = document.createElement('a');
  continueLink.href = postLoginRedirect;
    continueLink.className = 'btn btn-sm btn-primary';
    continueLink.textContent = 'Continue to site';

    const logoutButton = document.createElement('button');
    logoutButton.type = 'button';
    logoutButton.className = 'btn btn-sm btn-outline-light';
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', () => {
      logout();
      // Reload to clear UI state
      location.reload();
    });

    actionContainer.appendChild(continueLink);
    actionContainer.appendChild(logoutButton);
    if (alertEl) alertEl.appendChild(actionContainer);
    // Do NOT return here so the user can still interact with the form if they want to log in as a different user
  }

  // Load remembered email
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    emailEl.value = rememberedEmail;
    if (rememberMeCheckbox) {
      rememberMeCheckbox.checked = true;
    }
    updateBtnState();
  }
});

// ===================================
// Helper Functions
// ===================================
function showAlert(text, type='success') {
  alertEl.textContent = text;
  alertEl.classList.remove('hidden','success','error');
  alertEl.classList.add(type);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function updateBtnState() {
  const e = emailEl.value.trim();
  const p = passEl.value.trim();
  loginBtn.disabled = !(e && p);
}

function shakeCard() {
  const card = document.querySelector('.card');
  if (card) {
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }
}

// ===================================
// Event Listeners
// ===================================
emailEl.addEventListener('input', updateBtnState);
passEl.addEventListener('input', updateBtnState);

// ===================================
// Form Submission
// ===================================
loginForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  const e = emailEl.value.trim().toLowerCase();
  const p = passEl.value.trim();

  console.log('=== Login Form Submit ===');
  console.log('Email input:', e);
  console.log('Password input:', p);
  console.log('Users in storage:', getUsers());
  
  if (!e || !p) {
    showAlert('Please enter email and password!', 'error');
    shakeCard();
    return;
  }
  
  if (!isValidEmail(e)) {
    showAlert('Invalid email format!', 'error');
    shakeCard();
    return;
  }
  
  // Validate login credentials from localStorage using auth.js functions
  const loginResult = loginUser(e, p);
  console.log('Login result:', loginResult);
  
  if (loginResult.success) {
    // Login successful
    if (rememberMeCheckbox && rememberMeCheckbox.checked) {
      localStorage.setItem('rememberedEmail', e);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    showAlert(loginResult.message, 'success');
    
    if (loadingOverlay) {
      document.body.classList.add('no-scroll'); // Lock body scroll
      loadingOverlay.classList.remove('hidden');
    }
    
    setTimeout(() => {
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }
      if (successOverlay) {
        successOverlay.classList.remove('hidden');
      }
      
      setTimeout(() => {
        document.body.classList.remove('no-scroll'); // Unlock before redirect
  window.location.href = postLoginRedirect;
      }, 1200);
    }, 800);
  } else {
    showAlert(loginResult.message, 'error');
    shakeCard();
  }
});

// ===================================
// Social Login Buttons
// ===================================
if (googleBtn) {
  googleBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action
    showAlert('Google login feature is under development...', 'success');
  });
}

if (facebookBtn) {
  facebookBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action
    showAlert('Facebook login feature is under development...', 'success');
  });
}

if (xBtn) {
  xBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action
    showAlert('X (Twitter) login feature is under development...', 'success');
  });
}

if (telegramBtn) {
  telegramBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action
    showAlert('Telegram login feature is under development...', 'success');
  });
}

// ===================================
// Page Animations
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  if (card) {
    requestAnimationFrame(() => {
      card.classList.add('revealed');
    });
  }

  const bg = document.querySelector('.page-bg');
  if (bg) {
    const onMove = (x, y) => {
      const rx = (x / window.innerWidth - 0.5) * 8;
      const ry = (y / window.innerHeight - 0.5) * 8;
      bg.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    };
    
    window.addEventListener('mousemove', (e) => {
      onMove(e.clientX, e.clientY);
    });
    
    window.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      if (!t) return;
      onMove(t.clientX, t.clientY);
    }, { passive: true });
  }
});

} // End of login page code

// ===================================
// Forgot password page script
// Purpose: Validate email and simulate sending reset instructions.
// ===================================

// ===================================
// Toast Notification System
// ===================================
function createToastContainer() {
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(type, title, message, duration = 5000) {
  createToastContainer();
  const container = document.querySelector('.toast-container');
  
  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${icons[type]}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close">
      <i class="fa-solid fa-times"></i>
    </button>
    <div class="toast-progress"></div>
  `;
  
  container.appendChild(toast);
  
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('toast-hiding');
    setTimeout(() => toast.remove(), 300);
  });
  
  setTimeout(() => {
    toast.classList.add('toast-hiding');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Only run forgot page code if we're on the forgot page
if (document.getElementById('forgotForm')) {
  const form    = document.getElementById('forgotForm');
  const emailEl = document.getElementById('email');
  const alertEl = document.getElementById('alert');
  const sendBtn = document.getElementById('sendBtn');
  const emailValidation = document.getElementById('emailValidation');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const successOverlay = document.getElementById('successOverlay');

  function showAlert(text, type='success') {
    alertEl.textContent = text;
    alertEl.classList.remove('hidden','success','error');
    alertEl.classList.add(type);
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

function updateBtnState() {
  sendBtn.disabled = !emailEl.value.trim();
}

emailEl.addEventListener('input', () => {
  updateBtnState();
  
  // Email validation with visual feedback
  const value = emailEl.value.trim();
  if (value === '') {
    emailValidation.classList.remove('valid', 'invalid');
  } else if (isValidEmail(value)) {
    emailValidation.classList.remove('invalid');
    emailValidation.classList.add('valid');
  } else {
    emailValidation.classList.remove('valid');
    emailValidation.classList.add('invalid');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const eVal = emailEl.value.trim().toLowerCase();
  if (!eVal) { showAlert('Please enter your email!', 'error'); shake(); return; }
  if (!isValidEmail(eVal)) { showAlert('Invalid email format!', 'error'); shake(); return; }

  // Show loading overlay and lock scroll
  document.body.classList.add('no-scroll');
  loadingOverlay.classList.remove('hidden');
  
  setTimeout(() => {
    // Hide loading and show success
    loadingOverlay.classList.add('hidden');
    successOverlay.classList.remove('hidden');
    
    // Reset form
    emailEl.value = '';
    emailValidation.classList.remove('valid', 'invalid');
    sendBtn.disabled = true;
    
    // Hide success after delay
    setTimeout(() => {
      successOverlay.classList.add('hidden');
      document.body.classList.remove('no-scroll'); // Unlock scroll
      showAlert('✅ Password reset instructions sent!', 'success');
    }, 1200);
  }, 800);
});

function shake() {
  const card = document.querySelector('.card');
  if (!card) return;
  card.classList.remove('shake');
  void card.offsetWidth;
  card.classList.add('shake');
}

// Reveal and subtle parallax

document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  if (card) requestAnimationFrame(() => card.classList.add('revealed'));
  const bg = document.querySelector('.page-bg');
  if (bg) {
    const onMove = (x, y) => {
      const rx = (x / window.innerWidth - 0.5) * 8;
      const ry = (y / window.innerHeight - 0.5) * 8;
      bg.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    };
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => { const t = e.touches[0]; if (!t) return; onMove(t.clientX, t.clientY); }, { passive: true });
  }
});

} // End of forgot page code

// ===================================
// Register page script
// Purpose: Client-side validation for required fields, email format, and password match; save to localStorage
// Note: auth.js must be loaded before this script
// ===================================

// ===================================
// Toast Notification System
// ===================================
function createToastContainer() {
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(type, title, message, duration = 5000) {
  createToastContainer();
  const container = document.querySelector('.toast-container');
  
  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${icons[type]}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close">
      <i class="fa-solid fa-times"></i>
    </button>
    <div class="toast-progress"></div>
  `;
  
  container.appendChild(toast);
  
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('toast-hiding');
    setTimeout(() => toast.remove(), 300);
  });
  
  setTimeout(() => {
    toast.classList.add('toast-hiding');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Only run register page code if we're on the register page
if (document.getElementById('registerForm')) {
  const form = document.getElementById('registerForm');
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const errorMsg = document.getElementById('error-msg');
  const loadingMsg = document.getElementById('loading-msg');
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const emailValidation = document.getElementById('emailValidation');
  const passwordStrengthEl = document.getElementById('passwordStrength');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
const loadingOverlay = document.getElementById('loadingOverlay');
const successOverlay = document.getElementById('successOverlay');

// Toggle password visibility for both password fields
if (togglePassword && password) {
  console.log('Register: Toggle password button found');
  
  togglePassword.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent any default action
    e.stopPropagation();
    
    console.log('Register: Password toggle clicked');
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    const icon = togglePassword.querySelector('i');
    
    // Properly replace icon classes
    if (type === 'text') {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
} else {
  console.warn('Register: Toggle password not found', {
    togglePassword: !!togglePassword,
    password: !!password
  });
}

if (toggleConfirmPassword && confirmPassword) {
  console.log('Register: Toggle confirm password button found');
  
  toggleConfirmPassword.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent any default action
    e.stopPropagation();
    
    console.log('Register: Confirm password toggle clicked');
    const type = confirmPassword.type === 'password' ? 'text' : 'password';
    confirmPassword.type = type;
    const icon = toggleConfirmPassword.querySelector('i');
    
    // Properly replace icon classes
    if (type === 'text') {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
} else {
  console.warn('Register: Toggle confirm password not found', {
    toggleConfirmPassword: !!toggleConfirmPassword,
    confirmPassword: !!confirmPassword
  });
}

// Email validation with visual feedback
function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

email.addEventListener('input', () => {
  const value = email.value.trim();
  if (value === '') {
    emailValidation.classList.remove('valid', 'invalid');
  } else if (validateEmail(value)) {
    emailValidation.classList.remove('invalid');
    emailValidation.classList.add('valid');
  } else {
    emailValidation.classList.remove('valid');
    emailValidation.classList.add('invalid');
  }
});

// Password strength indicator
function checkPasswordStrength(pass) {
  if (pass.length === 0) return null;
  if (pass.length < 6) return 'weak';
  
  let strength = 0;
  // Check length
  if (pass.length >= 8) strength++;
  // Check for numbers
  if (/\d/.test(pass)) strength++;
  // Check for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;
  // Check for uppercase and lowercase
  if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
  
  if (strength <= 1) return 'weak';
  if (strength === 2 || strength === 3) return 'medium';
  return 'strong';
}

password.addEventListener('input', () => {
  const value = password.value;
  const strength = checkPasswordStrength(value);
  
  if (!strength) {
    passwordStrengthEl.classList.remove('visible');
    strengthBar.className = 'strength-bar-fill';
    strengthText.textContent = '';
    strengthText.className = 'strength-text';
    return;
  }
  
  passwordStrengthEl.classList.add('visible');
  strengthBar.className = `strength-bar-fill ${strength}`;
  
  if (strength === 'weak') {
    strengthText.textContent = 'Weak - Should be longer and more complex';
    strengthText.className = 'strength-text weak';
  } else if (strength === 'medium') {
    strengthText.textContent = 'Medium - Pretty good!';
    strengthText.className = 'strength-text medium';
  } else {
    strengthText.textContent = 'Strong - Secure password!';
    strengthText.className = 'strength-text strong';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMsg.textContent = "";
  loadingMsg.textContent = "";

  // ✅ Check all fields are filled
  if (!fullname.value.trim() || !email.value.trim() || !password.value.trim() || !confirmPassword.value.trim()) {
    errorMsg.textContent = "❌ Please fill in all fields!";
    const card = document.querySelector('.register-card');
    if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
    return;
  }

  // ✅ Check email format
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.value)) {
    errorMsg.textContent = "❌ Invalid email!";
    const card = document.querySelector('.register-card');
    if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
    return;
  }

  // ✅ Check passwords match
  if (password.value !== confirmPassword.value) {
    errorMsg.textContent = "❌ Passwords do not match!";
    const card = document.querySelector('.register-card');
    if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
    return;
  }

  // ✅ Check minimum password length
  if (password.value.length < 6) {
    errorMsg.textContent = "❌ Password must be at least 6 characters!";
    const card = document.querySelector('.register-card');
    if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
    return;
  }

  // ✅ Register user using auth.js functions
  // Trim password to avoid accidental leading/trailing spaces being stored
  const registerResult = registerUser(fullname.value.trim(), email.value.trim(), password.value.trim());
  
  if (!registerResult.success) {
    // Show detailed error message
    if (registerResult.message.includes('already registered')) {
      errorMsg.innerHTML = "❌ <strong>Email already registered!</strong><br>This email is already in use. Please <a href='./login.html' style='color: #fff; text-decoration: underline;'>login</a> or use a different email.";
    } else {
      errorMsg.textContent = "❌ " + registerResult.message;
    }
    const card = document.querySelector('.register-card');
    if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
    return;
  }

  // ⏳ Show loading overlay and lock scroll
  document.body.classList.add('no-scroll');
  loadingOverlay.classList.remove('hidden');
  
  setTimeout(() => {
    // Hide loading and show success
    loadingOverlay.classList.add('hidden');
    successOverlay.classList.remove('hidden');
    
    // Reset form and redirect
    form.reset();
    emailValidation.classList.remove('valid', 'invalid');
    passwordStrengthEl.classList.remove('visible');
    
    setTimeout(() => {
  document.body.classList.remove('no-scroll'); // Unlock before redirect
  window.location.href = "./login.html";
    }, 1200);
  }, 800);
});

// Reveal card and subtle parallax similar to login
document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.register-card');
  if (card) { requestAnimationFrame(() => card.classList.add('revealed')); }

  const bg = document.querySelector('.page-bg');
  if (bg) {
    const onMove = (x, y) => {
      const rx = (x / window.innerWidth - 0.5) * 8;
      const ry = (y / window.innerHeight - 0.5) * 8;
      bg.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    };
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => { const t = e.touches[0]; if (!t) return; onMove(t.clientX, t.clientY); }, { passive: true });
  }
});
// auth-effects.js
// Small visual enhancements for auth pages: parallax on mouse move + slow float animation
(function () {
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  document.addEventListener('DOMContentLoaded', function () {
    const bg = document.querySelector('.page-bg');
    const logo = document.querySelector('.brand-logo');
    const card = document.querySelector('.card');

    // gentle float animation (pure CSS would also work; this keeps JS control available)
    if (bg) {
      // subtle slow scale + translate to make register background visible as well
      bg.animate(
        [
          { transform: 'translate3d(0,0,0) scale(1)' },
          { transform: 'translate3d(-2%, 1%, 0) scale(1.02)' },
          { transform: 'translate3d(0,0,0) scale(1)' }
        ],
        { duration: 14000, iterations: Infinity, easing: 'ease-in-out' }
      );
    }

    // mouse-based parallax
    let lastX = 0, lastY = 0, vx = 0, vy = 0;
    function onMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 18; // stronger horizontal movement
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      lastX = x; lastY = y;
      if (bg) {
        bg.style.transform = `translate3d(${x * 0.6}px, ${y * 0.6}px, 0)`;
      }
      if (logo) {
        logo.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
      }
      if (card) {
        card.style.transform = `translate3d(${x * 0.03}px, ${y * 0.03}px, 0)`;
      }
    }

    // touch support: map touchmove to mousemove handler
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', function (ev) {
      const t = ev.touches && ev.touches[0];
      if (!t) return;
      onMove({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: true });

    // subtle idle return to center when mouse leaves
    window.addEventListener('mouseleave', function () {
      if (bg) bg.style.transform = '';
      if (logo) logo.style.transform = '';
      if (card) card.style.transform = '';
    });
  });
})();

} // End of register page code
