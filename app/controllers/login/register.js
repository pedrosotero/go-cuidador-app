function close() {
    Alloy.Globals.navcontroller.close();
}

function onRegisterClick() {
    var win = Alloy.createController('feed/index').getView();
    Alloy.Globals.navcontroller.open(win);
}

function onFacebookLoginClick() {
    var win = Alloy.createController('feed/index').getView();
    Alloy.Globals.navcontroller.open(win);
}
