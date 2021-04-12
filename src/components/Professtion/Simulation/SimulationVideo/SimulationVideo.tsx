import React, { Component } from 'react'
import "./SimulationVideo.scss"
import {
    Player,
    BigPlayButton,
    ControlBar,
    PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
    ReplayControl, // 后退按钮
    ForwardControl,  // 前进按钮
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,  // 倍速播放选项
    VolumeMenuButton
  } from 'video-react';

interface Props {
    videoInfo:any,
}

// interface State {

// }

export default class Video extends Component<Props, {}> {
    // constructor(props: any) {
    //     super(props)
    //     this.state = {
    //     }

    // }
  
    render() {
        return(
            <div>
                <h1 className="text-center mt-40">{this.props.videoInfo.name}</h1>
                <h3 className="video-introduction">简介</h3>
                <p className="mt-10 ">{this.props.videoInfo.introduction}</p>
                <div className="Player">
                    <Player
                        poster="https://video-react.js.org/assets/poster.png"
                    >
                        <source
                        src={this.props.videoInfo.src_url}
                        type="video/mp4"
                        />
                        <BigPlayButton position="center"/>
                        <ControlBar autoHide={false} disableDefaultControls={false}>   
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={30} order={1.2} />
                            <PlayToggle />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
                            <VolumeMenuButton />
                        </ControlBar>
                    </Player>
                 </div>
            </div>


        )
    }
}