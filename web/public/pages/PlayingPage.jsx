import React from 'react';
import {hashHistory} from 'react-router';
import '../static/style/style.scss';

class PlayingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songIndex: JSON.parse(props.params.songIndex), //这里如果不parse 后面更新index 4 + 1就会变成41
            songList: JSON.parse(props.location.query.songList),
            currentSongData: JSON.parse(props.location.query.songList)[props.params.songIndex],
            playStatus: true,
            showLyrics: false,
            showMamamooInfo: false
        }
        // var code = $('https://api.hibai.cn/music/Qmusic/Music?id=003nPWt51yqhuI&type=lrc').html();
        // console.log(code);
        // console.log(props.location.query)
        this.backToPlaylist = this.backToPlaylist.bind(this);
        this.playCurrentSong = this.playCurrentSong.bind(this);
        this.pauseCurrentSong = this.pauseCurrentSong.bind(this);
        this.playPreviousSong = this.playPreviousSong.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.showMamamooInfo = this.showMamamooInfo.bind(this);
        // this.showLyrics = this.showLyrics.bind(this);
        // this.getLyrics = this.getLyrics.bind(this);
        // console.log("constructor: ")
        //console.log((props.location.query.songData))
    }

    componentDidMount() {
        // console.log("did mount")
    }

    componentDidUpdate(prevProps, prevState) {
        let this_ = this;
        if (prevState.songIndex != this.state.songIndex) {
            this.setState({
                currentSongData: this_.state.songList[this_.state.songIndex]
            });
        }
    }

    backToPlaylist() {
        hashHistory.push('PlayList');
    }

    convertToTime(lastingTime) {
        let timeValue = '';
        let intValue;
        let remainingValue;
        if (lastingTime < 60) {
            remainingValue = lastingTime % 60;
            if (remainingValue < 10) remainingValue = "0" + remaingValue;
            timeValue = "00:" + remainingValue;
        }
        else {
            intValue = parseInt(lastingTime / 60);
            if (intValue < 10) intValue = "0" + intValue;
            remainingValue = lastingTime % 60;
            if (remainingValue < 10) remainingValue = "0" + remaingValue;
            timeValue = intValue + ":" + remainingValue;
        }
        return timeValue;
    }


    // showLyrics() {
    //     let this_ = this;
    //     this.setState({
    //         showLyrics: !this_.state.showLyrics
    //     });
    // }

    // getLyrics(pageName) {
    //     if (document.frames) {
    //         console.log("有frames")
    //         console.log(document.frames[pageName])
    //         return document.frames[pageName]
    //     } else {
    //         console.log("没有frames")
    //         console.log($(pageName).contentWindow)
    //         return $(pageName).contentWindow;
    //
    //     }
    //
    //
    //
    // }

    playCurrentSong() {
        this.setState({
            playStatus: true
        });
    }

    pauseCurrentSong() {
        this.setState({
            playStatus: false
        });
    }

    playNextSong() {
        let updatedIndex = this.state.songIndex + 1;
        this.setState({
            songIndex: updatedIndex
        });
    }

    playPreviousSong() {
        let updatedIndex = this.state.songIndex - 1;
        this.setState({
            songIndex: updatedIndex
        });
    }

    showMamamooInfo(){
        let showMamamooInfo = this.state.showMamamooInfo;
        this.setState({
            showMamamooInfo: !showMamamooInfo
        })
    }
    render() {
        console.log("=====render=====")
        console.log(JSON.stringify(this.state.currentSongData));
        console.log("================")

        let this_ = this;
        return (
            <div className="music-container">
                {/*<img className="playing-page-bg" src={this.state.currentSongData.pic}/>*/}

                <div className="music-title">
                    <img className="arrow-left-icon icon"
                         src='../public/static/images/arrow-left.png'
                         onClick={this.backToPlaylist}
                    />
                    <div className="music-info">
                        <h3>{this.state.currentSongData.title}</h3>
                        <p>{this.state.currentSongData.author}</p>
                    </div>
                </div>

                {
                    this.state.showLyrics ?
                        <div className="lyrics-panel">
                            <iframe id="lyrics-content" name="lyrics-content"
                                    src={this.state.currentSongData.lrc}></iframe>
                            {/*{this.state.currentSongData.lrc}*/}
                        </div>
                        :
                        <div className="main-panel">
                            <div className="cover-image-wrapper">
                                <div className="cover-image-transparent-border">
                                    <img className="cover-image"
                                         src={this.state.currentSongData.pic}
                                         onClick={this.showLyrics}/>
                                </div>
                            </div>
                            <div className="function">
                                <img className="music-function-icon" src="../public/static/images/unliked.png"/>
                                <img className="music-function-icon" src="../public/static/images/download.png"/>
                                <img className="music-function-icon" src="../public/static/images/comments.png"/>
                                <img className="music-function-icon" src="../public/static/images/more.png"/>
                            </div>
                        </div>

                }


                <div className="audio-progress">
                    <audio className="audio-progress-music"
                           src={this.state.currentSongData.url}
                           ref="audio"></audio>
                    <div className="audio-progress-bar-wrapper">
                        <div className="audio-playing-current audio-time"
                             id="audioCurTime">00:00
                        </div>
                        <div className="progress-bar-bg">
                            <span id="progress-dot"></span>
                            <div className="progress-bar"></div>
                        </div>
                        <div className="audio-playing-end audio-time">
                            {this_.convertToTime(this_.state.currentSongData.time)}
                        </div>
                    </div>

                </div>


                <div className="music-controller">
                    <img className="music-function-icon"
                         src="../public/static/images/random-playing.png"
                    />
                    <img className="music-function-icon"
                         src="../public/static/images/previous.png"
                         onClick={this.playPreviousSong}
                    />

                    {
                        this_.state.playStatus ?
                            <img
                                className="music-function-icon play-pause-icon"
                                src="../public/static/images/pause.png"
                                onClick={this.pauseCurrentSong}
                            />
                            :
                            <img
                                className="music-function-icon play-pause-icon"
                                src="../public/static/images/play.png"
                                onClick={this.playCurrentSong}
                            />

                    }

                    <img className="music-function-icon"
                         src="../public/static/images/next.png"
                         onClick={this.playNextSong}
                    />


                    <img className="music-function-icon"
                         src="../public/static/images/info.png"
                         onClick = {this.showMamamooInfo}
                    />
                    {
                        this.state.showMamamooInfo?
                            <div className = "mamamoo-info">
                                <div>MAMAMOO</div>
                                <div>
                                    玟星小可爱
                                </div>
                                <div>
                                    狗辉黑金妮
                                </div>
                                <div>
                                    solar颂乐
                                </div>
                                <div onClick = {this.showMamamooInfo}>关闭</div>
                            </div>
                            :
                            <div className = "empty"/>
                    }
                </div>

            </div>
        )
    }

}


export default PlayingPage;
