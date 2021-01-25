import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { Box, Avatar, Text, Divider, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { Link as ProfileLink } from "react-router-dom"

import { FETCH_USERS_QUERY } from "../graphql/FETCH_USERS_QUERY"

export default function Follows(){
  const { loading, data } = useQuery(FETCH_USERS_QUERY)

  if (loading) return "loading" // always check loading when working with queries
  else {
    return (
      <Box p={12} minW="325px" maxW="325px" borderWidth={1} borderRadius={12} boxShadow="sm">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab fontSize="xl" fontWeight="bold" _focus="outline: 0">Following</Tab>
            <Tab fontSize="xl" fontWeight="bold" _focus="outline: 0">Followers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {data.getUsers &&
                data.getUsers.map((user) => 
                  <>
                    <Flex align="center">
                      <Avatar size="lg" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                      <Box ml={4}>
                        <Text fontSize="lg" fontWeight="semibold" color="teal.500" as={ProfileLink} to="/profile">{user.username}</Text>
                        <Text fontSize="lg" fontWeight="light">@{user.username}</Text>
                      </Box>
                    </Flex>
                    <Divider my={2}/>
                  </>
              )}
            </TabPanel>
            <TabPanel>
              {data.getUsers &&
                data.getUsers.map((user) => 
                  <>
                    <Flex align="center">
                      <Avatar size="lg" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                      <Box ml={4}>
                        <Text fontSize="lg" fontWeight="semibold" color="teal.500" as={ProfileLink} to="/profile">{user.username}</Text>
                        <Text fontSize="lg" fontWeight="light">@{user.username}</Text>
                      </Box>
                    </Flex>
                    <Divider my={2}/>
                  </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
        
    )
  }

}