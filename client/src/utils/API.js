import axios from "axios";

//eslint-disable-next-line
export default {
    // Gets user by id
    getUser: function (id) {
        return axios.get("/api/users/" + id);
    },
    // Gets all groups
    getGroups: function () {
        return axios.get("/api/groups");
    },
    // Gets the group with the given id
    getGroup: function (id) {
        return axios.get("/api/groups/" + id);
    },
    // Deletes the group with the given id
    deleteGroup: function (id) {
        return axios.delete("/api/groups/" + id);
    },
    // Saves a group to the database
    saveGroup: function (groupData) {
        console.log(groupData);
        return axios.post("/api/groups", groupData);
    },
    // Gets groups that a specific user belongs to
    getUserGroups: function (id) {
        return axios.get("/api/users/groups/" + id);
    },
    // Get users that belong to a specific group
    getGroupUsers: function (id) {
        return axios.get("/api/groups/users/" + id);
    },
    // Saves a group to the database
    // data = { groupID: , userID: }
    saveUserToGroup: function (data) {
        console.log(data);
        return axios.post("/api/groups/users", data);
    }
};