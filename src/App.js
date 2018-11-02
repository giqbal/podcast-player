import React, { Component } from 'react';
import EpisodeList from './components/EpisodeList';
import Player from './components/Player';
import * as api from './api';
import './App.css';

class App extends Component {
  state = {
    show: {},
    episodes: [],
    selectedEpisode: null
  }

  componentDidMount() {
    this.fetchShowInfoAndEpisodes(1530161);
  }
  
  render() {
    const {show, episodes, selectedEpisode} = this.state;
    return (
      <div className="App">
        <h1>Podcast Player</h1>
        <img src={show.image_url} alt='Podcast Icon'/>
        <h2>{show.title}</h2>
        <p>{show.description}</p>
        <EpisodeList episodes={episodes} getSelectedEpisode={this.getSelectedEpisode}/>
        <Player episodeToPlay={selectedEpisode} previousOrNextEpisode={this.getEpisode} />
      </div>
    );
  }

  fetchShowInfoAndEpisodes = async (showId) => {
    const {data: {response: {show}}} = await api.getShowInfo(showId);
    const {data: {response: {items}}} = await api.getEpisodeList(showId);
    this.setState({
      show,
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
