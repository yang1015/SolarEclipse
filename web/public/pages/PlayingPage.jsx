import React from 'react';
import { hashHistory } from 'react-router';
import '../static/style/style.scss';

class PlayingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songIndex: props.params.songIndex,
            songData: JSON.parse(props.location.query.songData)
        }
        this.backToPlaylist = this.backToPlaylist.bind(this);
        // console.log("constructor: ")
        // console.log(JSON.stringify(props.location.query))
    }

    componentDidMount(){
        // console.log("did mount")
    }

    componentDidUpdate(){
        // console.log("did update")
    }

    backToPlaylist(){
        hashHistory.push('PlayList');
    }

    render() {
        // console.log("render");

        return (
            <div className="music-container">

                <div className="music-title">
                    <img className="arrow-left-icon icon"
                         src='../public/static/images/arrow-left.png'
                         onClick = {this.backToPlaylist}
                    />
                    <div className = "music-info">
                        <h3>{this.state.songData.title}</h3>
                        <p>{this.state.songData.author}</p>
                    </div>
                </div>

                <div className="cover-image-wrapper">
                    <div className="cover-image-transparent-border">
                        <img className="cover-image"
                             src= {this.state.songData.pic}/>
                    </div>
                </div>

                <div className = "function">
                    <img className="music-function-icon" src = "../public/static/images/unliked.png" />
                    <img className="music-function-icon" src = "../public/static/images/download.png" />
                    <img className="music-function-icon" src = "../public/static/images/comments.png" />
                    <img className="music-function-icon" src = "../public/static/images/more.png" />
                </div>

                <div className="music-controller">
                    <img className="music-function-icon" src = "../public/static/images/random-playing.png" />
                    <img className="music-function-icon" src = "../public/static/images/previous.png" />
                    <img className="music-function-icon" src = "../public/static/images/play.png" />
                    <img className="music-function-icon" src = "../public/static/images/next.png" />
                    <img className="music-function-icon" src = "../public/static/images/info.png" />
                </div>

            </div>
        )
    }

}


export default PlayingPage;
