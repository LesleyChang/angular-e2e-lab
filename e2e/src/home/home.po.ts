import { browser, by, element, $, $$ } from 'protractor';

export class HomePage {
    /** 導至 Home 頁 */
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }
    /** 取得產品列表數量 */
    getProductCount() {
        return $$('app-shelf .card').count();

        // 下方寫法亦可
        // return element.all(by.css('app-shelf .card')).count();
    }
    /** 取得 header 購物車 */
    getCartIcon() {
        return $('app-cart-icon .shopping-cart-icon');
    }
    /** 彈窗是否顯示 */
    isModalDisplayed() {
        return $('modal-container').isDisplayed();
    }
    /** 取得彈窗文字 */
    getModalBodyText() {
        return $('modal-container .modal-body').getText();
    }
    /** 加入購物車 */
    addProductToCart() {
        return $$('.card-body a[title="加入購物車"]').first().click();
    }
    /** 取得購物車數量元素 */
    getCartCount() {
        return $('a.shopping-cart-icon .count');
    }
    /** 購物車細項是否顯示 */
    isCartDetailDisplayed() {
        return $$('modal-container .modal-content .modal-body .prod-count')
            .map(x => x.isDisplayed())
            .then(res => res.reduce((a, b) => a && b, true)) as Promise<boolean>;
    }
    /** 取得購物車細項'-'按鈕 */
    getAbstractBtn() {
        return $$('modal-container .modal-content .modal-body button.btn')
            .filter(async (x) => (await x.getText()) === '-');
    }
    /** 取得前往結帳按鈕 */
    getDirectToCheckoutBtn() {
        return $('modal-container .modal-footer button.btn-primary');
    }
}
