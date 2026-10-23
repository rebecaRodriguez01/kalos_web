import { Link } from "react-router";
import "../../styles/components/ArrowLink.css";

function Arrow() {
  return (
    <svg viewBox="0 0 28 10" fill="none" aria-hidden="true">
      <path d="M0 5h26M22 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function ArrowLink({
  to,
  href,
  children,
  className = "",
  ...props
}) {
  const classes = `arrow-link ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        <span>{children}</span>
        <Arrow />
      </a>
    );
  }

  return (
    <Link to={to} className={classes} {...props}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}