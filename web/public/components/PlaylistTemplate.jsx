import React from 'react';
import PlaylistItem from './PlaylistItem';

class PlaylistTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songList: props.data
        }
    }

    render() {
        let this_ = this;
        if (this.state.songList.length != 0) {
            return (
                <div>
                    {
                        this_.state.songList.map(function (item, index) {
                            return (
                                <PlaylistItem eachSongItem = {item} key = {index}/>
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