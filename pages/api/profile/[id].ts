import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET') {
    const { id } = req.query;
    
    const query = singleUserQuery(id);
    const userVidesQuery = userCreatedPostsQuery(id);
    const userLikedVidesQuery = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userVideos = await client.fetch(userVidesQuery);
    const userLikedVideos = await client.fetch(userLikedVidesQuery);

    res.status(200).json({user: user[0], userVideos, userLikedVideos});
  }
}