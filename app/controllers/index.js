var user = Alloy.createCollection('user');
user.fetch({
    success: function (user) {
        var win;
        var login = true;
        if (user.at(0)) {
            Alloy.Globals.User = user.at(0);
            // win = Alloy.createController('tabs/index').getView();
            win = Alloy.createController('feed/index').getView();
        } else {
            win = Alloy.createController('login/index').getView();
        }

        if (Ti.Filesystem.hasStoragePermissions()) {
            Alloy.Globals.navcontroller.open(win);
        } else {
            Ti.Filesystem.requestStoragePermissions(function (e) {
                if (e.success === true) {
                    Alloy.Globals.navcontroller.open(win);
                }
            });
        }
    },
});