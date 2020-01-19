import { ElementFinder } from 'protractor';

export class Helper {
    static hasClass = (element: ElementFinder, cls: string) => {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };
}


