import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';

// Component Imports
import { AppComponent } from './app.component';
import { SuperherosComponent } from './components/superheros/superheros.component';
import { AddSuperheroDialogComponent } from './components/superheros/add-superhero-dialog/add-superhero-dialog.component';

// Pipe Imports
import { TranslatePipe } from './pipes/translate.pipe';

// Service Imports
import { TranslateService } from './services/translate.service';

export function translateFactory(provider: TranslateService){
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    SuperherosComponent,
    AddSuperheroDialogComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
