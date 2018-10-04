import LDAP from 'ldapjs';

/**
 * Resolved promise return a list of users.
 * Rejected promise - error message.
 *
 * @param url
 * @param login
 * @param password
 * @param searchBase
 * @param attributes
 * @param ldapFilter
 * @returns {Promise<any>}
 */
const getLdapData =
  ({
    url,
    login,
    password,
    searchBase,
    attributes = ['dn', 'sid', 'displayName', 'mail', 'telephoneNumber', 'ipPhone', 'mobile', 'title', 'company', 'department'],
    ldapFilter = '|(&(objectCategory=person)(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))(objectClass=contact)'
  }) =>
    new Promise((resolve, reject) => {
      const ldapClient = LDAP.createClient({ url });

      ldapClient.on('error', (err) => reject(err));

      ldapClient.bind(
        login,
        password,
        (err) => {
          if (err) {
            ldapClient.unbind();
            return reject(err);
          }

          const searchOptions = {
            attributes,
            scope: 'sub',
            filter: ldapFilter,
            paged: true
          };

          ldapClient.search(
            searchBase,
            searchOptions,
            (err, res) => {
              if (err) {
                ldapClient.unbind();
                return reject(err);
              }

              let entries = [];
              res.on('searchEntry', (entry) => {
                const result = Object.keys(entry.object)
                  .filter(k => k !== 'controls')
                  .reduce((acc, key) => ({
                    ...acc,
                    [key]: entry.object[key]
                  }), {});

                entries = [...entries, result];
              });

              res.on('error', (err) => {
                ldapClient.unbind();
                return reject(err);
              });

              res.on('end', () => {
                ldapClient.unbind();
                return resolve(entries);
              });

            }
          );
        }
      );
    });

export default getLdapData;
