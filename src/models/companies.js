import config from 'config';
import getLdapData from '../managers/ldap';

const ldapOptions = config.get('ldap');

export const getCompanies = async () => {
  const ldapFilter = '|(&(objectCategory=person)(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))(objectClass=contact)';
  const attributes = ['company'];
  const ldapData = await getLdapData({ ...ldapOptions, ldapFilter, attributes });
  const companies = ldapData.reduce((acc, current) => {
    const companyName = typeof current.company === 'string' ? current.company.trim() : 'Unknown';

    return acc[companyName] ? {
      ...acc,
      [companyName]: {
        personsCount: acc[companyName].personsCount + 1
      }
    } : {
      ...acc,
      [companyName]: { personsCount: 1 }
    };
  }, {});

  return companies;
};
