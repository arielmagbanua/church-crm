import { Injectable } from '@angular/core';
import { Member } from '../shared/member';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private membersCollection: AngularFirestoreCollection<Member>;
  membersObservable: Observable<Member[]>;

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {
    this.membersCollection = firestore.collection<Member>('members');
    this.membersObservable = this.membersCollection.valueChanges();
  }

  get members(): Observable<Member[]> {
    return this.membersObservable;
  }

  addMember(member: Member): Promise<DocumentReference> {
    return this.membersCollection.add(member);
  }

  uploadPhoto(file: File): AngularFireUploadTask {
    const filePath = new Date().valueOf() + '-' + file.name;
    const fileRef = this.fireStorage.ref(filePath);
    return this.fireStorage.upload(filePath, file);
  }

  updateMember(id: string, member: Member): void {

  }
}
