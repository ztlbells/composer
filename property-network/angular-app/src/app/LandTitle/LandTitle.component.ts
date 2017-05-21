import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LandTitleService } from './LandTitle.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-LandTitle',
	templateUrl: './LandTitle.component.html',
	styleUrls: ['./LandTitle.component.css'],
  providers: [LandTitleService]
})
export class LandTitleComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      titleId = new FormControl("", Validators.required);
  
      owner = new FormControl("", Validators.required);
  
      information = new FormControl("", Validators.required);
  
      forSale = new FormControl("", Validators.required);
  


  constructor(private serviceLandTitle:LandTitleService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          titleId:this.titleId,
        
    
        
          owner:this.owner,
        
    
        
          information:this.information,
        
    
        
          forSale:this.forSale
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLandTitle.getAll()
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
      $class: "net.biz.digitalpropertynetwork.LandTitle",
      
        
          "titleId":this.titleId.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "information":this.information.value,
        
      
        
          "forSale":this.forSale.value
        
      
    };

    this.myForm.setValue({
      
        
          "titleId":null,
        
      
        
          "owner":null,
        
      
        
          "information":null,
        
      
        
          "forSale":null
        
      
    });

    return this.serviceLandTitle.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "titleId":null,
        
      
        
          "owner":null,
        
      
        
          "information":null,
        
      
        
          "forSale":null 
        
      
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
      $class: "net.biz.digitalpropertynetwork.LandTitle",
      
        
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "information":this.information.value,
          
        
    
        
          
            "forSale":this.forSale.value
          
        
    
    };

    return this.serviceLandTitle.updateAsset(form.get("titleId").value,this.asset)
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

    return this.serviceLandTitle.deleteAsset(this.currentId)
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

    return this.serviceLandTitle.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "titleId":null,
          
        
          
            "owner":null,
          
        
          
            "information":null,
          
        
          
            "forSale":null 
          
        
      };



      
        if(result.titleId){
          formObject.titleId = result.titleId;
        }else{
          formObject.titleId = null;
        }
      
        if(result.owner){
          formObject.owner = result.owner;
        }else{
          formObject.owner = null;
        }
      
        if(result.information){
          formObject.information = result.information;
        }else{
          formObject.information = null;
        }
      
        if(result.forSale){
          formObject.forSale = result.forSale;
        }else{
          formObject.forSale = null;
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
      
        
          "titleId":null,
        
      
        
          "owner":null,
        
      
        
          "information":null,
        
      
        
          "forSale":null 
        
      
      });
  }

}
