import { Injectable } from '@angular/core';
import { Member } from '../shared/member';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private membersCollection: AngularFirestoreCollection<Member>;
  membersObservable: Observable<Member[]>;

  constructor(private firestore: AngularFirestore) {
    this.membersCollection = firestore.collection<Member>('members');
    this.membersObservable = this.membersCollection.valueChanges();
  }

  get members(): Observable<Member[]>{
    return this.membersObservable;
  }

  addMember(member: Member): Promise<DocumentReference> {
    return this.membersCollection.add(member);
  }

  updateMember(id: string, member: Member): void {

  }
}
