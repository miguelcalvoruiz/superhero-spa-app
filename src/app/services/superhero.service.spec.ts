import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuperheroService } from './superhero.service';
import { Superhero } from '../models/superhero';
import { Observable } from 'rxjs';

describe('SuperheroService', () => {
  let service: SuperheroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroService]
    });
    service = TestBed.inject(SuperheroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all superheroes', () => {
    const superheroes: Superhero[] = [
      { id: "1", name: 'Superman', powers: ['Super strength'] },
      { id: "2", name: 'Spiderman', powers: ['Wall-crawling'] },
    ];

    service.getAllSuperheros().subscribe((data: Superhero[]) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(superheroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/superheroes');
    expect(req.request.method).toBe('GET');
    req.flush(superheroes);
  });

  it('should add a superhero', () => {
    const newSuperhero: Superhero = { id: "3", name: 'Wonder Woman', powers: ['Superhuman strength'] };

    service.addSuperhero(newSuperhero).subscribe((data: Superhero) => {
      expect(data).toEqual(newSuperhero);
    });

    const req = httpMock.expectOne('http://localhost:3000/superheroes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSuperhero);
    req.flush(newSuperhero);
  });

  it('should delete a superhero', () => {
    const superheroId = '3';

    service.deleteSuperhero(superheroId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne('http://localhost:3000/superheroes/3');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should edit a superhero', () => {
    const updatedSuperhero: Superhero = { id: "3", name: 'Wonder Woman', powers: ['Flight'] };

    service.editSuperhero(updatedSuperhero).subscribe((data: Superhero) => {
      expect(data).toEqual(updatedSuperhero);
    });

    const req = httpMock.expectOne('http://localhost:3000/superheroes/3');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSuperhero);
    req.flush(updatedSuperhero);
  });
});
