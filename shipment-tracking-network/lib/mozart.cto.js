'use strict';

function onShipmentDeparture(movementDeparture) {
  console.log('onShipmentDeparture');
  if (movementDeparture.animal.movementStatus !== 'IN_STATION') {
    throw new Error('Shipment is already IN_TRANSIT');
  }

     // set the status of the shipment
  movementDeparture.shipment.shipmentStatus = 'IN_TRANSIT';

     // save the shipment
  return getAssetRegistry('com.biz.Shipment')
  .then(function(ar) {
    return ar.update(movementDeparture.shipment);
  })
  .then(function() {
    // add the shipment to the incoming shipments of the
    // destination facility
    if (movementDeparture.to.incomingShipments) {
      movementDeparture.to.incomingShipments.push(movementDeparture.shipment);
    } else {
      movementDeparture.to.incomingShipments = [movementDeparture.shipment];
    }
    
      // save the facility
     return getAssetRegistry('com.biz.Facility')
  })
  .then(function(br) {
    return br.update(movementDeparture.to);
  });
}

function onShipmentArrival(movementArrival) {
  console.log('onAnimalMovementArrival');

  if (movementDeparture.animal.movementStatus !== 'IN_TRANSIT') {
    throw new Error('Shipment is not IN_TRANSIT');
  }

  movementDeparture.shipment.shipmentStatus = 'IN_FIELD';

     // set the new PIC of the station where the shipment arrives
  movementArrival.shipment.person_in_charge = movementArrival.to.person_in_charge;

     // set the new location (facility) of the shipment 
  movementArrival.animal.location = movementArrival.arrivalFacility;

  return getAssetRegistry('com.biz.Shipment')
  .then(function(ar) {
    return ar.update(movementArrival.shipment);
  })
  .then(function() {
    // remove the shipment from the incoming shipment of the 'to' facility
    if (!movementArrival.to.incomingShipments) {
      throw new Error('The facility should have incoming shipments.');
    }

    movementArrival.to.incomingShipments = movementArrival.to.incomingShipments
    .filter(function(shipment) {
      return shipment.trackingId !== movementArrival.shipment.trackingId;
    });

      // save the Facility
    return getAssetRegistry('com.biz.Facility');
  })
  .then(function(br) {
    return br.update(movementArrival.to);
  });
}
