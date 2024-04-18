import { type NextRequest } from 'next/server';

import { getAssets, getAssetsBySearch } from '../../../../database'

type Params = {
  params: { unit_key: string }
}

const getHeaderCustomNav = async (req: NextRequest, route: Params) => {
  const { searchParams } = req.nextUrl;
  const collectionKey = route.params.unit_key;

  try {
    const page = parseInt(searchParams.get('page') ?? '1');
    const size = parseInt(searchParams.get('size') ?? '50');
    const term = searchParams.get('search')
    const code = searchParams.get('code')

    if (term) {
      const { assets } = await getAssetsBySearch(term, collectionKey)

      return Response.json({ assets, total: assets.length }, { status: 200 });
    }

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