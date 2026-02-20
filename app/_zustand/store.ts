import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

//note: This file contains logic on the quantity up and down and does that product total calculation

export type ProductInCart = {
  id: string;
  name: string;
  price: number;
  image: string;
  totalQuantity: number;
};

export type State = {
  products: ProductInCart[];
  allQuantity: number;
  subtotal: number;
  vat: number;
  total: number;
};

export type Actions = {
  addToCart: (newProduct: ProductInCart) => void;
  removeFromCart: (id: string) => void;
  updateCartAmount: (id: string, quantity: number) => void;
  calculateTotals: () => void;
  clearCart: () => void;
};

export const useProductStore = create<State & Actions>()(
  persist(
    (set) => ({
      products: [],
      allQuantity: 0,
      subtotal: 0,
      vat: 0,
      total: 0,
      
      
      
      
      addToCart: (newProduct) => {
        set((state) => {
          const cartItem = state.products.find(
            (item) => item.id === newProduct.id
          );
          if (!cartItem) {
            return { products: [...state.products, newProduct] };
          } else {
            state.products.map((product) => {
              if (product.id === cartItem.id) {
                product.totalQuantity += newProduct.totalQuantity;
              }
            });
          }
          return { products: [...state.products] };
        });
      },
      
      
      
      clearCart: () => {
        set((state: any) => {
          
          return {
            products: [],
            allQuantity: 0,
            subtotal: 0,
            vat: 0,
            total: 0,

          };
        });
      },




      removeFromCart: (id) => {
        set((state) => {
          state.products = state.products.filter(
            (product: ProductInCart) => product.id !== id
          );
          return { products: state.products };
        });
      },

      calculateTotals: () => {
        set((cState) =>{
          let cQuantity = 0;
          let cSubtotal = 0;

          cState.products.forEach((product) =>{
            cQuantity += product.totalQuantity;
            cSubtotal += product.totalQuantity * product.price;
          });

          let cVat = cSubtotal * 0.15;
          let cShipping = cSubtotal > 0 ? 200 : 0;
          let fTotal = cSubtotal + cVat + cShipping

          return{
            products: cState.products,
            allQuantity: cQuantity,
            subtotal: cSubtotal,
            vat: cVat,
            total: Math.round(fTotal),
          };
        });
      },
      
      
      
      
      
      
      updateCartAmount: (id, amount) => {
        set((state) => {
          const cartItem = state.products.find((item) => item.id === id);

          if (!cartItem) {
            return { products: [...state.products] };
          } else {
            state.products.map((product) => {
              if (product.id === cartItem.id) {
                product.totalQuantity = amount;
              }
            });
          }

          return { products: [...state.products] };
        });
      },
    }),
    {
      name: "products-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // This is so that when I refresh I don't lose the cart
    }
  )
);
