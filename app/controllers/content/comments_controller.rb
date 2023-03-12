class Content::CommentsController < ApplicationController

  def index
    @comment_data = params[:comment]
    render json: Comment.where(post_id: @comment_data[:post_id]), status: :ok
  end

  def create
    @comment_data = params[:comment]
    if Comment.create(user_id: @comment_data[:user_id], post_id: @comment_data[:post_id], body: @comment_data[:body])
      render json: {
        message: "Utworzono pomyślnie",
      }, status: :ok
    else
      render json: {
        message: "Coś poszło nie tak na serwerze"
      }, status: :unprocessable_entity
    end
  end

  def update
    @comment_data = params[:comment]
    @comment = Comment.find(@comment_data[:id])
    if @comment.update(body: @comment_data[:body])
      render json: {
        message: "Zaktualizowano pomyślnie",
      }, status: :ok
    else
      render json: {
        message: "Coś poszło nie tak na serwerze"
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment_data = params[:comment]
    @comment = Comment.find(@comment_data[:id])
    if @comment.destroy
      render json: {
        message: "Usunięto pomyślnie",
      }, status: :ok
    else
      render json: {
        message: "Coś poszło nie tak na serwerze"
      }, status: :unprocessable_entity
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:body, :user_id, :post_id, :id)
    end

end
