# class Bar < ActiveRecord::Base
#   # has_many :barfaves
#   ḥas_many :faves, class_name: 'Barfave', foreign_key: 'barfave_id'
#   belongs_to :user

#   def starred
#     true
#   end
# end

class Bar < ActiveRecord::Base
  has_many :barfaves, class_name: 'Barfave', foreign_key: 'bar_id'

  def starred(user_id = false)
    return false unless user_id
    self.barfaves.find_by(user_id: user_id)
  end
end