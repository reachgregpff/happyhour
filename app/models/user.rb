class User < ActiveRecord::Base
  has_secure_password
  
  has_many :drinkfaves
  has_many :barfaves
end
