import { Component } from '@angular/core';
//import { facilityArray } from './facility-array.component';
//import { TableData } from './table-data.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
})
export class AppComponent  {
   filterCity: string;
   filterFacility: string;
   tfacility: string;
   tname: string;
   taddress: string;
   tcity: string;
   myExpression:string;

   flag:number = 0;
   fflag:number = 0;

   tabledata: TableData[];

   facilityarray: facilityArray[];

   temp: TableData[];
   filteredItems: TableData[];
    constructor(){
        this.tabledata = [];
        this.facilityarray = [];
    }

/* ---------------- Table data entry ---------------- */
  addDetails(name: string, address: string, city: string, facility: string):void {
    if(name != "" && address != "" && city !="" && (facility === "" && this.fflag === 1 )){
      if(this.flag === 1){
        this.clearFilter();
      }
      //let fdata = new facilityArray(facility);
      if(facility != ''){
        this.facilityarray.push( new facilityArray(facility) );
      }
      //let data = new TableData(name,address,city,this.facilityarray);
      this.tabledata.push( new TableData(name,address,city,this.facilityarray) );
      this.temp = this.tabledata;
      this.facilityarray = [];
      this.tfacility = this.tname = this.taddress = this.tcity = "";
      this.myExpression = "true";
    }
    else {
      alert("empty inputs");
    }
  }




/* ------------- Filter logic ---------------- */
Filter(city:string, ffacility:string):void{
      this.tabledata = this.temp;
      this.filteredItems = [];
      if(city != "" && ffacility != "") {
        //let flag = 0;
            this.tabledata.forEach(element => {
              if(city.toUpperCase() === element.city.toUpperCase()){
                element.facility.forEach(felement => {
                 if(ffacility.toUpperCase() === felement.facility.toUpperCase()){
                  this.filteredItems.push(element);
                  //console.log("1");
               }
              });
              }
            });
      }
      else if(city != "" || ffacility !="") {
        if(city != "") {
          this.tabledata.forEach(element => {
                if(city.toUpperCase() === element.city.toUpperCase()){
                  this.filteredItems.push(element);
               }
            });
        }
        else {
          //let temp = facility.toUpperCase();
          this.tabledata.forEach(element => {
                element.facility.forEach(felement => {
                  if(ffacility.toUpperCase() === felement.facility.toUpperCase()){
                    this.filteredItems.push(element);
                  }
                });
            });
        }
        //console.log(this.filteredItems);
        this.flag = 1;
      }
      else {
         this.filteredItems = this.tabledata;
      }
      //this.filterCity = this.filterFacility = "";
      //console.log(this.filteredItems);
      this.tabledata = this.filteredItems;
   }






/* -------------------- Filter reset ----------------- */
   clearFilter():void {
     this.flag = 0;
     this.tabledata = this.temp;
     this.filterCity = this.filterFacility = "";
   }

   addFacility(facility:string):void{
     if( facility != "" ){
       let data = new facilityArray(facility);
       this.facilityarray.push(data);
       this.tfacility = "";
       this.fflag = 1;
     }
     //console.log(this.facilityarray);
   }
  };
  

export class TableData{
    name: string;
    address: string;
    city: string;
    facility: facilityArray[];
    constructor(name:string, phone:string, city:string, facility:facilityArray[]){
        this.name = name;
        this.address = phone;
        this.city = city;
        this.facility = facility;
    }
}
export class facilityArray {
  facility: string;
  constructor(facility:string) {
    this.facility = facility;
  }
}

