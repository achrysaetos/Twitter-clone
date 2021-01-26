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
