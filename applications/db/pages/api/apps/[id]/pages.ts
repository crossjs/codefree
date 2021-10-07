import { compose } from '@cofe/api';
import { CofeDbPage } from '@cofe/types';
import { get, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req, res, { auth: { userId } }) => {
    const appId = req.query.id as string;
    const test = (item: CofeDbPage) =>
      item.appId === appId && item.userId === userId;

    if (req.method === 'GET') {
      const pages = await get('pages', test);

      res.status(200).json(pages);
    } else if (req.method === 'POST') {
      const page = await set(
        'pages',
        {
          userId,
          appId,
          state: 0,
          ...req.body,
        },
        test,
      );

      res.status(201).json(page);
    } else {
      res.status(405).end();
    }
  },
);
