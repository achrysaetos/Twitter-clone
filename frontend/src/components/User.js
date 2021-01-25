import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { Box, Avatar, Text, Flex } from "@chakra-ui/react"
import moment from "moment"
import { Link as ProfileLink } from "react-router-dom"

import { FETCH_USER_QUERY } from "../graphql/FETCH_USER_QUERY"

export default function User({ user }){
  const { loading, data } = useQuery(FETCH_USER_QUERY, { variables: { userId: user.id }})

  if (loading) return "loading" // always check loading when working with queries
  else {
    return (
      <Box p={12} minW="325px" maxW="325px" h="400px" borderWidth={1} borderRadius={12} boxShadow="sm">
        <Flex direction="column" align="center">
          <Avatar size="2xl" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

          <Text mb={3} mt={6} fontSize="2xl" fontWeight="semibold" color="teal.500" as={ProfileLink} to="/profile"> 
            @{data.getUser.username} 
          </Text>
          <Text mb={3} fontSize="xl" fontWeight="light" > 
            Email: {data.getUser.email} 
          </Text>
          <Text mb={3} fontSize="xl" fontWeight="light" > 
            Joined: {moment(data.getUser.createdAt).format("LL")} 
          </Text>
        </Flex>
      </Box>
    )
  }

}