'use strict';

import React from 'react';
import VideoListItem from './video-list-item';

const VideoList = (props) => {
  const videoList = props.videos.map((video) => {
    return <VideoListItem video={video} key={video.id.videoId}
      onClickVideo={props.onClickVideo} />
  });

  return (
    <div className="video-list">
      <ul className="col-md-3 list-group videoList">
        {videoList}
      </ul>
    </div>
  );
}

export default VideoList;