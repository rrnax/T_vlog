class Users::UsersController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: [:specific]

  def show
    render json: current_user, status: :ok
  end

  def specific
    @user = User.find(params[:id]);
    if @user.nil?
      render json: {
        message: "Nie znaleziono uzytkowniak."
      }, status: :unprocessable_entity
    else
      render json: @user, status: :ok
    end
  end

  def update
    @user_data = params[:user]
    @user = User.find(@user_data[:id])
    if @user.update(email: @user_data[:email], password: @user_data[:password], role:@user[:role])
      render json: {
        message: "Zaktualizowano pomyślnie",
        user: @user
        }, status: :ok
    else
      render json: {
        message: "Nie mżna było zaktualizować"
      }, status: :bad_request
    end
  end

  def user_params
    params.require(:user).permit(:id, :email, :password, :role)
  end

end
