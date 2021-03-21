import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lawsuitStatus',
})
export class LawsuitStatusPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'PROGRESS':
        return 'Em andamento';
      case 'ARCHIVED':
        return 'Arquivado';
      default:
        return '';
    }
  }
}
