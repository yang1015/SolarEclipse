import React from 'react';

class VideoPage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="video-page-container">
                <div className="video-page-wrapper">
                    <video className="video" controls="controls" src="../public/static/videos/mamamoo.mp4">
                    </video>


                    <div className="video-info">
                        <div className="video-title">
                           MAMAMOO - Starry Night - MBC Show Champion 现场版 18/03/14
                     </div>
                        <div className="album-info">
                            艺人: MAMAMOO<br/>
                            语种: 韩语<br/>
                            唱片公司: 独立发行<br/>
                            发行时间: 2018年07月27日<br/>
                            专辑类别: 录音室专辑<br/>
                            专辑风格: 韩国流行 K-Pop, 女子团体 Girl Group, 流行舞曲 Dance-Pop
                        </div>
                    </div>
                </div>

            </div>
        )

    }
}

export default VideoPage;