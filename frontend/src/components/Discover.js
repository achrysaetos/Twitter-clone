import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { Box, Avatar, Text, Divider, Flex } from "@chakra-ui/react"
import moment from "moment"

import { FETCH_USERS_QUERY } from "../graphql/FETCH_USERS_QUERY"

export default function Discover(){
  const { loading, data } = useQuery(FETCH_USERS_QUERY)

  if (loading) return "loading" // always check loading when working with queries
  else {
    return (
      <Box p={12} minW="325px" maxW="325px" borderWidth={1} borderRadius={12} boxShadow="sm">
        <Text fontSize="xl" fontWeight="bold">You might like</Text>
        <Divider my={2}/>
        {data.getUsers &&
          data.getUsers.map((user) => 
            <>
              <Flex align="center">
                <Avatar size="lg" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                <Box ml={4}>
                  <Text fontSize="lg" fontWeight="semibold" color="teal.500">{user.username}</Text>
                  <Text fontSize="lg" fontWeight="light">@{user.username}</Text>
                </Box>
              </Flex>
              <Divider my={2}/>
            </>
        )}
      </Box>
        
    )
  }

}