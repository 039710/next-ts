import db from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const getOne = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if(req.method !== 'GET') return res.status(405).json({error: "Method not allowed"})
    const { postId } = req.query;
    const post = await db.posts.findFirst({
      where: {
        id: Number(postId)
      },
      include: {
        category: true,
      }
    })
    if(!post) return res.status(404).json({data: null})
    return res.status(200).json({data: post})
  } catch (err) {
    return res.status(500).json(err)
  }
}

export default getOne