import React from "react";

// Functional component named "Container" that takes a prop "children"
function Container({ children }) {
  // className="w-full max-w-7xl mx-auto px-4"
  return <div className="container mx-auto px-4">{children}</div>;
}

export default Container;
