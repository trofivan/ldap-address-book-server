import config from 'config';
import {getUsers as getLDAPUsers} from '../managers/ldap';

const ldapOptions = config.get('ldap');

/**
 * @example curl -XGET http://localhost:3000/users
 */
export const getUsers = async (ctx) => {
  try {
    ctx.body = await getLDAPUsers(ldapOptions);
  } catch (errMsg) {
    ctx.throw(503, errMsg);
  }
};

/**
 * @example curl -XGET http://localhost:3000/users/CN=UserName,OU=Users,DC=domain,DC=local
 */
export const getUser = async (dn) => {
};
