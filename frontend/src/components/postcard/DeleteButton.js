import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, Portal, Button, Text} from "@chakra-ui/react"

import { FETCH_POSTS_QUERY } from "../../graphql/FETCH_POSTS_QUERY"
import { DELETE_COMMENT_MUTATION } from "../../graphql/DELETE_COMMENT_MUTATION"
import { DELETE_POST_MUTATION } from "../../graphql/DELETE_POST_MUTATION"

export default function DeleteButton({ postId, commentId, callback }) {
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION // delete either the comment or the post
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        // Combine readQuery and writeQuery to fetch currently cached data and make selective modifications to it.
        // Changes are not pushed to the server here (but we already did that with calls to our mutation).
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY }) // execute the query without re-rendering
        proxy.writeQuery({ // write data to the cache
          query: FETCH_POSTS_QUERY,
          data: { getPosts: data.getPosts.filter((p) => p.id !== postId) } // remove the post
        })
      }
      if (callback) callback()
    },
    variables: { postId, commentId }
  })

  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Text float="right" _hover={{ color: "teal.500" }} fontSize="lg" cursor="pointer">&bull;&bull;&bull;</Text>
          </PopoverTrigger>
          <Portal>
            <PopoverContent _focus="outline: 0" p={2}>
              <PopoverArrow />
                <Button color="#FF0000" my={1} onClick={deletePostOrMutation}>
                  Delete Permanently
                </Button>
                <Button my={1} onClick={onClose}>
                  Cancel
                </Button>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
  
}
