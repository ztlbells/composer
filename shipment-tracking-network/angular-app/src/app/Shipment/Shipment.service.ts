import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Shipment } from '../com.biz';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ShipmentService {

	
		private NAMESPACE: string = 'com.biz.Shipment';
	



    constructor(private dataService: DataService<Shipment>) {
    };

    public getAll(): Observable<Shipment[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Shipment> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Shipment> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Shipment> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Shipment> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
