import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_JWT_KEY, DB_API_URL } from "./config.js";
export const modelUserLogin = async (data) => {
    const { email, password } = data;
    console.log(email, DB_API_URL);
    const params = new URLSearchParams({
        email,
    });
    // Getting user by email
    const response = await fetch(`${DB_API_URL}/api/users?${params.toString()}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("User not found");
    }
    const userData = await response.json();
    console.log(userData);
    // Comparing password with hashed password
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
        throw new Error("Invalid password");
    }
    // Creating JWT
    const publicUserData = {
        id: userData.id,
        name: userData.name,
        rut: userData.rut,
        status: userData.status,
    };
    const token = jwt.sign(publicUserData, SECRET_JWT_KEY, {
        expiresIn: "1h",
    });
    return { publicUserData, token };
};
export const modelValidateToken = (input) => {
    const { token } = input;
    try {
        const data = jwt.verify(token, SECRET_JWT_KEY);
        return data;
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
