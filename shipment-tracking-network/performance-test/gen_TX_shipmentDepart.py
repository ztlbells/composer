# {
#   "$class": "com.biz.ShipmentDepart",
#   "transactionId": "string",
#   "logs": [
#     "string"
#   ],
#   "from": "string",
#   "to": "string",
#   "shipment": "string",
#   "timestamp": "2017-06-02T15:13:56.928Z"
# }
# POST /com.biz.ShipmentDepart
import json, urllib2, httplib, csv, requests
import sys, time

########### argv #######################
datasource 	= str(sys.argv[1])
# server addr
server 		= str(sys.argv[2])
# port
port 		= str(sys.argv[3])
########################################

csv_file_path      		= './sample_data/places/' + datasource + '.csv'


########### POST Facility #######################
def POST_shipmentDepart(fromStation):
	url 	= 'http://' + server + ':' + port + '/api/com.biz.ShipmentDepart'

	data 	=  {
			   "from": fromStation,
			   "to": str(int(fromStation) + 1),
			   "shipment": fromStation,
 			}
	r = requests.post(url, data)
	print r.text



########### reading csv part ##################
# reader = csv.reader(open(csv_file_path, 'rU'), dialect='excel')

output_csv 	= './output_shipmentDepart_' + str(time.localtime()) + '.csv'
csv_file 	= file (output_csv,"w")
writer 		= csv.writer(csv_file, quoting = csv.QUOTE_ALL)

counter 	= 3
start_time	= time.time()
last_time	= start_time

while counter <= 2000:
	POST_shipmentDepart(str(counter))
	writer.writerow([str(counter), str(time.time() - last_time)])
	last_time = time.time()
	counter += 1

csv_file.close()
print "Running time in total:", time.time() - start_time, "Number of ShipmentDepart TX:", counter