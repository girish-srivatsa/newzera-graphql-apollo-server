var common = require("./creator.js");
const Client = require("serverless-mysql");
exports.func = async (_, { name, profileUrl }) => {
  var client = Client({
    config: {
      host: "localhost",
      database: "test",
      user: "root",
      password: "password",
    },
  });
  await common.init(client);
  console.log(profileUrl);
  var resp = await common.setProfile(client, name, profileUrl);
  client.quit();
  return resp;
};
