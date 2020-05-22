import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    id: ID
    name: String
    email: String!
    password: String!
    contactNumber: [Int]
    joinedDate: String
    status: String
    message: String
  }

  type Product {
    id: ID
    title: String!
    description: String
    price: Int
    category: [Category]
    image: String
    imagePath: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Category {
    id: ID
    name: String!
    slug: String
  }

  input loginInput {
    email: String!
    password: String!
  }

  input ProductInput {
    title: String!
    description: String
    price: Int
    image: Upload
  }

  type allProducts {
    result: Int
    items: [Product]
  }

  type Query {
    getProduct(id: ID!): Product
    products: allProducts
    deleteProduct(id: ID!): String
  }

  type Mutation {
    signup(name: String, email: String!, password: String!, contactNumber: [Int]): User
    login(input: loginInput): AuthPayload
    addProduct(input: ProductInput): Product
    editProduct(id: ID, input: ProductInput): Product

    addCategory(name: String!): Category
  }
`;

export default typeDefs;
