function close() {
    Alloy.Globals.navcontroller.close();
}

function onEditPasswordClick() {
    var win = Alloy.createController('settings/editPassword').getView();
    Alloy.Globals.navcontroller.open(win);
}

function onDeleteAccountClick() {
    var win = Alloy.createController('settings/deleteAccount').getView();
    Alloy.Globals.navcontroller.open(win);
}

function onLogoutClick() {
    Alloy.Globals.navcontroller.home();
}