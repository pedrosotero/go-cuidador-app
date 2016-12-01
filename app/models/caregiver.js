exports.definition = {
    config: {
        "columns": {
            "id": "INTEGER PRIMARY KEY",
            "avatar": "text",
            "croppedAvatar": "text",
            "first_name": "text",
            "last_name": "text",
            "neighborhood": "text",
            "rate": "text",
            "types": "text",
            "description": "text",
            "phone": "text",
            "email": "text"
        },
        "adapter": {
            "type": "sql",
            "collection_name": "caregiver",
            "idAttribute": "id"
        },
    },
    extendModel: function (Model) {
        _.extend(Model.prototype, {
            transform: function transform() {
                var transformed = this.toJSON();

                transformed.full_name = transformed.first_name + ' ' + transformed.last_name;
                return transformed;
            }
        });
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