import React from 'react';
import PlaylistItem from './PlaylistItem';
import '../static/style/Playlist.scss';

class PlaylistTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songList: props.data
        }

        this.listenItemChosen = this.listenItemChosen.bind(this);
    }

    listenItemChosen(data) {
        this.props.handleTemplateChosenSongIndex(data);
    }

    render() {
        let this_ = this;
        if (this.state.songList.length != 0) {
            return (
                <div>
                    {
                        this_.state.songList.map(function (item, index) {
                            return (
                                <PlaylistItem
                                    onItemChosenListener ={this_.listenItemChosen}
                                    eachSongItem = {item}
                                    key = {index}
                                    songIndex = {index}/>
                            )
                        })
                    }


                </div>
            )
        } else {

            return <div/>

        }
    }
}

export default PlaylistTemplate;