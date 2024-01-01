import appwriteConfig from "../conf/appwriteConfig";
import { Client, Account, Databases, Storage, Query, ID } from "appwrite";

class PostService {
  #client;
  #account;
  #storage;
  #databases;

  constructor() {
    // Initialize Appwrite client
    this.#client = new Client()
      .setEndpoint(appwriteConfig.appwriteUrl)
      .setProject(appwriteConfig.appwriteProjectId);

    // Initialize Appwrite Account, Storage, Database
    this.#account = new Account(this.#client);
    this.#storage = new Storage(this.#client);
    this.#databases = new Databases(this.#client);
  }

  /**
   * Creates a new post.
   *
   * @param {Object} postDetails - Post details.
   * @returns {Promise} Promise that resolves with the created post.
   */
  async createPost(postDetails) {
    try {
      return await this.#databases.createDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        postDetails.slug,
        {
          title: postDetails.title,
          content: postDetails.content,
          featuredImage: postDetails.featuredImage,
          status: postDetails.status,
          userId: postDetails.userId,
        }
      );
    } catch (error) {
      console.error("PostService::createPost::error", error);
      throw error;
    }
  }

  /**
   * Updates an existing post.
   *
   * @param {string} slug - Post slug.
   * @param {Object} updatedDetails - Updated post details.
   * @returns {Promise} Promise that resolves with the updated post.
   */
  async updatePost(slug, updatedDetails) {
    try {
      return await this.#databases.updateDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        slug,
        updatedDetails
      );
    } catch (error) {
      console.error("PostService::updatePost::error", error);
      throw error;
    }
  }

  /**
   * Deletes a post.
   *
   * @param {string} slug - Post slug.
   * @returns {Promise} Promise that resolves to true if the deletion is successful, false otherwise.
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
   * Retrieves a post by slug.
   *
   * @param {string} slug - Post slug.
   * @returns {Promise} Promise that resolves with the retrieved post.
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
   * Lists posts based on provided queries.
   *
   * @param {Array} queries - Array of queries.
   * @returns {Promise} Promise that resolves with the list of posts.
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
      throw error;
    }
  }

  /**
   * Uploads a file.
   *
   * @param {Object} file - File object to be uploaded.
   * @returns {Promise} Promise that resolves with the uploaded file details.
   */
  async uploadFile(file) {
    try {
      return await this.#storage?.createFile(
        appwriteConfig.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("PostService::uploadFile::error", error);
      throw error;
    }
  }

  /**
   * Deletes a file.
   *
   * @param {string} fileId - ID of the file to be deleted.
   * @returns {Promise} Promise that resolves to true if the deletion is successful, false otherwise.
   */
  async deleteFile(fileId) {
    try {
      await this.#storage.deleteFile(appwriteConfig.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("PostService::deleteFile::error", error);
      return false;
    }
  }

  /**
   * Retrieves a file preview.
   *
   * @param {string} fileId - ID of the file.
   * @returns {Promise} Promise that resolves with the file preview.
   */
  async getFilePreview(fileId) {
    try {
      return this.#storage.getFilePreview(
        appwriteConfig.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("PostService::getFilePreview::error", error);
      return false;
    }
  }
}

// Creating an instance of the PostService
const postService = new PostService();
export default postService;
