import gql from 'graphql-tag';

// CATEGORY

export const CATEGORY_LIST = gql`
  query Category {
    category {
      items {
        id
        name
        slug
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation($name: String!) {
    addCategory(name: $name) {
      name
      id
      slug
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      status
      message
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name) {
      name
      id
      slug
    }
  }
`;

// PRODUCT
export const PRODUCT_LIST = gql`
  query AllProducts {
    products {
      items {
        id
        title
        price
        image
        imagePath
        description
        category {
          id
          name
          slug
        }
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AllProduct($title: String!, $description: String, $price: Int, $image: Upload!, $category: [ID]) {
    addProduct(input: { title: $title, description: $description, price: $price, image: $image, category: $category }) {
      id
      title
      image
      imagePath
      description
      price
      category {
        id
        name
        slug
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $title: String!, $description: String, $price: Int, $image: Upload, $category: [ID]) {
    updateProduct(id: $id, input: { title: $title, description: $description, price: $price, image: $image, category: $category }) {
      id
      title
      image
      imagePath
      description
      price
      category {
        id
        name
        slug
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      status
      message
      id
    }
  }
`;

//LOGIN
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        role
        email
      }
    }
  }
`;

// LOCAL QUERIES
export const LOCAL_STATE_PRODUCTS = gql`
  query AllProduct {
    allProduct @client {
      items {
        id
        title
        price
        image
        imagePath
        description
        category {
          id
          name
          slug
        }
      }
    }
  }
`;

export const LOCAL_STATE_CATEGORIES = gql`
  query Category {
    allCategory @client {
      items {
        id
        name
        slug
        key
      }
    }
  }
`;
