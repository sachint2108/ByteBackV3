const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5021/api";

export const productService = {
  getAllProducts: async () => {
    try {
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