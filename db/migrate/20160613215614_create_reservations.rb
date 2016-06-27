class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|

      t.datetime :reservation_for
      t.integer :dropoff_id
      t.integer :pickup_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
