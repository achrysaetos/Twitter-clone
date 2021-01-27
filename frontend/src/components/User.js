import React, { useState, useEffect } from "react"
import { Link as ProfileLink } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Box, Avatar, Text, Flex, Button } from "@chakra-ui/react"
import moment from "moment"

import { FETCH_USER_QUERY } from "../graphql/FETCH_USER_QUERY"
import { FOLLOW_USER_MUTATION } from "../graphql/FOLLOW_USER_MUTATION"

export default function User({ user, target_user }){
  const { loading, data } = useQuery(FETCH_USER_QUERY, { variables: { userId: target_user.id }})
  const [followed, setfollowed] = useState(false)

  useEffect(() => {
    if (user && user.following.find((target) => target.username === target_user.username)) {
      setfollowed(true)
    } else {
      setfollowed(false)
    }
  }, [user, target_user.username])

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    update() {

    },
    variables: { userId: user.id, target_username: target_user.username }
  })

  return loading ? "loading" : (
    <Box p={12} minW="325px" maxW="325px" h="400px" borderWidth={1} borderRadius={12} boxShadow="sm">
      <Flex direction="column" align="center">
        <Avatar size="2xl" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        
        <Text mb={3} mt={6} fontSize="2xl" fontWeight="semibold" color="teal.500" as={ProfileLink} to={`/${target_user.username}`}> 
          @{data.getUser.username} 
        </Text>
        <Text mb={3} fontSize="xl" fontWeight="light" > 
          Email: {data.getUser.email} 
        </Text>
        <Text mb={3} fontSize="xl" fontWeight="light" > 
          Joined: {moment(data.getUser.createdAt).format("LL")} 
        </Text>

        {target_user.username === user.username ? (
          ""
        ):(
          followed ? (
            <Button colorScheme="teal" variant="outline" width="full" mt={6} size="lg" onClick={followUser}>
              Following
            </Button>
          ) : (
            <Button colorScheme="teal" variant="outline" width="full" mt={6} size="lg" onClick={followUser}>
              Follow
            </Button>
          )
        )}
      </Flex>
    </Box>
  )

}