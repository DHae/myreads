import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends React.Component{
  static propTypes={
    search:PropTypes.func.isRequired,
    searchLoading:PropTypes.bool.isRequired,
    results:PropTypes.array,
    moveTo:PropTypes.func.isRequired
  }
  state={
    query:''
  }
  componentDidMount(){
    console.log('Search!');

  }
  updateQuery=(query)=>{
    console.log(query.target.value);
    this.setState({
      query:query.target.value.trim()
    })
    this.props.search(this.state.query,40)
  }
  render(){
    let results
    console.log(typeof this.props.results);
    if( Object.prototype.toString.call( this.props.results ) === '[object Array]' ) {
      results=this.props.results.map((book)=>{
        console.log(typeof book.authors);
        return(
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
              <div className="book-authors">{book.authors&&book.authors.map((author)=>{
                  return(
                    <span key={author} className="author-name"> {author}</span>
                  )
                })}
              </div>
            </div>
          </li>
        )
      })
    }
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.updateQuery} value={this.state.query}/>
          </div>
        </div>
        <div className="search-books-results">
          {this.props.searchLoading && <div className="loader">Loading</div>}<br/>
          <div className="loader">{(Object.prototype.toString.call( this.props.results ) === '[object Array]')?`Showing ${results.length} results`:''}<br/><br/></div>
          <div className="loader">{(Object.prototype.toString.call( this.props.results ) === '[object Object]')?`No results`:''}<br/><br/></div>
          <ol className="books-grid">
            {results}
          </ol>
        </div>
      </div>
    )
  }
}
export default Search