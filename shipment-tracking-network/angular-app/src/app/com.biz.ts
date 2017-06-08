// export namespace com.biz{
   export enum ShipmentContentsType {
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
      SIGNED_FOR,
   }
   export abstract class User {
      email: string;
      firstName: string;
      lastName: string;
   }
   export class PIC extends User {
      address: string;
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
      shipmentContentsType: ShipmentContentsType;
      shipmentStatus: ShipmentStatus;
      destination: Facility;
      currentLocation: Facility;
      person_in_charge: PIC;
   }
   export abstract class Transit {
      transactionId: string;
      logs: string[];
      from: Facility;
      to: Facility;
      shipment: Shipment;
      timestamp: Date;
   }
   export class ShipmentDepart extends Transit {
   }
   export class ShipmentArrive extends Transit {
   }
// }
