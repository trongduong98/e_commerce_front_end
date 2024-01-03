import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-delete-product',
    templateUrl: './dialog-delete-product.component.html',
    styleUrls: ['./dialog-delete-product.component.scss']
})
export class DialogDeleteProductComponent implements OnInit {

    public nameProduct!: string;

    constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any) { }

    ngOnInit(): void {
        console.log('this.dataDialog', this.dataDialog);
        
        if(this.dataDialog) {
            this.nameProduct = this.dataDialog.name;
        }
    }

}
