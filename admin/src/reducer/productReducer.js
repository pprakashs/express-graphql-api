export const initialState = {
  showDrawer: false,
  product: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT':
      return {
        showDrawer: true,
        product: state.product,
      };
    case 'CLOSE_DRAWER':
      return {
        showDrawer: false,
      };
    case 'ADD_PRODUCT':
      return {
        showDrawer: true,
      };
    default:
      return {
        state,
      };
  }
};
