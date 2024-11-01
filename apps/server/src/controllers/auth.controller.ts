import express, { RequestHandler } from 'express';
import User, { UserType } from '../models/user';
import { AuthFormSchema, SignInSchema } from '../lib/zod';
import { signAuthToken } from '../lib/auth';

const transformUserForClient: (_: UserType) => Partial<UserType> = (
  user_doc: UserType
) => {
  return {
    name: user_doc.name,
    _id: user_doc._id,
    createdAt: user_doc.createdAt,
    email: user_doc.email,
  };
};
export const login: RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const validatedFields = SignInSchema.safeParse({
    email: req.body?.email,
    password: req.body?.password,
  });

  if (!validatedFields.success) {
    res.status(400).json({
      errors: { ...validatedFields.error.flatten().fieldErrors, auth: [] },
      message: 'Cannot login user.',
    });
    return;
  }

  const { email, password } = validatedFields.data;
  console.log({ email, password });
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (!(await (user as any).isCorrectPassword(password, user.password))) {
      res.status(401).json({ message: 'Invalid credentials' });

      return;
    }

    const token = signAuthToken(user._id);
    const res_user = transformUserForClient(user);

    res.status(200).json({ user: res_user, token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error],
      message: 'Something went wrong',
    });
    return;
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
    res.status(400).json({
      errors: { ...validatedFields.error.flatten().fieldErrors, auth: [] },
      message: 'Cannot register user.',
    });
    return;
  }

  try {
    const { email, password, name } = validatedFields.data;

    if (!!(await User.findOne({ email }))) {
      res.status(400).json({
        errors: { auth: ['Email already exists!'] },
        message: 'Cannot register user',
      });
      return;
    }

    const newUser = await User.create({ email, password, name });
    const token = signAuthToken(newUser.id);

    res.status(201).json({
      user: transformUserForClient(newUser),
      token,
    });
    return;
  } catch (error) {
    console.log(error);

    res.status(500).json({
      errors: [error],
      message: 'Internal Server Error',
    });

    return;
  }
};

const AuthEditSchema = AuthFormSchema.omit({ password: true });

export const editInfo: RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const validatedFields = AuthEditSchema.safeParse({
    email: req.body.email,
    name: req.body.name,
  });

  if (!validatedFields.success) {
    res.status(400).json({
      errors: { ...validatedFields.error.flatten().fieldErrors, auth: [] },
      message: 'Invalid inputs.',
    });
    return;
  }

  try {
    const { email, name } = validatedFields.data;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        errors: { auth: ['Email does not exist!'] },
        message: 'User does not exist ',
      });
      return;
    }

    user.name = name;
    user.email = email;
    await user.save();
    res.status(201).json({
      user: transformUserForClient(user),
    });
    return;
  } catch (error) {
    console.log(error);

    res.status(500).json({
      errors: [error],
      message: 'Internal Server Error',
    });

    return;
  }
};
