import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as Common from '../../../../assets/common/_index';
import { ImagesService } from 'src/app/services/images.service';
import { ProductsService } from 'src/app/services/products.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-edit-product',
  templateUrl: './dialog-add-edit-product.component.html',
  styleUrls: ['./dialog-add-edit-product.component.scss']
})
export class DialogAddEditProductComponent implements OnInit {

  public imageThumbnailUrl!: string;
    public imageUrl_1!: string;
    public imageUrl_2!: string;
    public imageUrl_3!: string;
    public imageUrl_4!: string;
    public imageUrl_5!: string;
    public file!: File;
    public status = Common.array.status;
    public productGroup!: any;
    public productIdIsEdit!: number;

    constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any, private images: ImagesService, private product: ProductsService) {}

    ngOnInit(): void {
        this.handleGetProductGroupName();
        if (this.dataDialog) {
            this.productIdIsEdit =  this.dataDialog.product_id;
            if (this.dataDialog.product_image_thumbnail_value && this.dataDialog.product_image_thumbnail_value.data != null) {
                this.dataDialog.product_image_thumbnail_value.data = Common.functions.convertBufferToBase64(this.dataDialog.product_image_thumbnail_value.data);
                this.dataDialog.product_image_thumbnail_value.type = Common.constants.Constant.BASE64;
                this.imageThumbnailUrl = this.dataDialog.product_image_thumbnail_value.data;
            }
            if (this.dataDialog.product_image_value_1 && this.dataDialog.product_image_value_1.data != null) {
                this.dataDialog.product_image_value_1.data = Common.functions.convertBufferToBase64(this.dataDialog.product_image_value_1.data);
                this.dataDialog.product_image_value_1.type = Common.constants.Constant.BASE64;
                this.imageUrl_1 = this.dataDialog.product_image_value_1.data;
            }
            if (this.dataDialog.product_image_value_2 && this.dataDialog.product_image_value_2.data != null) {
                this.dataDialog.product_image_value_2.data = Common.functions.convertBufferToBase64(this.dataDialog.product_image_value_2.data);
                this.dataDialog.product_image_value_2.type = Common.constants.Constant.BASE64;
                this.imageUrl_2 = this.dataDialog.product_image_value_2.data;
            }
            if (this.dataDialog.product_image_value_3 && this.dataDialog.product_image_value_3.data != null) {
                this.dataDialog.product_image_value_3.data = Common.functions.convertBufferToBase64(this.dataDialog.product_image_value_3.data);
                this.dataDialog.product_image_value_3.type = Common.constants.Constant.BASE64;
                this.imageUrl_3 = this.dataDialog.product_image_value_3.data;
            }
            if (this.dataDialog.product_image_value_4 && this.dataDialog.product_image_value_4.data != null) {
                this.dataDialog.product_image_value_4.data = Common.functions.convertBufferToBase64(this.dataDialog.product_image_value_4.data);
                this.dataDialog.product_image_value_4.type = Common.constants.Constant.BASE64;
                this.imageUrl_4 = this.dataDialog.product_image_value_4.data;
            }
            if (this.dataDialog.product_image_value_5 && this.dataDialog.product_image_value_5.data != null) {
                this.dataDialog.product_image_value_5.data = Common.functions.convertBufferToBase64(this.dataDialog.product_image_value_5.data);
                this.dataDialog.product_image_value_5.type = Common.constants.Constant.BASE64;
                this.imageUrl_5 = this.dataDialog.product_image_value_5.data;
            }
            this.productForm.setValue({
                productName: this.dataDialog.product_name,
                productDescription: this.dataDialog.product_description,
                productPrice: this.dataDialog.product_price,
                productSize: this.dataDialog.product_size,
                productColor: this.dataDialog.product_color,
                productTotal: this.dataDialog.product_total,
                productGroupID: this.dataDialog.product_group_id,
                productStatus: this.dataDialog.product_status,
            });
        }
    }

    public productForm = new FormGroup({
        productName: new FormControl(''),
        productDescription: new FormControl(''),
        productPrice: new FormControl(''),
        productSize: new FormControl(''),
        productColor: new FormControl(''),
        productTotal: new FormControl(''),
        productGroupID: new FormControl(''),
        productStatus: new FormControl(''),
    });

    private handleGetProductGroupName(): void {
        this.product.getProductGroupName().subscribe((response: any) => {
            if (response && response.result.length > 0) {
                this.productGroup = [...response.result];
            }
        });
    }

    public handleGenerateClass(item: number) {
        return `image-item_${item}`;
    }

    public handleCheckValidate(): boolean {
        if (this.productForm.value.productName &&
            this.productForm.value.productDescription&&
            this.productForm.value.productPrice &&
            this.productForm.value.productSize &&
            this.productForm.value.productColor &&
            this.productForm.value.productTotal &&
            this.productForm.value.productGroupID &&
            this.productForm.value.productStatus &&
            this.imageThumbnailUrl && this.imageUrl_1 && this.imageUrl_2 && this.imageUrl_3 && this.imageUrl_4 && this.imageUrl_5) {
                return false;
            }
        return true;
    }

    public handleCheckImagePreview(item: number): any {
        switch(item) {
            case 1:
                return this.imageUrl_1;
            case 2:
                return this.imageUrl_2;
            case 3:
                return this.imageUrl_3;
            case 4:
                return this.imageUrl_4;
            case 5:
                return this.imageUrl_5;
        }
    }

    public handleReadAndShowImagePreview($event: any, item: number) {
        let fileToUpload = null;
        fileToUpload = $event.target.files.item(0);
        this.file = $event.target.files.item(0);
        //Show image preview
        let reader = new FileReader();
        reader.onload = (event: any) => {
            switch(item) {
                case 0:
                    this.imageThumbnailUrl = event.target.result;
                    break;
                case 1:
                    this.imageUrl_1 = event.target.result;
                    break;
                case 2:
                    this.imageUrl_2 = event.target.result;
                    break;
                case 3:
                    this.imageUrl_3 = event.target.result;
                    break;
                case 4:
                    this.imageUrl_4 = event.target.result;
                    break;
                case 5:
                    this.imageUrl_5 = event.target.result;
                    break;
            }
        }
        reader.readAsDataURL(fileToUpload);
    }

    private handleImages(edit: boolean, productId: number) {
        const params = {
            "product_id": productId,
            "product_image_name": `product_image_name_${productId}`,
            "product_image_status": 1,
            "product_image_value_1": this.imageUrl_1,
            "product_image_value_2": this.imageUrl_2,
            "product_image_value_3": this.imageUrl_3,
            "product_image_value_4": this.imageUrl_4,
            "product_image_value_5": this.imageUrl_5
        }
        if (edit) {
            this.images.putImages(params, productId).subscribe((res) => {
                console.log('putImages', res);
            });
        } else {
            this.images.postImages(params).subscribe((response) => {
                console.log('response images', response);
            });
        }
    }
    private handleImagesThumbnail(edit: boolean, productId: number) {
        const params = {
            "product_id": productId,
            "product_group_id": null,
            "product_images_thumbnail_name": "name",
            "product_image_thumbnail_status": 1,
            "product_image_thumbnail_value": this.imageThumbnailUrl
        }
        if (edit) {
            this.images.putImageThumbnail(params, productId).subscribe((res) => {
                console.log('putImageThumbnail', res);
            });
        } else {
            this.images.postImageThumbnail(params).subscribe((response) => {
                console.log('response thumbnail', response);
            });
        }
    }

    public handleProduct(isEdit: boolean) {
        const params: any = {
            "product_name": this.productForm.value.productName,
            "product_description": this.productForm.value.productDescription,
            "product_price": this.productForm.value.productPrice,
            "product_total": this.productForm.value.productTotal,
            "product_color": this.productForm.value.productColor,
            "product_size": this.productForm.value.productSize,
            "product_group_id": this.productForm.value.productGroupID,
            "product_status": this.productForm.value.productStatus
        }
        if (isEdit) {
            this.product.updateProduct(params, this.productIdIsEdit).subscribe((res) => {
                if (res.result.id) {
                    this.handleImages(isEdit, res.result.id);
                    this.handleImagesThumbnail(isEdit, res.result.id);
                }
            });
        } else {
            this.product.createProduct(params).subscribe(async(response) => {
                if (response.result.id) {
                    this.handleImages(isEdit, response.result.id);
                    this.handleImagesThumbnail(isEdit, response.result.id);
                }
            });
        }
    }

}
