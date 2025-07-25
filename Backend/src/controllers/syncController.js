const User = require("../models/userModel");

exports.syncUser = async (req, res) => {
  const { externalId, name, email, profileImage } = req.body;

  if (!externalId || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findOneAndUpdate(
      {
        $or: [{ clerkId: externalId }, { email }],
      },
      {
        $set: {
          name,
          profileImage,
        },
        $setOnInsert: {
          clerkId: externalId,
          email,
          productCollection: [],
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({ message: "User synced", user });
  } catch (err) {
    console.error("Error syncing user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
