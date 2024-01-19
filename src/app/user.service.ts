import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  /**
   * Get data from Firestore
   * @param collectionName - component name
   * @returns - json data
   */
  getData(collectionName: any) {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef);
  }

  /**
   * Create document
   * @param data - json data
   * @param collectionName - component name
   */

  async addData(collectionName: any, data: any) {
    const collectionRef = collection(this.firestore, collectionName);
    await addDoc(collectionRef, { data: data }).then(
      // После создания документа с полем data мы получаем его id в базе данных и добавляем новое поле id при помощи функции updateDoc
      (DocumentReference: any) => {
        const collectionRef = doc(
          this.db,
          collectionName,
          DocumentReference.id
        );
        updateDoc(collectionRef, { data, id: DocumentReference.id });
      }
    );
  }

  /**
   * Update document's field
   * @param collectionName - component name
   * @param id - document's id
   * @param data - json data
   */
  async updateDocument(collectionName: any, id: any, data: any) {
    const collectionRef = doc(this.db, collectionName, id);
    await updateDoc(collectionRef, { data: data });
  }

  /**
   * Remove document
   * @param collectionName - component name
   * @param id - document's id
   */
  async removeDocument(collectionName: any, id: any) {
    const collectionRef = doc(this.db, collectionName, id);
    await deleteDoc(collectionRef);
  }
}
