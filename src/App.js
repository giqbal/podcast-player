import React, { Component } from 'react';
import EpisodeList from './components/EpisodeList';
import * as api from './api';
import './App.css';

class App extends Component {
  state = {
    show: {},
    episodes: []
  }

  componentDidMount() {
    this.fetchShowInfoAndEpisodes();
  }
  
  render() {
    const {show, episodes} = this.state;
    return (
      <div className="App">
        <h1>Podcast Player</h1>
        <img src={show.image_url} alt='Podcast Icon'/>
        <h2>{show.title}</h2>
        <p>{show.description}</p>
        <EpisodeList episodes={episodes}/>
      </div>
    );
  }

  fetchShowInfoAndEpisodes = async () => {
    const {data: {response: {show}}} = await api.getShowInfo();
    const {data: {response: {items}}} = await api.getEpisodeList();
    this.setState({
      show,
      episodes: items
    });
  }
}

export default App;
