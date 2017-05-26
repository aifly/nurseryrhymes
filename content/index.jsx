import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

import ZmitiHeaderApp from '../components/header/zmiti-header.jsx';


class ZmitiContentApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			beginTest:false,
			imgW:0,
			transformY:0,
			isEntry:true
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var conponent = null;
			//console.log(this.state.imgW /2 - this.viewH)

		var bgStyle = {
			
			background:'url(./assets/images/bg1.jpg) no-repeat center / cover'	

		}
	

		var intrStyle = '';
		if(this.state.isEntry){
			intrStyle = 'active';
		}
		return (
			<div className={'zmiti-content-main-ui lt-full'} style={bgStyle}>
				<ZmitiHeaderApp></ZmitiHeaderApp>
				<section className='zmiti-content-main' style={{height:this.viewH - 100}}>

					<img className='zmiti-content-person' src='./assets/images/introl.png'/>
					<div className='zmiti-content-ty'>
						<div>
							<h3 >{this.props.poetryTitle}</h3>
							<div className='zmiti-content-ty-content'>{this.props.poetryContent}</div>
						</div>
					</div>
					{this.state.isBeginRead && <img className='zmiti-index-voice' src='./assets/images/voice.gif'/>}
					<div className='zmiti-content-begin-read-btn' onTouchTap={this.beginRecord.bind(this)}>{this.state.isBeginRead?'结束':'开始读'}</div>
					<div className='zmiti-content-reset'>重新选择</div>
				</section>
			</div>
		);
	}
 
	componentWillMount() {
		
	}

	beginRecord(){
		///开始录音
		let {obserable} = this.props;
		var s = this;
		if(!this.state.isBeginRead){
			wx.startRecord();//开始朗读
			
		}
		else{
			!s.cancelRecord && s.stopRecord();
		}
		this.setState({
			isBeginRead:!this.state.isBeginRead
		});
	}

	stopRecord(){
		let {obserable} = this.props;

		var s = this;//结束朗读
		wx.stopRecord({
			fail(){
				alert('end error');
			},
			success: function (res) {

				
				s.localId =	res.localId;
				/*obserable.trigger({
					type:'getLocalId',
					data:s.localId
				});*/
				//开始转文字。
				wx.translateVoice({
				    localId: s.localId, // 需要识别的音频的本地Id，由录音相关接口获得
				    isShowProgressTips: 1, // 默认为1，显示进度提示
				    fail(){
				    	s.setState({
				    		isBeginRead:false
				    	});
				    	alert('转文字失败，请重新再试');
				    },
				    success: function (res) {//转成功了。 

				    	var poetryContent = s.props.poetryContent.replace(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/ig,'');

				    	var dataArr = res.translateResult.replace(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/ig,'').split('');
						//dataArr.length = poetryContent.length;
						var rightWords = 0;

						var resultHtml = '';
						var score = 0;
						dataArr.map((da,k)=>{

							if(poetryContent.indexOf(da)>-1){
								rightWords++;
								resultHtml += '<span style="color:green">'+da+'</span>'
							}else{
								resultHtml+=da;
							}
						});

						var score  =( rightWords / poetryContent.length * 100 ) | 0;
						if(res.translateResult.length > poetryContent.length && score>=100 ){
							score  = 99;
						}
						alert(score);
						obserable.trigger({type:'updateScore',data:score});
					    	obserable.trigger({
					    		type:'getTransformResult',
					    		data:resultHtml
					    	});
				    }
				});
			} 
		});
	}

	componentDidMount() {
		
	}
}
export default PubCom(ZmitiContentApp);