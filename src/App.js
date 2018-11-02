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
      <div>
        <section className='hero is-dark'>
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title is-1'>Podcast Player</h1>
            </div>
          </div>
        </section>
        <section className='hero'>
          <div className='hero-body'>
            <div className='container level'>
              <div className='level-left'>
                <div className='level-item'>
                  <figure className='image is-128x128'>
                    <img src={show.image_url} alt='Podcast Icon'/>
                  </figure>
                </div>
                <div className='level-item'>
                  <h2 className='title is-3'>{show.title}</h2>
                </div>
              </div>
            </div>
            <div className='level'>
              <div className='level-left'>
                <span className='icon'>
                  <i className='fas fa-quote-left'></i>
                </span>
                <p>{show.description}</p>
                <span className='icon'>
                  <i className='fas fa-quote-right'></i>
                </span>
              </div>
            </div>
          </div>
        </section>
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
