import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthService } from './core/service/auth.service';
import { HeaderService } from './core/service/header.service';
import { environment } from 'src/environments/environment.development';
export interface persons_detail {
  name: string;
  id: number;
  age: number;
  status: string;
}
const person: persons_detail[] = [
  { id: 1, name: 'Smart', age: 18, status: 'Active' },
  { id: 2, name: 'arockya', age: 18, status: 'Inactive' },
  { id: 3, name: 'Deepika', age: 18, status: 'Active' },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  input!: string;
  displayedColumns: string[] = ['id', 'name', 'age', 'status'];
  data = new MatTableDataSource<any>(person);
  api = environment.api;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private auth: AuthService,
    private headerService: HeaderService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.headerService.setheader(
      this.api + 'login',
      'content-type',
      'application/json'
    );
  }
  ngAfterViewInit(): void {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }
  isActive(action: string) {
    const filteredValue = person.filter((item) => item.status == action);
    this.data = new MatTableDataSource<any>(filteredValue);
    this.data.paginator = this.paginator;
  }
  onChange(e: any) {
    console.log(e);
    this.input = e.target.value;
    this.data.filter = this.input.trim();
  }
}
