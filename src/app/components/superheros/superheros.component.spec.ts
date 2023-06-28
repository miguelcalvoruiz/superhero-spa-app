import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperherosComponent } from './superheros.component';
import { Superhero } from 'src/app/models/superhero';
import { SuperheroService } from 'src/app/services/superhero.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('SuperherosComponent', () => {
  let component: SuperherosComponent;
  let fixture: ComponentFixture<SuperherosComponent>;
  let superheroService: SuperheroService;
  let dialog: MatDialog;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const superheroServiceSpy = jasmine.createSpyObj('SuperheroService', ['getAllSuperheros', 'addSuperhero', 'deleteSuperhero', 'editSuperhero']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [SuperherosComponent],
      providers: [
        { provide: SuperheroService, useValue: superheroServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    }).compileComponents();

    superheroService = TestBed.inject(SuperheroService) as jasmine.SpyObj<SuperheroService>;
    dialog = TestBed.inject(MatDialog);
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperherosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get superheros on initialization', () => {
    const superheros: Superhero[] = [
      new Superhero('1', 'Superman', ['flight', 'super strength']),
      new Superhero('2', 'Batman', ['intelligence', 'combat skills'])
    ];
    spyOn(superheroService, 'getAllSuperheros').and.returnValue(of(superheros));

    component.ngOnInit();

    expect(superheroService.getAllSuperheros).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(superheros);
  });

  it('should apply filter correctly', () => {
    const event: any = { target: { value: 'man' } };
    const superheros: Superhero[] = [
      new Superhero('1', 'Superman', ['flight', 'super strength']),
      new Superhero('2', 'Batman', ['intelligence', 'combat skills'])
    ];
    component.dataSource.data = superheros;

    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('man');
    expect(component.dataSource.filteredData).toEqual([superheros[0]]);
  });

  it('should open add dialog and add superhero', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of({ id: '1', name: 'Superman', powers: ['flight', 'super strength'] }));
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openAddDialog();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(superheroService.addSuperhero).toHaveBeenCalled();
  });

  it('should open delete confirmation dialog and delete superhero', () => {
    const superhero: Superhero = new Superhero('1', 'Superman', ['flight', 'super strength']);
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(true));
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openDeleteConfirmationDialog(superhero);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(superheroService.deleteSuperhero).toHaveBeenCalledWith(superhero.id);
  });

  it('should open edit dialog and edit superhero', () => {
    const superhero: Superhero = new Superhero('1', 'Superman', ['flight', 'super strength']);
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(superhero));
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openEditDialog(superhero);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(superheroService.editSuperhero).toHaveBeenCalledWith(superhero);
  });
});
