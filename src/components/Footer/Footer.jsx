import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  // Array of sections with titles and corresponding links
  const sections = [
    {
      title: "Company",
      links: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
    },
    {
      title: "Support",
      links: ["Account", "Help", "Contact Us", "Customer Support"],
    },
    {
      title: "Legals",
      links: ["Terms & Conditions", "Privacy Policy", "Licensing"],
    },
  ];

  return (
    <footer className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
      <div className="container mx-auto px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Section for the logo and copyright information */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                {/* Rendering the Logo component */}
                <Logo width="100px" />
              </div>
              <div>
                {/* Copyright information */}
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Mapping through each section to render corresponding links */}
          {sections.map((section, index) => (
            <div key={index} className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                {/* Section title */}
                <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                  {section.title}
                </h3>
                {/* List of links within the section */}
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-4">
                      {/* Link to a specific route based on the link text */}
                      <Link
                        to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
