import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddInsuranceComponent } from '../add-insurance/add-insurance.component';
import { Tab1PageModule } from '../tab1/tab1.module';
import { AddInsuranceModule } from '../add-insurance/add-insurance.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    NgxDatatableModule,
    Tab1PageModule,
    AddInsuranceModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
