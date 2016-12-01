callXhr('/feed', {});
var collection = Alloy.Collections.instance('caregiver');

$.listView.addEventListener('itemclick', function (e) {
    var win = Alloy.createController('feed/details').getView();
    Alloy.Globals.navcontroller.open(win);
});

function onOpenSettingsClick() {
    var win = Alloy.createController('settings/index').getView();
    Alloy.Globals.navcontroller.open(win);
}

function onFavoritesClick() {
    var win = Alloy.createController('favorites/index').getView();
    Alloy.Globals.navcontroller.open(win);
}

function callXhr(url, params) {
    Alloy.Globals.callXhr(Alloy.Globals.baseApiUrl + url, params, "GET", $.win, function (e) {
        var caregivers = [];

        var currentCaregiver;
        var data = e.responseJSON;
        for (var i = 0; i < data.length; i++) {
            currentCaregiver = Alloy.createModel('caregiver', data[i]);
            caregivers.push(currentCaregiver);
        }
        collection.add(caregivers, {merge: true});
    });
}