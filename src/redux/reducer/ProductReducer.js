import { ActionTypes } from "../../constant/ActionTypes";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
  editingProductId: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case ActionTypes.ADD_PRODUCT:
      const id = uuidv4();

      const newProduct = { ...action.payload, id };

      // Create a new array with the added product
      const newProductData = [...state.products, newProduct];

      // Update local storage
      localStorage.setItem("products", JSON.stringify(newProductData));

      return {
        ...state,
        products: newProductData,
      };

    case ActionTypes.REMOVE_PRODUCT:
      // Remove the product by filtering the products array
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload
      );

      // Update local storage
      localStorage.setItem("products", JSON.stringify(filteredProducts));

      return {
        ...state,
        products: filteredProducts,
      };

    case ActionTypes.EDIT_PRODUCT:
      const updatedProducts = state.products.map((product) => {
        return product.id === action.payload.id
          ? { ...action.payload }
          : product;
      });

      // Update local storage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return {
        ...state,
        products: updatedProducts,
        editingProductId: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
