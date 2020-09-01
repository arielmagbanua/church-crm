import { Pipe, PipeTransform } from '@angular/core';
import { Member } from './member';

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
      case 'membershipDate':
        value = member.membershipDate ? member.membershipDate.toDate().toLocaleDateString() : 'N/A';
        break;
      case 'birthdate':
        value = member.birthdate.toDate().toLocaleDateString();
        break;
      case 'smallGroup':
        value = member.smallGroup ?? 'N/A';
        break;
      case 'address':
        value = member.address ?? 'N/A';
        break;
      case 'photo':
        value = member.photo ?? 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png';
        break;
      default:
        value = '';
    }

    return value;
  }
}
