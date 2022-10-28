// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    res.render('index', { title: 'Add Book', page: 'books/add', books: booksCollection });
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
       
    });

    booksModel.create(newBook, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/books/add')
    })
 }

  

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {
    let id = req.params.id;
    //if find by id render, else callback the anonymous function to throw error and end response
    booksModel.findById(id, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    res.render('index', { title: 'Edit Book', page: 'books/edit', book: book });

    });
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
       
    });

    booksModel.updateOne(newBook, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/books/list')
    })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    /*****************
  * ADD CODE HERE *
  *****************/
}