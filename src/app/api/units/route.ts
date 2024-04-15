import headerOptions from '../../../../public/mock/header-options.json'

const getHeaderCustomNav = async () =>
  Response.json(headerOptions, { status: 200 });

export { getHeaderCustomNav as GET }