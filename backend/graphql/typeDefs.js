const { gql } = require("apollo-server")

/*
type [Object] -- list of fields that represents an object that an application client might need to interact with
type Query -- list of available commands that allows clients to fetch the objects that exist in our data graph
type Mutation -- list of available commands that allows clients to modify data
*/
module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    following: [Follow]!
    followers: [Follow]!
  }
  type Follow {
    id: ID!
    createdAt: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUsers: [User]
    getUser(userId: ID!): User
    getUser_from_username(username: String!): User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    followUser(userId: ID!, target_username: String!): User!
  }
`
