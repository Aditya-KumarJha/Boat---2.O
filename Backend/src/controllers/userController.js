const User = require('../models/userModel');

exports.getCollection = async (req, res) => {
  const clerkId = req.auth.userId;

  try {
    const user = await User.findOne({ clerkId }).populate('collection.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.collection);
  } catch (err) {
    console.error('Error fetching collection:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCollection = async (req, res) => {
  const clerkId = req.auth.userId;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    let user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyExists = user.collection.some(
      (item) => item.productId.toString() === productId
    );

    if (alreadyExists) {
      return res.status(409).json({ message: 'Already added to collection' });
    }

    user.collection.push({ productId });
    await user.save();

    res.status(201).json({ message: 'Added to collection' });
  } catch (err) {
    console.error('Error adding to collection:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
