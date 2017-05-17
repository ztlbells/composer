'use strict';

function onRegisterPropertyForSale(propertyForSale) {
    console.log('### onRegisterPropertyForSale ' + propertyForSale.toString());
    propertyForSale.title.forSale = true;

    returAssetRegistry('net.biz.digitalpropertynetwork.LandTitle').then(function(result) {
            return result.update(propertyForSale.title);
        }
    );
}
