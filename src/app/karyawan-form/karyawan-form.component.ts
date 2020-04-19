import { Component, OnInit } from '@angular/core';
import {  Karyawan } from '../karyawan';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-karyawan-form',
  templateUrl: './karyawan-form.component.html',
  styleUrls: ['./karyawan-form.component.scss']
})
export class KaryawanFormComponent implements OnInit {
  karyawan: Karyawan = {
    _id: '',
    nama: '',
    divisi: 'it',
    gajipokok: '',
    tunjangan: ''
  };
  id = null;
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
    karyawanForm=this.formBuilder.group({
      nama: ["", [Validators.required, Validators.minLength(5)]],
      divisi: ["", [Validators.required]],
      gajipokok: ["", [Validators.required]],
      tunjangan: ["", [Validators.required]],
      check: [false, [Validators.requiredTrue]],
    })
    nama = this.karyawanForm.get("nama");
    divisi = this.karyawanForm.get("divisi");
    gajipokok = this.karyawanForm.get("gajipokok");
    tunjangan = this.karyawanForm.get("tunjangan");
    check = this.karyawanForm.get("check");
    
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // jika ada parameter id di URL
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getKaryawan(this.id).subscribe(
          response => {
            this.karyawan = response as Karyawan;
          },
          err => {
            console.log(err);
            this.error = true;
          }
        );
      } else {
        this.update = false;
      }
    });
  }

  postKaryawan() {
    this.ds.postKaryawan(this.karyawan).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Karyawan Added", null)
      this.router.navigate(['/home']);
    });
  }

  deleteKaryawan() {
    this.ds.deleteKaryawan(this.karyawan).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Karyawan Deleted", null)
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateKaryawan() {
    this.ds.updateKaryawan(this.karyawan).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Karyawan Updated", null)
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
