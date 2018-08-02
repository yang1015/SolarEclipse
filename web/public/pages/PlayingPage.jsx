import React from 'react';
import {hashHistory} from 'react-router';
import '../static/style/style.scss';
import Progress from '../components/Progress.jsx';

let duration = null; //音频文件的总时长

class PlayingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songIndex: JSON.parse(props.params.songIndex), //这里如果不parse 后面更新index 4 + 1就会变成41
            songList: JSON.parse(props.location.query.songList),
            currentSongData: JSON.parse(props.location.query.songList)[props.params.songIndex],
            playStatus: true,
            showLyrics: false,
            showMamamooInfo: false,
            timePlayed: '',
            progress: 0
        }

        this.backToPlaylist = this.backToPlaylist.bind(this);
        this.playCurrentSong = this.playCurrentSong.bind(this);
        this.pauseCurrentSong = this.pauseCurrentSong.bind(this);
        this.playPreviousSong = this.playPreviousSong.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.showMamamooInfo = this.showMamamooInfo.bind(this);
        this.changePlayingSpot = this.changePlayingSpot.bind(this);
    }

    componentDidMount() {
        let this_ = this;
        $("#SolarPlayer").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute / 100,
                volume: e.jPlayer.options.volume * 100,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        });
        $('#SolarPlayer').jPlayer({
            ready: function () {
                console.log("播放")  //只有第一次点击的时候会触发
                $(this).jPlayer("setMedia", {
                    mp3: this_.state.currentSongData.url
                }).jPlayer("play");
            }
        });
    }

    componentWillUnmount() {
        $('#SolarPlayer').unbind($.jPlayer.event.timeupdate); //console.log("解绑 避免重复绑定")
    }

    componentDidUpdate(prevProps, prevState) {

        let this_ = this;

        if (prevState.songIndex != this.state.songIndex) {
            //console.log("didupdate inside")
            this.setState({
                currentSongData: this_.state.songList[this_.state.songIndex],
                playStatus: true
            });

            $('#SolarPlayer').jPlayer("setMedia", {
                mp3: this_.state.songList[this_.state.songIndex].url
            }).jPlayer("play");
        }

        if (prevProps.progress) {
            console.log("progress did update: " + prevProps.progress)
        }
    }

    formatTime(time) {
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);

        return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }

    changePlayingSpot(progress) {
        console.log("父组件接收到 更新" + progress);
        $("#SolarPlayer").jPlayer("play", duration * progress);
        // 当用户改变了播放点后 触发这个函数 更新play了的长度 总长度Xprogress百分比
        this.setState({
            progress: progress
        });
    }

    changeVolumeHandler(progress) {
        $("#SolarPlayer").jPlayer("volume", progress);
    }

    backToPlaylist() {
        hashHistory.push('PlayList');
    }

    convertToTime(lastingTime) {
        lastingTime = parseInt(lastingTime);
        let timeValue = '';
        let intValue;
        let remainingValue;
        if (lastingTime < 60) {
            remainingValue = lastingTime % 60;
            if (remainingValue < 10) remainingValue = "0" + remainingValue;
            timeValue = "00:" + remainingValue;
        }
        else {
            intValue = parseInt(lastingTime / 60);
            if (intValue < 10) intValue = "0" + intValue;
            remainingValue = lastingTime % 60;
            if (remainingValue < 10) remainingValue = "0" + remainingValue;
            timeValue = intValue + ":" + remainingValue;
        }
        return timeValue;
    }

    playCurrentSong() {
        let this_ = this;
        $('#SolarPlayer').jPlayer('play');

        /*
        以下代码触发不了播放
        $("#SolarPlayer").jPlayer("setMedia", {
            mp3: this_.state.currentSongData.url
        }).jPlayer('play');
        */


        this.setState({
            playStatus: true
        });

    }

    pauseCurrentSong() {
        this.setState({
            playStatus: false
        });

        $("#SolarPlayer").jPlayer("pause");
        // $('.audio-progress').jPlayer({
        //     ready: function() {
        //         $(this).jPlayer('setMedia').jPlayer('pause');
        //     }
        // })
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

    showMamamooInfo() {
        let showMamamooInfo = this.state.showMamamooInfo;
        this.setState({
            showMamamooInfo: !showMamamooInfo
        })
    }

    render() {
        //console.log("父组件重新render: " + this.state.progress);

        let this_ = this;
        return (
            <div className="music-container">
                <img className="playing-page-bg" src={this.state.currentSongData.pic}/>

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

                <div className="audio-progress">
                    <div id="SolarPlayer"></div>
                    <div>
                        {this.convertToTime(this.state.currentSongData.time * this.state.progress)}
                    </div>
                    <Progress
                        progress={this_.state.progress}
                        onProgressChange={this_.changePlayingSpot}
                    />
                    <div>
                        {this.convertToTime(this.state.currentSongData.time)}
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
                                className="music-function-icon play-pause-icon jp-play"
                                src="../public/static/images/pause.png"
                                onClick={this.pauseCurrentSong}
                            />
                            :
                            <img
                                className="music-function-icon play-pause-icon jp-pause"
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
                         onClick={this.showMamamooInfo}
                    />
                    {
                        this.state.showMamamooInfo ?
                            <div className="mamamoo-info">
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
                                <div onClick={this.showMamamooInfo}>关闭</div>
                            </div>
                            :
                            <div className="empty"/>
                    }
                </div>

            </div>
        )
    }

}


export default PlayingPage;

{/*<audio className="audio-progress-music"*/
}
{/*src={this.state.currentSongData.url}*/
}
{/*ref="audio"></audio>*/
}
{/*<div className="audio-progress-bar-wrapper">*/
}
{/*<div className="audio-playing-current audio-time"*/
}
{/*id="audioCurTime">00:00*/
}
{/*</div>*/
}
{/*<div className="progress-bar-bg" ref = "progress">*/
}
{/*<span id="progress-dot"></span>*/
}
{/*<div className="progress-bar-played"></div>*/
}
{/*</div>*/
}
{/*<div className="audio-playing-end audio-time">*/
}
{/*{this_.convertToTime(this_.state.currentSongData.time)}*/
}
{/*</div>*/
}
{/*</div>*/
}


//
// {
//     this.state.showLyrics ?
//         <div className="lyrics-panel">
//             <iframe id="lyrics-content" name="lyrics-content"
//                     src={this.state.currentSongData.lrc}></iframe>
//             {/*{this.state.currentSongData.lrc}*/}
//         </div>
//         :
//         <div className="main-panel">
//             <div className="cover-image-wrapper">
//                 <div className="cover-image-transparent-border">
//                     <img className="cover-image"
//                          src={this.state.currentSongData.pic}
//                          onClick={this.showLyrics}/>
//                 </div>
//             </div>
//             <div className="function">
//                 <img className="music-function-icon" src="../public/static/images/unliked.png"/>
//                 <img className="music-function-icon" src="../public/static/images/download.png"/>
//                 <img className="music-function-icon" src="../public/static/images/comments.png"/>
//                 <img className="music-function-icon" src="../public/static/images/more.png"/>
//             </div>
//         </div>
//
// }
