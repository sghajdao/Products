import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { catchError, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { productsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ProductActionTypes, ActionEvent } from '../../state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:productsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$=this.productsService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED , data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({daraState:DataStateEnum.ERROR , errorMessage:err.message}))
    ); 

  }

  onGetSelectedProducts(){
    this.products$=this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED , data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({daraState:DataStateEnum.ERROR , errorMessage:err.message}))
    );
  }

  onGetAvailableProducts(){
    this.products$=this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED , data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({daraState:DataStateEnum.ERROR , errorMessage:err.message}))
    );
  }

  onSearch(dataForm:any){
    this.products$=this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED , data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({daraState:DataStateEnum.ERROR , errorMessage:err.message}))
    );
  }

  onSelect(p:Product){
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p:Product){
    let v=confirm("You want to delete this product, are you sure?");
    if(v == true)
    this.productsService.delete(p).subscribe(data=>{this.onGetAllProducts();})
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event:ActionEvent){
    switch($event.type){
      case ProductActionTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionTypes.NEW_PRODUCTS:this.onNewProduct();break;
      case ProductActionTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductActionTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;
      case ProductActionTypes.EDIT_PRODUCT:this.onDelete($event.payload);break;
    }
  }
}
