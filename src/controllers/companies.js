export const getCompanies = ctx => {
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

export const getCompany = (ctx, next) => {
  const id = ctx.params.id;
  ctx.throw(404, `Company ${id} not found`);
};
