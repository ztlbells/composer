import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { SalesAgreement } from '../net.biz.digitalpropertynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SalesAgreementService {

	
		private NAMESPACE: string = 'SalesAgreement';
	



    constructor(private dataService: DataService<SalesAgreement>) {
    };

    public getAll(): Observable<SalesAgreement[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<SalesAgreement> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<SalesAgreement> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<SalesAgreement> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<SalesAgreement> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
