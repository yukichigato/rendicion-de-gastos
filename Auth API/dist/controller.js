import { validateBody } from "./schemas.js";
import { modelUserLogin, modelValidateToken } from "./model.js";
export const userLogin = async (req, res) => {
    // Zod validation
    const validation = validateBody(req.body);
    if (!validation.success) {
        res.status(400).json({ message: JSON.parse(validation.error.message) });
        return;
    }
    // Validating email and password
    try {
        const data = await modelUserLogin(validation.data);
        res
            // .cookie("auth_token", data.token, {
            //   httpOnly: true,
            //   sameSite: "strict",
            //   maxAge: 1000 * 60 * 60,
            // })
            .json(JSON.stringify(data.token));
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
export const validateToken = (req, res) => {
    try {
        const data = modelValidateToken(req.body);
        res.json(data);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
export const logout = (req, res) => {
    res.clearCookie("auth_token");
};
