module HomeHelper
  def page?
    return true if request.GET.first
  end

  def notice?
    return true if notice
  end

  def alert?
    return true if alert
  end

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

end
