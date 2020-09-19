import { Injectable } from '@angular/core';
import { Member } from './member';
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
    this.membersObservable = this.membersCollection.valueChanges({ idField: 'id' });
  }

  get members(): Observable<Member[]> {
    return this.membersObservable;
  }

  addMember(member: Member): Promise<DocumentReference> {
    return this.membersCollection.add(member);
  }

  async deleteMember(id: string): Promise<void> {
    const memberDoc = this.membersCollection.doc<Member>(id);
    const documentSnapshot = await memberDoc.ref.get();
    const memberData = documentSnapshot.data() as Member;

    // remove the photo
    await this.deletePhotoByUrl(memberData.photo);

    return memberDoc.delete();
  }

  uploadPhoto(file: File): AngularFireUploadTask {
    const filePath = 'members/' + new Date().valueOf() + '-' + file.name;
    // const fileRef = this.fireStorage.ref(filePath);
    return this.fireStorage.upload(filePath, file);
  }

  deletePhotoByUrl(fileUrl: string): Promise<any> {
    return this.fireStorage.storage.refFromURL(fileUrl).delete();
  }

  updateMember(id: string, member: Member): Promise<void> {
    return this.membersCollection.doc<Member>(id).update(member);
  }
}
