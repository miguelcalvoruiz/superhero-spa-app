import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  data: { message: string } = { message: '' };
  isEditing = false;
  selectedSuperhero: Superhero | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('deleteConfirmationDialogTemplate') deleteConfirmationDialogTemplate!: TemplateRef<any>;

  constructor(
    private superheroService: SuperheroService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Superhero>();
  }

  ngOnInit(): void {
    this.getSuperheros();
  }

  getSuperheros(): void {
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
          this.getSuperheros();
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

  openDeleteConfirmationDialog(superhero: Superhero): void {
    this.data.message = `¿Estás seguro que quieres eliminar a ${superhero.name}?`;
    const dialogRef = this.dialog.open(this.deleteConfirmationDialogTemplate, {
      width: '500px',
      disableClose: true,
      data: this.data
    });
    console.log(this.data);
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.deleteSuperhero(superhero.id);
      }
    });
  }

  deleteSuperhero(id: string): void {
    this.superheroService.deleteSuperhero(id).subscribe(() => {
      this.getSuperheros();
    });
  }

  openEditDialog(superhero: Superhero): void {
    this.selectedSuperhero = {...superhero};
    this.isEditing = true;
    const dialogRef = this.dialog.open(AddSuperheroDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        superhero: this.selectedSuperhero
      }
    });
    dialogRef.afterClosed().subscribe((result: Superhero) => {
      if (result) {
        this.editSuperhero(result);
      }
      this.isEditing = false;
      this.selectedSuperhero = null;
    });
  }

  editSuperhero(superhero: Superhero): void {
    this.superheroService.editSuperhero(superhero).subscribe((editedSuperhero: Superhero) => {
      console.log('Superheroe actualizado: ' + editedSuperhero);
      this.getSuperheros();      
    })
  }
}
