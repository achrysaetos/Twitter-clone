import React from "react"
import { Button, Form } from "semantic-ui-react"
import { useMutation } from "@apollo/react-hooks"

import { useForm } from "../util/hooks"
import { FETCH_POSTS_QUERY } from "../graphql/FETCH_POSTS_QUERY"
import { CREATE_POST_MUTATION } from "../graphql/CREATE_POST_MUTATION"

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, { body: "" })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, { // call the mutation
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
    <>
      <Form onSubmit={onSubmit}> {/* from useForm() */}
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange} // from useForm()
            value={values.body} // from useForm()
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li> {/* display any errors under the form */}
          </ul>
        </div>
      )}
    </>
  )
  
}
