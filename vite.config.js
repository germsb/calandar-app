
const fs = require("fs");
module.exports = {
  https: true,
  httpsOptions: {
      key: fs.readFileSync("./cert/localhost+3-key.pem"),
      cert: fs.readFileSync("./cert/localhost+3.pem")
  }
}; //as UserConfig | BuildConfig | ServerConfig | SharedConfig;
