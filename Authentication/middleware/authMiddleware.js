const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader)
        {
            return res.status(401).json({message: "No token provided!"});
        }
        //remove bearer from token
        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        //attach user data
        req.user = decoded;

        next();

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = authMiddleware;
