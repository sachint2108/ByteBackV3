import { get } from "http";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5021/api";

export const productService = {
  getAllProducts: async () => {
    try {
    
        console.log("Current API URL:", API_BASE_URL);
      const response = await fetch(`${API_BASE_URL}/products`, {
        cache: "no-store"
      });
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
  },

  updateProduct: async (id: string, updatedData: any) => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"},
        body: JSON.stringify(updatedData),
      });

      const textResponse = await response.text();
      if (!response.ok) {
        throw new Error(textResponse || `Failed to update product in database (Status: ${response.status})`);
      }
  },

  getProductsByCategory: async (category: string) => {
    try {
      const allproducts = await productService.getAllProducts();
      return allproducts.filter((product: any) => product.category === category.toLowerCase());
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      
      const textResponse = await response.text();
      
      if (!response.ok) {
       throw new Error(textResponse || `Failed to save product in database (Status: ${response.status})`);
      }
      return textResponse ? JSON.parse(textResponse) : {};
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }     
  },

  deleteProduct: async (id: string) =>{
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    const txtResponse = await response.text();
    if (!response.ok) throw new Error (txtResponse);

    return txtResponse ? JSON.parse(txtResponse): {};

  },

};




//Note: This service is responsible for handling all interactions with the product-related API endpoints. 
// It provides methods to fetch all products and to fetch a specific product by its ID. 
// The service uses the Fetch API to make HTTP requests and includes error handling to ensure that any issues with the backend connection are logged and handled gracefully.