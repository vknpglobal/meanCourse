import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  view = 'list';
  products: any = [];
  displayedColumns: string[] = ['position', 'name', 'price', 'action'];
  dataSource : any = [];
  onlyNumber = new RegExp('^[0-9]*$');

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern(this.onlyNumber), Validators.min(5)]),
    productImage: new FormControl('', Validators.required)
  })

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.dataService.getProducts('products').subscribe(res => {
      this.dataSource  = res.products;
    })
  }

  onSubmit(){
    let product:any = [];
    console.log(this.productForm.value)
    this.dataService.addProduct('products', this.productForm.value).subscribe(res => {
      console.log(res)
    })
  }

  removeProduct(product) {
    this.dataService.deleteProduct('products/'+product._id).subscribe(res => {
      console.log(res)
    })
  }

}
