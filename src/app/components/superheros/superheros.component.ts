import { Component, OnInit } from '@angular/core';
import { Superhero } from 'src/app/models/superhero';
import { SuperheroService } from 'src/app/services/superhero.service';


@Component({
  selector: 'app-superheros',
  templateUrl: './superheros.component.html',
  styleUrls: ['./superheros.component.css']
})
export class SuperherosComponent implements OnInit {
  dataSource: Superhero[] = [];
  originalData: Superhero[] = [];
  displayedColumns: string[] = ['name', 'powers', 'actions'];

  constructor(private superheroService: SuperheroService) { }

  ngOnInit(): void {
    this.getSuperheroes();
  }

  getSuperheroes(): void {
    this.superheroService.getAllSuperheros().subscribe((superheros) => {
      this.dataSource = superheros;
      this.originalData = superheros;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filteredData = this.originalData.filter((superhero: Superhero) => {
      return (
        superhero.name.toLowerCase().includes(filterValue)
      );
    });
    this.dataSource = filterValue ? filteredData : this.originalData.slice();
  }
}
