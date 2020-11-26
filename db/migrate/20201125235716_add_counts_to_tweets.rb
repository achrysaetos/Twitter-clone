class AddCountsToTweets < ActiveRecord::Migration[6.0]
  def change
    add_column :tweets, :likes, :integer, default: 0
    add_column :tweets, :retweets, :integer, default: 0
  end
end
