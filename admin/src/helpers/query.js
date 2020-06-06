import gql from 'graphql-tag';

// CATEGORY
export const ADD_CATEGORY = gql`
  mutation($name: String!) {
    addCategory(name: $name) {
      name
    }
  }
`;

export const CATEGORY_LIST = gql`
  {
    category {
      result
      items {
        id
        name
        slug
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  query($id: ID!) {
    deleteCategory(id: $id) {
      status
      message
    }
  }
`;

// PRODUCT
export const ADD_PRODUCT = gql`
  mutation($title: String!, $description: String, $price: Int, $image: Upload!, $category: [ID]) {
    addProduct(input: { title: $title, description: $description, price: $price, image: $image, category: $category }) {
      id
      title
      image
    }
  }
`;

export const PRODUCT_LIST = gql`
  {
    products {
      items {
        id
        title
        price
        image
        imagePath
        category {
          id
          name
          slug
        }
      }
    }
  }
`;
