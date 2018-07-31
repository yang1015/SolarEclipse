import React from 'react';

class PlaylistItem extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            eachSongItem: this.props.eachSongItem
        }
    }
    render(){
        return (
            <div className = "playlist-item-wrapper">
                <img className="playlist-cover-thumbnail" src={this.state.eachSongItem.pic}/>
                <div className = "playlist-music-info">
                    <div>{this.state.eachSongItem.title}</div>
                    <div>{this.state.eachSongItem.author}</div>
                </div>
                <img src = "../public/static/images/playlist-info.png" />
            </div>
        )
    }
}

export default PlaylistItem;