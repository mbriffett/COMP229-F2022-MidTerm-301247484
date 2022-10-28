// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find(function(err, booksCollection){
        if (err) {
            console.error(err);
            res.end(err);
        }
        //render page and pass varaibles used on view pages
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    })
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    res.render('index', { title: 'Add Book', page: 'books/add', books: {} });
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {
//make book with data entered in the areas with name values matching author, name, published, etc
    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
       
    });
//insert book into database
    booksModel.create(newBook, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/books/list')
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
    //create new contact with same _id attribute as current book on page so no change when updated
    let newBook = booksModel({
        _id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
       
    });
    //update book with _id matching current book being edited, using newBook.  if not return error
    booksModel.updateOne({ _id: req.body.id }, newBook, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        //bring back to list
        res.redirect('/books/list')
    })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    let id = req.params.id;
    //similar to process edit, this uses the params called id (:id in the router) passed from the a href on delete (books[count]._id passes the _id attribute as params which is called id by router, thus req.params.id contains this value)
    booksModel.remove({ _id: id }, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/books/list');
    })
}