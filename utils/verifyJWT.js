// const jwt = require("jsonwebtoken");

// function verifyJWT(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).send("unauthorize access");
//   }
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
//     if (err) {
//       return res.status(403).send({ message: "forbidden access" });
//     }
//     req.decoded = decoded;
//     next();
//   });
// }

// module.exports = verifyJWT;
