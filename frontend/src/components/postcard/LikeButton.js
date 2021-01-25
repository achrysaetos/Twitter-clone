import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import { Button } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

import { LIKE_POST_MUTATION } from "../../graphql/LIKE_POST_MUTATION"

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
      <Button leftIcon={<StarIcon />} colorScheme="teal" minW="60px" maxW="60px" onClick={likePost}>
        {likeCount}
      </Button>
    ) : (
      <Button leftIcon={<StarIcon />} colorScheme="teal" variant="outline" minW="60px" maxW="60px" onClick={likePost}>
        {likeCount}
      </Button>
    )
  ) : (
    <Button leftIcon={<StarIcon />} colorScheme="teal" variant="outline" minW="60px" maxW="60px" as={Link} to="/login">
      {likeCount}
    </Button>
  )

  return likeButton
  
}
