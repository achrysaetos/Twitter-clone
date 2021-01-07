import React, { useContext, useState, useRef } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import moment from "moment"
import { Card, Form, Grid, Image, } from "semantic-ui-react"

import { AuthContext } from "../context/auth"
import LikeButton from "../components/LikeButton"
import DeleteButton from "../components/DeleteButton"
import { SUBMIT_COMMENT_MUTATION } from "../graphql/SUBMIT_COMMENT_MUTATION"
import { FETCH_POST_QUERY } from "../graphql/FETCH_POST_QUERY"

export default function SinglePost(props) {
  const postId = props.match.params.postId
  const { user } = useContext(AuthContext)
  const commentInputRef = useRef(null) // returns a mutable ref object whose .current property is initialized to null

  const [comment, setComment] = useState("")

  // store the result from FETCH_POST_QUERY in a variable called data, renaming it as getPost
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, { variables: { postId } }) 

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("") // set the comment back as empty
      commentInputRef.current.blur() // unfocus from the comment textbox
    },
    variables: { postId, body: comment }
  })

  function deletePostCallback() {
    props.history.push("/") // redirect back home
  }

  let postMarkup
  if (!getPost) {
    postMarkup = <p>Loading post..</p>
  } else { // destructure getPost so you can use all its variables
    const { id, body, createdAt, username, comments, likes, likeCount } = getPost 

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                {user && user.username === username && (<DeleteButton postId={id} callback={deletePostCallback}/>)}
              </Card.Content>
            </Card>

            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)} // set comment to event.target.value
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment} // now call the mutation
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}

            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (<DeleteButton postId={id} commentId={comment.id}/>)}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup
}
