import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartProduct {
  id: string;
  count: number;
  unitPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /** cart product list */
  private cartList = new BehaviorSubject<CartProduct[]>([]);

  constructor() { }

  /** get products in cart as BehaviorSubject */
  getProducts(): BehaviorSubject<CartProduct[]> {
    return this.cartList;
  }

  /** get product sum in cart */
  getCartCount(): Observable<number> {
    return this.cartList.pipe(
      map(x => x.map(y => y.count).reduce((a, b) => a + b, 0)));
  }

  /** add product to cart by id */
  addToCart(id: string, unitPrice: number) {
    const index = this.cartList.value.findIndex(x => x.id === id);
    if (index > -1) {
      const newArr = [...this.cartList.value];
      newArr[index].count++;
      this.cartList.next(newArr);
    } else {
      this.cartList.next([...this.cartList.value, { id, count: 1, unitPrice }]);
    }
  }

  /** modify product in cart */
  modifyProduct(type: 'add' | 'substract', id: string) {
    let newArr = [...this.cartList.value];
    const prod = newArr.find(x => x.id === id);
    switch (type) {
      case 'add':
        prod.count++;
        this.cartList.next(newArr);
        return;
      case 'substract':
        if (prod.count > 1) { prod.count--; } else {
          newArr = newArr.filter(x => x.id !== prod.id);
        }
        this.cartList.next(newArr);
        return;
      default:
        return;
    }
  }
}
