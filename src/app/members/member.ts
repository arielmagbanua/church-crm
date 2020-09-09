import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Member {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  email: string;
  mobileNumber: string;
  birthdate: any | Date | Timestamp;
  photo: string;
  address: string;
  status: string;
  smallGroup?: string;
  membershipDate?: any | Date;
}
