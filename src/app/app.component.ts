import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'e_commerce_front_end';
    constructor(public loader: LoaderService ) {}
}
