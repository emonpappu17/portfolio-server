import { Response } from "express";

export const setAuthCookie = (res: Response, tokenInfo: { accessToken: string }) => {
    // console.log(tokenInfo);
    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
}