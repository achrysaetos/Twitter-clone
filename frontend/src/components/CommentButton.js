import React, { useContext, useState, useRef } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Box, Flex, Text, Divider, Button, Input, FormControl, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { ChatIcon } from "@chakra-ui/icons"
import moment from "moment"

import { AuthContext } from "../context/auth"
import LikeButton from "./LikeButton"
import { SUBMIT_COMMENT_MUTATION } from "../graphql/SUBMIT_COMMENT_MUTATION"

export default function CommentButton({ post: { body, createdAt, id, username, likeCount, commentCount, likes, comments } }) {
    const { user } = useContext(AuthContext)
    const postId = id
    const commentInputRef = useRef(null) // returns a mutable ref object whose .current property is initialized to null
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [comment, setComment] = useState("")
  
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
      update() {
        setComment("") // set the comment back as empty
        commentInputRef.current.blur() // unfocus from the comment textbox
      },
      variables: { postId, body: comment }
    })

  return (
    <>
      <Button leftIcon={<ChatIcon />} colorScheme="teal" variant="outline" ml={4} minW="60px" maxW="60px" onClick={onOpen}>
        {commentCount}
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="baseline">
              <Text textTransform="uppercase" fontSize="xl" fontWeight="bold" color="teal.500" >
                {username}
              </Text>
              <Text ml={1} fontSize="xl" fontWeight="light">
                &bull; {moment(createdAt).fromNow()}
              </Text>
            </Flex>
            <ModalCloseButton _focus="outline: 0" />
          </ModalHeader>

          <ModalBody>
            <Text fontSize="lg">{body}</Text>
            <Divider my={4}/>
            <LikeButton user={user} post={{ id, likes, likeCount }}/>
            <Button leftIcon={<ChatIcon />} colorScheme="teal" variant="outline" ml={4} minW="60px" maxW="60px" onClick={onClose}>
              {commentCount}
            </Button>
            { user ? 
              <>
                <Divider my={4}/>
                <Box width="full">
                  <Flex alignItems="flex-end" justify="space-between">
                    <FormControl w="75%">
                      <Input 
                        size="lg" 
                        focusBorderColor="grey"
                        autoComplete="off"
                        placeholder="Write a comment..."
                        name="comment"
                        type="text"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                    </FormControl>
                    <Button 
                      colorScheme="teal" 
                      variant="outline" 
                      w="20%" 
                      size="lg" 
                      type="submit" 
                      disabled={comment.trim() === ""} 
                      onClick={submitComment}
                    >
                      Post
                    </Button>
                  </Flex>
                </Box>
              </> 
            : "" }
          </ModalBody>
          
          <ModalFooter>
            <Box width="full">
              <Divider/>
              {comments.map((comment) => (
                <Box p={3} my={3} borderWidth={1} borderRadius={6} boxShadow="sm" key={comment.id}>
                  <Flex align="baseline">
                    <Text textTransform="uppercase" fontSize="lg" fontWeight="bold" color="teal.500" >
                      {comment.username}
                    </Text>
                    <Text ml={1} fontSize="lg" fontWeight="light">
                      &bull; {moment(comment.createdAt).fromNow()}
                    </Text>
                  </Flex>
                  <Text my={1}>{comment.body}</Text>
                </Box>
              ))}
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}
