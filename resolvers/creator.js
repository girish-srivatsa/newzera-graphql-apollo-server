exports.init = async (client) => {
  await client.query(`
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
    `);
  console.log("init over");
};
exports.getUser = async (client, name) => {
  var userFromDb = await client.query(
    `
    select id, name, description, url, profileUrl from users where name = ? 
    `,
    [name]
  );

  if (userFromDb.length == 0) {
    return null;
  }
  return userFromDb[0];
};
exports.setProfile = async (client, name, profile) => {
  await client.query(
    `
        UPDATE users SET profileUrl=? WHERE name=?;
        `,
    [profile, name]
  );
  var userFromDb = await client.query(
    `
    select id, name, description, url, profileUrl from users where name = ? 
    `,
    [name]
  );
  return userFromDb[0];
};
