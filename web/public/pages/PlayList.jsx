import React from 'react';
import {hashHistory} from 'react-router';
import {musicRequest} from '../../util/util.js';
// import Pubsub from 'pubsub-js';

import '../static/style/style.scss';
import PlaylistTemplate from '../components/PlaylistTemplate';

class PlayList extends React.Component {
    constructor() {
        super();
        this.state = {
            songList: [],
            songChosenIndex: ''
        }
        this.getMusicDataBack = this.getMusicDataBack.bind(this);
    }

    componentDidMount() {
        //let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923';
        let mamamoo = 'https://api.hibai.cn/api/index/index';
        musicRequest(mamamoo, 'POST', this.getMusicDataBack);
    }

    componentWillUnmount() {

    }


    getMusicDataBack(songList) {
        this.setState({
            songList: songList
        })
    }

    getTemplateChosenSongIndex(songIndex) {
        let this_ = this;
        this.setState({
            songChosenIndex: songIndex
        });

        this.navigateToPlayingPage(songIndex);

    }

    navigateToPlayingPage(songIndex) {
        let this_ = this;
        hashHistory.push({
            pathname: '/PlayingPage/' + songIndex,
            query: {
                songList: JSON.stringify(this_.state.songList)
            }
        });
    }

    render() {
        let this_ = this;
        return (
            <div>
                <div className="playlist-total-info">
                    <img className="icon playlist-all-play-img" src="../public/static/images/playlist-play.png"/>
                    播放全部 <span className="playlist-counts"> (共{this.state.songList.length}首)</span>
                </div>
                {
                    this_.state.songList.length == 0 ? <div>暂无音乐</div>
                        :
                        <PlaylistTemplate
                            handleTemplateChosenSongIndex={this_.getTemplateChosenSongIndex.bind(this)}
                            data={this_.state.songList}
                        />

                }
            </div>
        )
    }
}

export default PlayList;