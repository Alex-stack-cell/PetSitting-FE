import { Validators } from '@angular/forms';
export const UpdatePasswordForm = {
  currentPassword: [
    null,
    [
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
      ),
    ],
  ],
  newPassword: [
    null,
    [
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
      ),
    ],
  ],
  confirmNewPassword: [null],
};
