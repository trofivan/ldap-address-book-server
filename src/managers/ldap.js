import LDAP from 'ldapjs';

const DEFAULT_LDAP_FILTER = "|(&(objectCategory=person)(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))(objectClass=contact)";
const DEFAULT_SEARCH_ATTRIBUTES = ['dn', 'displayName', 'mail', 'telephoneNumber', 'ipPhone', 'mobile', 'title', 'company', 'department'];

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
export const getUsers = ({url, login, password, searchBase, attributes = [], ldapFilter = DEFAULT_LDAP_FILTER}) =>
  new Promise((resolve, reject) => {
    const ldapClient = LDAP.createClient({url});

    ldapClient.on('error', (err) => {
      reject(err.message);
      return reject(err.message);
    });

    ldapClient.bind(
      login,
      password,
      (err) => {
        if (err) {
          ldapClient.unbind();
          return reject(err.message);
        }

        const searchOptions = {
          attributes: [...DEFAULT_SEARCH_ATTRIBUTES, ...attributes],
          scope: "sub",
          filter: ldapFilter,
          paged: true
        };

        ldapClient.search(
          searchBase,
          searchOptions,
          (err, res) => {
            if (err) {
              ldapClient.unbind();
              return reject(err.message);
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
              return reject(err.message);
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
