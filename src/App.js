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
     results:[]
  }
  getAllBooks=()=>{
    this.setState({
      loading:true
    })
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books,
        loading:false
      })
    })
  }
  componentDidMount(){
    this.getAllBooks()
  }
  moveTo=(book,shelf)=>{
    BooksAPI.update(book,shelf).then(book=>{
      this.getAllBooks()
    })
  }
  search=(query,maxResults)=>{
    this.setState({
      searchLoading:true
    })
    BooksAPI.search(query,maxResults).then(results=>{
      this.setState({
        searchLoading:false,
        results:results
      })
    })
  }
  render() {
    return (
      <div className="app">
        <Route
          path='/search'
          render={(history) => (
            <Search
              search={this.search}
              searchLoading={this.state.searchLoading}
              results={this.state.results}
              moveTo={this.moveTo}
            />
          )}
        />
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
      </div>
    )
  }
}

export default BooksApp