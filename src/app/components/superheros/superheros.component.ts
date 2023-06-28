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
  isLoading = false;

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

  /**
   * Obtiene todos los superhéroes.
   * @returns Un Observable que emite un arreglo de objetos Superhero.
   */
  getSuperheros(): void {
    this.isLoading = true;
    this.superheroService.getAllSuperheros().subscribe((superheroes) => {
      this.dataSource.data = superheroes;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  /**
   * Aplica el filtro de búsqueda en la tabla de superhéroes.
   * @param event El evento de cambio en el campo de búsqueda.
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Superhero, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  /**
   * Abre el diálogo para agregar un nuevo superhéroe.
   */
  openAddDialog() {
    const dialogRef = this.dialog.open(AddSuperheroDialogComponent, {
      width: '700px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: Superhero) => {
      if (result) {
        result.name = result.name.charAt(0).toUpperCase() + result.name.substring(1).toLowerCase();
        this.addSuperhero(result);
        setTimeout(() => {
          this.getSuperheros();
        }, 1000);
      }
    });
  }

  /**
   * Agrega un nuevo superhéroe.
   * @param superhero El objeto Superhero que se va a agregar.
   */
  addSuperhero(superhero: Superhero): void {
    this.superheroService.addSuperhero(superhero).subscribe((newSuperhero: Superhero) => {
      console.log('Nuevo superhéroe añadido: ' + newSuperhero);
    });
  }

  /**
   * Abre el diálogo de confirmación para eliminar un superhéroe.
   * @param superhero El superhéroe que se va a eliminar.
   */
  openDeleteConfirmationDialog(superhero: Superhero): void {
    this.data.message = `¿Estás seguro que quieres eliminar a ${superhero.name}?`;
    const dialogRef = this.dialog.open(this.deleteConfirmationDialogTemplate, {
      width: '500px',
      disableClose: true,
      data: this.data
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSuperhero(superhero.id);
      }
    });
  }

  /**
   * Elimina un superhéroe.
   * @param id El ID del superhéroe que se va a eliminar.
   */
  deleteSuperhero(id: string): void {
    this.superheroService.deleteSuperhero(id).subscribe(() => {
      this.getSuperheros();
    });
  }

  /**
   * Abre el diálogo de edición de un superhéroe.
   * @param superhero El superhéroe que se va a editar.
   */
  openEditDialog(superhero: Superhero): void {
    this.selectedSuperhero = { ...superhero };
    this.isEditing = true;
    const dialogRef = this.dialog.open(AddSuperheroDialogComponent, {
      width: '700px',
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

  /**
   * Edita un superhéroe.
   * @param superhero El objeto Superhero que se va a editar.
   */
  editSuperhero(superhero: Superhero): void {
    this.superheroService.editSuperhero(superhero).subscribe((editedSuperhero: Superhero) => {
      this.getSuperheros();
      console.log('superhéroe actulizado: ' + editedSuperhero);
    });
  }

  /**
   * Maneja el evento de cambio de página en la paginación de la tabla.
   * @param event El evento de cambio de página.
   */
  handlePageEvent(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
  }
}
