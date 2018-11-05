import React, { Component } from 'react';
import EpisodeList from './components/EpisodeList';
import Player from './components/Player';
import ShowInfo from './components/ShowInfo';
import * as api from './api';

class App extends Component {
  state = {
    episodes: [],
    selectedEpisode: null,
    playing: {
      episode_id: null,
      isPlaying: false
    }
  }

  componentDidMount() {
    this.fetchShowEpisodes(1530161);
  }
  
  render() {
    const {episodes, selectedEpisode, playing} = this.state;
    return (
      <div>
        <section className='hero is-dark'>
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title is-1'>Podcast Player</h1>
            </div>
          </div>
        </section>
        <ShowInfo /> 
        <EpisodeList 
        episodes={episodes} 
        getSelectedEpisode={this.getSelectedEpisode}
        playing={playing}
        />
        <Player 
        episodeToPlay={selectedEpisode} 
        previousOrNextEpisode={this.getEpisode} 
        setPlayingStatus={this.getPlayingStatus}
        />
      </div>
    );
  }

  fetchShowEpisodes = async (showId) => {
    const {data: {response: {items}}} = await api.getEpisodeList(showId);
    this.setState({
      episodes: items
    });
  }

  getSelectedEpisode = (episode) => {
    this.setState({
      selectedEpisode: episode
    });
  }

  getEpisode = (previousOrNextEpisode) => {
    const {selectedEpisode, episodes} = this.state
    const currentEpisodeIndex = episodes.findIndex(episode => {
      return selectedEpisode.episode_id === episode.episode_id
    });
    const incrementBy = previousOrNextEpisode === 'next'? 1 : previousOrNextEpisode === 'previous'? -1 : 0;
    this.setState({
      selectedEpisode: episodes[currentEpisodeIndex + incrementBy]
    })
  }

  getPlayingStatus = (playingState) => {
    const {selectedEpisode: {episode_id}} = this.state;
    this.setState({
      playing: {
        episode_id,
        isPlaying: playingState
      }
    })
  }

}

export default App;
