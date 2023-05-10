import { AbstractControl} from "@angular/forms";

export function ConfirmPasswordValidator(control:AbstractControl)
{
  const yourPassword=control.get('yourPassword');
  const ConfirmPassword=control.get('ConfirmPassword');

 if(yourPassword?.pristine ||ConfirmPassword?.pristine)
 {
    return null;
 }
 else
 {
    return yourPassword && ConfirmPassword && yourPassword.value!=ConfirmPassword.value 
    ? {'mismatch':true}
    :null;
 }
} 