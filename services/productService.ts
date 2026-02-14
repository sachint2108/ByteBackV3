const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5021/api";

export const productService = {
  getAllProducts: async () => {
    try {
    
        console.log("Current API URL:", API_BASE_URL);
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error("Backend connection failed");
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  getProductById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      return null;
    }
  }
};


//Note: This service is responsible for handling all interactions with the product-related API endpoints. 
// It provides methods to fetch all products and to fetch a specific product by its ID. 
// The service uses the Fetch API to make HTTP requests and includes error handling to ensure that any issues with the backend connection are logged and handled gracefully.