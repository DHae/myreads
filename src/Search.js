import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import queryString from 'query-string'
import Book from './Book'
import sleep from "then-sleep";
import Loader from 'halogen/ClipLoader'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      query: "",
      searchLoading:false,
      noResult:false
    };
    this.searchDelay = 300;
  }

  resetBookList() {
    this.setState(state => {
      state.searchLoading = false;
      state.noResult = false;
      state.books = [] 
    });
  }

  updateQueryString(searchQuery) {
    this.props.history.push(
      searchQuery !== "" ? `/search?q=${searchQuery}` : "/search"
    );
  }

  async handleSearchInput(searchQuery) {   
    this.updateQueryString(searchQuery);
    this.setState(state => {
      state.query = searchQuery;
      state.searchLoading = true;
      state.noResult = false;

    });

    if (searchQuery === "") {
      this.resetBookList();
      return;
    }

    await sleep(this.searchDelay);
    console.log(this.setState.noResult);
    if (this.state.query !== searchQuery) return;

    try {
      const books = await BooksAPI.search(this.state.query);
      if (books.error) {
        this.setState(state => {
          state.searchLoading = false;
          state.noResult = true;
          state.books = [] 
        });
        return;
      }
      if (books.length) {
        this.setState(state => {
          state.searchLoading = false;
          state.noResult = false;
          state.books = books.map(book => {
            const idx = this.props.search(book.id);
            return idx !== -1
              ? this.props.books[idx]
              : Object.assign(book, { shelf: "none" });
          });
          return state;
        });
      }
    } catch (e) {
      console.error(`The API responded with an error: ${e}`);
    }
  }

  componentWillMount() {
    const query = queryString.parse(location.search);
    if (query.q) {
      this.handleSearchInput(query.q);
    }
  }



  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input autoFocus type="text" placeholder="Search by title or author" onChange={e => this.handleSearchInput(e.target.value)} value={this.state.query}/>
          </div>
        </div>
        <div className="search-books-results">        
          {this.state.noResult&&
            <h2 className="bookshelf-title">No Result</h2>
          }
          {this.state.searchLoading&&
            <Loader color="#2e7c31" className="loader"/>
          }
          {!this.state.searchLoading&&!this.state.noResult&&
            <div>
              <div className="search-result">{(Object.prototype.toString.call( this.state.books ) === '[object Array]')?`Showing ${this.state.books.length} results`:''}<br/><br/></div>        
              <ol className="books-grid">
                {this.state.books.map(book =>
                  <Book
                    key={book.id}
                    book={book}
                    moveTo={this.props.moveTo}
                  />
                )}
              </ol>
            </div>
          }
        </div>
      </div>
    )
  }
}
export default withRouter(Search);