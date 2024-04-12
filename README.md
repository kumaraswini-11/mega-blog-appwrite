# Blog App

<!-- ![Blog App Logo](actual-link-to-logo.png) -->

## Overview
Welcome to the Blog App! Here, users effortlessly create, manage, and share their blogs. Dive into a seamless experience where you can sign up, log in, craft new posts, and fine-tune existing ones. Engage with others by commenting on their blogs.

This app harnesses the power of React for frontend magic, Redux for streamlined state handling, and Tailwind CSS for sleek aesthetics. At the backend, it's powered by Appwrite, providing a seamless open-source solution. Expect nothing less than a dynamic and responsive user journey.

- **Deployed Application**: [Blog App](https://voluble-zuccutto-fdde0b.netlify.app/)

## Features

- **User Authentication:** A secure registration and login system ensures only authenticated users can create and manage their blogs.
- **User Profiles:** Users can create profiles, providing personal information and display pictures.
- **Blog Creation and Editing:** Easily create new blog posts, edit existing ones, and delete your own posts.
- **Rich Text Editor:** Integrated with a powerful editor for formatting blog content, including text styling, image insertion, and more.
- **Image Upload:** Users can upload images to accompany their blog posts.
- **Responsive Design:** Utilizing a mobile-first approach ensures compatibility across various devices.

## Usage

1. **Create an Appwrite Account**: 
   - Visit [Appwrite](https://appwrite.io/) and sign up for an account if you haven't already.
   
2. **Configure Appwrite Settings**:
   - After logging in to your Appwrite account, create a new project for your Blog App.
   - Set up Appwrite collections and permissions according to your application's needs. Ensure you have collections for users, blog posts, comments, etc., and set appropriate permissions for read, write, and update operations.
   - Note down your Appwrite project ID and API keys as you'll need them for the backend configuration. Refer to the `.env.sample` file for the required environment variables.
   
3. **Clone the repository**: `git clone https://github.com/kumaraswini-11/mega-blog-appwrite.git`

4. **Install dependencies**: `npm install`

5. **Start the development server**: `npm start`

6. **Access the application**: Open your browser and navigate to `http://localhost:3000`

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or feature requests, feel free to open an issue or submit a pull request. 

Happy Coding!
