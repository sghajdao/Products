import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionEvent } from 'src/app/state/product.state';
import { Product } from '../../../../model/product.model';
import { ProductActionTypes } from '../../../../state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?:Product;
  @Output() eventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product:Product){
    this.eventEmitter.emit({type:ProductActionTypes.SELECT_PRODUCT, payload:product});
  }

  onDelete(product:Product){
    this.eventEmitter.emit({type:ProductActionTypes.DELETE_PRODUCT, payload:product});
  }

  onEdit(product:Product){
    this.eventEmitter.emit({type:ProductActionTypes.EDIT_PRODUCT, payload:product});
  }

}
