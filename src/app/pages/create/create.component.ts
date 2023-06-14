import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  eligibleDate : string;
  newstudent : Student;
  constructor(private datePipe : DatePipe, private http: HttpClient, private router : Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name : new FormControl(null,Validators.required),
      age : new FormControl(null,[Validators.required,Validators.min(18),Validators.max(45)]),
      dob : new FormControl(null,Validators.required),
      course : new FormControl(null,[Validators.required,Validators.minLength(3)])
    });
    var currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    this.eligibleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  }
  Sub()
  {
    this.newstudent = {
      studentId : 0,
      name : this.form.get('name').value,
      age  : +this.form.get('age').value,
      dob : this.form.get('dob').value,
      course : this.form.get('course').value
    };
    this.http.post('https://localhost:7136'+'/api/Students/AddStudent',this.newstudent).subscribe((res)=>{
      alert('Record Added Successfully!!');
      this.router.navigate[('/')];
    },
    (error)=>{
      alert('Name is Already Used Or Other Errors\nFor More Info Go to Console');
      console.log(JSON.stringify(error));
    });
  }

  setAge()
  {
    var _age = new Date().getFullYear() - new Date(this.form.get('dob').value).getFullYear();
    if(new Date().getMonth() <  new Date(this.form.get('dob').value).getMonth()) _age--;
    this.form.get('age').setValue(_age);
  }

  setDob()
  {
    var _year = new Date().getFullYear() - this.form.get('age').value;
    var curr = new Date();
    var _dob = curr.setFullYear(_year);
    this.form.get('dob').setValue(this.datePipe.transform(_dob, 'yyyy-MM-dd'));
  }
}
