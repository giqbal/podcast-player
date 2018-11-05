import React from 'react';
import moment from 'moment';

const EpisodeList = ({episodes, getSelectedEpisode, playing, fetchMoreEpisodes}) => {
  return (
    <div className='section'>
      {episodes.map(episode => {
        const durationHours = moment.duration(episode.duration).hours();
        const durationMins = moment.duration(episode.duration).subtract(durationHours, 'h').minutes()
        return (
          <div key={episode.episode_id} className='media' onClick={() => getSelectedEpisode(episode)}>
            <span className='icon media-left'>
              <i className='fas fa-play-circle'></i>
            </span>
            <div className='media-content'>
              {playing.episode_id === episode.episode_id && playing.isPlaying?
              <p>
                <strong>{episode.title}</strong>
              </p>
              :
              <p>{episode.title}</p>}
              <p>{moment(episode.published_at).format('D MMM YYYY')}</p>
            </div>
            <div className='media-right'>
              <p>{`${durationHours} ${durationHours === 1? 'hr' : 'hrs'} ${durationMins} min`}</p>
            </div>
          </div>
        );
      })}
      <div className='buttons is-centered'>
        <span className='button' onClick={fetchMoreEpisodes}>Show more...</span>
      </div>
    </div>
  );
  
};

export default EpisodeList;