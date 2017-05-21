import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Facility } from '../com.biz';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class FacilityService {

	
		private NAMESPACE: string = 'com.biz.Facility';
	



    constructor(private dataService: DataService<Facility>) {
    };

    public getAll(): Observable<Facility[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Facility> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Facility> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Facility> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Facility> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
