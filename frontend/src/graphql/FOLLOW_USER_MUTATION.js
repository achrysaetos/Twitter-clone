import gql from "graphql-tag";

export const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userId: ID!, $target_username: String!) {
    followUser(userId: $userId, target_username: $target_username) {
      id
      username
      following{
        id
        createdAt
        username
      }
      followers{
        id
        createdAt
        username
      }
    }
  }
`;
