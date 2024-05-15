import User from "../models/user.model.js";


export const getUsersForSidebar = async (req, res) => {
  try {

    const loggedInUserid = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserid } }).select("-password");

    res.status(200).json(filteredUsers);
    

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in getUsersForSidebar controller", error);
    
  }
}