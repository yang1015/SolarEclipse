import React from 'react';
import PlaylistItem from './PlaylistItem';

class Progress extends React.Component {
    constructor(props) {
        super(props);
        console.log("子组件接收props: " + JSON.stringify(props.progress))
        this.state = {
            progress: props.progress
        }
        this.handlePlayingSpotChanged = this.handlePlayingSpotChanged.bind(this);
    }

    /*
    父子组件通讯 其实子组件不需要自己更新组件内部的state了 一切都是父派给子，子更新后，通知父新的内容，然后父重新派给子
    不然这样的写法，首先 不合理不合逻辑，其次 在render的时候会出现延迟反应，点了spot之后 马上不变绿 还得等一会儿才变绿
    componentDidUpdate(prevProps, prevState) {
        //console.log("did update: " + JSON.stringify(prevProps));

        if (prevProps.progress != this.state.progress) {
            // 当前组件内的值与父组件更新后的值不一致 就要update
            //console.log("prevProps.progress: " + prevProps.progress)
            console.log("did update: " + this.state.progress);
            this.setState({
                progress: prevProps.progress
            });

        }
    }
    */

    handlePlayingSpotChanged(event) {
        let progressBar = this.refs.progressBar;
        let updatedProgress = (event.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        /* let intProgress = Math.round(updatedProgress);*/
        this.setState({
            progress: updatedProgress
        });
        console.log("子组件改变了: " + updatedProgress);
        this.props.onProgressChange(updatedProgress); //传给父组件 然后重新渲染
    }


    render() {
        console.log("子组件接收到新的render: " + this.props.progress)
        let this_ = this;
        return (
            <div className="progress-bar-bg" ref="progressBar"
                 onClick={this_.handlePlayingSpotChanged}>
                <div className="progress-played"
                     style={{width: `${this_.props.progress}%`}}
                />
            </div>
        )
    }
}

export default Progress;