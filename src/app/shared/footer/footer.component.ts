import { Component, HostBinding } from '@angular/core';
import { UtilsService } from 'app/services/utils.service';

@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent{
    copyright : Date = new Date("2024-11-01");

		constructor(public utils: UtilsService) {
			
		}
}
