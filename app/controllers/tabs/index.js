function onOpenSettingsClick() {
    var win = Alloy.createController('settings/index').getView();
    Alloy.Globals.navcontroller.open(win);
}

