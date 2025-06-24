import { FormGroup, ValidationErrors } from '@angular/forms';

export function atLeastOneValidator(group: FormGroup): ValidationErrors | null {
    let isAtLeastOne = false;

    Object.keys(group.controls).forEach(key => {
        if (group.controls[key].value) {
            isAtLeastOne = true;
        }
    });

    if (isAtLeastOne) {
        return null;
    } else {
        return { atLeastOneRequired: true };
    }
}

