import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private productService: ProductService) { }

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
        this.getAllProducts()
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
      })
    }
  }

  removeProduct(product) {
    this.productService.deleteProduct('products/' + product._id).subscribe(res => {
      console.log(res)
      this.getAllProducts()
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
