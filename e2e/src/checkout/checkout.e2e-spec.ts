import { browser } from 'protractor';
import { CheckoutPage } from './checkout.po';
import { Helper } from '../helper';

describe('MyApp Checkout', () => {
  let page: CheckoutPage;
  const requiredMsg = '此為必填欄位';
  const minlengthMsg = '最小長度為 2';
  const invalidEmail = 'email 格式不符';
  const failureMsg = '表單檢核錯誤，請再次檢查。';
  const successMsg = '送出成功!';

  beforeEach(() => {
    page = new CheckoutPage();
    page.navigateTo();
  });

  it('both inputs should display error for required', async () => {
    // on blur
    await page.getNameInput().click();
    await page.getEmailInput().click();
    await page.getNameInput().click();

    expect(await page.isNameValid()).toBeFalsy();
    expect(await page.getNameError().getText()).toEqual(requiredMsg);
    expect(await page.isEmailValid()).toBeFalsy();
    expect(await page.getEmailError().getText()).toEqual(requiredMsg);
  });

  it('name input should display error for minlength', async () => {
    await page.getNameInput().sendKeys('a');
    await page.getEmailInput().click();

    expect(await page.isNameValid()).toBeFalsy();
    expect(await page.getNameError().getText()).toEqual(minlengthMsg);
  });

  it('email input should display error for email-validation', async () => {
    await page.getEmailInput().sendKeys('a');
    await page.getNameInput().click();

    expect(await page.isNameValid()).toBeFalsy();
    expect(await page.getEmailError().getText()).toEqual(invalidEmail);
  });

  it('should show failure modal if form invalid', async () => {
    await page.clickSendBtn();
    expect(await page.getModalBodyText()).toEqual(failureMsg);
  });

  it('should show success modal, and navigate to home-page if form valid', async () => {
    await page.getNameInput().sendKeys('andy');
    await page.getEmailInput().sendKeys('andy@gmail.com');

    expect(await page.isNameValid()).toBeTruthy();
    expect(await page.isEmailValid()).toBeTruthy();

    await page.clickSendBtn();
    // expect(await page.getModalBodyText()).toEqual(successMsg);
    await page.getModalContainer().click();
    expect(await browser.getCurrentUrl()).toMatch('/home$');
  });
});
