const { MongoClient } = require('mongodb');
const { DB_NAME } = require('./constants/common');
const Users = require('./modules/users');

class Database {
    constructor() {
        if (Database.instance) {
            throw new Error("You can't create object. Use Database.getInstance()");
        }
        this.mongoClient = null;
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
            console.info("Creating Database instance");
        }
        return Database.instance;
    }

    initDatabase(URL) {
        if (this.mongoClient) {
            return Promise.resolve();
        }

        return MongoClient.connect(URL).then(mongoClient => {
            this.mongoClient = mongoClient;
            let mongoDatabase = this.mongoClient.db(DB_NAME);
            this.initObjects(mongoDatabase);
            return mongoDatabase;
        })
    }

    initObjects(mongoDatabase) {
        this.users = new Users(mongoDatabase);
    }
}

module.exports = Database.getInstance();