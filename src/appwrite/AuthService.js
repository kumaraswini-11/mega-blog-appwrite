/* 
Vendor Logging:
Vendor logging involves recording and monitoring activities, events, or logs generated by external vendors or third-party services within a software system. This practice helps in collecting and analyzing log data provided by vendors to gain insights into the behavior and performance of their services.

Interactions with Appwrite:
In your React project, interactions with the Appwrite backend include tasks such as authentication, data storage, and other backend services.

Logging Vendor Activities:
Appwrite, as the vendor or third-party service, may provide logs or log-related functionalities that capture events, errors, or other relevant information on their end.

Multiple Appwrite Services:
Appwrite offers various services, including database-related services, authentication services, and upload/download services.

Vendor Login Concept:
The "Vendor login" concept abstracts the authentication service. Implementing this concept allows for the potential replacement or switching of the authentication service (e.g., from Appwrite to another provider) without significantly impacting the overall application. This design ensures flexibility and ease of adaptation to changes in the authentication system.

Services Abstraction:
The introduction of "services" involves exporting methods to the frontend. These services abstract the data source, making it transparent to the frontend where the data is coming from—whether it's from Appwrite, Firebase, or your own backend.

Reducing Load on the Application:
By organizing your application in a modular and decoupled manner, you've minimized the impact on the rest of the application when replacing Appwrite's authentication with another provider. This modularity contributes to a more maintainable and scalable system.

Flexibility in Data Sources:
The abstraction of services allows your application to be less dependent on a specific backend service. If, in the future, you decide to switch to a different backend provider for data storage or authentication, the frontend code remains relatively unchanged.
*/

import appwriteConfig from "../conf/appwriteConfig";
import { Client, Account, ID } from "appwrite";

// AuthService class for handling authentication related tasks
class AuthService {
  // Private field for the Appwrite client & Appwrite account
  #client;
  #account;

  // Constructor for AuthService class
  constructor() {
    // Initialize Appwrite client
    this.#client = new Client()
      .setEndpoint(appwriteConfig.appwriteUrl)
      .setProject(appwriteConfig.appwriteProjectId);

    // Initialize Appwrite account
    this.#account = new Account(this.#client);
  }

  // Method to create a new user account
  async createAccount({ email = "", password = "", name = "" }) {
    try {
      // Create a new user account using Appwrite API
      const userAccount = await this.#account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // If account creation is successful, proceed with login
      if (userAccount) {
        return await this.login({ email, password });
      }

      // Return user account details
      return userAccount;
    } catch (error) {
      // Log and throw any errors that occur during account creation
      console.error("AuthService::createAccount::error", error);
      throw error;
    }
  }

  // Method to log in a user
  async login({ email, password }) {
    try {
      // Create an email session for the user using Appwrite API
      return await this.#account.createEmailSession(email, password);
    } catch (error) {
      // Log and throw any errors that occur during login
      console.error("AuthService::login::error", error);
      throw error;
    }
  }

  // Method to get the current user's details
  async getCurrentUser() {
    try {
      // Retrieve current user details using Appwrite API
      return await this.#account.get();
    } catch (error) {
      if (error instanceof AppwriteException) {
        // Handle Appwrite-specific exception (e.g., log the error, show a user-friendly message)
        console.error("AppwriteException:", error);
      } else {
        // Handle other types of errors
        console.error("AuthService::getCurrentUser::error", error);
      }

      // Throw or handle the error based on your application's requirements
      throw error;
    }
    // } catch (error) {
    //   // Log and throw any errors that occur during retrieval of user details
    //   console.error("AuthService::getCurrentUser::error", error);
    //   throw error;
    //   }
  }

  // Method to log out the current user
  async logout() {
    try {
      // Delete all sessions for the current user using Appwrite API
      await this.#account.deleteSessions();

      // Delete this session for the current user using Appwrite API
      // return await this.#account.deleteSession("current");
    } catch (error) {
      // Log and throw any errors that occur during logout
      console.error("AuthService::logout::error", error);
      throw error;
    }
  }
}

// Create a single instance of AuthService
const authService = new AuthService();

// Export the instance of AuthService for use in other parts of the application
export default authService;