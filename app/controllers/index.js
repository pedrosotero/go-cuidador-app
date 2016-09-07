var user = Alloy.createModel('User');

user.fetch({
    sql: {
        where: {
            id: 1
        }
    },
    localOnly: true,
    success: function (user) {
        var win;
        var login = true;
        if (user.id === 1) {
            Alloy.Globals.User = user;
            console.log('>>>usuario logado');
            var win = Alloy.createController('feed/index').getView();
            login = false;
        } else {
            console.log('>>>login');
            win = Alloy.createController('login/index').getView();
        }
    },
});
