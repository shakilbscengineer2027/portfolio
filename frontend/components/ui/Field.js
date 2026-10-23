// A label + input/textarea pair with an accessible error message.
export default function Field({ id, label, error, as = "input", required = true, ...props }) {
  const Control = as;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {!required && <span className="font-normal text-ink-soft"> (optional)</span>}
      </label>
      <Control
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className="form-input"
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
