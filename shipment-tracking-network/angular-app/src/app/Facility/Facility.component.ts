import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FacilityService } from './Facility.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Facility',
	templateUrl: './Facility.component.html',
	styleUrls: ['./Facility.component.css'],
  providers: [FacilityService]
})
export class FacilityComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      facilityId = new FormControl("", Validators.required);
  
      name = new FormControl("", Validators.required);
  
      incomingShipments = new FormControl("", Validators.required);
  
      person_in_charge = new FormControl("", Validators.required);
  


  constructor(private serviceFacility:FacilityService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          facilityId:this.facilityId,
        
    
        
          name:this.name,
        
    
        
          incomingShipments:this.incomingShipments,
        
    
        
          person_in_charge:this.person_in_charge
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceFacility.getAll()
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
      $class: "com.biz.Facility",
      
        
          "facilityId":this.facilityId.value,
        
      
        
          "name":this.name.value,
        
      
        
          "incomingShipments":this.incomingShipments.value,
        
      
        
          "person_in_charge":this.person_in_charge.value
        
      
    };

    this.myForm.setValue({
      
        
          "facilityId":null,
        
      
        
          "name":null,
        
      
        
          "incomingShipments":null,
        
      
        
          "person_in_charge":null
        
      
    });

    return this.serviceFacility.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "facilityId":null,
        
      
        
          "name":null,
        
      
        
          "incomingShipments":null,
        
      
        
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
      $class: "com.biz.Facility",
      
        
          
        
    
        
          
            "name":this.name.value,
          
        
    
        
          
            "incomingShipments":this.incomingShipments.value,
          
        
    
        
          
            "person_in_charge":this.person_in_charge.value
          
        
    
    };

    return this.serviceFacility.updateAsset(form.get("facilityId").value,this.asset)
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

    return this.serviceFacility.deleteAsset(this.currentId)
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

    return this.serviceFacility.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "facilityId":null,
          
        
          
            "name":null,
          
        
          
            "incomingShipments":null,
          
        
          
            "person_in_charge":null 
          
        
      };



      
        if(result.facilityId){
          formObject.facilityId = result.facilityId;
        }else{
          formObject.facilityId = null;
        }
      
        if(result.name){
          formObject.name = result.name;
        }else{
          formObject.name = null;
        }
      
        if(result.incomingShipments){
          formObject.incomingShipments = result.incomingShipments;
        }else{
          formObject.incomingShipments = null;
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
      
        
          "facilityId":null,
        
      
        
          "name":null,
        
      
        
          "incomingShipments":null,
        
      
        
          "person_in_charge":null 
        
      
      });
  }

}
