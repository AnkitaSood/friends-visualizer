import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStoreService, Person} from '../data-store.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  @ViewChild('form', {static: true}) form;
  personalInfoForm: FormGroup;
  title = 'Visualizer';
  users$: Observable<Person[]>;

  constructor(private formBuilder: FormBuilder, private store: DataStoreService) {
  }

  ngOnInit() {
    this.users$ = this.store.users$;
    this.createForm();
  }

  createForm() {
    this.personalInfoForm = this.getPersonalInfoForm();
  }

  private getPersonalInfoForm() {
    return this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      friends: this.formBuilder.array([
        this.formBuilder.group({
          id: [''],
          firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
          lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])]
        })
      ])
    });
  }

  get friends() {
    return this.personalInfoForm.get('friends') as FormArray;
  }

  addFriends(friend: AbstractControl) {
    if (!(friend as FormGroup).valid) {
      return;
    }

    (friend as FormGroup).disable({onlySelf: true});

    this.friends.controls.unshift(this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])]
    }));
  }

  editUser(user: Person): void {
    this.personalInfoForm = this.getPersonalInfoForm();
    this.personalInfoForm.patchValue(user);
  }

  formSubmit() {
    const newUser: Person = this.personalInfoForm.getRawValue();
    newUser.friends = newUser.friends.filter(f => f.firstName && f.lastName);

    this.store.upsertPerson(newUser);
    this.form.resetForm();
    this.personalInfoForm = this.getPersonalInfoForm();
  }
}
