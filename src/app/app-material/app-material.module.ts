import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const MaterialModules = [
  MatToolbarModule,
  MatCardModule,
  MatProgressBarModule,
  MatGridListModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatMenuModule,
  MatInputModule,
  MatTooltipModule,
  MatDialogModule,
  MatBadgeModule,
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules],
})
export class AppMaterialModule {}
