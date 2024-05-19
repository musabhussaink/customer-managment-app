require('dotenv').config();
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { connectDB } = require('../utils/mongoose');
const Customer = require('../models/customer');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
const currentDir = __dirname;
const parentDir = path.join(currentDir, '..');
app.use('/uploads', express.static(path.join(parentDir, 'uploads')));

// Connect to MongoDB database
connectDB();

// Configure Multer for file upload (adjust storage as needed)
const storage = multer.diskStorage({
  destination: './uploads/', // Change this to your desired upload folder
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Route for creating a customer (POST request)
app.post('/api/customers', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    // Create a new Customer object
    const newCustomer = new Customer({
      name,
      username,
      email,
      profilePicture,
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();

    res.status(201).json({ message: 'Customer created successfully!', customer: savedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating customer' });
  }
});

// GET endpoint for fetching customers (without sending actual files)
app.get('/api/customers', async (req, res) => {
  try {
    const { sortBy = 'name', sortOrder = 'asc' } = req.query; // Default sorting by name ascending

    const sortCriteria = {};
    sortCriteria[sortBy] = sortOrder === 'asc' ? 1 : -1; // Set sorting criteria

    const customers = await Customer.find().sort(sortCriteria);

    // Send only profile picture filenames, not the actual files
    const customerData = customers.map((customer) => ({
      _id: customer._id,
      name: customer.name,
      username: customer.username,
      email: customer.email,
      profilePicture: customer.profilePicture, // Send only the filename
    }));

    res.status(200).json({ customers: customerData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching customers' });
  }
});

// PUT /customers/:id
app.put('/api/customers/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const customerId = req.params.id;
    const updates = req.body;
    // Optional validation (adjust based on your schema)
    if (!updates.name || !updates.email) {
      return res.status(400).json({ message: `Missing required fields ${updates.name} ${updates.email} ${customerId}` });
    }
    const customer = await Customer.findByIdAndUpdate(customerId, updates, { new: true });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(204).json(customer); // Send back the updated customer object
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating customer' });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    // Remove the profile picture from the file system if it exists
    let profilePicturePath;
    if (customer.profilePicture) {
      profilePicturePath = path.join(parentDir, 'uploads', customer.profilePicture);
      if (fs.existsSync(profilePicturePath)) {
        fs.unlinkSync(profilePicturePath);
      }
    }

    await Customer.findByIdAndDelete(req.params.id);

    res.json({ msg: `Customer deleted` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});