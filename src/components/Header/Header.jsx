import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutButton } from "../";

function Header() {
  // Extracting authentication status from the Redux store using useSelector
  const authStatus = useSelector((state) => state.auth.status);

  // Access to the navigation object to programmatically navigate between routes
  const navigate = useNavigate();

  // Array of navigation items with names, slugs (routes), and active status
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        {/* Site title */}
        <h1 className="text-xl font-bold text-white">
          Mega Blog Project with Appwrite Open Source.
        </h1>
        {/* Navigation section with logo, navigation items, and logout button */}
        <nav className="flex">
          {/* Logo with a link to the home page */}
          <Link to="/" className="mr-4">
            <Logo width="70px" />
          </Link>
          {/* List of navigation items */}
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              // Rendering active navigation items as buttons with routing functionality
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* Rendering LogoutButton component if the user is authenticated */}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
