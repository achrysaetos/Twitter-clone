import React, { useContext } from "react" 
import { Box, Flex, Text, Divider } from "@chakra-ui/react"
import moment from "moment"

import { AuthContext } from "../context/auth"
import LikeButton from "./LikeButton"
import DeleteButton from "./DeleteButton"
import CommentButton from "./CommentButton"

export default function PostCard({
  // destructure the post to easily access all its parts
  post: { body, createdAt, id, username, likeCount, commentCount, likes, comments }
}) {
  const { user } = useContext(AuthContext)

  return (
    <Box p={12} my={3} minW="550px" maxW="550px" borderWidth={1} borderRadius={12} boxShadow="sm">
      <Flex align="baseline" justify="space-between">
        <Flex align="baseline">
          <Text textTransform="uppercase" fontSize="lg" fontWeight="bold" color="teal.500" >
            {username}
          </Text>
          <Text ml={1} fontSize="lg" fontWeight="light">
            &bull; {moment(createdAt).fromNow()}
          </Text>
        </Flex>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Flex>

      <Text my={4} fontSize="lg">{body}</Text>
      <Divider />

      <Box mt={4}>
        <LikeButton user={user} post={{ id, likes, likeCount }}/>
        <CommentButton post={{ body, createdAt, id, username, likeCount, commentCount, likes, comments }}/>
      </Box>
    </Box>
  )
  
}
