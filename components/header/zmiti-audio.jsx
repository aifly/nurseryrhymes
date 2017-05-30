import React, { Component } from 'react';
import {PubCom} from '../public/pub.jsx';
import './css/audio.css';
import $ from 'jquery';

class ZmitiAudioApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			pause:true
		};
	}

	render() {
		return (
			<div className={'zmiti-audio-main-ui '+ (this.props.className||'')}>
				<section className='zmiti-audio-C' onTouchTap={this.playAudio.bind(this)}>
					<aside><img src={'./assets/images/pause.'+(this.state.pause?'png':'gif')+''}/>{this.props.text||'点我收听'}</aside>
					<aside>{this.props.duration|| 0}'</aside>
				</section>
			</div>
		);
	}
	playAudio(){
		var s = this;
		if(this.state.pause ){
			this.setState({
				pause:false
			},()=>{
				wx.playVoice({
				    localId: s.props.audioSrc
				});	

				wx.onVoicePlayEnd({
				    success: function (res) {
				        var localId = res.localId; // 返回音频的本地ID
				        s.setState({
							pause:true
						});
					    }
					});
			})
		}
	}

	componentDidMount() {
		
	}
}

export default PubCom(ZmitiAudioApp);