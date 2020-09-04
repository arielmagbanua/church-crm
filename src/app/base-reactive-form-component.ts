import { FormGroup } from '@angular/forms';

export abstract class BaseReactiveFormComponent {
  componentForm: FormGroup;

  /**
   * Determines if the control is invalid
   */
  invalid(formControlName: string): boolean {
    return !this.componentForm.get(formControlName).valid &&
      this.componentForm.get(formControlName).touched;
  }

  /**
   * Grab the control error for the control
   */
  errors(formControlName: string, errorKey: string): boolean {
    const errors = this.componentForm.get(formControlName).errors;

    if (errors) {
      return errors[errorKey];
    }

    return false;
  }

  /**
   * Form submit
   */
  abstract async submit(): Promise<boolean>;
}
