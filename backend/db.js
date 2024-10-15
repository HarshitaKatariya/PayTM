const mongoose = require('mongoose');

// MongoDB connection (remove deprecated options)
mongoose.connect('mongodb+srv://HK15:paytm123@paytm1.bmcpd.mongodb.net/')
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit the process with failure code (1) if MongoDB connection fails
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
    lowercase: true
  },
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100
  }
});

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});



// Create User model
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports = {
  User,
  Account
};
