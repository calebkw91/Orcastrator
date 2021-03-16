import axios from "axios";

//eslint-disable-next-line
export default {
  // Gets all books
  getGroups: function() {
    return axios.get("/api/groups");
  },
  // Gets the book with the given id
  getGroup: function(id) {
    return axios.get("/api/groups/" + id);
  },
  // Deletes the book with the given id
  deleteGroup: function(id) {
    return axios.delete("/api/groups/" + id);
  },
  // Saves a book to the database
  saveGroup: function(groupData) {
    console.log(groupData);
    return axios.post("/api/groups", groupData);
  }
};