import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private _users: Person[];
  private _usersSubject: BehaviorSubject<Person[]>;
  private userIndex = 1;


  constructor(private http: HttpClient) {
    this._users = [];
    this._usersSubject = new BehaviorSubject<Person[]>(this._users);

    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Person[]>('assets/data.json').subscribe(res => {
      // res;
      const userMap = {};
      res.forEach(u => {
        userMap[u.id] = u;
      });
      res.forEach(u => {
        const friends = u.friends;
        u.friends = [];
        friends.forEach(f => {
          u.friends.push(userMap[f.id]);
        });
      });

      this._users = res;
      this.userIndex = res.length + 1;
      this._usersSubject.next(this._users);
    });
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
        person.friends[i].friends.push(person);
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
