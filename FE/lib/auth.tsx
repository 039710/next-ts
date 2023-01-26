import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
// extend property user in NextApiRequest
declare module "next" {
  interface NextApiRequest {
    user: any
  }
}
export function requireAuthentication(context : any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // check value of user in req from NextRequest
      const token = req.cookies.auth
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jose.jwtVerify(token, secret)
      if (!payload) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      const prisma = new PrismaClient();
      const user = await prisma.users.findFirst({
        where: {
          id: payload.id,
          token
        }
      })
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      const { password: _, ...userWithoutPassword } = user;
      req.user = userWithoutPassword
      prisma.$disconnect();
      
      return context(req, res)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
  
}