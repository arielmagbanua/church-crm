import { Injectable } from '@angular/core';
import { Member } from '../shared/member';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private firestore: AngularFirestore) { }

  addMember(member: Member): Promise<DocumentReference> {
    return this.firestore.collection<Member>('members')
      .add(member);
  }

  updateMember(id: string, member: Member): void {

  }
}
