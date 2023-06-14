import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  form: FormGroup;
  id : number;
  eligibleDate : string;
  studentData : Student;
  constructor(private datePipe : DatePipe, private http: HttpClient, private router : Router ,private acroute : ActivatedRoute) { }

  async ngOnInit() {
    this.id = +this.acroute.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      name : new FormControl(null,Validators.required),
      age : new FormControl(null,[Validators.required,Validators.min(18),Validators.max(45)]),
      dob : new FormControl(null,Validators.required),
      course : new FormControl(null,[Validators.required,Validators.minLength(3)])
    });
    this.studentData = await this.http.get<Student>('https://localhost:7136'+`/api/Students/GetStudent/${this.id}`).toPromise();
    this.setstudentData();
    var currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    this.eligibleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  }
  Sub()
  {
    this.studentData = {
      studentId : this.studentData.studentId,
      name : this.form.get('name').value,
      age  : +this.form.get('age').value,
      dob : this.form.get('dob').value,
      course : this.form.get('course').value
    };
    this.http.put('https://localhost:7136'+`/api/Students/UpdateStudent/${this.studentData.studentId}`,this.studentData).subscribe((res)=>{
      alert('Record Updated Successfully!!');
      this.router.navigate(['.']);
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

  setstudentData()
  {
    this.form.get('name').setValue(this.studentData.name);
    this.form.get('age').setValue(this.studentData.age);
    this.form.get('dob').setValue(this.studentData.dob);
    this.form.get('course').setValue(this.studentData.course);
  }

  async redirect(_id : number)
  {
      this.router.navigate(['/Details/'+_id]);
      try{
      this.studentData = await this.http.get<Student>('https://localhost:7136'+`/api/Students/GetStudent/${_id}`).toPromise();
      }
      catch
      {
        alert("Data not Available\nRedirecting to Home");
        this.router.navigate(['/']);
      }
      this.setstudentData();
  }
}
