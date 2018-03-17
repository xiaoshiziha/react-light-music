import React from 'react';
import '../static/css/list.less';
import Songitem from '../components/Songitem';
import { HashRouter, Route, Link } from 'react-router-dom'

class List extends React.Component {
  render() {
    let songItemEle = this.props.songList.map((item,index) => {
      return (
        <Songitem item={item} key={index} active={item === this.props.currentSong}/>
      )
    });
    return(
      <div className="container">
        <div className="songList">
          <section className="songList-nav">
            <Link to="/"><i className="iconfont icon-shangyige"></i></Link>
            歌曲列表
          </section>
          <ul>
            {songItemEle}
          </ul>
        </div>
      </div>
    )
  }
}

export default List;