// export namespace com.biz{
   export enum ShipmentType {
      AMBIENT,
      CHEMICALS,
      ELECTRONIC_COMPONETS,
      METALS,
      ENGINEERING_SUBASSMEBLIES,
      BULK_PRODUCT,
   }
   export enum ShipmentStatus {
      IN_STATION,
      IN_TRANSIT,
   }
   export abstract class User {
      email: string;
      firstName: string;
      lastName: string;
   }
   export class PIC extends User {
      address1: string;
      address2: string;
      county: string;
      postcode: string;
   }
   export class Facility {
      facilityId: string;
      name: string;
      incomingShipments: Shipment[];
      person_in_charge: PIC;
   }
   export class Shipment {
      trackingId: string;
      shipmentType: ShipmentType;
      shipmentStatus: ShipmentStatus;
      location: Facility;
      person_in_charge: PIC;
   }
   export abstract class TransitShipment {
      transactionId: string;
      logs: string[];
      shipment: Shipment;
      from: Facility;
      to: Facility;
      timestamp: Date;
   }
   export class ShipmentDeparture extends TransitShipment {
      fromFacility: Facility;
   }
   export class ShipmentArrival extends TransitShipment {
      arrivalFacility: Facility;
   }
   export class SetupDemo {
      transactionId: string;
      timestamp: Date;
   }
// }
