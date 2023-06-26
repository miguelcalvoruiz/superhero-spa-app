import { Component, OnInit, ViewChild } from '@angular/core';
import { Superhero } from 'src/app/models/superhero';
import { SuperheroService } from 'src/app/services/superhero.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSuperheroDialogComponent } from './add-superhero-dialog/add-superhero-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-superheros',
  templateUrl: './superheros.component.html',
  styleUrls: ['./superheros.component.css']
})
export class SuperherosComponent implements OnInit {
  dataSource: MatTableDataSource<Superhero>;
  displayedColumns: string[] = ['name', 'powers', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private superheroService: SuperheroService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Superhero>();
  }

  ngOnInit(): void {
    this.getSuperheroes();
  }

  getSuperheroes(): void {
    this.superheroService.getAllSuperheros().subscribe((superheros) => {
      this.dataSource.data = superheros;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddSuperheroDialogComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: Superhero) => {
      if (result) {
        this.addSuperhero(result);
        setTimeout(() => {
          this.getSuperheroes();
        }, 1000);
      }
    });
  }

  addSuperhero(superhero: Superhero): void {
    this.superheroService.addSuperhero(superhero).subscribe((newSuperhero: Superhero) => {
      console.log('Nuevo superhero añadido: ' + newSuperhero);
    });
  }

  handlePageEvent(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
  }
}
