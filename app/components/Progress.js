import React from 'react';

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.changeProgressWidth = this.changeProgressWidth.bind(this);
    this.changeProgressHeight = this.changeProgressHeight.bind(this);
  }
  // define changeProgress function
  changeProgressWidth(e) {
    let progressBar = this.refs.progressBar;
    let afterProgress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressWidth(afterProgress);
  }
  changeProgressHeight(e) {
    let progressBar = this.refs.progressBar;
    let bodyHeight = document.body.clientHeight;
    let afterProgress = ((bodyHeight - e.clientY) - (bodyHeight - progressBar.getBoundingClientRect().bottom)) / progressBar.clientHeight;
    this.props.onProgressHeight(afterProgress);
  }
  render() {
    if(this.props.direction === 'width'){
      return(
        <div className="audio-progress-box" ref="progressBar" onClick={this.changeProgressWidth}>
          <div className="audio-progress-core" style={{[this.props.direction]: `${this.props.progress}%`}}></div>
        </div>
      )
    }else{
      return(
        <div className="audio-progress-box" ref="progressBar" onClick={this.changeProgressHeight}>
          <div className="audio-progress-core" style={{[this.props.direction]: `${this.props.progress}%`}}></div>
        </div>
      )
    }
  }
}

export default Progress;