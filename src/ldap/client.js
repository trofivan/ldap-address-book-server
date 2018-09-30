import LDAP from 'ldapjs';

let instance;

export default class LDAPClient {

  client = null;

  constructor(options) {
    if (instance) {
      return instance;
    }

    instance = this;
    this.client = LDAP.createClient(options);
  }

  getClient() {
    return this.client;
  }

}
