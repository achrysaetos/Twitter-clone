import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import { Button, Label, Icon } from "semantic-ui-react"

import { LIKE_POST_MUTATION } from "../graphql/LIKE_POST_MUTATION"

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false) // liked is initially false, use setLiked to change it

  useEffect(() => { // toggle the button based on the current user
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, { variables: { postId: id } })

  const likeButton = user ? (
    liked ? ( // no proxy needed here because we're not accessing any cache, just changing the styles
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  )

  return (
    <Button as="div" labelPosition="right" onClick={likePost}> {/* call the mutation onClick */}
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  )
  
}
