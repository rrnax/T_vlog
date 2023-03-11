class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, options={})
    if resource.persisted?
      render json: {
        status: 200,
        message: "Zarejestrowano pomyślnie",
        data: resource
        }, status: :ok
    else
      render json: {
        status: 422,
        message: "Mail jest już zajęty",
        errors: resource.errors.full_messages
        }, status: :unprocessable_entity
    end
  end


end
