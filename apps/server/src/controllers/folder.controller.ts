import { Request, Response, RequestHandler } from 'express';
import Folder from '../models/folder';
import { Article, Folder as FolderType } from '../types/folder';
import { AddNewArticleSchema, FolderPayloadSchema } from '../lib/zod';
import { UserType } from '../models/user';
import * as cheerio from 'cheerio';

export const createNew = async (req: Request, res: Response) => {
  const validatedFields = FolderPayloadSchema.safeParse({
    name: req.body.name,
  });

  if (!validatedFields.success) {
    return res.status(400).json({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Cannot create folder.',
    });
  }

  const { name } = validatedFields.data;

  const folderPayload: Partial<Omit<FolderType, 'user'> & { user: string }> = {
    name: name,
    articles: [],
    user: (req as any).user?._id,
  };

  try {
    const folder_doc = await Folder.findOne({ name: folderPayload.name });

    if (folder_doc && folder_doc._id) {
      return res.status(400).json({
        errors: { name: ['Folder already exists.'] },
        message: 'Cannot create folder.',
      });
    }

    const newFolder = await Folder.create(folderPayload);
    return res.status(201).json({ folder: newFolder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [error],
      message: 'Something went wrong',
    });
  }
};

export const deleteOne: RequestHandler = async (
  req: Request,
  res: Response
) => {};
export const getAll: RequestHandler = async (req: Request, res: Response) => {
  const { search } = req.query;
  const folders = await Folder.find({
    user: (req as any).user?._id,
    ...(search && { name: new RegExp(`${search}`, 'g') }),
  }).populate('user', 'name email _id');

  const folders_transformed: Array<
    Omit<FolderType, 'articles'> & { articles: number }
  > = folders.map((f) => ({
    _id: f._id,
    name: f.name,
    user: (f as any).user as UserType,
    articles: f.articles.length as number,
  }));

  return res.status(200).json({ folders: folders_transformed });
};
export const getOne: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const folder = await Folder.findOne({
    _id: id,
    user: (req as any).user?._id,
  }).populate('user', 'email name _id');

  return res.status(200).json({ folder });
};

export const addNewArticle: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedFields = AddNewArticleSchema.safeParse({
      url: req.body['url'],
    });

    if (!validatedFields.success) {
      return res.status(400).json({
        error: 'Incorrect URL..',
      });
    }

    if (!req.body.folderId) {
      return res.status(400).json({
        error: 'Folder not specified.',
      });
    }

    const { url } = validatedFields.data;

    const $ = await cheerio.fromURL(url);
    const title = $('title').text();

    const article_payload = { url: url, title };

    const folder = await Folder.findOne({ _id: req.body.folderId });

    if ((req as any).user._id.toString() !== folder.user.toString()) {
      return res.status(401).json({ errors: ['Cannot add article.'] });
    }

    if (!folder.articles.some((art: Article) => art.url === url)) {
      folder.articles = [...folder.articles, { ...article_payload }];
    } else {
      return res.status(200).json({ message: 'Bookmark already exists.' });
    }

    await folder.save();
    return res.status(200).json({ message: 'Bookmark added to folder' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [error],
      message: 'Something went wrong',
    });
  }
};

// {
//   "folderId": "671f9694681d9f82e0dea721",
//    "url":"https://netflix.com"
//   }
// {
//   "folder": {
//     "name": "my folder",
//     "articles": [],
//     "user": "671f94735065a8180fa0ede3",
//     "_id": "671f9694681d9f82e0dea721",
//     "createdAt": "2024-10-28T13:50:12.293Z",
//     "updatedAt": "2024-10-28T13:50:12.293Z",
//     "__v": 0
//   }
// }
