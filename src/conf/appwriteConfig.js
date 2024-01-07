/*
   It's always best practice to keep environment variables as strings; otherwise, they might be treated as numbers, especially if the values consist only of numbers. Additionally, sometimes environment variables don't load properly, leading to app crashes. In a production-grade app, it's advisable to access all environment variables from a file. This way, there's a guarantee that you always receive a string value.
*/

// Configuration for Appwrite API (Backend as a Service)
const appwriteConfig = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default appwriteConfig;
