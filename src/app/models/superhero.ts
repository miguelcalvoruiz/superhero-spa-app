import { ISuperhero } from "../interfaces/isuperhero";

export class Superhero implements ISuperhero {
    id: string;
    name: string;
    powers: string[];

    constructor(id: string, name: string, powers: string[]) {
        this.id = id;
        this.name = name;
        this.powers = powers;
    }
}
