import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  students!: Student[];
  push : boolean = false;
  form : FormGroup = new FormGroup({
    key : new FormControl(null,Validators.required)
  });
  constructor(private http : HttpClient, private router : Router ) { }
  ngOnInit() {
    this.push = false;
    this.http.get<Student[]>('https://localhost:7136'+'/api/Students/GetAllStudents').subscribe(res=>{
      this.students = res;
    });
  }
  Delete(_id : number)
  {

     if(window.confirm('You are About to Delete the Record,It irreversible.\nDo You Want to Continue?'))
      {
        this.http.delete<Student[]>('https://localhost:7136'+`/api/Students/DeleteStudent/${_id}`).subscribe(res=>{
          alert("Record Deleted Successfully");
         this.ngOnInit();
        });
      }
      else
      alert("Action Cancelled!");
  }
  Sub(){
    this.http.get<Student[]>('https://localhost:7136'+`/api/Students/SearchStudent/${this.form.get('key').value}`).subscribe(res=>{
      this.students = res;
    });
    this.push = true;
  }
}
