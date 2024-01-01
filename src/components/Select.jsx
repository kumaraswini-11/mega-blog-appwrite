import React, { useId } from "react";

function Select(
  // Destructuring props with default values where needed
  { label, options = [], className = "", ...props },
  ref
) {
  // Generating a unique ID using the useId hook
  // const generatedId = `select-${Math.random().toString(36).substring(7)}`;
  const generatedId = useId();

  return (
    <div className="mb-4">
      {/* Rendering a label if the 'label' prop is provided */}
      {label && (
        <label htmlFor={generatedId} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      {/* Select element with specified styling and attributes */}
      <select
        className={`px-3 py-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        id={generatedId}
        ref={ref} // Forwarding the ref to the select element
      >
        {/* Mapping through options to create option elements */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// Exporting the Select component with ref forwarding
export default React.forwardRef(Select);
