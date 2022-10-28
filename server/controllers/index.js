//Matthew Briffett 301247484 COMP229 Midterm Centennial College Fall 2022

export function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}