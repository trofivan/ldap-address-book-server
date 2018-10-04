import { getCompanies as getCompaniesModel } from '../models/companies';

/**
 * @example curl -XGET http://localhost:3000/companies
 */
export const getCompanies = async (ctx) => {
  try {
    ctx.body = await getCompaniesModel();
  } catch (err) {
    ctx.throw(503, err);
  }
};
