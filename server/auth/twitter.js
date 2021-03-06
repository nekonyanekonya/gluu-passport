var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var setCredentials = function(credentials) {
    var callbackURL = global.applicationHost.concat("/passport/auth/twitter/callback");
    passport.use(new TwitterStrategy({
            consumerKey: credentials.clientID,
            consumerSecret: credentials.clientSecret,
            callbackURL: callbackURL,
            includeEmail: true,
            profileFields: ['id', 'name', 'displayName', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            var userProfile = {
                id: profile.id,
                name: profile.displayName || profile.username,
                username: profile.username || profile.id,
                email: profile._json.email || "",
                givenName: profile.first_name || "",
                familyName: profile.last_name || "",
                provider: profile.provider,
                accessToken: accessToken
            };
            return done(null, userProfile);
        }
    ));
};

module.exports = {
    passport: passport,
    setCredentials: setCredentials
};
