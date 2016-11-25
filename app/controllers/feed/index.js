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
