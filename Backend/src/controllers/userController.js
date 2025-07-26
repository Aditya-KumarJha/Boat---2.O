const User = require('../models/userModel');

exports.getCollection = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Missing email in query' });
  }

  try {
    const user = await User.findOne({ email }).populate('savedItems.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.savedItems);
  } catch (err) {
    console.error('Error fetching collection:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleCollection = async (req, res) => {
  try {
    const { email, productId } = req.body;

    if (!email || !productId) {
      return res.status(400).json({ error: 'Missing email or productId' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isSaved = user.savedItems.some(
      (item) => item.productId.toString() === productId
    );

    if (isSaved) {
      await User.updateOne(
        { email },
        { $pull: { savedItems: { productId: productId } } }
      );
    } else {
      user.savedItems.push({ productId });
      await user.save();
    }

    const updatedUser = await User.findOne({ email });
    res.status(200).json({ savedItems: updatedUser.savedItems });
  } catch (error) {
    console.error('🔴 toggleCollection error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
