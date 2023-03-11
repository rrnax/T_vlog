class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, options={})
    render json:{
        status: 200,
        message: "Zalogowan pomyslnie",
        data: current_user
      }, status: :ok
  end

  def respond_to_on_destroy
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],Rails.application.credentials.fetch(:secret_key_base)).first
    current_user = User.find(jwt_payload['sub'])
    if current_user
      render json: {
        status: 200,
        message: "Wylogowano pomyślnie"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Użytkownik nie byl zalogowany"
      }, status: :unauthorized
    end
  end

end
