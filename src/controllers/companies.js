/**
 * @example curl -XGET http://localhost:3000/companies
 */
export const getCompanies = async ctx => {

  ctx.body = [
    {
      id: 1,
      name: 'Name 1'
    },
    {
      id: 2,
      name: 'Name 2'
    }
  ];
};

/**
 * @example curl -XGET http://localhost:3000/companies/1
 */
export const getCompany = async ctx => {
  const id = ctx.params.id;
  ctx.throw(404, `Company ${id} not found`);
};
