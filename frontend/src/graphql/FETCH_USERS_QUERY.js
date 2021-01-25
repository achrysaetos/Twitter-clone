import gql from "graphql-tag";

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      email
      username
      createdAt
    }
  }
`;
