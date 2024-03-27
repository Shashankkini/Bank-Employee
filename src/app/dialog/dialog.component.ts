import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
//import { ApiService } from '../services/service.service';//src\app\services\service.service.ts
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  

  constructor(
   private formBuilder : FormBuilder ,
    private api :ApiService,
    private dialogRef : MatDialogRef<DialogComponent>,
    @Inject( MAT_DIALOG_DATA) public editData:any
    ) { }

  
  employeeForm !: FormGroup
  actionButton:string='Save'


  ngOnInit(): void {
     this.employeeForm=this.formBuilder.group({
       firstName:['',Validators.required],
       lastName:['',Validators.required],
        email:['',Validators.required],
        phNo:['',Validators.required],
 })
    if(this.editData){
      this.actionButton='Update';
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['phNo'].setValue(this.editData.phNo);
      this.employeeForm.controls['email'].setValue(this.editData.email);
     
    }
   }

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
    }else{
      this.updateData();
    }
  
  }

  updateData(){
    this.api.putData(this.employeeForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Product Updated Successfully");
        this.employeeForm.reset();
        this.dialogRef.close('update');
        
      },
      error:()=>{
        alert('Error Occured During Updation');
      }
    })
  }
}


