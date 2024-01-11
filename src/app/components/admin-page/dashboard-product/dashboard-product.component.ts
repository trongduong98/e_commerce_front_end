import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditProductComponent } from '../../dialog-pages/dialog-add-edit-product/dialog-add-edit-product.component';
import { DialogDeleteProductComponent } from '../../dialog-pages/dialog-delete-product/dialog-delete-product.component';
import { ProductsService } from 'src/app/services/products.service';
import * as Common from '../../../../assets/common/_index';


export interface ProductElement {
    position: number;
    thumbnail: string;
    name: string;
    dateCreate: string;
    total: number;
}

@Component({
    selector: 'app-dashboard-product',
    templateUrl: './dashboard-product.component.html',
    styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent implements AfterViewInit {

    public displayedColumns: string[] = ['position', 'thumbnail', 'name', 'dateCreate', 'total', 'action'];
    public dataSource = new MatTableDataSource([]);

    constructor(private dialog: MatDialog, private product: ProductsService) {
        this.handleGetProducts();
    }

    @ViewChild(MatSort) sort: MatSort | undefined;

    ngAfterViewInit() {
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    public handleGetProducts () {
        this.dataSource = new MatTableDataSource([]);
        let arrayTemp: any = [];
        this.product.getProductList().subscribe((data) => {
            if (data.result.length > 0) {
                data.result.forEach((element: any, index: number) => {
                    if (element.product_date_created) {
                        element.product_date_created = Common.functions.formatDate(new Date(element.product_date_created));
                    }
                    if (element.product_image_thumbnail_value && element.product_image_thumbnail_value.data != null) {
                        element.product_image_thumbnail_value.data = Common.functions.convertBufferToBase64(element.product_image_thumbnail_value.data);
                        element.product_image_thumbnail_value.type = Common.constants.Constant.BASE64;
                    }
                    arrayTemp.push({position: index + 1,  ...element});
                    this.dataSource = new MatTableDataSource(arrayTemp);
                });
            }
        });

    }

    public handleOpenAddEditProductDialog(edit: boolean, productId?: number) {
        if (!edit) {
            this.handleAddProduct();
        } else {
            if(productId) {
                this.handleEditProduct(productId);
            }
        }
    }

    private handleAddProduct() {
        const dialogRef = this.dialog.open(DialogAddEditProductComponent, {
            width: '80%',
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((ref) => {
            if (ref.value) {
                this.handleGetProducts();
            }
        });
    }

    private handleEditProduct(productId: number) {
        this.product.getProductById(productId).subscribe((response) => {
            const dialogRef = this.dialog.open(DialogAddEditProductComponent, {
                data: response.result,
                width: '80%',
                disableClose: true
            });
            dialogRef.afterClosed().subscribe((ref) => {
                if (ref.value) {
                    this.handleGetProducts();
                }
                
            });
        });
    }

    public handleOpenDeleteProductDialog(value: any) {
        const dialogRef = this.dialog.open(DialogDeleteProductComponent, {
            data: {
                id: value.product_id,
                name: value.product_name,
                imageThumbnail: value.product_image_thumbnail_value.data,
            },
            width: '60%'
        });
        dialogRef.afterClosed().subscribe((ref) => {
            console.log(ref.value);
            
            if (ref.value) {
                this.handleGetProducts();
            }
        });
    }

}
