import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  students!: Student[];
  constructor(private http : HttpClient, private router : Router ) { }
  ngOnInit() {
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

}
