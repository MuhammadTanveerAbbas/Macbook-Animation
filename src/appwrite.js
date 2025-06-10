import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

/**
 * Increments the search count for a search term or creates a new document.
 * @param {string} searchTerm - The term that was searched.
 * @param {{ id: string, poster_path: string }} movie - Movie metadata.
 */
export const updateSearchCount = async (searchTerm, movie) => {
  if (!searchTerm || !movie?.id) {
    console.error("Invalid parameters provided to updateSearchCount.");
    return;
  }

  try {
    const { documents } = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("searchTerm", searchTerm)]
    );

    if (documents.length > 0) {
      const existingDoc = documents[0];
      const updatedCount = (existingDoc.count || 0) + 1;

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingDoc.$id,
        {
          count: updatedCount,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error in updateSearchCount:", error.message || error);
  }
};

/**
 * Fetches the top 5 trending movies based on search count.
 * @returns {Promise<Array>} An array of document objects.
 */
export const getTrendingMovies = async () => {
  try {
    const { documents } = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.orderDesc("count"), Query.limit(5)]
    );

    return documents;
  } catch (error) {
    console.error("Error in getTrendingMovies:", error.message || error);
    return [];
  }
};
