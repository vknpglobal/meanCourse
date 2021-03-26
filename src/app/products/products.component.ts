import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  view = 'list';
  products: any = [];
  dataSource: any = [];
  onlyNumber = new RegExp('^[0-9]*$');
  selectedProduct: any = {};

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern(this.onlyNumber), Validators.min(5)]),
    // productImage: new FormControl('', Validators.required)
  })

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  constructor(private productService: ProductService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getProducts('products').subscribe(res => {
      this.dataSource = res.products;
    })
  }

  onSubmit() {
    if (this.view === 'add') {
      this.productService.addProduct('products', this.productForm.value).subscribe(res => {
        console.log(res)
        this.view = 'list';
        this.getAllProducts();
        this.alertService.success('The product has been added.', this.options)
      })
    } else {
      const productBody = [
        { "propName": "name", "value": this.productForm.value.name },
        { "propName": "price", "value": this.productForm.value.price },
      ];

      this.productService.editProduct('products/' + this.selectedProduct._id, productBody).subscribe(res => {
        console.log('Product updated successfully.')
        this.view = 'list';
        this.getAllProducts()
        this.alertService.success('The product has been updated.', this.options)
      })
    }
  }

  removeProduct(product) {
    this.productService.deleteProduct('products/' + product._id).subscribe(res => {
      console.log(res)
      this.getAllProducts()
      this.alertService.success('The product has been removed.', this.options)
    })
  }

  editProduct(product) {
    this.productForm.controls.name.setValue(product.name);
    this.productForm.controls.price.setValue(product.price);
    this.selectedProduct = product;
    console.log(this.selectedProduct)
    this.view = 'edit';
  }

}
