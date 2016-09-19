'use strict';

import React from 'react';

class VideoDetail extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const video = this.props.video;

      if (!video)
        return <div>Loading...</div>

      let videoId = video.id.videoId || video.id,
        videoUrl = `https://www.youtube.com/embed/${videoId}`,
        title = video.snippet.title,
        description = video.snippet.description;

      return (
        <div className="video-detail col-md-7 col-md-offset-1">
          <h2>{title}</h2>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe src={videoUrl} frameBorder="10px" className="embed-responsive-item" />
          </div>
          <div className="details">
            <div>{description}</div>
          </div>
        </div>
      );
    }
}

export default VideoDetail;