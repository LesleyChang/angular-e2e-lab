import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = { name: '', email: '' };
  @ViewChild('error') error: TemplateRef<any>;
  @ViewChild('success') success: TemplateRef<any>;
  modalRef: BsModalRef;
  constructor(
    private service: CartService,
    private modalService: BsModalService,
    private router: Router) { }

  ngOnInit() { }

  confirm() {
    if (document.querySelector('.ng-invalid')) {
      this.modalRef = this.modalService.show(this.error);
      return;
    }

    this.modalService.onHidden.pipe(take(1)).subscribe(() => {
      this.service.getProducts().next([]);
      this.router.navigateByUrl('/');
    });
    this.modalRef = this.modalService.show(this.success);
  }

}
