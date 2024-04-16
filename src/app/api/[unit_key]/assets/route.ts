  import { type NextRequest } from 'next/server';

  import { instanceSqlite, UnitName, Database } from '../../../../database'

  type Params = {
    params: { unit_key: string }
  }

  let db: Database | null = null;

  const getHeaderCustomNav = async (req: NextRequest, route: Params) => {
    const { searchParams } = req.nextUrl;
    const collectionKey = route.params.unit_key;

    if (!db)
      db = instanceSqlite(collectionKey as UnitName);

    try {
      const page = parseInt(searchParams.get('page') ?? '1');
      const size = parseInt(searchParams.get('size') ?? '50');
      const code = searchParams.get('code')

      const offset = (page - 1) * size;
      const sql = code != null
        ? 'SELECT * FROM assets_x_locations NOLOCK WHERE parentId = ? LIMIT ? OFFSET ?'
        : 'SELECT * FROM assets_x_locations NOLOCK LIMIT ? OFFSET ?';

      const sqlCount = code != null
        ? 'SELECT COUNT(1) AS total FROM assets_x_locations NOLOCK WHERE parentId = ?'
        : 'SELECT COUNT(1) AS total FROM assets_x_locations NOLOCK';

      const params = code != null ? [code, size, offset] : [size, offset];

      const countParams = code != null ? [ code ] : [];

      const [rows, count] = await Promise.all([
        new Promise<any[]>((resolve, reject) => {
          db!.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
        }),
        new Promise<any>((resolve, reject) => {
          db!.get(sqlCount, countParams, (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        })
      ]);

      // Note: allow pagination count.
      const responseBody = { total: count.total , rows };

      return Response.json(responseBody, { status: 200 });
    } catch (err) {
      console.error(err);
      return Response.json({ error: 'Erro ao obter os dados do banco de dados.' });
    }
  }

  export { getHeaderCustomNav as GET }