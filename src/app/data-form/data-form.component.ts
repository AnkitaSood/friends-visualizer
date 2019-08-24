import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStoreService, Person} from '../data-store.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  @ViewChild('form', {static: true}) form;
  personalInfoForm: FormGroup;
  title = 'Visualizer';

  constructor(private formBuilder: FormBuilder, private store: DataStoreService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      friends: this.formBuilder.array([
        this.formBuilder.group({
          friendsFirstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
          friendsLastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])]
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
      friendsFirstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      friendsLastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])]
    }));
  }

  formSubmit() {
    const newUser: Person = this.personalInfoForm.getRawValue();
    this.store.upsertPerson(newUser);
    this.form.resetForm();
  }
}
