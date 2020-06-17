import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './../reducer/productReducer';

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <ProductContext.Provider value={[state, dispatch]}>{props.children}</ProductContext.Provider>;
};
