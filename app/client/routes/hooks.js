export function adminRoleRequired () {
    // Check if user has "admin" role
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
        // if so, proceed
        this.next();
    } else {
        // otherwise, render "not authorized"
        this.render("notAuthorized");
    }
}