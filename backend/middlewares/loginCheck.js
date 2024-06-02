// check if already logged in using cookies
const loginCheck = (req, res, next) => {
    if (req.cookies && req.cookies.token) {
        res.redirect('/home');
    } else {
        next();
    }
};
export default loginCheck;