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
datasource = str(sys.argv[1])
# server addr
server = str(sys.argv[2])
# port
port = str(sys.argv[3])
########################################

csv_file_path      		= './sample_data/places/' + datasource + '.csv'
start_time				= time.time()


########### POST Facility #######################
def POST_shipmentDepart(fromStation, toStation, shipmentId):
	url 	= 'http://' + server + ':' + port + '/api/com.biz.ShipmentDepart'

	data 	=  {
			   "from": fromStation,
			   "to": toStation,
			   "shipment": shipmentId,
 			}
	r = requests.post(url, data)
	print r.text



########### reading csv part ##################
reader = csv.reader(open(csv_file_path, 'rU'), dialect='excel')

counter = 0
for line in reader :
    if line[0] != 'id':
    	POST_Facility(line[0], line[1], line[2])
    	counter += 1
    	print counter, "running time:", time.time() - start_time


print "Running time in total:", time.time() - start_time, "Number of Facilities:", counter