import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private users: Person[];
  private userIndex = 1;


  constructor() {
    this.users = [];
  }

  getPerson(): Person {
    return null;
  }

  upsertPerson(person: Person): Person {

    person.friends = person.friends || [];

    if (!person.id) {
      person.id = this.userIndex++;
      this.users.push(person);
    } else {
      const user = this.users.find((u: Person) => u.id === person.id);
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

    return person;
  }

  findPeople(query: string): Person[] {
    return this.users.filter((user: Person) => user.firstName.search(query) || user.lastName.search(query));
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
