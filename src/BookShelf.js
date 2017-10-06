import React from "react";

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelftitle}</h2>
        
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books}
          </ol>
        </div>
      </div>      
    );
  }
}
export default BookShelf;