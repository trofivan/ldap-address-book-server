import { getUsers as getUsersModel, getUser as getUserModel } from '../models/users';

/**
 * @example curl -XGET http://localhost:3000/users
 */
export const getUsers = async (ctx) => {
  try {
    ctx.body = await getUsersModel();
  } catch (err) {
    ctx.throw(503, err);
  }
};

/**
 * @example curl -XGET http://localhost:3000/users/CN=UserName,OU=Users,DC=domain,DC=local
 */
export const getUser = async (ctx) => {
  try {
    const user = await getUserModel(ctx.params.dn);

    if (user.length === 0) {
      ctx.throw(404, 'Object not found');
    }

    ctx.body = user[0];
  } catch (err) {
    ctx.throw(503, err);
  }
};
