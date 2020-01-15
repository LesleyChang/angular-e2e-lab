import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { CartService, CartProduct } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
  @Input() isCollapsed: boolean;
  detailModalRef: BsModalRef;
  products$: BehaviorSubject<CartProduct[]>;
  count = 0;
  get total() {
    return this.products$.value.map(x => x.count * x.unitPrice).reduce((a, b) => a + b);
  }

  constructor(
    private service: CartService,
    private modalService: BsModalService,
    private router: Router) {
    this.products$ = this.service.getProducts();
  }

  ngOnInit() {
    this.service.getCartCount().subscribe(res => this.count = res);
  }

  onCartClick(template: TemplateRef<any>) {
    this.detailModalRef = this.modalService.show(template);
  }

  add(id: string) {
    this.service.modifyProduct('add', id);
  }

  substract(id: string) {
    this.service.modifyProduct('substract', id);
  }

  /** go to checkout page  */
  checkout() {
    this.detailModalRef.hide();
    this.router.navigateByUrl('/checkout');
  }
}
