import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-superhero-dialog',
  templateUrl: './add-superhero-dialog.component.html',
  styleUrls: ['./add-superhero-dialog.component.css']
})
export class AddSuperheroDialogComponent {

  nameFormGroup: FormGroup;
  powersFormGroup: FormGroup;
  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddSuperheroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nameFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.powersFormGroup = new FormGroup({
      powers: new FormControl('', Validators.required)
    });

    if (data && data.superhero) {
      this.isEditing = true;
      this.nameFormGroup.setValue({ name: data.superhero.name });
      this.powersFormGroup.setValue({ powers: data.superhero.powers.join(', ') });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.powersFormControl.valid) {
      const superhero = {
        id: this.isEditing ? this.data.superhero.id : this.generateId(),
        name: this.nameFormGroup.value['name'],
        powers: this.powersFormGroup.value['powers'].split(',').map((power: string) => power.trim())
      };
      this.dialogRef.close(superhero);
    }
  }

  private generateId(): string {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return 'ID-' + id;
  }

  isNameValid(): boolean {
    return this.nameFormGroup.controls['name'].valid;
  }

  get powersFormControl() {
    return this.powersFormGroup.controls['powers'];
  }

}