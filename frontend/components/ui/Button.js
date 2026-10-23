// Renders a link when "href" is given, otherwise a button.
// A link without a real URL is shown as a disabled button.
const baseStyle =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200";
const variants = {
  primary: "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:brightness-110",
  outline: "border border-neon-blue text-neon-cyan hover:bg-neon-blue/10",
};

export default function Button({ href, variant = "primary", external = false, disabled = false, className = "", children, ...props }) {
  const style = `${baseStyle} ${variants[variant]} ${className}`;

  if (href !== undefined && (disabled || !href)) {
    return (
      <span aria-disabled="true" title="Not available yet" className={`${style} cursor-not-allowed opacity-40`}>
        {children}
      </span>
    );
  }
  if (href) {
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={href} className={style} {...externalProps} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" disabled={disabled} className={`${style} disabled:cursor-not-allowed disabled:opacity-50`} {...props}>
      {children}
    </button>
  );
}
