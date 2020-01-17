import { HomePage } from './home.po';
import { browser } from 'protractor';

describe('MyApp Home', () => {
    let page: HomePage;
    const emptyMsg = '購物車暫無商品!';

    beforeEach(() => {
        page = new HomePage();
        page.navigateTo();
    });

    it('should display product list', async () => {
        expect(await page.getProductCount()).toBeGreaterThan(0);
    });

    it(`should show 'cart is empty' on cart-icon click`, async () => {
        await page.getCartIcon().click();
        expect(page.isModalDisplayed()).toBeTruthy();
        expect(page.getModalBodyText()).toEqual(emptyMsg);
    });

    it(`cart-icon should show count when add product to cart`, async () => {
        expect(page.getCartCount().isDisplayed()).toBeFalsy();
        await page.addProductToCart();
        expect(page.getCartCount().isDisplayed()).toBeTruthy();
        expect(page.getCartCount().getText()).toEqual('1');
    });

    it(`should show defferent modal depending on Qty of product in cart`, async () => {
        await page.getCartIcon().click();
        expect(page.isModalDisplayed()).toBeTruthy();
        expect(page.isCartDetailDisplayed()).toBeTruthy();

        await page.getAbstractBtn().click();
        expect(page.isModalDisplayed()).toBeTruthy();
        expect(page.getModalBodyText()).toEqual(emptyMsg);
    });

    it(`should navigate to CheckoutPage on 'redirect-to-checkout' btn click`, async () => {
        await page.addProductToCart();
        await page.getCartIcon().click();
        await page.getDirectToCheckoutBtn().click();
        expect(browser.getCurrentUrl()).toMatch('/checkout$');
    });
});
