import {async, TestBed} from '@angular/core/testing';

import {DataStoreService, InitialDataService, Person} from './data-store.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

const data = require('../assets/data.json');

describe('DataStoreService', () => {
  let dataService: DataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    let initialDataService: InitialDataService;
    initialDataService = TestBed.get(InitialDataService);
    spyOn(initialDataService, 'getInitialData').and.returnValue(of(data.slice(0)));
    dataService = TestBed.get(DataStoreService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should load all data', async(() => {
    dataService.users$.subscribe((result) => {
      expect(result.length).toBe(7);
    });
  }));


  it('should get user by id', async(() => {
    const firstName = 'Amelia';
    const lastName = 'Alderson';
    const user = dataService.getPerson(1);

    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);

  }));

  it('should not get user by invalid id', async(() => {
    const user = dataService.getPerson(133);
    expect(user).toBeFalsy();
  }));

  it('should add user successfully', async(() => {
    const user: Person = {
      firstName: 'Test',
      lastName: 'User',
      friends: [{
        firstName: 'New',
        lastName: 'Friend'
      }]
    };

    const newUser = dataService.upsertPerson(user);
    expect(newUser.lastName).toBe(user.lastName);
    expect(newUser.firstName).toBe(user.firstName);

    dataService.users$.subscribe((result) => {
      expect(result.length).toBe(9);
    });
  }));

  it('should add user and normalize friends successfully', async(() => {
    const user1 = dataService.getPerson(1);

    const user: Person = {
      firstName: 'Test',
      lastName: 'User',
      friends: [{
        firstName: user1.firstName,
        lastName: user1.lastName
      }]
    };

    const newUser = dataService.upsertPerson(user);

    dataService.users$.subscribe((result) => {
      expect(result.length).toBe(8);
    });

    expect(newUser.friends[0]).toBe(user1);
  }));

});

