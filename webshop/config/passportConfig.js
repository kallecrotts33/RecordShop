const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByName, getUserById) {

    const authenticateUser = async (name, password, done) => {
        try {
            const user = await getUserByName(name); 
            if (!user) {
                return done(null, false, { message: 'No user with that name' });
            }

            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy(
        { usernameField: 'name' },
        authenticateUser
    ));

    passport.serializeUser((user, done) => done(null, user.user_id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize;
