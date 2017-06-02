server=192.168.183.229
port=3000

python gen_user.py uk $server $port
python gen_user.py ca $server $port
python gen_user.py us $server $port
python gen_user.py au $server $port

python gen_facility.py station $server $port

python gen_shipment.py station $server $port