"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/api";
import Field from "@/components/ui/Field";

const emptyForm = { name: "", email: "", subject: "", message: "", website: "" };

export default function ContactForm() {
  const [values, setValues] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));

  function validateOnClient() {
    const errors = {};
    if (values.name.trim().length < 2) errors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
    if (values.subject.trim().length < 3) errors.subject = "Enter a subject.";
    if (values.message.trim().length < 10) errors.message = "Write at least 10 characters.";
    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const errors = validateOnClient();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setFeedback(null);
    try {
      const data = await submitContactMessage(values);
      setFeedback({ type: "success", text: data.message });
      setValues(emptyForm);
    } catch (error) {
      setFieldErrors(error.fieldErrors || {});
      setFeedback({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="neon-card space-y-4 border-neon-pink/40 p-6 hover:translate-y-0">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" placeholder="John Carter" value={values.name} onChange={handleChange} error={fieldErrors.name} maxLength={80} autoComplete="name" />
        <Field id="email" label="Email" type="email" placeholder="example@email.com" value={values.email} onChange={handleChange} error={fieldErrors.email} maxLength={120} autoComplete="email" />
      </div>
      <Field id="subject" label="Subject" value={values.subject} onChange={handleChange} error={fieldErrors.subject} maxLength={120} />
      <Field id="message" label="Message" as="textarea" rows={5} placeholder="Please type your message here..." value={values.message} onChange={handleChange} error={fieldErrors.message} maxLength={2000} />

      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
      </div>

      {feedback && (
        <p role={feedback.type === "error" ? "alert" : "status"} className={`rounded-lg p-3 text-sm ${feedback.type === "success" ? "bg-green-500/15 text-green-300" : "bg-red-500/15 text-red-300"}`}>
          {feedback.text}
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-gradient-to-r from-neon-blue to-red-500 py-3 font-semibold disabled:opacity-60">
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
