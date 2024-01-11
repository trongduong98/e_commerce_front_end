import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import * as Common from '../../../../assets/common/_index';

@Component({
    selector: 'app-dashboard-nav',
    templateUrl: './dashboard-nav.component.html',
    styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {

    public navHome: number = Common.enums.NavSelect.home;
    public navProduct: number = Common.enums.NavSelect.product;
    public navProductGroup: number = Common.enums.NavSelect.productGroup;

    constructor(public loader: LoaderService) { }

    ngOnInit(): void {
    }

    public handleSelectPage(pageSelect: number) {
        this.loader.isPage.next(pageSelect);
    }

}
