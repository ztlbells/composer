server=192.168.183.230
port=3000

python gen_user.py uk $server $port
python gen_user.py ca $server $port
python gen_user.py us $server $port
python gen_user.py au $server $port

