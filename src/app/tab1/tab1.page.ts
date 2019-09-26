import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddInsuranceComponent } from '../add-insurance/add-insurance.component';
import { Insurance } from '../_models';
import { Storage } from '@ionic/storage';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  rows : any;
  columns: any;
  insurances: Insurance[] = [];
  subscription : Subscription;

  constructor(public modalController : ModalController, private storage : Storage) {
    this.populateInsurances();
  }
 ngOnInit(){

//this.rows = [...this.insurances];
  this.columns = [
    { name:"Nr Polita",prop: 'id' },
    { name: 'Nume si prenume', prop: "nameSurname" },
    { name: 'CNP', prop: "cnp" },
    { name: 'Telefon', prop: "phone" },
    { name: 'Mail', prop: "mail" },
    { name: 'Data expirare', prop: "endDate" },
  ];
 }

 ionViewWillEnter(){
   console.log("a intrat in will enter");
   this.populateInsurances();
  //this.rows = [...this.insurances];
 }
  public populateInsurances() {
    console.log("inainte: ",this.rows);
    
      this.rows=[];
      this.rows.push([]);
      this.insurances = [];
      console.log("dupa: ",this.rows);
        this.storage.forEach((value, key, index) => {
          let insurance = new Insurance(value.id, value.nameSurname, value.cnp, value.phone, value.mail, value.endDate);
          this.insurances.push(insurance);
          
        }).then(value => this.rows=[...this.insurances]);
    console.log("la final");
    
  }

  public addInsurance(event){
    this.insurances.push(event);
    console.log("insurances:", this.insurances);
    
    this.rows = [...this.rows, event];
    console.log("rows: ", this.rows);
    console.log("rows length: ", this.rows.length);
    
  }

  /*async presentModal() {
    
    const modal = await this.modalController.create({
      component: AddInsuranceComponent
    });
    return await modal.present();
  }*/


  


}
