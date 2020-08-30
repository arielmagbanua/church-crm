import { Pipe, PipeTransform } from '@angular/core';
import { Member } from '../shared/member';

@Pipe({
  name: 'extract'
})
export class ExtractPipe implements PipeTransform {
  transform(member: Member, type: string): unknown {
    let value = null;

    switch (type) {
      case 'name':
        value = `${member.firstName} ${member.middleName ?? ''} ${member.lastName}`;
        break;
      case 'gender':
        value = member.gender === 'M' ? 'male' : 'female';
        break;
      default:
        value = '';
    }

    return value;
  }
}
