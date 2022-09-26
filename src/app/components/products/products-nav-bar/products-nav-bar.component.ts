import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductActionTypes, ActionEvent } from '../../../state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.productEventEmitter.emit({type:ProductActionTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts(){
    this.productEventEmitter.emit({type:ProductActionTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts(){
    this.productEventEmitter.emit({type:ProductActionTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct(){
    this.productEventEmitter.emit({type:ProductActionTypes.NEW_PRODUCTS});
  }

  onSearch(dataForm:any){
    this.productEventEmitter.emit({type:ProductActionTypes.SEARCH_PRODUCTS, payload:dataForm});
  }
}
