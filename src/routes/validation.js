module.exports = {

  validateUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 8-20 characters in length").isLength({min: 8}).isLength({max: 20})
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }
};