import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import { VStack, Spinner, Flex } from "@chakra-ui/react"

import { AuthContext } from "../context/auth"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"
import Discover from "../components/Discover"
import { FETCH_POSTS_QUERY } from "../graphql/FETCH_POSTS_QUERY"

export default function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Flex justifyContent="center">
      <VStack mx={2}>
        {user && <PostForm />}
        {loading ? <Spinner size="xl" /> : (
          data?.getPosts.map((post) => (
            <PostCard post={post} key={post.id}/>
          ))
        )}
      </VStack>
      
      <VStack mx={2} spacing={4}>
        <Discover />
      </VStack>
    </Flex>
  )
  
}
