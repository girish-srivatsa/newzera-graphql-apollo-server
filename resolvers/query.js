var common = require("./creator.js");
const Client = require("serverless-mysql");
exports.func = async (_, { name }) => {
  var client = Client({
    config: {
      host: "localhost",
      database: "test",
      user: "root",
      password: "password",
    },
  });
  await common.init(client);
  var resp = await common.getUser(client, name);
  client.quit();
  return resp;
};
