import React from 'react';
import Pubsub from 'pubsub-js';

class Songitem extends React.Component {
  constructor(props) {
    super(props);
  }
  // PlayItem Event
  playItem(item) {
    Pubsub.publish('PLAY_ITEM', item);
  }
  render() {
    var item = this.props.item;
    return (
      <li onClick={this.playItem.bind(this,item)} className={`${this.props.active ? 'active' : ''}`}>
        <div className="song-cover">
          <img src={item.cover} />
        </div>
        <div className="song-info">
          <h2 className="song-title">{item.title}</h2>
          <p className="song-author">{item.singer}</p>
        </div>
      </li>
    )
  }
}

export default Songitem;