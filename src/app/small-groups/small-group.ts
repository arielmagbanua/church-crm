import { DocumentReference } from '@angular/fire/firestore';

export interface SmallGroup {
  id: string;
  name: string;
  leader?: DocumentReference;
}
