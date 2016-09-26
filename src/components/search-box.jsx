import React from 'react';
import axios from 'axios';
import jsonp from 'jsonp';
import _ from 'underscore';
import YTSearch from 'youtube-api-search';
import alpha2CountryCodes from '../countryCodes';

var wc = require('which-country');

const API_KEY = 'AIzaSyAfrBHMYIQf44kTgyFAX2blzHCqcwbCaLc';
const GEO_API_URL = 'http://ws.geonames.org/countryCode?username=harryi3t';

const YOUTUBE_BASE_URL = `https://www.googleapis.com/youtube/v3`;
const YOUTUBE_API_URL = `${YOUTUBE_BASE_URL}/videos?` +
  `part=snippet,statistics,contentDetails&chart=mostpopular&` +
  `maxResults=10&key=${API_KEY}`;
const YOUTUBE_SEARCH_URL = `${YOUTUBE_BASE_URL}/search?order=relevance&` +
  `part=snippet&type=video&videoSyndicated=true&` +
  `maxResults=10&key=${API_KEY}`;
const YOUTUBE_COMPLETE_URL = `http://clients1.google.com/complete/search?` +
  `output=youtube`;

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: null, suggesionList: []};
    this.bindFunctionsToThis(['searchVideos', 'autoComplete', 'detectLocation',
      'updateStateAndSearch']);
    this.autoComplete = _.debounce(this.autoComplete, 500);

    this.detectLocation((countryCode) => {
      if (!countryCode)
        return this.searchVideos();

      this.searchVideos(null, countryCode);
    });
  }

  bindFunctionsToThis(functionNames) {
    var self = this;
    functionNames.forEach(function (funName) {
      self[funName] = self[funName].bind(self);
    });
  }

  updateStateAndSearch({target}) {
    this.setState({term: target.value});
    this.autoComplete(this.state.term);
  }

  searchVideos (term, countryCode) {
    let url = '';
    if (term)
      url = `${YOUTUBE_SEARCH_URL}&q=${term}`;
    else
      url = `${YOUTUBE_API_URL}`;
    if (countryCode)
      url = `${url}&regionCode=${countryCode}`;
    axios.get(url)
    .then(({data}) => {
      this.props.onSearch(data.items);
    });
  }

  autoComplete(term) {
    jsonp(YOUTUBE_COMPLETE_URL + '&q=' + term, null, (err, data) => {
      if (err)
        console.error(err);
      else {
        let suggesionList = data[1].map(ar => ar[0]);
        this.setState({suggesionList});
      }
    });
  }

  detectLocation(next) {
    if (!navigator.geolocation)
      return next();
    var hasReturned = false;

    navigator.geolocation.getCurrentPosition(function({coords}) {
      hasReturned = true;
      if (!coords) return next();
      var alpha3Code = wc([coords.longitude, coords.latitude]);
      var alpha2Code = alpha2CountryCodes[alpha3Code]
      return next(alpha2Code);
    });

    setTimeout(function () {
      if (!hasReturned) {
        hasReturned = true;
        return next();
      }
    },1000);
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
                onChange={this.updateStateAndSearch}
                value={this.state.term}
                list="suggesionData" />
              <span className="input-group-btn">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={() => this.searchVideos(this.state.term)} >
                  Search
                </button>
              </span>
            </div>
            <datalist id="suggesionData">
              { this.state.suggesionList.map(val => <option> {val} </option>) }
            </datalist>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;
