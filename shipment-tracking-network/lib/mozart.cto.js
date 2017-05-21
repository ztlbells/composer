'use strict';

function onshipmentDeparture(shipmentDeparture) {
  console.log('onshipmentDeparture');
  if (shipmentDeparture.shipment.shipmentStatus !== 'IN_STATION') {
    throw new Error('Shipment is already IN_TRANSIT');
  }

     // set the status of the shipment
  shipmentDeparture.shipment.shipmentStatus = 'IN_TRANSIT';

     // save the shipment
  return getAssetRegistry('com.biz.Shipment')
  .then(function(ar) {
    return ar.update(shipmentDeparture.shipment);
  })
  .then(function() {
    // add the shipment to the incoming shipments of the
    // destination facility
    if (shipmentDeparture.to.incomingShipments) {
      shipmentDeparture.to.incomingShipments.push(shipmentDeparture.shipment);
    } else {
      shipmentDeparture.to.incomingShipments = [shipmentDeparture.shipment];
    }
    
      // save the facility
     return getAssetRegistry('com.biz.Facility')
  })
  .then(function(br) {
    return br.update(shipmentDeparture.to);
  });
}

function onshipmentArrival(shipmentArrival) {
  console.log('onAnimalshipmentArrival');

  if (shipmentDeparture.shipment.shipmentStatus !== 'IN_TRANSIT') {
    throw new Error('Shipment is not IN_TRANSIT');
  }

  shipmentDeparture.shipment.shipmentStatus = 'IN_FIELD';

     // set the new PIC of the station where the shipment arrives
  shipmentArrival.shipment.person_in_charge = shipmentArrival.to.person_in_charge;

     // set the new location (facility) of the shipment 
  shipmentArrival.shipment.location = shipmentArrival.arrivalFacility;

  return getAssetRegistry('com.biz.Shipment')
  .then(function(ar) {
    return ar.update(shipmentArrival.shipment);
  })
  .then(function() {
    // remove the shipment from the incoming shipment of the 'to' facility
    if (!shipmentArrival.to.incomingShipments) {
      throw new Error('The facility should have incoming shipments.');
    }

    shipmentArrival.to.incomingShipments = shipmentArrival.to.incomingShipments
    .filter(function(shipment) {
      return shipment.trackingId !== shipmentArrival.shipment.trackingId;
    });

      // save the Facility
    return getAssetRegistry('com.biz.Facility');
  })
  .then(function(br) {
    return br.update(shipmentArrival.to);
  });
}
