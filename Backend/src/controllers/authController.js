const User = require('../models/userModel');

exports.syncClerkUser = async (req, res) => {
  try {
    const { clerkId, email, fullName, imageUrl } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({ clerkId, email, fullName, imageUrl });
      await user.save();
    }

    return res.status(200).json({ message: 'User synced successfully', user });
  } catch (err) {
    console.error('Sync error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
