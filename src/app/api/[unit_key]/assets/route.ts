import { type NextRequest } from 'next/server';

import { getAssets } from '../../../../database'

type Params = {
  params: { unit_key: string }
}

const getHeaderCustomNav = async (req: NextRequest, route: Params) => {
  const { searchParams } = req.nextUrl;
  const collectionKey = route.params.unit_key;

  try {
    const page = parseInt(searchParams.get('page') ?? '1');
    const size = parseInt(searchParams.get('size') ?? '50');
    const code = searchParams.get('code')

    const rows = await getAssets({
      page,
      size,
      unitKey: collectionKey,
      code: code,
    })

    return Response.json(rows, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Erro ao obter os dados do banco de dados.' });
  }
}

export { getHeaderCustomNav as GET }