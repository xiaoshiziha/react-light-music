import React from 'react';
import Play from './views/Play';
import List from './views/List';
import { SONG } from './data/song';
import { HashRouter, Route, Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: SONG,
      currentSong: SONG[0],
      currentOrder: 0
    }
  }
  play(item) {
    $('#play').jPlayer('setMedia',{
      mp3: item.mp3
    }).jPlayer('play');
    this.setState({
      currentSong: item
    })
  }
  // Song next or prev handle
  playPN(type = 'next') {
    let index = this.findCurrentIndex(this.state.currentSong);
    let newIndex = null;
    let songLength = this.state.songList.length;
    if(type === 'next') {
      newIndex = (index + 1) % songLength;
    }else{
      newIndex = (index - 1 + songLength) % songLength;
    }
    this.play(this.state.songList[newIndex]);
  }
  findCurrentIndex(item) {
    return this.state.songList.indexOf(item);
  }
  // Song loop type
  playLoop() {
    this.play(this.state.currentSong);
  }
  // Song random type
  playRandom() {
    let index = Math.floor(Math.random() * this.state.songList.length);
    this.play(this.state.songList[index]);
  }
  // render handle
  componentDidMount() {
    $('#play').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });
    this.play(this.state.currentSong);
    // Watch song end
    $('#play').bind($.jPlayer.event.ended, (e) =>{
      switch(this.state.currentOrder){
        case 0:
        this.playPN();
        break;
        case 1:
        this.playLoop();
        break;
        case 2:
        this.playRandom();
        break;
      }
    });
    // Watch and Handle PLAY_ITEM
    Pubsub.subscribe('PLAY_ITEM',(msg,item) => {
      this.play(item);
    });
    Pubsub.subscribe('PLAY_PREV',(msg) => {
      this.playPN('prev');
    });
    Pubsub.subscribe('PLAY_NEXT',(msg) => {
      this.playPN('next');
    });
    Pubsub.subscribe('PLAY_ORDER',(msg,button) => {
      var button = $(button);
      if(button.hasClass('icon-shunxubofang')){
        button.removeClass('icon-shunxubofang');
        button.addClass('icon-danquxunhuan');
        this.setState({
          currentOrder: 1
        });
      }else if(button.hasClass('icon-danquxunhuan')){
        button.removeClass('icon-danquxunhuan');
        button.addClass('icon-suijibofang');
        this.setState({
          currentOrder: 2
        });
      }else{
        button.removeClass('icon-suijibofang');
        button.addClass('icon-shunxubofang');
        this.setState({
          currentOrder: 0
        });
      }
    });
  }
  // Exit Handle
  componentWillUnMount() {
    Pubsub.unsubscribe('PLAY_ITEM');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
    Pubsub.unsubscribe('PLAY_ORDER');
    $('#play').unbind($.jPlayer.event.ended);
  }
  render() {
    return(
      <div>
        { this.props.children }
      </div>
    )
  }
  render() {
    return (
      <HashRouter>
        <div style={{height:"100%"}}>
          <Route path="/" exact render={() => <Play currentSong={this.state.currentSong} />}></Route>
          <Route path="/list" render={() => <List songList={this.state.songList} currentSong={this.state.currentSong} />}></Route>
        </div>
      </HashRouter>
    )
  }
}
export default Root;