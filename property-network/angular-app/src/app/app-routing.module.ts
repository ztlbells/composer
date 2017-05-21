import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { LandTitleComponent } from './LandTitle/LandTitle.component';
import { SalesAgreementComponent } from './SalesAgreement/SalesAgreement.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'LandTitle', component: LandTitleComponent},
		
		{ path: 'SalesAgreement', component: SalesAgreementComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
