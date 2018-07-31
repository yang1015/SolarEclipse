import React from 'react';
import {musicRequest} from '../../util/util.js';
import '../static/style/style.scss';
import PlaylistTemplate from '../components/PlaylistTemplate';

class PlayList extends React.Component{
    constructor(){
        super();
        this.state = {
            songList: []
        }
        this.getMusicDataBack = this.getMusicDataBack.bind(this);
    }
    componentDidMount(){
        let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923';
        let mamamoo = 'https://api.hibai.cn/api/index/index';
        musicRequest(mamamoo, 'POST', this.getMusicDataBack);
    }
    getMusicDataBack(songList){
        this.setState({
            songList: songList
        })
    }
    render(){
        let this_ = this;
        return (
            <div>
                {
                    this_.state.songList.length == 0? <div />
                        :
                        <PlaylistTemplate data = {this_.state.songList} />

                }
            </div>
        )
    }
}

export default PlayList;