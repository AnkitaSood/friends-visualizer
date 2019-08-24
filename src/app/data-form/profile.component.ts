import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStoreService, Person} from '../data-store.service';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private store: DataStoreService) {}

  user$: Observable<Person>;

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      map(params => {
        return this.store.getPerson(+params.get('id'));
      })
    );
  }

}
