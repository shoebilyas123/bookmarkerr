import express from 'express';
import * as folderController from '../controllers/folder.controller';
import { authorize } from '../middlewares/protect';

const router = express.Router();

router.get('/all', authorize, folderController.getAll);
router.post('/delete', authorize, folderController.deleteOneFolder);
router.get('/:id', authorize, folderController.getOne);
router.post('/create', authorize, folderController.createNew);
router.post('/article/delete', authorize, folderController.deleteOneArticle);
router.post('/article/add', authorize, folderController.addNewArticle);

export default router;
