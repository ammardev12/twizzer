const jwt = require('jsonwebtoken');


module.exports =  function(req, res, next) {
    const token = req.header('token');
    if(!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(req.header('token'), process.env.SECRET_KEY);
        req.user = verified;
        next();
    }catch (err) {
        res.status(420).send("Invalid Token");
    }
}