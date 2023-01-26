import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import db from 'lib/db';


const register = async (req: NextApiRequest, res: NextApiResponse) => {
  // if request method is not POST then return 405
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { username, email , password } = req.body;
  // validate data
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  try {
    // check if user exists
    const userExists = await db.users.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // create user
    const user = await db.users.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    // return user without password
    const { password: _, ...userWithoutPassword } = user;
    // send token
    return res.json({ data: userWithoutPassword });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


export default register;