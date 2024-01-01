import React, { useId, forwardRef } from "react";

// Functional component named "Input" using forwardRef to handle ref forwarding
const Input = forwardRef(function Input(
  // Destructuring props, providing default values where needed
  { label, type = "text", className = "", ...props },
  ref
) {
  // Generating a unique ID using the useId hook
  const generatedId = useId();

  return (
    <div className="w-full">
      {/* Rendering a label if the 'label' prop is provided */}
      {label && (
        <label htmlFor={generatedId} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      {/* Input element with specified styling and attributes */}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref} // Forwarding the ref to the input element
        id={generatedId}
        aria-labelledby={label ? generatedId : null}
        {...props} // Rest of the provided props
      />
    </div>
  );
});

export default Input;
