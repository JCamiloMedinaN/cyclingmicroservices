import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token)
            return res
                .status(401)
                .json({ message: "No token, autorizacion denegada" });

        jwt.verify(token, TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token invalido" });
            }
            // Agrega el usuario decodificado al objeto de solicitud (req)
            req.user = user;

            // Llama a next() después de verificar el token
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}