import React from 'react';
import SearchBox from './search-box';
import VideoDetail from './video-detail';
import VideoList from './video-list';

class ReactYoutubeApp extends React.Component {
    constructor (props) {
      super(props);
      this.state = {videos: [], selectedVideo: null};
      this.setVideos = this.setVideos.bind(this);
    }

    setVideos(videos) {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    }

    render() {
      return (
        <div>
          <SearchBox onSearch={this.setVideos} />
          <br/>
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList videos={this.state.videos}
            onClickVideo={ selectedVideo => this.setState({selectedVideo}) } />
        </div>
      );
    }
}

export default ReactYoutubeApp;