import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
	public BACKEND_URL = "https://www.architexor-admin.com";
	public FRONTEND_URL = "https://www.architexor.com";
	public API_ENDPOINT = "https://www.architexor-api.com";
	public BRAND = "Architexor";
	
	constructor(
		private toastr: ToastrService,
		private spinner: NgxSpinnerService
	) {
	}

	public showSpinner() {
		this.spinner.show();
	}

	public hideSpinner() {
		this.spinner.hide();
	}

	public confirm(msg: string, success) {
		Swal.fire({
			title: 'Confirm',
			text: msg,
			icon: 'question',
			showConfirmButton: true,
			confirmButtonText: 'Yes',
			showCancelButton: true,
			cancelButtonText: 'Cancel',
			backdrop: false,
			background: 'white'
		}).then((data) => {
			if (data && data.value) {
				success();
			}
		});
	}

	public showMsg(type, title, msg) {
		let css = "info";
		switch (type) {
			case "info":
				css = "info";
				this.toastr.info(
					'<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>',
					title,
					{
						timeOut: 4000,
						enableHtml: true,
						closeButton: true,
						toastClass: "alert alert-" + css + " alert-with-icon",
						positionClass: "toast-top-right"
					}
				);
				break;
			case "success":
				css = "success";
				this.toastr.success(
					'<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>',
					title,
					{
						timeOut: 4000,
						enableHtml: true,
						closeButton: true,
						toastClass: "alert alert-" + css + " alert-with-icon",
						positionClass: "toast-top-right"
					}
				);
				break;
			case "warning":
				css = "warning";
				this.toastr.warning(
					'<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>',
					title,
					{
						timeOut: 4000,
						enableHtml: true,
						closeButton: true,
						toastClass: "alert alert-" + css + " alert-with-icon",
						positionClass: "toast-top-right"
					}
				);
				break;
			case "error":
				css = "danger";
				this.toastr.error(
					'<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>',
					title,
					{
						timeOut: 4000,
						enableHtml: true,
						closeButton: true,
						toastClass: "alert alert-" + css + " alert-with-icon",
						positionClass: "toast-top-right"
					}
				);
				break;
			case "show":
				css = "primary";
				this.toastr.show(
					'<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + msg + '</span>',
					title,
					{
						timeOut: 4000,
						enableHtml: true,
						closeButton: true,
						toastClass: "alert alert-" + css + " alert-with-icon",
						positionClass: "toast-top-right"
					}
				);
				break;
			default: return;
		}
	}
}
