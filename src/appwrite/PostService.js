import appwriteConfig from "../conf/appwriteConfig";
import { Client, Account, Databases, Storage, Query, ID } from "appwrite";

export class PostService {
  #client;
  #account;
  #storage;
  #databases;

  constructor() {
    // Initialize Appwrite client and services
    this.#client = new Client()
      .setEndpoint(appwriteConfig.appwriteUrl)
      .setProject(appwriteConfig.appwriteProjectId);

    this.#account = new Account(this.#client);
    this.#storage = new Storage(this.#client);
    this.#databases = new Databases(this.#client);
  }

  /**
   * Create a new post in the database.
   * @param {Object} postDetails - Details of the post.
   * @returns {Promise} A promise that resolves to the created post.
   */
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.#databases.createDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        slug || ID.unique(), // Using ID.unique() if slug is not provided
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("PostService::createPost::error", error);
      throw error;
    }
  }

  /**
   * Update an existing post in the database.
   * @param {string} slug - Slug of the post to update.
   * @param {Object} updatedDetails - Updated details of the post.
   * @returns {Promise} A promise that resolves to the updated post.
   */
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.#databases.updateDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.error("PostService::updatePost::error", error);
      throw error;
    }
  }

  /**
   * Delete a post from the database.
   * @param {string} slug - Slug of the post to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if deletion is successful.
   */
  async deletePost(slug) {
    try {
      await this.#databases.deleteDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("PostService::deletePost::error", error);
      return false;
    }
  }

  /**
   * Retrieve details of a post from the database.
   * @param {string} slug - Slug of the post to retrieve.
   * @returns {Promise} A promise that resolves to the post details.
   */
  async getPost(slug) {
    try {
      return await this.#databases.getDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("PostService::getPost::error", error);
      return false;
    }
  }

  /**
   * List posts based on specified queries.
   * @param {Array} queries - An array of queries to filter posts.
   * @returns {Promise} A promise that resolves to a list of posts.
   */
  async listPosts(
    queries = [
      Query.equal("status", "active"),
      Query.limit(25),
      Query.offset(25),
    ]
  ) {
    try {
      return await this.#databases.listDocuments(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("PostService::listPosts::error", error);
    }
  }

  /**
   * Upload a file to the storage.
   * @param {File} file - The file to upload.
   * @returns {Promise} A promise that resolves to the uploaded file details.
   */
  async uploadFile(file) {
    try {
      return await this.#storage?.createFile(
        appwriteConfig.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("StorageService::uploadFile::error", error);
      return false;
    }
  }

  /**
   * Delete a file from the storage.
   * @param {string} fileId - ID of the file to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if deletion is successful.
   */
  async deleteFile(fileId) {
    try {
      await this.#storage.deleteFile(appwriteConfig.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("StorageService::deleteFile::error", error);
      return false;
    }
  }

  /**
   * Get a preview of a file from the storage.
   * @param {string} fileId - ID of the file.
   * @returns {Promise} A promise that resolves to the file preview.
   */
  async getFilePreview(fileId) {
    try {
      return this.#storage.getFilePreview(
        appwriteConfig.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("StorageService::getFilePreview::error", error);
      return false;
    }
  }
}

// Instantiate and export a single instance of the service
const postService = new PostService();
export default postService;
