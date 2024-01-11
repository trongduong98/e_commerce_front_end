import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-dialog-delete-product',
    templateUrl: './dialog-delete-product.component.html',
    styleUrls: ['./dialog-delete-product.component.scss']
})
export class DialogDeleteProductComponent implements OnInit {

    public nameProduct!: string;
    public imageThumbnail!: string;

    constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any, private product: ProductsService, public dialogRef: MatDialogRef<DialogDeleteProductComponent>) { }

    ngOnInit(): void {
        if(this.dataDialog) {
            this.nameProduct = this.dataDialog.name;
            this.imageThumbnail = this.dataDialog.imageThumbnail;
        }
    }

    public handleDeleteProduct() {
        this.product.deleteProduct(this.dataDialog.id).subscribe((res) => {
            console.log('res', res);
            
            if(res.result.id) {
                this.handleCloseDialog(res.result.id);
            }
        })
    }

    public handleCloseDialog(value?: number) {
        if (value) {
            this.dialogRef.close({event: "success", value: value});
        } else {
            this.dialogRef.close({event: "close"});
        }
    }

}
