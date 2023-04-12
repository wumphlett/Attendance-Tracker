const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.redirect(`https://api.auttend.com/accounts/login?redirect=${encodeURIComponent(req.originalUrl)}`);
        console.log(req.query)
        console.log("Redirection complete")
    }
}

const verifyAuth = (req, res, next) => {
    next();
}

module.exports = { checkAuth, verifyAuth }