// modules required for routing
import { Router } from "express";

import { displayAddPage, displayBookList, displayEditPage, processAddPage, processDelete, processEditPage } from "../controllers/books.js";

const router = Router();

/* GET books List page. READ */
router.get('/books/list', displayBookList);

//  GET the Book Details page in order to add a new Book
router.get('/books/add', displayAddPage);
// POST process the Book Details page and create a new Book - CREATE
router.post('/books/add', processAddPage);

// GET the Book Details page in order to edit an existing Book.  Params passed here are called id 
//Ex: /books/edit/books[count]._id the _id parameter of item from books collection will be known as id because of :id and will be contained within req.params.id
router.get('/books/edit/:id', displayEditPage);

// POST - process the information passed from the details form and update the document
router.post('/books/edit/:id', processEditPage);

// GET - process the delete by user id
router.get('/books/delete/:id', processDelete);


export default router;