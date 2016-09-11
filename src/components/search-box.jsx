'use strict';

import React from 'react';

class SearchBox extends React.Component {
  log(event) {
    console.log(event.target.value);
  }

  constructor (props) {
    super(props);
    this.state = {term: null};
  }

  render() {
    return (
      <div className="search-box">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-8">
            <input
              id="searchInput"
              type="text"
              placeholder="Search..."
              className="form-control"
              onChange={({target}) => this.setState({term: target.value})}
              value={this.state.term} />
          </div>
          <div className="col-md-4">
            <input
              value="Search"
              type="submit"
              className="btn btn-primary"
              onClick={() => this.props.onSearch(this.state.term)} />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;