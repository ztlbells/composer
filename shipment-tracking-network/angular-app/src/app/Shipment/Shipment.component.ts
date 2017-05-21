import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShipmentService } from './Shipment.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Shipment',
	templateUrl: './Shipment.component.html',
	styleUrls: ['./Shipment.component.css'],
  providers: [ShipmentService]
})
export class ShipmentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      trackingId = new FormControl("", Validators.required);
  
      shipmentType = new FormControl("", Validators.required);
  
      shipmentStatus = new FormControl("", Validators.required);
  
      location = new FormControl("", Validators.required);
  
      person_in_charge = new FormControl("", Validators.required);
  


  constructor(private serviceShipment:ShipmentService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          trackingId:this.trackingId,
        
    
        
          shipmentType:this.shipmentType,
        
    
        
          shipmentStatus:this.shipmentStatus,
        
    
        
          location:this.location,
        
    
        
          person_in_charge:this.person_in_charge
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceShipment.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "com.biz.Shipment",
      
        
          "trackingId":this.trackingId.value,
        
      
        
          "shipmentType":this.shipmentType.value,
        
      
        
          "shipmentStatus":this.shipmentStatus.value,
        
      
        
          "location":this.location.value,
        
      
        
          "person_in_charge":this.person_in_charge.value
        
      
    };

    this.myForm.setValue({
      
        
          "trackingId":null,
        
      
        
          "shipmentType":null,
        
      
        
          "shipmentStatus":null,
        
      
        
          "location":null,
        
      
        
          "person_in_charge":null
        
      
    });

    return this.serviceShipment.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "trackingId":null,
        
      
        
          "shipmentType":null,
        
      
        
          "shipmentStatus":null,
        
      
        
          "location":null,
        
      
        
          "person_in_charge":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.biz.Shipment",
      
        
          
        
    
        
          
            "shipmentType":this.shipmentType.value,
          
        
    
        
          
            "shipmentStatus":this.shipmentStatus.value,
          
        
    
        
          
            "location":this.location.value,
          
        
    
        
          
            "person_in_charge":this.person_in_charge.value
          
        
    
    };

    return this.serviceShipment.updateAsset(form.get("trackingId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceShipment.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceShipment.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "trackingId":null,
          
        
          
            "shipmentType":null,
          
        
          
            "shipmentStatus":null,
          
        
          
            "location":null,
          
        
          
            "person_in_charge":null 
          
        
      };



      
        if(result.trackingId){
          formObject.trackingId = result.trackingId;
        }else{
          formObject.trackingId = null;
        }
      
        if(result.shipmentType){
          formObject.shipmentType = result.shipmentType;
        }else{
          formObject.shipmentType = null;
        }
      
        if(result.shipmentStatus){
          formObject.shipmentStatus = result.shipmentStatus;
        }else{
          formObject.shipmentStatus = null;
        }
      
        if(result.location){
          formObject.location = result.location;
        }else{
          formObject.location = null;
        }
      
        if(result.person_in_charge){
          formObject.person_in_charge = result.person_in_charge;
        }else{
          formObject.person_in_charge = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "trackingId":null,
        
      
        
          "shipmentType":null,
        
      
        
          "shipmentStatus":null,
        
      
        
          "location":null,
        
      
        
          "person_in_charge":null 
        
      
      });
  }

}
