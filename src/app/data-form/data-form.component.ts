import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  personalInfoForm: FormGroup;
  title = 'Visualizer';

  constructor(private formBuilder: FormBuilder) {
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
          friendsFirstName: ['', Validators.required],
          friendsLastName: ['', Validators.required]
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

    this.friends.controls.push(this.formBuilder.group({
      friendsFirstName: ['', Validators.required],
      friendsLastName: ['', Validators.required]
    }));
  }

}
