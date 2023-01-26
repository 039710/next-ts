import db from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const logout = async function (req: NextApiRequest,res : NextApiResponse) {
  try {
    if (req.method != 'POST'){
      return res.status(500).json({
        message: "Method not allowed"
      })
    }
    const { token } = req.body;
    if (!token) {
      return res.status(500).json({
        message: "Token not found"
      })
    }
    const user = await db.users.findFirst({
      where: {
        token
      }
    })
    if (!user) {
      return res.status(500).json({
        message: "User not found"
      })
    }
    await db.users.update({
      where: {
        id: user.id
      },
      data: {
        token: null
      }
    })
    return res.status(200).json({
      message: "User logged out"
    })
  } catch (err) {
    return res.status(500).json(err)
  }
  
}

export default logout