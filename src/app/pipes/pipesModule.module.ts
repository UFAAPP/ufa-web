import { NgModule } from '@angular/core';
import { CourtPipe } from './court/court.pipe';
import { LawsuitStatusPipe } from './lawsuit-status/lawsuit-status.pipe';

@NgModule({
  declarations: [CourtPipe, LawsuitStatusPipe],
  exports: [CourtPipe, LawsuitStatusPipe],
})
export class PipesModule {}
