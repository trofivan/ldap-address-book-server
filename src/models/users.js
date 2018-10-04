import config from 'config';
import getLdapData from '../managers/ldap';

const ldapOptions = config.get('ldap');

export const getUsers = async () => {
  const ldapFilter = '|(&(objectCategory=person)(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))(objectClass=contact)';
  return await getLdapData({ ...ldapOptions, ldapFilter });
};

export const getUser = async (dn) => {
  const ldapFilter = `(DistinguishedName=${dn})`;
  return await getLdapData({ ...ldapOptions, ldapFilter });
};
