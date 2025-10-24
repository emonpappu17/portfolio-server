"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
    // console.log(tokenInfo);
    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
};
exports.setAuthCookie = setAuthCookie;
