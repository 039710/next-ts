import { NextApiRequest, NextApiResponse } from "next";
import { requireAuthentication } from "lib/auth";
import db from "lib/db";

const getAll = requireAuthentication(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method != "GET") return res.status(405).json({ error: "Method not allowed" })
    const posts = await db.posts.findMany({
      where: {
        published: true
      },
      include: {
        category: true,
      }
    })
    return res.status(200).json({ data: posts })

  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

export default getAll