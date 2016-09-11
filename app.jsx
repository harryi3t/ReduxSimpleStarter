'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/search-box';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyAfrBHMYIQf44kTgyFAX2blzHCqcwbCaLc';

class ReactYoutubeApp extends React.Component {
    constructor (props) {
      super(props);
      this.state = {videos: [], selectedVideo: null};
      this.searchVideos('');
    }

    searchVideos (term) {
      YTSearch({key: API_KEY, term: term}, (data) => {
        this.setState({videos: data, selectedVideo: data[0]});
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

ReactDOM.render(<ReactYoutubeApp />, $('#container')[0]);