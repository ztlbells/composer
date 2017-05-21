import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SalesAgreementService } from './SalesAgreement.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-SalesAgreement',
	templateUrl: './SalesAgreement.component.html',
	styleUrls: ['./SalesAgreement.component.css'],
  providers: [SalesAgreementService]
})
export class SalesAgreementComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      salesId = new FormControl("", Validators.required);
  
      buyer = new FormControl("", Validators.required);
  
      seller = new FormControl("", Validators.required);
  
      title = new FormControl("", Validators.required);
  


  constructor(private serviceSalesAgreement:SalesAgreementService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          salesId:this.salesId,
        
    
        
          buyer:this.buyer,
        
    
        
          seller:this.seller,
        
    
        
          title:this.title
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceSalesAgreement.getAll()
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
      $class: "net.biz.digitalpropertynetwork.SalesAgreement",
      
        
          "salesId":this.salesId.value,
        
      
        
          "buyer":this.buyer.value,
        
      
        
          "seller":this.seller.value,
        
      
        
          "title":this.title.value
        
      
    };

    this.myForm.setValue({
      
        
          "salesId":null,
        
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "title":null
        
      
    });

    return this.serviceSalesAgreement.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "salesId":null,
        
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "title":null 
        
      
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
      $class: "net.biz.digitalpropertynetwork.SalesAgreement",
      
        
          
        
    
        
          
            "buyer":this.buyer.value,
          
        
    
        
          
            "seller":this.seller.value,
          
        
    
        
          
            "title":this.title.value
          
        
    
    };

    return this.serviceSalesAgreement.updateAsset(form.get("salesId").value,this.asset)
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

    return this.serviceSalesAgreement.deleteAsset(this.currentId)
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

    return this.serviceSalesAgreement.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "salesId":null,
          
        
          
            "buyer":null,
          
        
          
            "seller":null,
          
        
          
            "title":null 
          
        
      };



      
        if(result.salesId){
          formObject.salesId = result.salesId;
        }else{
          formObject.salesId = null;
        }
      
        if(result.buyer){
          formObject.buyer = result.buyer;
        }else{
          formObject.buyer = null;
        }
      
        if(result.seller){
          formObject.seller = result.seller;
        }else{
          formObject.seller = null;
        }
      
        if(result.title){
          formObject.title = result.title;
        }else{
          formObject.title = null;
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
      
        
          "salesId":null,
        
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "title":null 
        
      
      });
  }

}
