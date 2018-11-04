import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class Player extends Component {
  render() {
    const {episodeToPlay, previousOrNextEpisode} = this.props;
    return (
      episodeToPlay?
      <div className='navbar is-fixed-bottom is-black'>
        <div className='navbar-brand'>
          <figure className='image is-48x48'>
            <img className='is-rounded' src={episodeToPlay.image_url} alt='Episode artwork'/>
          </figure>
          <span className='navbar-item' onClick={() => previousOrNextEpisode('previous')}>
              <i className='fas fa-backward'></i>
          </span>
          <span className='navbar-item' onClick={() => previousOrNextEpisode('next')}>
            <i className='fas fa-forward'></i>
          </span>
        </div>
        <ReactPlayer 
          url={`https://api.spreaker.com/v2/episodes/${episodeToPlay.episode_id}/play`}
          config={
            {
              file: {
                forceAudio: true
              }
            }
          }
          controls={true}
          width='100%'
          height='100%'
        />
      </div>
      :
      <p>Select episode to play</p>
    );
  }
}

export default Player;