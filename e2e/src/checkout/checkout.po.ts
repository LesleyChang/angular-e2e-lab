import { browser, by, element, $, $$ } from 'protractor';
import { Helper } from '../helper';

export class CheckoutPage {
    /** 導至 Checkout 頁 */
    navigateTo() {
        return browser.get(`${browser.baseUrl}/checkout`) as Promise<any>;
    }
    /** 取得姓名輸入框 */
    getNameInput() {
        return $('input[name="name"]');
    }
    /** 姓名輸入框是否通過驗證 */
    isNameValid() {
        return Helper.hasClass(this.getNameInput(), 'ng-valid');
    }
    /** 取得姓名錯誤訊息 */
    getNameError() {
        return $('input[name="name"] + .alert-danger');
    }
    /** 取得 email 輸入框 */
    getEmailInput() {
        return $('input[name="email"]');
    }
    /** email 輸入框是否通過驗證 */
    isEmailValid() {
        return Helper.hasClass(this.getNameInput(), 'ng-valid');
    }
    /** 取得 email 錯誤訊息 */
    getEmailError() {
        return $('input[name="email"] + .alert-danger');
    }
    /** 點擊送出表單按鈕 */
    clickSendBtn() {
        return $('.form-container .btn-primary').click();
    }
    /** 取得彈窗文字 */
    getModalBodyText() {
        return $('modal-container .modal-content .modal-body').getText();
    }
    /** 取得彈窗遮罩 */
    getModalContainer() {
        return $('modal-container');
    }
}