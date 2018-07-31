import React from 'react';
import '../static/style/style.scss';

class PlayingPage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="music-container">

                <div className="music-title">
                    <img className="arrow-left-icon icon"
                         src='../public/static/images/arrow-left.png'/>
                    <div className = "music-info">
                        <h3>We dont talk anymore</h3>
                        <p>Charlie puth/Selena Gomez</p>
                    </div>
                </div>

                <div className="cover-image-wrapper">
                    <div className="cover-image-transparent-border">
                        <img className="cover-image"
                             src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=e418d56e02f79052fb124f6c6d9abcaf/342ac65c103853433f4e215c9813b07ecb8088ce.jpg"/>
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
