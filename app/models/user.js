exports.definition = {
    config: {
        "columns": {
            "id": "INTEGER PRIMARY KEY",
            "token": "text"
        },
        "adapter": {
            "type": "sql",
            "collection_name": "user",
            "idAttribute": "id"
        },
    },
    extendModel: function (Model) {
        _.extend(Model.prototype, {});
        // end extend

        return Model;
    },
    extendCollection: function (Collection) {
        _.extend(Collection.prototype, {

            deleteAll: function () {
                var collection = this;

                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();

                collection.trigger('sync');
            },
        });
    }
}