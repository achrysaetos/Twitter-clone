class CommentsController < ApplicationController
    def create
        @comment = Comment.new(comment_params)
        @comment.tweet_id = params[:tweet_id]
      
        @comment.save
      
        redirect_to tweet_path(@comment.tweet)
    end
      
    def comment_params
        params.require(:comment).permit(:author_name, :body)
    end
end
