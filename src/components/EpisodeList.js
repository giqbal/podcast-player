import React from 'react';
import moment from 'moment';

const EpisodeList = ({episodes, getSelectedEpisode}) => {
  return (
    <ul>
      {episodes.map(episode => 
      <li key={episode.episode_id} onClick={() => getSelectedEpisode(episode)}>▶
        <ul>
          <li>{episode.title}</li>
          <li>{moment(episode.published_at).format('D MMM YYYY')}</li>
          <li>{moment.duration(episode.duration).humanize()}</li>
        </ul>
      </li>)}
    </ul>
  );
};

export default EpisodeList;