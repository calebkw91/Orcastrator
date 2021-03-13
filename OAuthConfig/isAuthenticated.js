module.exports = function (req, res, next) {
  // If the user is logged in continue
  if (req.user) {
    console.log("Authenticated")
    return next();
  }
  // If the user isn't logged in send the homepage
  console.log("Not Authenticated")
  return res.redirect("/login");
};
