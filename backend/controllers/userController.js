const Users = require('../models/users');

// Create a new user
exports.createUser = async (req, res) => {
  const newUser = new Users();
  
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userRole = req.body.role;
  const userName = req.body.username; 
  newUser.email = userEmail;
  newUser.password = userPassword;
  newUser.role = userRole;
   newUser.username = userName;
  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log("Error creating user:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    console.log("the users are", users);
    res.json({
      users:users,
      statistics:{
        total:users.length
      }
    });
       
  } catch (error) {
    console.log("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
  const id = req.params.userId;
  
  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("error while reading user of id ", id);
    return res.status(500).json({ error: "Server error" });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const id = req.params.userId;
  
  try {
    const user = await Users.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update user fields if they exist in the request
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.role ) user.role = req.body.role;
    
    await user.save();
    res.json(user);
  } catch (error) {
    console.log("Error updating user of id ", id);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const id = req.params.userId;
  
  try {
    const user = await Users.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    console.log("error while deleting user of id ", id);
    return res.status(500).json({ error: error.message });
  }
};
