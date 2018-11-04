import React, { Component } from 'react';
import * as api from '../api';

class ShowInfo extends Component {
  state = {
    show: {}
  }

  componentDidMount() {
    this.fetchShowInfo(1530161)
  }
  render() {
    const {show} = this.state;
    return (
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
    );
  }

  fetchShowInfo = async (showId) => {
    const {data: {response: {show}}} = await api.getShowInfo(showId);
    this.setState({
      show
    });
  }
}

export default ShowInfo;