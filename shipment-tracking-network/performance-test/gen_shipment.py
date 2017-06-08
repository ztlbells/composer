# This script is to create Shipment in shipment-tracking-network
# POST URL: http://server:port/api/com.biz.Shipment
#{
#  "trackingId": "string",
#  "shipmentContentsType": "string",
#  "shipmentStatus": "string",
#  "destination": "string",
#  "currentLocation": "string",
#  "person_in_charge": "string"
#}
import json, urllib2, httplib, csv, requests
import sys, time, random

########### argv #######################
datasource = str(sys.argv[1])
# server addr
server = str(sys.argv[2])
# port
port = str(sys.argv[3])
########################################

csv_file_path      		= './sample_data/places/' + datasource + '.csv'
output_csv 				= './output_shipment_generation_' + str(time.localtime()) + '.csv'
start_time				= time.time()


########### POST Shipment #######################
def POST_Shipment(trackingId, stationName, person_in_charge):
	url 	= 'http://' + server + ':' + port + '/api/com.biz.Shipment'

	data 	= {
  			"trackingId": str(trackingId),
			"shipmentContentsType": gen_Shipment_Contents_Type(),
			"shipmentStatus": "IN_STATION",
			"destination": "2601",
			"currentLocation": str(trackingId),
			"person_in_charge": str(person_in_charge) 
    }
	r = requests.post(url, data)
	print r.text

def gen_Shipment_Contents_Type():
	ShipmentType = ["AMBIENT", "CHEMICALS", "ELECTRONIC_COMPONETS", "METALS", \
					"ENGINEERING_SUBASSMEBLIES", "BULK_PRODUCT"]
	return ShipmentType[random.randint(0,5)]


########### reading csv part ##################
reader = csv.reader(open(csv_file_path, 'rU'), dialect='excel')

counter = 0
for line in reader :
    if line[0] != 'id' and counter <= 2000:
    	POST_Shipment(line[0], line[1], line[2])
    	counter += 1
    	print counter, "running time:", time.time() - start_time


print "Running time in total:", time.time() - start_time, "Number of shipments:", counter