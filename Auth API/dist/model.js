import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_JWT_KEY, DB_API_URL } from "./config.js";
/*
 *  @todo : Comment function
 */
export const modelUserLogin = async (data) => {
    const { email, password } = data;
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
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
        throw new Error("Invalid password");
        /*
         *  @todo : Better error handling
         */
    }
    // Creating JWT
    const publicUserData = {
        id: userData.id,
        name: userData.name,
        rut: userData.rut,
        status: userData.status,
    };
    // * Token expiration is not synced with Cookie expiration time
    // TODO : Sync the expiration times
    const token = jwt.sign(publicUserData, SECRET_JWT_KEY, {
        expiresIn: "72h",
    });
    return { publicUserData, token };
};
/*
 *  @todo : Comment function
 */
export const modelValidateToken = (input) => {
    const { token } = input;
    const realtoken = token.slice(1, -1);
    // ! This is really bad, but for whatever reason the token is getting sent
    // ! with extra quotation marks ('" ... "') instead of (" ... ").
    // TODO: Fix
    console.log(`Token: [${realtoken}] | Key: [${SECRET_JWT_KEY}]`);
    try {
        const data = jwt.verify(realtoken, SECRET_JWT_KEY);
        console.log("Token verified, data: ", data);
        return data;
    }
    catch (error) {
        throw new Error(error.message);
        /*
         *  @todo : Better error handling
         */
    }
};
