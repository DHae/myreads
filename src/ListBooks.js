import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'halogen/ClipLoader'
import PropTypes from 'prop-types'


class ListBooks extends React.Component{
  static propTypes={
    books:PropTypes.array.isRequired,
    loadState:PropTypes.bool.isRequired,
    moveTo:PropTypes.func.isRequired
  }
  render(){
    const currentlyReadingBooks = this.props.books.filter((book => book.shelf === 'currentlyReading')).map((book) => {
      return (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select onChange={(e)=>{this.props.moveTo(book,e.target.value);}} defaultValue={book.shelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.map((author) => {
                return(
                  <span key={author} className="author-name"> {author}</span>
                )
            })}</div>
          </div>
        </li>
      )
    })
    const wantToReadBooks = this.props.books.filter((book => book.shelf === 'wantToRead')).map((book) => {
      return (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select onChange={(e)=>{this.props.moveTo(book,e.target.value);}} defaultValue={book.shelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.map((author) => {
                return(
                  <span key={author} className="author-name"> {author}</span>
                )
            })}</div>
          </div>
        </li>
      )
    })
    const readBooks = this.props.books.filter((book => book.shelf === 'read')).map((book) => {
      return (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select onChange={(e)=>{this.props.moveTo(book,e.target.value);}} defaultValue={book.shelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.map((author) => {
                return(
                  <span key={author} className="author-name"> {author}</span>
                )
            })}</div>
          </div>
        </li>
      )
    })
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            {this.props.loadState&&
              <Loader color="#2e7c31" size="16px" margin="4px" className="loader"/>
            }
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentlyReadingBooks}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            {this.props.loadState&&
              <Loader color="#2e7c31" size="16px" margin="4px" className="loader"/>
            }
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToReadBooks}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            {this.props.loadState&&
              <Loader color="#2e7c31" size="16px" margin="4px" className="loader"/>
            }
            <div className="bookshelf-books">
              <ol className="books-grid">
                {readBooks}
              </ol>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks