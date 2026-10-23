const ContactMessage = require("../models/ContactMessage");
const { sendContactNotification } = require("../utils/emailService");

// Saves the message first. Success is reported only after MongoDB confirms the save.
// The admin email is a bonus: if it fails, the message is still safely stored.
async function createContactMessage(req, res, next) {
  try {
    const savedMessage = await ContactMessage.create(req.cleanBody);

    const emailSent = await sendContactNotification(savedMessage);
    if (emailSent) {
      await ContactMessage.updateOne({ _id: savedMessage._id }, { notificationSent: true });
    }

    res.status(201).json({ message: "Thanks! Your message was sent." });
  } catch (error) {
    next(error);
  }
}

module.exports = { createContactMessage };
