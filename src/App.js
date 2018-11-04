import React, { Component } from 'react';
import EpisodeList from './components/EpisodeList';
import Player from './components/Player';
import ShowInfo from './components/ShowInfo';
import * as api from './api';
import './App.css';

class App extends Component {
  state = {
    episodes: [],
    selectedEpisode: null
  }

  componentDidMount() {
    this.fetchShowEpisodes(1530161);
  }
  
  render() {
    const {episodes, selectedEpisode} = this.state;
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
        <EpisodeList episodes={episodes} getSelectedEpisode={this.getSelectedEpisode}/>
        <Player episodeToPlay={selectedEpisode} previousOrNextEpisode={this.getEpisode} />
      </div>
    );
  }

  fetchShowEpisodes = async (showId) => {
    const {data: {response: {items}}} = await api.getEpisodeList(showId);
    this.setState({
      episodes: items,
      selectedEpisode: items[0]
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
}

export default App;
