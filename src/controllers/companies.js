import ldapSearch from '../ldap/search';

/**
 * @example curl -XGET http://localhost:3000/companies
 */
export const getCompanies = async (ctx, next) => {
  try {
    const companies = await ldapSearch();
    ctx.body = companies;
  } catch (e) {
    ctx.throw(503, e.message);
  }
  //const

  // next();

  // ctx.body = [
  //   {
  //     id: 1,
  //     name: 'Name 1'
  //   },
  //   {
  //     id: 2,
  //     name: 'Name 2'
  //   }
  // ];
};

/**
 * @example curl -XGET http://localhost:3000/companies/1
 */
export const getCompany = async ctx => {
  const id = ctx.params.id;
  ctx.throw(404, `Company ${id} not found`);
};
