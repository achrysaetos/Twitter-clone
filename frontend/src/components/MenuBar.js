import React, { useContext } from "react"
import { Link, Link as ProfileLink } from "react-router-dom"
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

import { AuthContext } from "../context/auth"
import NotificationBtn from "./menubar/NotificationBtn"
import AddBtn from "./menubar/AddBtn"
import ChatBtn from "./menubar/ChatBtn"

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)

  const menuBar = user ? (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={6} p={6}>
      <Flex align="center">
        <Heading size="lg" color="teal.500" as={Link} to="/" _hover={{ color: "teal.500" }}>
          ACHRYSAETOS
        </Heading>
      </Flex>

      <Flex align="center">
        <AddBtn />
        <NotificationBtn />
        <ChatBtn />

        <Menu>
          <MenuButton as={Button} colorScheme="teal" rightIcon={<ChevronDownIcon />} size="lg" mr={6}>
            {user.username.substr(0, 1).toUpperCase()}
          </MenuButton>
          <MenuList>
            <MenuGroup>
              <MenuItem as={ProfileLink} to={`/${user.username}`}>Account</MenuItem>
              <MenuItem as={ProfileLink} to={`/${user.username}`}>Help </MenuItem>
              <MenuItem as={ProfileLink} to={`/${user.username}`}>Settings</MenuItem>
            </MenuGroup>
            <MenuDivider/>
            <MenuItem onClick={logout} as={Link} to="/">Sign Out</MenuItem>
          </MenuList>
        </Menu>
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
          <Text mr={6} fontSize="lg" fontWeight="500" _hover={{ color: "teal.500" }} as={Link} to="/">
            Products
          </Text>
          <Text mr={6} fontSize="lg" fontWeight="500" _hover={{ color: "teal.500" }} as={Link} to="/">
            Features
          </Text>
          <Text mr={6} fontSize="lg" fontWeight="500" _hover={{ color: "teal.500" }} as={Link} to="/">
            Pricing
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
