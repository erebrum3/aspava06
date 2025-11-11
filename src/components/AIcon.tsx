export default function AIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`a-cut ${className}`}
      aria-hidden="true"
    >
      <path
        d="M50 0 L100 100 H80 L65 65 H35 L20 100 H0 Z"
        fill="currentColor"
      />
    </svg>
  );
}
