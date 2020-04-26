/** Add any JavaScript you need to this file. */
var books = window.books;

/* An object containing every categories available and the amount of books belongs to each */
let genreList = (function() {
  let genres = {};
  genres['All'] = books.length; // Add 'All' to the category
  // Find the number of books a genre/category has
  books.forEach(function(book) {
    book.categories.forEach(function(genre) {
      genres[genre] = genres[genre] ? genres[genre] + 1 : 1;
    });
  });
  // Sort the genre list bases on the amount of books each genre has
  let tempArr = []; // Turn the object into array for sorting ;))
  for (const genre in genres) {
    tempArr.push([genre, genres[genre]]);
  }
  tempArr.sort(function(a, b) {
    return b[1] - a[1]; // Compare each genre's number of books
  });
  genres = {}; // Turn the array into object
  tempArr.forEach(function(genre) {
    genres[genre[0]] = genre[1];
  });
  return genres;
})();

/* Add the categories to the sidebar */
function genresToSidebar() {
  let nav = document.getElementById('nav-categories');
  for (const genre in genreList) {
    // Each is a list item <li>
    let li = document.createElement('li');
    li.id = `nav-category-${genre}`;
    li.innerHTML = `<a href="#products">${genre} <span>${genreList[genre]}</span></a>`;
    nav.appendChild(li);
  }
}

// An array containing all the products that are currently displayed
let products = (function() {
  let arr = [];
  for (let index = 0; index < books.length; index++) arr[index] = index;
  return arr;
})();

/* Load and display all books on the window */
function productsToMain() {
  books.forEach(function(book, index) {
    // Each book is contained inside a <div>
    let wrapDiv = document.createElement('div');
    wrapDiv.classList.add('div-wrapping');
    wrapDiv.id = 'book-' + index;
    // This is everything inside the book <div> ;))
    wrapDiv.innerHTML = `
        <figure>
          <img src="images/${book.picture}" alt="Picture of ${book.title}" />
          <figcaption>In ${book.language}</figcaption>
        </figure>
        <div class="book-info">
          <h2><span class="title">${book.title}</span>&ensp;by ${book.author}</h2>
          <p><b>Price: ${book.price}</b></p>
          <p><b>Size:</b> ${book.size}</p><p>${book.description}</p>
          <p><b>Categories:</b> ${book.categories.join(', ')}</p>
          <div class="book-buttons">
            <button type="button"><a target="_blank" href="${book.url}" title="${book.url}">
              <b>Visit URL</b></a></button>
          </div>
        </div>`;
    let main = document.querySelector('main');
    main.appendChild(wrapDiv); // Add each <div> to the main page
  });
}

/* Add or remove 'hidden' attribute of products based on the chosen category */
function productsAddHide() {
  for (let index = 0; index < books.length; index++) {
    let element = document.querySelector(`#book-${index}`);
    if (!products.includes(index)) {
      element.classList.add('hidden');
    } else {
      element.classList.remove('hidden');
    }
  }
}

/** Change the books displayed based on which category the user chooses */
function categoriesHandler() {
  for (const genre in genreList) {
    let cat = document.querySelector(`#nav-category-${genre}`);
    // If the user clicks on a category
    cat.onclick = function() {
      let h1 = document.querySelector('main h1');
      h1.innerHTML = genre; // Display the category name
      books.forEach(function(book, index) {
        // Store all books that belong to this genre into 'products' array
        if (book.categories.includes(genre) || genre === 'All') {
          if (!products.includes(index)) products.push(index);
        } else if (products.indexOf(index) > -1) {
          products.splice(products.indexOf(index), 1);
        }
      });
      productsAddHide(); // Add or hide books from the main page
      if (document.querySelector('.nav-button').offsetHeight !== 0) {
        document.querySelector('#nav-categories').style.display = 'none';
      }
    };
  }
}

/** Navigation drop-down */
function navHandler() {
  let button = document.querySelector('.nav-button');
  let navP = document.querySelector('nav p');
  navP.addEventListener('click', function() {
    if (button.style.display !== 'none') {
      // if the category is chosen, hide the category list
      let dropDown = document.querySelector('#nav-categories');
      dropDown.style.display = dropDown.style.display === 'block' ? 'none' : 'block';
    }
  });
}

window.onload = function() {
  genresToSidebar();
  productsToMain();
  categoriesHandler();
  navHandler();
};
