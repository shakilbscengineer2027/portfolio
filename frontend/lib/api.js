import { API_URL } from "./constants";

// Small fetch wrapper. Throws an Error with a readable message (and field errors) on failure.
async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Could not reach the server. Please try again later.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong.");
    error.fieldErrors = data.errors || {};
    throw error;
  }
  return data;
}

export function fetchReviews() {
  return request("/api/reviews?limit=10", { cache: "no-store" });
}

export function submitReview(formValues) {
  return request("/api/reviews", { method: "POST", body: JSON.stringify(formValues) });
}

export function submitContactMessage(formValues) {
  return request("/api/contact", { method: "POST", body: JSON.stringify(formValues) });
}
