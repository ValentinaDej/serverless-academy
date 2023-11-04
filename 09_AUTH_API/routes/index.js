import users from "./user.js";
import auth from "./auth.js";

const mountRoutes = (app) => {
  app.use("/me", users);
  app.use("/auth", auth);
};

export default mountRoutes;
