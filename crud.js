// Function to create and save a user
const createUser = () => {
    event.preventDefault();  // Prevent the page from refreshing

    // Get input values
    const name = document.getElementById('nameId').value.trim();
    const email = document.getElementById('usernameId').value.trim();
    const password = document.getElementById('pwId').value.trim();

    // Check if any fields are empty
    if (!name || !email || !password) {
        alert("Please enter all data.");
        return;  // Stop the function if any field is empty
    }

    // Get existing users or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || []; 


    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("User with this email already exists.");  // Alert if user already exists
        return;  // Stop the function to avoid adding a duplicate user
    }

    // Create a user object and add to the array
    const userData = { name, email, password };
    users.push(userData);

    // Save the updated array to localStorage, json.stringify used to convert json string formate
    localStorage.setItem('users', JSON.stringify(users));

    // Clear input fields
    document.getElementById('nameId').value = '';  
    document.getElementById('usernameId').value = '';  
    document.getElementById('pwId').value = '';  

    alert("User saved Successfully.");
    displayUsers();  // Update the displayed user list
};

// Function to retrieve and display saved user data based on entered email
const retrieveUser = () => {
    const checkEmail = prompt("Please Enter Email:");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const savedUser = users.find(user => user.email === checkEmail);

    if (savedUser) {
        alert(`Name: ${savedUser.name}\nUsername: ${savedUser.email}\nPassword: ${savedUser.password}`);
    } else {
        alert("No user found!");
    }
};

// Function to update existing user
const updateData = () => {
    const checkEmail = prompt("Enter the email of the user you want to update:");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === checkEmail);

    if (userIndex !== -1) {
        const newData = prompt("Enter new details in the format: Name, Email, Password");
        const [newName, newEmail, newPassword] = newData.split(',');

        // Update user data, if new data entered then update otherwise old data remained
        users[userIndex].name = newName || users[userIndex].name;
        users[userIndex].email = newEmail || users[userIndex].email;
        users[userIndex].password = newPassword || users[userIndex].password;

        // Save updated data
        localStorage.setItem('users', JSON.stringify(users));
        alert("User updated successfully.");
        displayUsers();  // Update the displayed user list
    } else {
        alert("No user found with the provided email.");
    }
};

// Function to delete a user
const deleteData = () => {
    const checkEmail = prompt("Enter the email of the user you want to delete:");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === checkEmail);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);  // Remove the user
        localStorage.setItem('users', JSON.stringify(users));
        alert("User deleted successfully.");
        displayUsers();  // Update the displayed user list
    } else {
        alert("No user found with that email.");
    }
};

// Function to display saved users
const displayUsers = () => {
    const userListContainer = document.getElementById('userList');
    userListContainer.innerHTML = '';  // Clear existing content
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        userListContainer.innerHTML = '<p>No users found.</p>';
        return;
    }

    const userList = document.createElement('ul');
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${user.name}, Email: ${user.email}`;
        userList.appendChild(listItem);
    });
    userListContainer.appendChild(userList);
};

// Call displayUsers when the page loads
window.onload = displayUsers;
