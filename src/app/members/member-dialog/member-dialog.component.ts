import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../shared/member';
import { MembersService } from '../members.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit, OnDestroy {
  /**
   * The form instance.
   */
  memberForm: FormGroup;

  /**
   * Status change subscription
   *
   * @private
   */
  private statusSub: Subscription;

  /**
   * Tells whether on edit mode or not.
   *
   * @private
   */
  private editMode = false;

  /**
   * The member instance
   *
   * @private
   */
  private member: Member;

  constructor(
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membersService: MembersService
  ) { }

  /**
   * Initialize component
   */
  ngOnInit(): void {
    const smallGroupCtrl = new FormControl(null);
    const statusCtrl = new FormControl('guest', Validators.required);
    const membershipDateCtrl = new FormControl(null, Validators.required);

    // disable or enable controls
    smallGroupCtrl.disable();
    membershipDateCtrl.disable();

    this.memberForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(null),
      birthdate: new FormControl(null, Validators.required),
      address: new FormControl(null),
      status: statusCtrl,
      smallGroup: smallGroupCtrl,
      membershipDate: membershipDateCtrl
    });

    this.statusSub = statusCtrl.valueChanges.subscribe((value) => {
      if (value && value !== 'guest') {
        membershipDateCtrl.enable();
      } else {
        membershipDateCtrl.disable();
      }

      if (value && value !== 'sg_member') {
        smallGroupCtrl.disable();
      } else {
        smallGroupCtrl.enable();
      }
    });

    if (this.editMode) {
      // grab the member to edit

      // populate the form
    }
  }

  /**
   * Grab the control error for the control
   */
  errors(formControlName: string, errorKey: string): boolean {
    const errors = this.memberForm.get(formControlName).errors;

    if (errors) {
      return errors[errorKey];
    }

    return false;
  }

  /**
   * Determines if the control is invalid
   */
  invalid(formControlName: string): boolean {
    return !this.memberForm.get(formControlName).valid &&
      this.memberForm.get(formControlName).touched;
  }

  /**
   * Submit the member form.
   */
  async submitMember(): Promise<boolean> {
    // extract the date only
    this.member = {...this.memberForm.value};
    console.log(this.member);

    if (!this.editMode) {
      const docRef = await this.membersService.addMember(this.member);

      if (docRef) {
        // close the dialog
        this.dialogRef.close(this.member);
        return true;
      }
    }

    return false;
  }

  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
  }
}
