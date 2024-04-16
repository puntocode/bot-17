import { SweetAlertOptions } from "sweetalert2";

export function getDeleteOption(text:string, title = 'Borrar', btnText = 'Borrar'){
  const option:SweetAlertOptions = {
    cancelButtonText: 'Cancelar',
    confirmButtonColor: "#E12D3A",
    confirmButtonText: btnText,
    icon: 'error',
    showCancelButton: true,
    showCloseButton: true,
    text,
    title,
  }
  return option;
}
