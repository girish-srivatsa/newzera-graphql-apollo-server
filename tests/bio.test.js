import gql from "graphql-tag";
import client from "../jest/testClient";
const server = require("../jest/testServer", { bustCache: true }).default;
const Client_def = require("serverless-mysql");
var Client = Client_def({
  config: {
    host: process.env.MYSQL_HOST,
    database: "test",
    user: "root",
    password: "password",
  },
});

describe("Tests the bio info table", () => {
  // Defining the queries and mutations
  const GetUserDetails = gql`
    query getUserDetails($name: String!) {
      getUserDetails(name: $name) {
        name
        url
        description
      }
    }
  `;

  // Creating table before all the test runs
  beforeAll(async () => {
    const data = `
      CREATE TABLE IF NOT EXISTS users
      (
          id MEDIUMINT UNSIGNED not null AUTO_INCREMENT, 
          created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          name varchar(100) not null,
          description varchar(100) not null,
          url varchar(30) not null, 
          profileUrl varchar(200),
          PRIMARY KEY (id)
      );  
      `;
    await Client.query(data);

    await server.listen({ port: "3000" });
  });

  // Dropping table after all test runs
  afterAll(async () => {
    await server.stop();
    await new Promise((r) => setTimeout(r, 2000));
  });

  it("[T-1] Runs Getting Bio Query - name: 123", async () => {
    console.log("in");
    const { data } = await client.query({
      query: GetUserDetails,
      variables: {
        name: "123",
      },
    });
    console.log("hi");
    console.log(data);
    const dataMatch = {
      name: "123",
      description: "123",
      url: "123",
    };
    expect(data.getUserDetails).toEqual(dataMatch);
  });

  it("[T-2] Runs Getting Bio Query - name: 234", async () => {
    console.log("in");
    const { data } = await client.query({
      query: GetUserDetails,
      variables: {
        name: "234",
      },
    });
    console.log("hi");
    console.log(data);
    const dataMatch = {
      name: "234",
      description: "234",
      url: "123",
    };
    expect(data.getUserDetails).toEqual(dataMatch);
  });
  it("[T-3] Runs Getting Bio Query - name: 253", async () => {
    console.log("in");
    const { data } = await client.query({
      query: GetUserDetails,
      variables: {
        name: "253",
      },
    });
    console.log("hi");
    console.log(data);
    const dataMatch = null;
    expect(data.getUserDetails).toEqual(dataMatch);
  });
});
