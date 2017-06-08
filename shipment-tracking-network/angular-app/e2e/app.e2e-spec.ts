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

  it('navbar-brand should be shipment-tracking-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('shipment-tracking-network@0.0.1');
  });

  
    it('Facility component should be loadable',() => {
      page.navigateTo('/Facility');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Facility');
    });

    it('Facility table should have 5 columns',() => {
      page.navigateTo('/Facility');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  
    it('Shipment component should be loadable',() => {
      page.navigateTo('/Shipment');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Shipment');
    });

    it('Shipment table should have 7 columns',() => {
      page.navigateTo('/Shipment');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  

});
