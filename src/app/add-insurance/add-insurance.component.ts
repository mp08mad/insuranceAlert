import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Insurance } from '../_models';
import { Storage } from '@ionic/storage';
import { Tab1Page } from '../tab1/tab1.page';
import { Router } from '@angular/router';


@Component({
  selector: 'add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss'],
})
export class AddInsuranceComponent implements OnInit {

  minDate: string;
  insuranceForm: FormGroup;
  @Output()
  addedInsurance : EventEmitter<Insurance> = new EventEmitter<Insurance>();
  tab1Comp : Tab1Page;

  constructor(public modalController : ModalController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router) { this.tab1Comp = new Tab1Page(modalController, storage); }

  ngOnInit() {
    this.tab1Comp = new Tab1Page(this.modalController, this.storage); 
    this.minDate = moment().format("YYYY-MM-DD");
    this.insuranceForm = this.formBuilder.group({
      id : ['', Validators.required],
      nameSurname : ['', Validators.required],
      cnp : ['', [Validators.required, validCNP]],
      phone : ['', [Validators.required, Validators.pattern('^(?:[0-9] ?){9,14}[0-9]$')]],
      mail : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      endDate : [this.minDate, Validators.required]
    });
    
  }

onSubmit(){
  if(this.insuranceForm.invalid){
    return;
  }

  this.storage.set(this.insuranceForm.value.id,this.insuranceForm.value);
  this.router.navigate(['/tabs/tab1']);
  this.tab1Comp.ionViewWillEnter();
  //this.addedInsurance.emit(this.insuranceForm.value);
  //this.tab1Comp.populateInsurances();
 // this.dismissModal();
}



  /*dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }*/

  

}

function validCNP( c : FormControl ) {
  let p_cnp = c.value;
  var i=0 , year=0 , hashResult=0 , cnp=[] , hashTable=[2,7,9,1,4,6,3,5,8,2,7,9];
  if( p_cnp.length !== 13 ) { return { validCNP: {valid: false } }; }
  for( i=0 ; i<13 ; i++ ) {
      cnp[i] = parseInt( p_cnp.charAt(i) , 10 );
      if( isNaN( cnp[i] ) ) { return { validCNP: {valid: false } }; }
      if( i < 12 ) { hashResult = hashResult + ( cnp[i] * hashTable[i] ); }
  }
  hashResult = hashResult % 11;
  if( hashResult === 10 ) { hashResult = 1; }
  year = (cnp[1]*10)+cnp[2];
  switch( cnp[0] ) {
      case 1  : case 2 : { year += 1900; } break;
      case 3  : case 4 : { year += 1800; } break;
      case 5  : case 6 : { year += 2000; } break;
      case 7  : case 8 : case 9 : { year += 2000; if( year > ( parseInt( new Date().getFullYear().toString() , 10 ) - 14 ) ) { year -= 100; } } break;
      default : { return { validCNP: {valid: false } }; }
  }
  if( year < 1800 || year > 2099 ) { return { validCNP: {valid: false } }; }
  return ( cnp[12] === hashResult ? null : { validCNP: {valid: false } });
}
