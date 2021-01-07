const { AuthenticationError, UserInputError } = require("apollo-server")

const checkAuth = require("../../util/check-auth")
const Post = require("../../models/Post")

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context) // verifies that the user exists
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", { errors: { body: "Comment body must not be empty" } })
      }
      const post = await Post.findById(postId)
      if (post) {
        // unshift() adds the comment to the beginning of the array post.comments
        post.comments.unshift({ body, username, createdAt: new Date().toISOString() }) 
        await post.save()
        return post
      } else {
        throw new UserInputError("Post not found")
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context)
      const post = await Post.findById(postId)
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId)
        if (post.comments[commentIndex].username === username) { // if the user wrote the comment
          post.comments.splice(commentIndex, 1) // splice() pops the comment at commentIndex from post.comments
          await post.save()
          return post
        } else {
          throw new AuthenticationError("Action not allowed")
        }
      } else {
        throw new UserInputError("Post not found")
      }
    }
  }
  
}
