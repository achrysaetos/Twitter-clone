import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react"

import { AuthContext } from "../context/auth"

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname // the location object's url port

  const path = pathname === "/" ? "home" : pathname.substr(1) // path = name in pathname "/[name]"
  const [activeItem, setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name) // set the active item where the name matches the path

  const menuBar = user ? (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={6} p={6}>
      <Flex align="center">
        <Heading size="lg" color="teal.500" as={Link} to="/" _hover={{ color: "teal.500" }}>
          ACHRYSAETOS
        </Heading>
      </Flex>

      <Flex align="center">

        <Button colorScheme="teal" variant="outline" size="lg" onClick={logout}>
          Sign Out
        </Button>
      </Flex>
    </Flex>
  ) : (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={6} p={6}>
      <Flex align="center">
        <Heading size="lg" color="teal.500" as={Link} to="/" _hover={{ color: "teal.500" }}>
          ACHRYSAETOS
        </Heading>
      </Flex>

      <Flex align="center">
        <Box display={{ sm: "none", md: "flex" }} width="auto">
          <Text mr={6} fontSize="lg" _hover={{ color: "teal.500" }} as={Link} to="/login">
            Docs
          </Text>
          <Text mr={6} fontSize="lg" _hover={{ color: "teal.500" }} as={Link} to="/login">
            Examples
          </Text>
          <Text mr={6} fontSize="lg" _hover={{ color: "teal.500" }} as={Link} to="/login">
            Blog
          </Text>
        </Box>

        <Button colorScheme="teal" variant="outline" size="lg" as={Link} to="/login">
          Sign In
        </Button>
      </Flex>
    </Flex>
  )

  return menuBar
}
