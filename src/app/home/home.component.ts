import { Component, OnInit, ViewChild } from '@angular/core';
import { Karyawan } from '../karyawan';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  karyawans: Karyawan[];
  error:boolean;
  displayedColumns: string[] = ['nama', 'divisi', 'gajipokok', 'tunjangan'];
                    

  constructor(
    private ds: DataService,
  ) {}

  ngOnInit(): void {
    this.ds.getKaryawans().subscribe(
      response => {
        this.karyawans = response as Karyawan[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    );
  }

}
