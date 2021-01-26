import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks" // courtesy of ApolloProvider
import { VStack, Spinner, Flex, Text, Box } from "@chakra-ui/react"

import { AuthContext } from "../context/auth"
import PostCard from "../components/PostCard"
import User from "../components/User"
import Follows from "../components/Follows"
import { FETCH_POSTS_QUERY } from "../graphql/FETCH_POSTS_QUERY"
import { FETCH_USER_FROM_USERNAME } from "../graphql/FETCH_USER_QUERY"

export default function Profile(props) {
  const { user } = useContext(AuthContext)
  const { loading: loading_post, data: post_data } = useQuery(FETCH_POSTS_QUERY)
  const target_username = props.match.params.target_username
  const { loading: loading_user, data: user_data } = useQuery(FETCH_USER_FROM_USERNAME, { variables: { username: target_username }})

  return (
    <Flex justifyContent="center">
      <VStack mx={2}>
        <Box p={4} mb={3} minW="550px" maxW="550px" borderWidth={1} borderRadius={12} boxShadow="sm">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">{target_username}'s Posts</Text>
        </Box>
        {loading_post ? <Spinner size="xl" /> : (
          post_data?.getPosts.filter((post) => post.username === target_username).map((post) => (
            <PostCard post={post} key={post.id}/>
          ))
        )}
      </VStack>
      
      {loading_user ? <Spinner size="xl" /> : (
        <VStack mx={2} spacing={4}>
          {user && <User user={user_data?.getUser_from_username}/>}
          <Follows user={user_data?.getUser_from_username}/>
        </VStack>
      )}
    </Flex>
  )
  
}
