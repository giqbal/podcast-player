import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class Player extends Component {
  render() {
    const {episodeToPlay, previousOrNextEpisode} = this.props;
    return (
      episodeToPlay?
        <div>
          <p>{episodeToPlay.title}</p>
          <img src={episodeToPlay.image_url} alt='Episode artwork'/>
          <span onClick={() => previousOrNextEpisode('previous')}>⏮</span>
          <ReactPlayer url={`https://api.spreaker.com/v2/episodes/${episodeToPlay.episode_id}/play`} config={
            {
              file: {
                forceAudio: true
              }
            }
          } controls/>
          <span onClick={() => previousOrNextEpisode('next')}>⏭</span>
        </div>
        :
        <p>Select episode to play</p>
    );
  }
}

export default Player;