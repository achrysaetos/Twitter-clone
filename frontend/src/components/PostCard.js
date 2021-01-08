import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Box, Flex, Text, Divider, Button } from "@chakra-ui/react"
import { ChatIcon } from "@chakra-ui/icons"
import moment from "moment"

import { AuthContext } from "../context/auth"
import LikeButton from "./LikeButton"
import DeleteButton from "./DeleteButton"

export default function PostCard({
  // destructure the post to easily access all its parts
  post: { body, createdAt, id, username, likeCount, commentCount, likes }, 
}) {
  const { user } = useContext(AuthContext)

  return (
    <Box p={12} my={3} width="50%" borderWidth={1} borderRadius={12} boxShadow="sm">
      <Flex align="baseline">
        <Text textTransform="uppercase" fontSize="lg" fontWeight="bold" color="teal.500" >
          {username}
        </Text>
        <Text ml={1} fontSize="lg" fontWeight="light" as={Link} to={`/posts/${id}`}>
          &bull; {moment(createdAt).fromNow()}
        </Text>
      </Flex>

      <Text my={2}>{body}</Text>
      <Divider />
      <Box mt={4}>
        <LikeButton user={user} post={{ id, likes, likeCount }}/>
        <Button leftIcon={<ChatIcon />} colorScheme="teal" variant="outline" ml={4} minW="60px" maxW="60px">
          {commentCount}
        </Button>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Box>
    </Box>
  )
  
}
