import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../member';
import { MembersService } from '../members.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FileValidator } from 'ngx-material-file-input';
import { BaseReactiveFormComponent } from '../../base-reactive-form-component';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent extends BaseReactiveFormComponent implements OnInit, OnDestroy {

  /**
   * Status change subscription
   *
   * @private
   */
  private statusSub: Subscription;

  /**
   * The member instance
   *
   * @private
   */
  private member: Member;

  /**
   * In this example, it's 3 MB (=3 * 2 ** 20).
   *
   * @private
   */
  private readonly maxSize = 3145728;

  constructor(
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member,
    private membersService: MembersService
  ) {
    super();
  }

  /**
   * Initialize component
   */
  ngOnInit(): void {
    const smallGroupCtrl = new FormControl(this.data ? this.data.smallGroup : null);
    const statusCtrl = new FormControl(this.data ? this.data.status : 'guest', Validators.required);
    const membershipDateCtrl = new FormControl(this.data ? this.data.membershipDate : null, Validators.required);

    // disable or enable controls
    smallGroupCtrl.disable();
    membershipDateCtrl.disable();

    this.componentForm = new FormGroup({
      firstName: new FormControl(this.data ? this.data.firstName : null, Validators.required),
      middleName: new FormControl(this.data ? this.data.middleName : null),
      lastName: new FormControl(this.data ? this.data.lastName : null, Validators.required),
      gender: new FormControl(this.data ? this.data.gender : 'M'),
      email: new FormControl(this.data ? this.data.email : null, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(this.data ? this.data.mobileNumber : null),
      birthdate: new FormControl(this.data ? this.data.birthdate.toDate() : null, Validators.required),
      photo: new FormControl(null, FileValidator.maxContentSize(this.maxSize)),
      address: new FormControl(this.data ? this.data.address : null),
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
  }

  /**
   * Submit form
   */
  async submit(): Promise<boolean> {
    if (!this.data) {
      // extract the date only
      const filePhoto = this.componentForm.value.photo.files[0];
      this.member = {...this.componentForm.value, photo: ''};

      // upload a file first then grab the url.
      const snapshot = await this.membersService.uploadPhoto(filePhoto);
      this.member.photo = await snapshot.ref.getDownloadURL();

      // add the new member
      const docRef = await this.membersService.addMember(this.member);

      if (docRef) {
        // close the dialog
        this.dialogRef.close(this.member);
        return true;
      }
    } else {
      // TODO: Remove the old photo
      this.member = {...this.componentForm.value};

      // update the new member
      await this.membersService.updateMember(this.data.id, this.member);
      this.dialogRef.close(this.member);
      return true;
    }

    return false;
  }

  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
  }
}
