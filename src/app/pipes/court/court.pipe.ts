import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'court',
})
export class CourtPipe implements PipeTransform {
  transform(courtId: string): string {
    switch (courtId) {
      case 'IN':
        return 'Infância';

      case 'FA':
        return 'Fazenda';

      case 'CI':
        return 'Civel';

      case 'FM':
        return 'Familia';

      case 'CR':
        return 'Criminal';

      case 'ER':
        return 'Especial Criminal';

      case 'AU':
        return 'Direito auxiliares';

      case 'EC':
        return 'Especial Cível';

      case 'UN':
        return 'Única';
      default:
        return '';
    }
  }
}
