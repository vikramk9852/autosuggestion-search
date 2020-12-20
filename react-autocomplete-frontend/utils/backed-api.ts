import { makeApiCall } from "./apiHelper";
import { SERVER_URL } from "@constants/common";

export default class BackendApi {
    static searchUsers(searchString) {
        return makeApiCall({
            url: SERVER_URL,
            method: 'POST',
            bodyParams: {
                moduleName: "users",
                functionName: "searchUsers",
                parameters: [searchString]
            }
        });
    }

    static getUserByUserId(userId) {
        return makeApiCall({
            url: SERVER_URL,
            method: 'POST',
            bodyParams: {
                moduleName: "users",
                functionName: "getUserByUserId",
                parameters: [userId]
            }
        });
    }
}