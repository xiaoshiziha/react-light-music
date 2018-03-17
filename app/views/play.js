import React from 'react';
import '../static/css/play.less';
import Progress from '../components/Progress';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Pubsub from 'pubsub-js';

let duration = null;
class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true
    }
    this.onProgressVolumeHandle = this.onProgressVolumeHandle.bind(this);
    this.onProgressContentHandle = this.onProgressContentHandle.bind(this);
    this.volumeClick = this.volumeClick.bind(this);
    this.controlPlay = this.controlPlay.bind(this);
    this.sendOrderEvent = this.sendOrderEvent.bind(this);
  }
  // render handle
  componentDidMount() {
    // Watch Time
    $("#play").bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100
      })
    });
  }
  // Exit Handle
  componentWillUnMount() {
    // Unbind Event
    $("#play").unbind($.jPlayer.event.timeupdate);
  }
  // onProgress Content Handle
  onProgressContentHandle(progress) {
    $("#play").jPlayer("play",duration * progress);
  }
  // onProgress Volume Handle
  onProgressVolumeHandle(progress) {
    $("#play").jPlayer("volume",progress);
  }
  // Volume button click handle
  volumeClick() {
    let volumeFlBox = this.refs.volumeFlBox;
    if(volumeFlBox.style.display == "none"){  
      volumeFlBox.style.display = "block";
    }else{
      volumeFlBox.style.display = "none";
    }
  }
  // Control audio play
  controlPlay() {
    if(this.state.isPlay){
      $('#play').jPlayer('pause');
    }else{
      $('#play').jPlayer('play')
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  sendPrevEvent() {
    Pubsub.publish('PLAY_PREV');
  }
  sendNextEvent() {
    Pubsub.publish('PLAY_NEXT');
  }
  sendOrderEvent() {
    Pubsub.publish('PLAY_ORDER',this.refs.playOrder);
  }
  render() {
    return(
      <div className="container">
        <div className="playControl">
          <section className="audio-control-box">
            <section className="audio-cover">
              <img src={this.props.currentSong.cover} alt="封面" className={`rotate ${this.state.isPlay ? 'rotate-play' : 'rotate-pause' }`} />
            </section>
            <h2 className="audio-title">{this.props.currentSong.title}</h2>
            <Progress progress={this.state.progress} onProgressWidth={this.onProgressContentHandle} direction="width"/>
            <section className="audio-buttons">
              <ul>
                <li><i className={`iconfont ${this.state.isPlay ? 'icon-zanting' : 'icon-bofang'}`} onClick={this.controlPlay} ref="controlButton"></i></li>
                <li><i className="iconfont icon-shangyige" onClick={this.sendPrevEvent}></i></li>
                <li><i className="iconfont icon-xiayige" onClick={this.sendNextEvent}></i></li>
                <li><i className="iconfont icon-shunxubofang" onClick={this.sendOrderEvent} ref='playOrder'></i></li>
                <li className="audio-buttons-volume">
                  <i className="iconfont icon-shengyin1" onClick={this.volumeClick}></i>
                  <div className="audio-volume" ref="volumeFlBox" style={{ display: "none" }}>
                    <Progress progress={this.state.volume} onProgressHeight={this.onProgressVolumeHandle} direction="height"/>
                  </div>
                </li>
                <li><Link to="/list"><i className="iconfont icon-jiemu"></i></Link></li>
              </ul>
            </section>
          </section>
        </div>
      </div>
    )
  }
}

export default Play;