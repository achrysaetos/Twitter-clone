import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Button, Confirm, Icon } from "semantic-ui-react"

import { FETCH_POSTS_QUERY } from "../graphql/FETCH_POSTS_QUERY"
import { DELETE_COMMENT_MUTATION } from "../graphql/DELETE_COMMENT_MUTATION"
import { DELETE_POST_MUTATION } from "../graphql/DELETE_POST_MUTATION"

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false) // confirmOpen is false, use setConfirmOpen to change that
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION // delete either the comment or the post

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false) // need second confirmation to delete
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
    <>
      <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      {/* call deletePostOrMutation only if confirmOpen is true */}
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrMutation}/>
    </>
  )
  
}
