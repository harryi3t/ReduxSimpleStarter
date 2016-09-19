import React from 'react';
import axios from 'axios';
var wc = require('which-country');
import SearchBox from './search-box';
import VideoDetail from './video-detail';
import VideoList from './video-list';
import YTSearch from 'youtube-api-search';
import alpha2CountryCodes from '../countryCodes';

const API_KEY = 'AIzaSyAfrBHMYIQf44kTgyFAX2blzHCqcwbCaLc';
const GEO_API_URL = 'http://ws.geonames.org/countryCode?username=harryi3t';

const YOUTUBE_BASE_URL = `https://www.googleapis.com/youtube/v3`;
const YOUTUBE_API_URL = `${YOUTUBE_BASE_URL}/videos?` +
  `part=snippet,statistics,contentDetails&chart=mostpopular&` +
  `maxResults=10&key=${API_KEY}`;
const YOUTUBE_SEARCH_URL = `${YOUTUBE_BASE_URL}/search?order=relevance&` +
  `part=snippet&type=video&videoSyndicated=true&` +
  `maxResults=10&key=${API_KEY}`;

class ReactYoutubeApp extends React.Component {
    constructor (props) {
      super(props);
      this.state = {videos: [], selectedVideo: null};

      this.detectLocation((countryCode) => {
        if (!countryCode)
          return this.searchVideos();

        this.searchVideos(null, countryCode);
      });
    }

    detectLocation(next) {
      if (!navigator.geolocation)
        return next();

      navigator.geolocation.getCurrentPosition(function({coords}) {
        if (!coords) return next();
        var alpha3Code = wc([coords.longitude, coords.latitude]);
        var alpha2Code = alpha2CountryCodes[alpha3Code]
        return next(alpha2Code);
      });
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
        this.setState({videos: data.items, selectedVideo: data.items[0]});
      });
    }

    render () {
      return (
        <div>
          <SearchBox onSearch={(term) => this.searchVideos(term)}/>
          <br/>
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList videos={this.state.videos}
            onClickVideo={ selectedVideo => this.setState({selectedVideo}) } />
        </div>
      );
    }
}

export default ReactYoutubeApp;