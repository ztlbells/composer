'use strict';

function onshipmentDeparture(shipmentTransit) {
  //console.log('onshipmentDeparture');
  if (shipmentTransit.shipment.shipmentStatus !== 'IN_STATION') {
    throw new Error('Shipment is already IN_TRANSIT');
  }

     // set the status of the shipment
  shipmentTransit.shipment.shipmentStatus = 'IN_TRANSIT';

     // save the shipment
  return getAssetRegistry('com.biz.Shipment')
  .then(function(ar) {
    return ar.update(shipmentTransit.shipment);
  })
  .then(function() {
    // add the shipment to the incoming shipments of the
    // facility heading to
    if (shipmentTransit.to.incomingShipments) {
      shipmentTransit.to.incomingShipments.push(shipmentTransit.shipment);
    } else {
      shipmentTransit.to.incomingShipments = [shipmentTransit.shipment];
    }
    
      // save the facility
     return getAssetRegistry('com.biz.Facility')
  })
  .then(function(br) {
    return br.update(shipmentTransit.to);
  });
}

function onshipmentArrival(shipmentTransit) {
  //console.log('onAnimalshipmentArrival');

  if (shipmentTransit.shipment.shipmentStatus !== 'IN_TRANSIT') {
    throw new Error('Shipment is not IN_TRANSIT');
  }

  shipmentTransit.shipment.shipmentStatus = 'IN_FIELD';

     // set the new PIC of the station where the shipment arrives
  shipmentTransit.shipment.person_in_charge = shipmentTransit.to.person_in_charge;

     // set the new location (facility) of the shipment 
  shipmentTransitl.shipment.location = shipmentArrival.to;

  return getAssetRegistry('com.biz.Shipment')
  .then(function(ar) {
    return ar.update(shipmentTransit.shipment);
  })
  .then(function() {
    // remove the shipment from the incoming shipment of the 'to' facility
    if (!shipmentTransit.to.incomingShipments) {
      throw new Error('The facility should have incoming shipments.');
    }

    shipmentTransit.to.incomingShipments = shipmentTransit.to.incomingShipments
    .filter(function(shipment) {
      return shipment.trackingId !== shipmentArrival.shipment.trackingId;
    });

      // save the Facility
    return getAssetRegistry('com.biz.Facility');
  })
  .then(function(br) {
    return br.update(shipmentTransit.to);
  });
}
