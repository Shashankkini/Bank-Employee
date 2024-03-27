import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { ApiService } from './services/api.service'; 
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import {ThemeComponent} from './theme/theme.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Employee';

 // userId: number = 0;
  colors: String='primary'

  displayedColumns: string[] = ['firstName', 'lastName', 'phNo', 'email','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


constructor(private dialog : MatDialog ,private api:ApiService,private router: Router
  ){

}

ngOnInit(): void {
  this.getAllEmployee();
}

editEmployee(row : any){
  this.dialog.open(DialogComponent,{
   width:'30%',
   data:row
  }).afterClosed().subscribe(val=>{
    if(val=='update'){
      this.getAllEmployee();
    }
  })
  
  
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}




// openDialog() {
//   const dialogRef = this.dialog.open(DialogComponent,{width:'30%'});


// }

openDialog() {
  const dialogRef = this.dialog.open(DialogComponent,{
    width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val=='save'){
      this.getAllEmployee();
    }
  })
}

getAllEmployee(){
 this.api.getEmployee().subscribe({
    next:(res)=>{
       this.dataSource=new MatTableDataSource(res);
       this.dataSource.paginator=this.paginator;
       this.dataSource.sort=this.sort;
    
      
    },
    error:()=>{
      alert('Error While Saving the product !!')
    }
  })

}

deleteEmployee(id:number){
  this.api.deleteEmployeeById(id).subscribe({
    next:(res)=>{
      alert("Employee Deleted Succesfully");
      this.getAllEmployee();
    },
  error:()=>{
    alert('Error While Saving the product !!')
  }
})

}

// getElementById(){

//   console.log();
//   this.api.getEmployeeById(this.userId).subscribe({
//     next:(res)=>{
//       alert("Element Search Successful");
  
//     },
//   error:()=>{
//     alert('No Element with this Id !!')
//   }
// })

// }

// redirectToEmployeeProfile(){

// this.router.navigate(['/profile']);
// }

homePage(){
  return this.router.url==="/"
}

themeSetting(){

  const dialogRef = this.dialog.open(ThemeComponent,{
    width:'300px',
    panelClass: 'custom-dialog-container'
   // data :{ key:}
  }).afterClosed().subscribe({next:(val)=>{
    if(val== undefined){
      this.colors=this.colors
    }else
     {
      this.colors=val
    }
      this.settingOtherColors(this.colors);
    
  },
  error:()=>{
     alert("Error");

  }
}
  )
  
  /*
  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value).subscribe({
          next:(res)=>{
            alert('Product Added Successfully');
            this.employeeForm.reset();
            this.dialogRef.close('save');
            
          },
          error:()=>{
            alert("Error Occured While Adding Product");
  
          }
        })
     }
  */
}
 otherColors: String='white'
 buttonColors: String='white'
 footerColor: String='#3f51b5'
settingOtherColors(color: String){

  if(color=='accent'){
    this.otherColors='#3f51b5'
    this.buttonColors='primary'
    this.footerColor='#ff4081'
  }
  if(color=='primary'){
    this.otherColors='white'
    this.buttonColors='white'
    this.footerColor='#3f51b5'
  }
  if(color=='warn'){
    this.otherColors='#3f51b5'
    this.buttonColors='primary' 
    this.footerColor='#f44336'
  }
}

}
