//@ts-ignore
export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`
        inline-flex items-center justify-center 
        px-4 py-2 rounded-md font-semibold 
        transition-all duration-200 
        bg-gray-800 text-white hover:bg-gray-900
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
