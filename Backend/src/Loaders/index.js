import expressLoader from "./express.js";

const init = async (app) => {
  expressLoader(app);
};

export default { init };
