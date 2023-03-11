class Content::PostsController < ApplicationController

def show
  render json: Post.all, status: :ok
end

def specific
  render json: Post.find(params[:id]), status: :ok
end

def create
  @post_data = params[:post]
  if Post.create(user_id: @post_data[:user_id], title: @post_data[:title], body: @post_data[:body])
    render json: {
      message: "Utworzono pomyślnie"
    }, status: :ok
  else
    render jsdon: {
      message: "Coś poszło nie tak na serwerze"
    }, status: :unprocessable_entity
  end
end

def update
  @post_data = params[:post]
  @post = Post.find(@post_data[:id])
  if @post.update(title: @post_data[:title], body: @post_data[:body])
    render json: {
      message: "Edytowano pomyślnie"
    }, status: :ok
  else
    render jsdon: {
      message: "Coś poszło nie tak na serwerze"
    }, status: :unprocessable_entity
  end
end

def destroy
  @post_data = params[:post]
  @post = Post.find(@post_data[:id])
  if @post.destroy
    render json: {
      message: "Usunięto pomyślnie"
    }, status: :ok
  else
    render jsdon: {
      message: "Coś poszło nie tak na serwerze"
    }, status: :unprocessable_entity
  end
end

private
  def post_params
    params.require(:post).permit(:title, :body, :user_id, :id)
  end

end
