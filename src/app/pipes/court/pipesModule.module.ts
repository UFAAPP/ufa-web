import { NgModule } from '@angular/core';
import { CourtPipe } from './court.pipe';

@NgModule({
  declarations: [CourtPipe],
  exports: [CourtPipe],
})
export class PipesModule {}
