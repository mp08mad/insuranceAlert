import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddInsuranceComponent } from '../add-insurance/add-insurance.component';
import { AddInsuranceModule } from '../add-insurance/add-insurance.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    NgxDatatableModule,
    AddInsuranceModule
  ],
  declarations: [Tab1Page],
  entryComponents:[AddInsuranceComponent]
})
export class Tab1PageModule {

  
}
