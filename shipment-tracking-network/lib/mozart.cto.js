'use strict';

function onshipmentDeparture(shipmentDepart) {
  //console.log('onshipmentDeparture');
  if (shipmentDepart.shipment.shipmentStatus !== 'IN_STATION') {
    throw new Error('Shipment is already IN_TRANSIT');
  }

     // set the status of the shipment
  shipmentDepart.shipment.shipmentStatus = 'IN_TRANSIT';

     // save the shipment
  return getAssetRegistry('com.biz.Shipment')
  .then(function(ar) {
    return ar.update(shipmentDepart.shipment);
  })
  .then(function() {
    // add the shipment to the incoming shipments of the
    // facility heading to
    if (shipmentDepart.to.incomingShipments) {
      shipmentDepart.to.incomingShipments.push(shipmentDepart.shipment);
    } else {
      shipmentDepart.to.incomingShipments = [shipmentDepart.shipment];
    }
    
      // save the facility
     return getAssetRegistry('com.biz.Facility')
  })
  .then(function(br) {
    return br.update(shipmentDepart.to);
  });
}

function onshipmentArrival(shipmentArrive) {
  //console.log('onAnimalshipmentArrival');

  if (shipmentArrive.shipment.shipmentStatus !== 'IN_TRANSIT') {
    throw new Error('Shipment is not IN_TRANSIT');
  }

  shipmentArrive.shipment.shipmentStatus = 'IN_FIELD';

     // set the new PIC of the station where the shipment arrives
  shipmentArrive.shipment.person_in_charge = shipmentArrive.to.person_in_charge;

     // set the new location (facility) of the shipment 
  shipmentArrive.shipment.location = shipmentArrival.to;

  return getAssetRegistry('com.biz.Shipment')
  .then(function(ar) {
    return ar.update(shipmentArrive.shipment);
  })
  .then(function() {
    // remove the shipment from the incoming shipment of the 'to' facility
    if (!shipmentArrive.to.incomingShipments) {
      throw new Error('The facility should have incoming shipments.');
    }

    shipmentArrive.to.incomingShipments = shipmentArrive.to.incomingShipments
    .filter(function(shipment) {
      return shipment.trackingId !== shipmentArrival.shipment.trackingId;
    });

      // save the Facility
    return getAssetRegistry('com.biz.Facility');
  })
  .then(function(br) {
    return br.update(shipmentArrive.to);
  });
}
