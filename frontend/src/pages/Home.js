import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import { VStack, Spinner, Flex } from "@chakra-ui/react"

import { AuthContext } from "../context/auth"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"
import Discover from "../components/Discover"
import { FETCH_POSTS_QUERY } from "../graphql/FETCH_POSTS_QUERY"
import { FETCH_USER_QUERY } from "../graphql/FETCH_USER_QUERY"
import { FETCH_USERS_QUERY } from "../graphql/FETCH_USERS_QUERY"

export default function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  const { loading: loading_users, data: users_data } = useQuery(FETCH_USERS_QUERY)
  const { loading: loading_user, data: user_data } = useQuery(FETCH_USER_QUERY, { variables: { userId: user?.id }})

  let following = []
  if (!user){
    following = loading_users ? [] : users_data?.getUsers.map((x) => x.username)
  } else {
    following = loading_user ? [] : user_data?.getUser.following.map((x) => x.username) // array of following
  }
  
  return (
    <Flex justifyContent="center">
      <VStack mx={2}>
        {user && <PostForm />}
        {loading ? <Spinner size="xl" /> : (
          data?.getPosts.filter((target) => (
            following.indexOf(target.username) !== -1 || target.username === user?.username) // filter based on usernames in the following array
          ).map((post) => (
            <PostCard post={post} key={post.id}/>
          ))
        )}
      </VStack>
      
      <VStack mx={2} spacing={4}>
        {user && !loading_user ? <Discover user_data={user_data} /> : <Discover />}
      </VStack>
    </Flex>
  )
  
}
