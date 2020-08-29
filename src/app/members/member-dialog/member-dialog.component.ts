import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../shared/member';
import { MembersService } from '../members.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit {
  memberForm: FormGroup;
  editMode = false;
  member: Member;
  selectedStatus: string;

  constructor(
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membersService: MembersService
  ) { }

  /**
   * Initialize component
   */
  ngOnInit(): void {
    this.memberForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(null),
      birthday: new FormControl(null, Validators.required),
      address: new FormControl(null),
      status: new FormControl(null, Validators.required),
      smallGroup: new FormControl(null),
      membershipDate: new FormControl(null)
    });

    this.memberForm.patchValue({
      status: 'guest'
    });

    if (this.editMode) {
      // grab the member to edit

      // populate the form
    }
  }

  errors(formControlName: string, errorKey: string): boolean {
    const errors = this.memberForm.get(formControlName).errors;

    if (errors) {
      return errors[errorKey];
    }

    return false;
  }

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
}
