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
      <div className="search-box container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-10">
            <div className="input-group">
              <input
                id="searchInput"
                type="text"
                placeholder="Search..."
                className="form-control"
                onChange={({target}) => this.setState({term: target.value})}
                value={this.state.term} />
              <span className="input-group-btn">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={() => this.props.onSearch(this.state.term)} >
                  Search
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;