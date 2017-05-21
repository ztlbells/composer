import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('navbar-brand should be property-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('property-network@0.0.1');
  });

  
    it('LandTitle component should be loadable',() => {
      page.navigateTo('/LandTitle');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('LandTitle');
    });

    it('LandTitle table should have 5 columns',() => {
      page.navigateTo('/LandTitle');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  
    it('SalesAgreement component should be loadable',() => {
      page.navigateTo('/SalesAgreement');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('SalesAgreement');
    });

    it('SalesAgreement table should have 5 columns',() => {
      page.navigateTo('/SalesAgreement');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  

});
