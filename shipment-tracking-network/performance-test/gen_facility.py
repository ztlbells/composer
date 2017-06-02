
# This script is to create Facility in shipment-tracking-network
# POST URL: http://server:port/api/com.biz.Facility
#{
#  "facilityId": "string",
#  "name": "string",
#  "person_in_charge": "string" #identified by email
#}
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
def POST_Facility(facilityId, name, person_in_charge):
	url 	= 'http://' + server + ':' + port + '/api/com.biz.Facility'

	data 	= {
 		"facilityId": str(facilityId),
 		"name": str(name),
 		"person_in_charge": str(person_in_charge) 
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