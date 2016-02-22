class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :player1
      t.string :player2
      t.string :board1
      t.string :board2

      t.timestamps null: false
    end
  end
end
