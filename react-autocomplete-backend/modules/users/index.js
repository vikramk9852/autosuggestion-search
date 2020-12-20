const { USERS_COLLECTION_NAME } = require('../../constants/common');

class Users {

    constructor(mongoDatabase) {
        this.mongoDB = mongoDatabase
        this.mongoUsersCollection = this.mongoDB.collection(USERS_COLLECTION_NAME);
        this.dbInstance = require('../../index');
        this.createIndex();
    }

    createIndex() {
        return this.mongoUsersCollection.createIndex({
            "id": "text",
            "name": "text",
            "items": "text",
            "address": "text",
            "pincode": "text"
        })
    }

    searchUsers(searchString) {

        let queryFilter = {
            $or: [

                { id: { $regex: new RegExp(searchString, "gi") } },
                { name: { $regex: new RegExp(searchString, "gi") } },
                { items: { $regex: new RegExp(searchString, "gi") } },
                { address: { $regex: new RegExp(searchString, "gi") } },
                { pincode: { $regex: new RegExp(searchString, "gi") } }
            ]
        }
        return this.mongoUsersCollection.find(queryFilter).toArray();
    }

    getUserByUserId(userId) {
        return this.mongoUsersCollection.findOne({ id: userId });
    }

}

module.exports = Users;