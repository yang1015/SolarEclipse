import React from 'react';
import '../static/style/Playlist.scss';

class PlaylistItem extends React.Component{

    constructor(props) {
        super(props);
        // console.log(JSON.stringify(this.props))
        this.state = {
            eachSongItem: this.props.eachSongItem,
            songIndex: this.props.songIndex
        }
        this.clickSingleSong = this.clickSingleSong.bind(this);
    }

    clickSingleSong(event) {
        console.log("index: " + this.state.songIndex);
        this.props.onItemChosenListener(this.state.songIndex);
    }

    render(){
        return (
            <div className = "playlist-item-wrapper" onClick ={this.clickSingleSong}>
                <img className="playlist-cover-thumbnail" src={this.state.eachSongItem.pic}/>
                <div className = "playlist-music-info">
                    <div>{this.state.eachSongItem.title}</div>
                    <div>{this.state.eachSongItem.author}</div>
                </div>
                <img className = "playlist-more" src = "../public/static/images/playlist-info.png" />
            </div>
        )
    }
}

export default PlaylistItem;