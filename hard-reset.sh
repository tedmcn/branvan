rake db:drop
rake db:create
rake db:migrate

mysql-ctl start
sudo service mysql start
rails s -b $IP -p $PORT