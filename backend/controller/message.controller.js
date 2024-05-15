// Import Conversation and Message models
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// Controller function to send a message
export const sendMessage = async (req, res) => {
  try {
    // Extract message content, receiverId, and senderId from request
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find existing conversation or create a new one
    let conversation = await Conversation.findOne({
      participants: {
        $all: [receiverId, senderId],
      },
    });

    // Check if conversation exists, if not create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message with senderId, receiverId, and message content
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add the new message to the conversation's messages array
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //socket io functionality to add here

    // await conversation.save();
    // await newMessage.save();

    //this will run in parallel and is better and faster approach that the above one commented
    await Promise.all([conversation.save(), newMessage.save()]);

    // Send a response with the new message
    res.status(200).json(newMessage);
  } catch (error) {
    // Handle any errors that occur during message sending
    console.log("error in sendMessage controller: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [userToChatId, senderId],
      },
    }).populate("messages"); // POPULATE will get messages instead of the id reference

    if(!conversation) {
      return res.status(404).json([]);
    }

    const messages = conversation.messages

    res.status(200).json(messages);

  } catch (error) {
    console.log("error in sendMessage controller: ", error);
    res.status(500).json({ message: error.message });
  }
};
