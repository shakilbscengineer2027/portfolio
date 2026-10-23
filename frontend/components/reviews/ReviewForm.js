"use client";

import { useEffect, useRef, useState } from "react";
import { Star, X } from "lucide-react";
import { submitReview } from "@/lib/api";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";

const emptyForm = {
  clientName: "",
  clientEmail: "",
  projectName: "",
  reviewTitle: "",
  reviewMessage: "",
  rating: 0,
  website: "", // hidden spam trap; must stay empty
};

// Uses the native <dialog> element: it traps focus and closes with Escape.
export default function ReviewForm() {
  const dialogRef = useRef(null);
  const [values, setValues] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [feedback, setFeedback] = useState(null); // { type: "success" | "error", text }
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const closeOnBackdropClick = (event) => event.target === dialog && dialog.close();
    dialog.addEventListener("click", closeOnBackdropClick);
    return () => dialog.removeEventListener("click", closeOnBackdropClick);
  }, []);

  const openDialog = () => {
    setFeedback(null);
    setFieldErrors({});
    dialogRef.current.showModal();
  };
  const closeDialog = () => dialogRef.current.close();

  const handleChange = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));

  function validateOnClient() {
    const errors = {};
    if (values.clientName.trim().length < 2) errors.clientName = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.clientEmail.trim())) errors.clientEmail = "Enter a valid email address.";
    if (values.projectName.trim().length < 2) errors.projectName = "Enter the project name.";
    if (values.reviewMessage.trim().length < 20) errors.reviewMessage = "Write at least 20 characters.";
    if (values.rating < 1) errors.rating = "Choose a star rating.";
    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return; // prevents duplicate submissions

    const errors = validateOnClient();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setFeedback(null);
    try {
      const data = await submitReview(values);
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
    <>
      <Button variant="outline" onClick={openDialog}>
        Leave a Review
      </Button>

      <dialog ref={dialogRef} aria-labelledby="review-form-title" className="w-[min(92vw,34rem)] rounded-2xl border border-neon-blue/50 bg-navy-900 p-0 text-ink-main backdrop:bg-black/70">
        <form onSubmit={handleSubmit} noValidate className="max-h-[90vh] space-y-4 overflow-y-auto p-6">
          <div className="flex items-start justify-between">
            <h3 id="review-form-title" className="text-xl font-bold">
              Write a Review
            </h3>
            <button type="button" onClick={closeDialog} aria-label="Close review form" className="rounded-md p-1">
              <X />
            </button>
          </div>

          <Field id="clientName" label="Full name" value={values.clientName} onChange={handleChange} error={fieldErrors.clientName} maxLength={80} autoComplete="name" />
          <Field id="clientEmail" label="Email (kept private)" type="email" value={values.clientEmail} onChange={handleChange} error={fieldErrors.clientEmail} maxLength={120} autoComplete="email" />
          <Field id="projectName" label="Project name" value={values.projectName} onChange={handleChange} error={fieldErrors.projectName} maxLength={100} />

          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold">Rating</legend>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  aria-pressed={values.rating === value}
                  onClick={() => setValues((current) => ({ ...current, rating: value }))}
                  className="rounded p-1"
                >
                  <Star className={`h-8 w-8 ${value <= values.rating ? "fill-orange-400 text-orange-400" : "text-ink-soft/50"}`} aria-hidden="true" />
                </button>
              ))}
            </div>
            {fieldErrors.rating && <p className="mt-1 text-xs text-red-300">{fieldErrors.rating}</p>}
          </fieldset>

          <Field id="reviewTitle" label="Review title" required={false} value={values.reviewTitle} onChange={handleChange} error={fieldErrors.reviewTitle} maxLength={100} />
          <Field id="reviewMessage" label="Your review" as="textarea" rows={5} value={values.reviewMessage} onChange={handleChange} error={fieldErrors.reviewMessage} maxLength={1000} />

          {/* Hidden spam trap for bots. Real users never see or fill it. */}
          <div aria-hidden="true" className="absolute left-[-9999px]">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
          </div>

          {feedback && (
            <p role={feedback.type === "error" ? "alert" : "status"} className={`rounded-lg p-3 text-sm ${feedback.type === "success" ? "bg-green-500/15 text-green-300" : "bg-red-500/15 text-red-300"}`}>
              {feedback.text}
            </p>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple py-3 font-semibold disabled:opacity-60">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </dialog>
    </>
  );
}
