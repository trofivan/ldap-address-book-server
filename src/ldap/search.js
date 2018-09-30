import config from "config";
import LDAPClient from "./client";

const {url, user, password} = config.get('ldap');

export default (options) => new Promise((resolve, reject) => {
  const ldapClient = new LDAPClient({url});

  ldapClient.bind(user, password, (err) => {
    consoel.log(err)
  });

  // ldapClient.bind(user, password, err => {
  //   if (err)
  //     return reject(err);
  //
  // });
});
