import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStoreService, Person} from '../data-store.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$: Observable<Person>;

  constructor(private router: Router, private route: ActivatedRoute, private store: DataStoreService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      map(params => {
        const person = this.store.getPerson(+params.get('id'));
        if (person) {
          return person;
        }

        // else
        this.router.navigate(['']);
      })
    );
  }

}
