import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { Box, Button, FormControl, Textarea } from "@chakra-ui/react"

import { useForm } from "../util/hooks"
import { FETCH_POSTS_QUERY } from "../graphql/FETCH_POSTS_QUERY"
import { CREATE_POST_MUTATION } from "../graphql/CREATE_POST_MUTATION"

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, { body: "" })

  const [createPost] = useMutation(CREATE_POST_MUTATION, { // call the mutation
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY }) // execute the query without re-rendering
      proxy.writeQuery({ // write data to the cache
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] } // add post to the cache
      })
      values.body = ""
    }
  })

  function createPostCallback() { // to call createPost() in useForm()
    createPost()
  }

  return (
    <Box p={12} mb={3} width="50%" borderWidth={1} borderRadius={12} boxShadow="sm">
      <form onSubmit={onSubmit} noValidate>
        <FormControl>
          <Textarea 
            size="lg" 
            variant="flushed"
            focusBorderColor="grey"
            autoComplete="off"
            placeholder="What's on your mind?"
            name="body"
            type="text"
            value={values.body}
            onChange={onChange}
          />
        </FormControl>
        
        <Button colorScheme="teal" variant="outline" width="full" mt={6} size="lg" type="submit" disabled={values.body.trim() === ""}>
          Post
        </Button>
      </form>
    </Box>
  )
  
}
