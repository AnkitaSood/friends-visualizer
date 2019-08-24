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
    this._users =  [];
    this._usersSubject = new BehaviorSubject<Person[]>(this._users);
  }

  get users$(): Observable<Person[]> {
    return this._usersSubject.asObservable();
  }

  getPerson(id: number): Person {
    return this._users.find(u => u.id === id);
  }

  upsertPerson(person: Person): Person {

    person.friends = person.friends || [];

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

  findPeople(query: string): Person[] {
    return this._users.filter((user: Person) => user.firstName.search(query) || user.lastName.search(query));
  }

  addFriend(friend: Person): void {  }

}

export interface Person {
  id?: number;
  firstName: string;
  lastName: string;
  age?: number;
  weight?: number;
  friends?: Person[];
}
