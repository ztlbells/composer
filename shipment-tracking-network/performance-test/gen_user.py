
# This script is to create PIC in shipment-tracking-network
# POST URL: http://server:port/api/PIC
import json, urllib2, httplib, csv, requests
import sys, time

########### argv #######################
# which country ?
datasource = str(sys.argv[1])
# server addr
server = str(sys.argv[2])
# port
port = str(sys.argv[3])
########################################

csv_file_path      		= './sample_data/people/' + datasource + '-500.csv'
#output_csv 				= './output_' + str(time.localtime()) + '.csv'
start_time				= time.time()


########### POST PIC #######################
def POST_PIC(address, county, postcode, email, firstName, lastName):
	url 	= 'http://' + server + ':' + port + '/api/com.biz.PIC'

	data 	= {
    "address": address,
    "county": county,
    "postcode": postcode,
    "email": email,
    "firstName": firstName,
    "lastName": lastName
}
	r = requests.post(url, data)
	print r.text



########### reading csv part ##################
reader = csv.reader(open(csv_file_path, 'rU'), dialect='excel')

counter = 0
for line in reader :
    if line[0] != 'first_name':
    	POST_PIC(line[3], line[5], line[7], line[10], line[0], line[1])
    	counter += 1
    	print counter, "running time:", time.time() - start_time

#csv_file.close()

print "Running time in total:", time.time() - start_time, "Number of PICs in " + datasource +" :", counter