import db from "lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";


const login = async (req : NextApiRequest, res : NextApiResponse) => {
  try {
    
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }
    const user = await db.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    await db.users.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    return res.json({ data: { ...userWithoutPassword, token } });

  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export default login