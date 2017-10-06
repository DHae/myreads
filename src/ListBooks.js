import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'halogen/ClipLoader'

import Book from './Book'

function ListBooks({ books, moveTo, loadState }) {
  const shelves = ["currentlyReading", "wantToRead", "read"];
  return (
    <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {loadState&&
          <Loader color="#2e7c31" className="loader"/>
        }        
        {!loadState&&shelves.map(shelf => {
          return (
            <div key={shelf} className="list-books-content">
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>                
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(book => book.shelf === shelf)
                      .map(book =>
                        <Book
                          key={book.id}
                          book={book}
                          moveTo={moveTo}
                        />
                      )}
                  </ol>
                </div>
              </div>
            </div>
          );
        })
      }                
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}


export default ListBooks