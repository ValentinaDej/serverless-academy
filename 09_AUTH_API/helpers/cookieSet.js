export const cookieSet = (res, data) => {
  res.cookie("refreshToken", data.refreshToken, {
    path: "/auth",
    domain: "localhost",
    maxAge: data.expiresIn,
    httpOnly: true,
  });
};
