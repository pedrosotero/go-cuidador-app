exports.definition = {
    config: {
        "columns": {
            "id": "INTEGER PRIMARY KEY",
            "user_id": "text",
            "first_name": "text",
            "last_name": "text",
            "email": "text",
            "token": "text",
        },
        "URL": Alloy.Globals.baseApiUrl + '/api/user',
        // "debug": 1, //debug mode enabled
        "useStrictValidation": 0, // validates each item if all columns are present
        "adapter": {
            "type": "sqlrest",
            "collection_name": "user",
            "idAttribute": "id"
        },

        // delete all models on fetch
        "deleteAllOnFetch": true
    },
    extendModel: function (Model) {
        _.extend(Model.prototype, {
            login: function (params, callback) {
                params.url = this.config.URL + '/login';
                params.type = 'POST';
                this.apiCall(params, callback);
            },
            register: function (params, callback) {
                params.url = this.config.URL + '/register';
                params.type = 'POST';
                this.apiCall(params, callback);
            },
            facebookLogin: function (params, callback) {
                params.url = this.config.URL + '/facebook-login';
                params.type = 'POST';
                this.apiCall(params, callback);
            },
        });
        return Model;
    },
    extendCollection: function (Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
}