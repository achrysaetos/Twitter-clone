import gql from "graphql-tag";

export const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      createdAt
      following{
        id
        username
        createdAt
      }
      followers{
        id
        username
        createdAt
      }
    }
  }
`;

export const FETCH_USER_FROM_USERNAME = gql`
  query ($username: String!) {
    getUser_from_username(username: $username) {
      id
      email
      username
      createdAt
      following{
        id
        username
        createdAt
      }
      followers{
        id
        username
        createdAt
      }
    }
  }
`;
