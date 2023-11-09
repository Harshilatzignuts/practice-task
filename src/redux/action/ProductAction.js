import { ActionTypes } from "../../constant/ActionTypes";

export const setProducts = (products) => ({
  type: ActionTypes.SET_PRODUCTS,
  payload: products,
});

export const addProduct = (product) => ({
  type: ActionTypes.ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (productId) => ({
  type: ActionTypes.REMOVE_PRODUCT,
  payload: productId,
});

export const editProduct = (productId) => ({
  type: ActionTypes.EDIT_PRODUCT,
  payload: productId,
});
