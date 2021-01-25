import React, { useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Flex, Text, Button, FormControl, useDisclosure, IconButton, Input } from "@chakra-ui/react"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

import { AuthContext } from "../../context/auth"
import { useForm } from "../../util/hooks"

export default function AddBtn() {
    const { user } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    
  return (
    <>
      <IconButton variant="outline" colorScheme="teal" icon={<AddIcon />} size="lg" mr={6} onClick={onOpen}/>
      <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text color="teal.500">Create a Post</Text>
            <ModalCloseButton _focus="outline: 0" />
          </ModalHeader>

          <ModalBody>
          </ModalBody>
          
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}
