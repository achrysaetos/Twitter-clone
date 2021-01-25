import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks" // courtesy of ApolloProvider
import { VStack, Spinner, Flex, Text, Box } from "@chakra-ui/react"

import { AuthContext } from "../context/auth"
import PostCard from "../components/PostCard"
import UserProfile from "../components/User"
import Following from "../components/Follows"
import { FETCH_POSTS_QUERY } from "../graphql/FETCH_POSTS_QUERY"

export default function Profile() {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Flex justifyContent="center">
      <VStack mx={2}>
        <Box p={4} mb={3} minW="550px" maxW="550px" borderWidth={1} borderRadius={12} boxShadow="sm">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">My Posts</Text>
        </Box>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <PostCard post={post} key={post.id}/>
          ))
        )}
      </VStack>
      
      <VStack mx={2} spacing={4}>
        {user && <UserProfile user={user}/>}
        <Following />
      </VStack>
    </Flex>
  )
  
}
