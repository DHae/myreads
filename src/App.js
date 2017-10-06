import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
     books:[],
     loading:false,
     searchLoading:false,
  }
  
  search = id => {
    return this.state.books.findIndex(book => book.id === id);
  }
  getBook = async id => {
    const bookIdx = this.search(id);
    if (bookIdx !== -1) {      
      return Promise.resolve(this.state.books[bookIdx]);
    }
    try {
      const book = await BooksAPI.get(id);
      book.shelf = "none";
      return book;
    } catch (e) {
      console.error(`There was an API error: ${e}`);
    }
  }

  moveTo= async(book,shelf)=>{
    const oldState = JSON.parse(JSON.stringify(this.state));
    const bookIdx = this.search(book.id);
    if (bookIdx !== -1) {
      this.setState(state => {
        state.books[bookIdx].shelf = shelf;
        return state;
      });
    } else {
      this.setState(state => {
        book.shelf = shelf;
        state.books.push(book);
        return state;
      });
    }

    try {
      const APIShelfState = await BooksAPI.update({ id: book.id }, shelf);
      const currentShelfState = this.state.books.reduce(
        (acc, book) => {
          if (book.shelf !== "none") acc[book.shelf].push(book.id);
          return acc;
        },
        {
          currentlyReading: [],
          wantToRead: [],
          read: []
        }
      )
      const isAPIEqualToState = Object.keys(currentShelfState).every(shelf => {
        return currentShelfState[shelf].every(id =>
          APIShelfState[shelf].includes(id)
        );
      });

      if (!isAPIEqualToState) {
        this.setState(oldState);
      }
    }catch (e) {
      this.setState(oldState);
      console.error(`There was an API error: ${e}`);
    }
  } 

  async componentDidMount() {
    this.setState({loading:true});
    try {
      const books = await BooksAPI.getAll();
      this.setState({loading:false});
      this.setState({ books });
    } catch (e) {
      console.error(`There was an API error: ${e}`);
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path='/'
          render={() => (
            <ListBooks
              books={this.state.books}
              loadState={this.state.loading}
              moveTo={this.moveTo}
            />
          )}
        />
        <Route
          path='/search'
          render={(history) => (
            <Search
              search={this.search}
              books={this.state.books}
              moveTo={this.moveTo}
            />
          )}
        />        
      </div>
    )
  }
}

export default BooksApp