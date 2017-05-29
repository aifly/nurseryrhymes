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
			isEntry:true,
			score:0,
			contentClass:'hideright'
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
	


		return (
			<div className={'zmiti-content-main-ui lt-full ' + this.state.contentClass} style={bgStyle}>
				<ZmitiHeaderApp {...this.props}></ZmitiHeaderApp>
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

	changeURLPar(destiny, par, par_value) { 
		var pattern = par+'=([^&]*)'; 
		var replaceText = par+'='+par_value; 
		if (destiny.match(pattern)) { 
			var tmp = '/\\'+par+'=[^&]*/'; 
			tmp = destiny.replace(eval(tmp), replaceText); 
			return (tmp); 
		} 
		else { 
			if (destiny.match('[\?]')) { 
				return destiny+'&'+ replaceText; 
			} 
			else { 
				return destiny+'?'+replaceText; 
			} 
		} 
		return destiny+'\n'+par+'\n'+par_value; 
	} 
 	
 	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid=this.props.worksid){
			var s = this;

		   var durl = location.href.split('#')[0];//+symbol+'id='+this.state.id+'&wxopenid='+ this.props.openid; //window.location;
		   	durl = s.changeURLPar(durl,'id',s.state.id);
		   	durl = s.changeURLPar(durl,'wxopenid',s.props.openid);

		   		//durl = durl + symbol + 'id=' + s.state.id + '&wxopenid=' + s.props.openid;
		        var code_durl = encodeURIComponent(durl);
				/*if (s.props.id && s.props.parentWxopenId) {
					
				}*/
				
			$.ajax({
				type:'get',
				url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl="+code_durl+"&worksid="+worksid,
				dataType:'jsonp',
				jsonp: "callback",
			    jsonpCallback: "jsonFlickrFeed",
			    success(data){
			    	wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端window.debug && alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId:appId, // 必填，公众号的唯一标识
							    timestamp:'1488558145' , // 必填，生成签名的时间戳
							    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
							    signature: data.signature,// 必填，签名，见附录1
							    jsApiList: [ 'checkJsApi',
											'onMenuShareTimeline',
											'onMenuShareAppMessage',
											'onMenuShareQQ',
											'onMenuShareWeibo',
											'hideMenuItems',
											'showMenuItems',
											'hideAllNonBaseMenuItem',
											'showAllNonBaseMenuItem',
											'translateVoice',
											'startRecord',
											'stopRecord',
											'onRecordEnd',
											'playVoice',
											'pauseVoice',
											'stopVoice',
											'uploadVoice',
											'downloadVoice',
											'chooseImage',
											'previewImage',
											'uploadImage',
											'downloadImage',
											'getNetworkType',
											'openLocation',
											'getLocation',
											'hideOptionMenu',
											'showOptionMenu',
											'closeWindow',
											'scanQRCode',
											'chooseWXPay',
											'openProductSpecificView',
									] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});

			    	wx.ready(()=>{
			    				//朋友圈
	                    wx.onMenuShareTimeline({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
	                    //朋友
	                    wx.onMenuShareAppMessage({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        type: "link",
	                        dataUrl: "",
	                        desc: desc,
	                        success: function () {
	                        },
	                        cancel: function () { 
	                        }
	                    });
	                    //qq
	                    wx.onMenuShareQQ({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
			    	});
			    }
			});
		 
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
				obserable.trigger({
					type:'getLocalId',
					data:s.localId
				});
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
				    	var serverId = res.serverId; // 返回音频的服务器端ID
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

						obserable.trigger({
							type:'getTransformResult',
							data:res.translateResult.replace(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/ig,'')
						});
						

						obserable.trigger({
							type:'toggleResult',
							data:'active'
						});
						s.setState({
							contentClass:'hideleft'
						});

						obserable.trigger({type:'updateScore',data:score});
						wx.uploadVoice({
						    localId:s.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
						    isShowProgressTips: 0, // 默认为1，显示进度提示
						    fail(){
						    	window.debug && alert('上传失败');
						    },
					        success: function (res) {
						        var serverId = res.serverId; // 返回音频的服务器端ID
						       
								$.ajax({
									url:'http://api.zmiti.com/v2/weixin/post_shiciresult/',
									type:'post',
									data:{
										worksid:s.props.worksid,
										workdataid:s.props.workdataid,
										wxopenid:s.props.openid,
										parentwxopenid:s.props.parentWxopenId,
										mediaid:serverId,
										score:score,
										duration:s.props.duration,
										changetext:s.props.transformResult.replace(/<[^>]+>/g,""),
										usercity:s.props.usercity,
										longitude:s.props.longitude,
										latitude:s.props.latitude,
										wxname:s.props.nickname,
										workdatatitle:s.props.poetryTitle
									},
									error(){
										 alert('post_shiciresult error 接口错误');
									},
									success(data){

										if( data.getret === 0){

											var id = data.id;
											/*obserable.trigger({
												type:'updateParentInfo',
												data:{
													id,
													parentWxopenId:s.props.openid
												}
											});*/


											obserable.trigger({
												type:'showToast',
												data:'提交成功'
											})

											s.setState({
												id
											},()=>{
												setTimeout(()=>{
									   				s.wxConfig(s.props.nickname+'为你朗读了一首诗','千山万水总是情，为你读诗行不行。远方的朋友用家乡话为你读了首诗，你能猜出原诗吗？',s.props.data.shareImg,s.props.wxappid);
									   			},500)
											});

											var integral = 10;
											$.ajax({
												url:'http://api.zmiti.com/v2/weixin/add_wxuser/',
										   		type:'post',
										   		data:{
										   			wxopenid:s.props.openid,
										   			worksid:s.props.worksid,
										   			nickname:s.props.nickname,
										   			headimgurl:s.props.headimgurl,
										   			longitude:s.props.longitude,
										   			latitude:s.props.latitude,
										   			accuracy:s.props.accuracy,
										   			wxappid:s.props.wxappid,
										   			integral:integral
										   		},
										   		error(){
										   			window.debug && alert('add_wxuser 服务器返回错误');
										   		},
										   		success(data){
										   			
										   			if(data.getret === 0){
										   				
										   				obserable.trigger({
											   				type:'updateIntegral',
											   				data:integral
											   			});

											   			
										   			} 
										   			
										   		}
											})
											
										}
										
									}
								})
						    }
						});

					
						/*
					    	obserable.trigger({
					    		type:'getTransformResult',
					    		data:resultHtml
					    	});*/
				    }
				});
			} 
		});
	}

	componentDidMount() {
		let {obserable} = this.props;
		obserable.on('toggleContent',(data)=>{
			this.setState({
				contentClass:data
			})
		});
	}
}
export default PubCom(ZmitiContentApp);