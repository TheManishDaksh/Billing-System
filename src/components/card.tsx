//@ts-ignore
export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-xl border bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

//@ts-ignore
export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
