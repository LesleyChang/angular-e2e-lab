import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent implements OnInit {
  products: { id: string, unitPrice: number }[] = [];
  constructor(private service: CartService) {
    this.products = [...Array(10).keys()].map(k => ({ id: k.toString(), unitPrice: (k + 1) * 100 }));
  }

  ngOnInit() {
  }

  /** add to shopping-cart */
  addCart(id: string, unitPrice: number) {
    this.service.addToCart(id, unitPrice);
  }

}
