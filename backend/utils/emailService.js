const nodemailer = require("nodemailer");

let transporter = null;

// Email is optional. It is "configured" only when every required variable is set.
function isEmailConfigured() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, ADMIN_NOTIFY_EMAIL } = process.env;
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && ADMIN_NOTIFY_EMAIL);
}

// Creates the SMTP connection once and reuses it.
function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = SSL, 587 = STARTTLS
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return transporter;
}

// Visitor text goes into an HTML email, so special characters must be escaped.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Removes line breaks so visitor text can never inject extra email headers.
function toSingleLine(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

// Sends one email. Never throws: returns true on success, false on any problem.
async function sendMail({ subject, text, html, replyTo }) {
  if (!isEmailConfigured()) return false;

  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_NOTIFY_EMAIL,
      replyTo,
      subject: toSingleLine(subject),
      text,
      html,
    });
    return true;
  } catch (error) {
    // Log only the reason, never the message content or credentials.
    console.error("Email notification failed:", error.message);
    return false;
  }
}

// Tells the admin about a new contact message. Reply goes straight to the visitor.
function sendContactNotification(contact) {
  const text = [
    "New contact message from your portfolio",
    "",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Subject: ${contact.subject}`,
    "",
    contact.message,
  ].join("\n");

  const html = `
    <h2>New contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(contact.subject)}</p>
    <p style="white-space:pre-wrap">${escapeHtml(contact.message)}</p>`;

  return sendMail({
    subject: `Portfolio message: ${contact.subject}`,
    text,
    html,
    replyTo: contact.email,
  });
}

// Tells the admin that a new review is waiting for approval.
function sendReviewNotification(review) {
  const text = [
    "A new review is waiting for your approval (status: pending).",
    "",
    `Client: ${review.clientName} (${review.clientEmail})`,
    `Project: ${review.projectName}`,
    `Rating: ${review.rating}/5`,
    "",
    review.reviewMessage,
    "",
    "Approve or reject it with the admin API (see README).",
  ].join("\n");

  const html = `
    <h2>New review pending approval</h2>
    <p><strong>Client:</strong> ${escapeHtml(review.clientName)} (${escapeHtml(review.clientEmail)})</p>
    <p><strong>Project:</strong> ${escapeHtml(review.projectName)}</p>
    <p><strong>Rating:</strong> ${escapeHtml(review.rating)}/5</p>
    <p style="white-space:pre-wrap">${escapeHtml(review.reviewMessage)}</p>
    <p>Approve or reject it with the admin API (see README).</p>`;

  return sendMail({ subject: `New review pending: ${review.projectName}`, text, html });
}

module.exports = { sendContactNotification, sendReviewNotification };
