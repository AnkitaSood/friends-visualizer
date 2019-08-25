import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private _users: Person[];
  private _usersSubject: BehaviorSubject<Person[]>;
  private userIndex = 1;


  constructor() {
    this._users = [];
    this._usersSubject = new BehaviorSubject<Person[]>(this._users);
  }

  get users$(): Observable<Person[]> {
    return this._usersSubject.asObservable();
  }

  getPerson(id: number): Person {
    return this._users.find(u => u.id === id);
  }

  private normalizeFriends(person: Person) {

    for (let i = 0; i < (person.friends || []).length; i ++) {
      const f = person.friends[i];
      const potentialDuplicate: Person = this._users.find(u => u.firstName === f.firstName && u.lastName === f.lastName);
      if (potentialDuplicate) {
        person.friends[i] = potentialDuplicate;
      }
    }

  }

  upsertPerson(person: Person): Person {

    person.friends = person.friends || [];

    this.normalizeFriends(person);

    if (!person.id) {
      person.id = this.userIndex++;
      this._users.push(person);
    } else {
      const user = this._users.find((u: Person) => u.id === person.id);
      Object.assign(user, person);
      person = user;
    }

    person.friends.forEach(f => {
      if (f.id) {
        return;
      }

      f.friends = f.friends || [];
      f.friends.push(person);
      this.upsertPerson(f);
    });

    this._usersSubject.next(this._users);
    return person;
  }

}

export interface Person {
  id?: number;
  firstName: string;
  lastName: string;
  age?: number;
  weight?: number;
  friends?: Person[];
}
