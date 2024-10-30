import express, { RequestHandler } from 'express';
import User from '../models/user';
import { AuthFormSchema, SignInSchema } from '../lib/zod';
import { signAuthToken } from '../lib/auth';

export const login: RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const validatedFields = SignInSchema.safeParse({
    email: req.body?.email,
    password: req.body?.password,
  });

  if (!validatedFields.success) {
    return res.status(400).json({
      errors: { ...validatedFields.error.flatten().fieldErrors, auth: [] },
      message: 'Cannot login user.',
    });
  }

  const { email, password } = validatedFields.data;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!(await (user as any).isCorrectPassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signAuthToken(user._id);
    const res_user = {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      _id: user._id,
    };
    return res.status(200).json({ user: res_user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [error],
      message: 'Something went wrong',
    });
  }
};
export const register: RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const validatedFields = AuthFormSchema.safeParse({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });

  if (!validatedFields.success) {
    return res.status(400).json({
      errors: { ...validatedFields.error.flatten().fieldErrors, auth: [] },
      message: 'Cannot register user.',
    });
  }

  try {
    const { email, password, name } = validatedFields.data;

    if (!!(await User.findOne({ email }))) {
      return res.status(400).json({
        errors: { auth: ['Email already exists!'] },
        message: 'Cannot register user',
      });
    }

    const newUser = await User.create({ email, password, name });
    const token = signAuthToken(newUser.id);

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      errors: [error],
      message: 'Internal Server Error',
    });
  }
};
