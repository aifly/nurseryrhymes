import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

import ZmitiLoadingApp from './loading/index.jsx';
import ZmitiIndexApp from './index/index.jsx';
import ZmitiContentApp from './content/index.jsx';
import ZmitiResultApp from './result/index.jsx';
import ZmitiToastApp from './components/toast/index.jsx';
import Obserable from './components/public/obserable';
var obserable = new Obserable();

export class App extends Component {
	constructor(props) {
		super(props);


		this.state = {
			toast:'',
			progress:'0%',
			score:0,//积分
			openid:'',
			wxappid:'',
			showLoading:true,
			worksid:'',	
			age:18,
			nickname:'文明网',
			headimgurl:'',
			duration:0,//录音时长。
			transformResult:'',
			latitude:'',
			longitude:'',
			usercity:'',
			shareImg:'',
			poetryTitle:'',
			id:'',//6NPqiCFidf
			parentWxopenId:'',//oSDVUs5MkTw7MxaXPu0KsflRfSqM
			poetryAuthor:'',
			poetryContent:'',
			userPoetryTitle:'',
			userPoetryAuthor:'',
			userPoetryContent:'',//原诗
			
		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		this.loadingImg = [
			'./assets/images/index.jpg',
			'./assets/images/bg1.jpg',

		]
	}
	render() {
		
		var mainStyle={};
		if(this.state.indexBg){
			mainStyle.background = 'url('+this.state.indexBg+') no-repeat center / cover'
		}

		var data ={
			obserable,
			IScroll,
			
		}

		return (
			<div className='zmiti-main-ui' style={mainStyle}>
				{this.state.showLoading && <ZmitiLoadingApp progress={this.state.progress}></ZmitiLoadingApp>}
				{!this.state.showLoading && <ZmitiIndexApp {...data} {...this.state}></ZmitiIndexApp>}
				{!this.state.showLoading && <ZmitiContentApp {...this.state} {...data}></ZmitiContentApp>}
				{!this.state.showLoading && <ZmitiResultApp {...this.state} {...data}></ZmitiResultApp>}

				{this.state.showPoetryLoading&&<div className='zmiti-get-poetry-loading'>
										<div>
											<div className="sk-fading-circle">
											  <div className="sk-circle1 sk-circle"></div>
											  <div className="sk-circle2 sk-circle"></div>
											  <div className="sk-circle3 sk-circle"></div>
											  <div className="sk-circle4 sk-circle"></div>
											  <div className="sk-circle5 sk-circle"></div>
											  <div className="sk-circle6 sk-circle"></div>
											  <div className="sk-circle7 sk-circle"></div>
											  <div className="sk-circle8 sk-circle"></div>
											  <div className="sk-circle9 sk-circle"></div>
											  <div className="sk-circle10 sk-circle"></div>
											  <div className="sk-circle11 sk-circle"></div>
											  <div className="sk-circle12 sk-circle"></div>
											</div>
										</div>
									</div>}
									<ZmitiToastApp toast={this.state.toast}></ZmitiToastApp>
			</div>
		);
	}

	submit(){
		this.setState({
			submit:true
		});

		setTimeout(()=>{
			this.setState({
				submit:false
			});			
		},100);
	}

	beginTest(){

		this.setState({
			tap:true
		});

		setTimeout(()=>{
			this.setState({
				tap:false,
				showForm:true,
			});

		},100);

	}


	getPos(nickname,headimgurl){
	    	var s = this;
	    	 $.ajax({
	        	url:`http://restapi.amap.com/v3/geocode/regeo?key=10df4af5d9266f83b404c007534f0001&location=${wx.posData.longitude},${wx.posData.latitude}&poitype=&radius=100&extensions=base&batch=false&roadlevel=1`+'',
				type:'get',
				error(){

				},
				success(data){
					if(data.status === '1' && data.infocode === '10000'){
						
						var addressComponent = data.regeocode.addressComponent;
						var opt = {
					   		type:'map',
					   		address:(addressComponent.city[0]||addressComponent.province)+addressComponent.district,
					   		pos:[wx.posData.longitude,wx.posData.latitude],
					   		nickname:nickname,
					   		headimgurl:headimgurl
					   	}

					   	s.setState({
					   		nickname,
					   		headimgurl,
					   		openid: s.openid,
					   		showUI:true,
					   		latitude:wx.posData.latitude,
					   		longitude:wx.posData.longitude,
					   		usercity:(addressComponent.city[0]||addressComponent.province)+addressComponent.district
					   	});
					   	$.ajax({
							url:'http://api.zmiti.com/v2/weixin/save_userview/',
							type:'post',
							data:{
								worksid:s.worksid,
								wxopenid:s.openid,
								wxname:nickname,
								usercity:opt.address,
								longitude:wx.posData.longitude,
								latitude:wx.posData.latitude
							}
						}).done((data)=>{
							if(data.getret === 0 ){
								
							}else{
								alert('save_userview getret : '+ data.getret +' msg : '+ data.getmsg)
							}
						},()=>{
							//alert('save_userview error');
						})

					   	$.ajax({
					   		url:'http://api.zmiti.com/v2/weixin/add_wxuser/',
					   		type:'post',
					   		data:{
					   			wxopenid:s.openid,
					   			worksid:s.worksid,
					   			nickname:nickname,
					   			headimgurl:headimgurl,
					   			longitude:wx.posData.longitude,
					   			latitude:wx.posData.latitude,
					   			accuracy:wx.posData.accuracy,
					   			wxappid:s.wxappid,
					   			integral:localStorage.getItem('nickname')?0:10
					   		},
					   		error(){
					   			alert('add_wxuser: 服务器返回错误');
					   		},
					   		success(data){
					   			if(data.getret === 0){
					   				
					   				$.ajax({
										url:'http://api.zmiti.com/v2/weixin/get_wxuserdetaile',
										data:{
											wxopenid:s.openid
										},
										success(data){
											if(data.getret === 0){
												
												s.score = data.wxuserinfo.totalintegral;
												s.setState({
													score:s.score
												});
											}else{
												alert('get_wxuserdetaile : getret  : '+ data.getret + ' msg : ' + data.getmsg);	
											}
										}
									})

					   			}else{
					   				alert('getret  : '+ data.getret + ' msg : ' + data.getmsg+ ' .....');
					   			}
					   		}
					   	});

					   	//获取用户积分
						//
				   		$.ajax({
							url:'http://api.zmiti.com/v2/msg/send_msg/',
							data:{
								type:s.worksid,
								content:JSON.stringify(opt),
								to:opt.to||''
							},
							success(data){
								s.state.showUI = true;
								s.forceUpdate();
								//console.log(data);
							}
						})
					}
					else{
						alert('地址信息获取失败')
					}
				}						        	
	        })
    }

	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid){
		   var durl = location.href.split('#')[0]; //window.location;
		        var code_durl = encodeURIComponent(durl);

		        var s = this;

			$.ajax({
				type:'get',
				url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl="+code_durl+"&worksid="+worksid,
				dataType:'jsonp',
				jsonp: "callback",
			    jsonpCallback: "jsonFlickrFeed",
			    error(){
			    },
			    success(data){
			    	wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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

			    		wx.getLocation({
						    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						    fail(){
						    	alert('location fail');
						    },
						    success: function (res) {
						        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						        var speed = res.speed; // 速度，以米/每秒计
						        var accuracy = res.accuracy; // 位置精度
						   
						        wx.posData = {
						        	longitude,
						        	latitude,
						        	accuracy
						        };

						        if((s.nickname || s.headimgurl) && s.openid){
						        	s.getPos(s.nickname,s.headimgurl);
						        }
						       
						    }
						});

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
 
	 

	componentDidMount() {
		var s = this;
		
		obserable.on('loadTY',()=>{

			s.state.showPoetryLoading = true;
			s.forceUpdate();
			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/get_shici/',
				data:{
					worksid:s.state.worksid,
					type:2,//童谣
				}
			}).done((data)=>{
				if(data.getret ===0 ){
					if(data.shicilist.length>0){
						s.state.poetryTitle = data.shicilist[0].title;
						s.state.poetryAuthor = data.shicilist[0].author;
						s.state.poetryContent = data.shicilist[0].originaltext;
						
						s.state.workdataid = data.shicilist[0].workdataid;
						

						s.state.userPoetryContent = data.shicilist[0].originaltext;
						
						s.state.id = '';
						s.state.parentWxopenId = '';
						s.state.showShareOpen = false;
						
						setTimeout(()=>{
					    	s.state.showPoetryLoading = false;
							s.forceUpdate();
						},500)
					}
				}
			},()=>{

			})
		})


		obserable.on('getLocalId', (data)=> {
			this.setState({
				audioSrc: data
			})
		});

		obserable.on('getTransformResult', (data)=> {
			this.setState({
				transformResult: data
			});
		});

		obserable.on('showToast',data=>{

			this.setState({
				toast:data
			});
			if(data){
				setTimeout(()=>{
					this.setState({
						toast:''
					})
				},2000)	
			}
			
		})
		
		obserable.trigger({
			type:'loadTY'
		});


		$.getJSON('./assets/js/data.json',(data)=>{

			this.state.worksid = data.worksid;
			this.state.wxappid = data.wxappid;
			this.worksid = data.worksid;
			var s = this;
			this.state.wxappsecret = data.wxappsecret;
			this.forceUpdate();


			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/getwxuserinfo/',
				data:{
					code:s.getQueryString('code'),
					wxappid:data.wxappid,
					wxappsecret:data.wxappsecret
				},
				error(e){
					alert('error');
				},
				success(dt){

					if(dt.getret === 0){
						s.setState({
							showLoading:true
						});
						s.loading(s.loadingImg,(scale)=>{
							s.setState({
								progress:(scale*100|0)+'%'
							})
						},()=>{
							s.setState({
								showLoading:false
							});
							
							s.defaultName = dt.userinfo.nickname || data.username || '智媒体';

							localStorage.setItem('nickname',dt.userinfo.nickname );
							localStorage.setItem('headimgurl',dt.userinfo.headimgurl);
							s.openid = dt.userinfo.openid;

							s.nickname = dt.userinfo.nickname;
							s.headimgurl = dt.userinfo.headimgurl;
							s.wxConfig('童谣'.replace(/{username}/ig,s.state.nickname),'不'.replace(/{username}/ig,s.state.nickname),s.state.shareImg,s.state.wxappid,s.worksid);
							

							if (wx.posData && wx.posData.longitude) {

								s.getPos(dt.userinfo.nickname, dt.userinfo.headimgurl);
							}


						
							s.state.myHeadImg = dt.userinfo.headimgurl
							s.forceUpdate();

						});
						
					}
					else{

						
						s.setState({
							showLoading:true
						});



						if(s.isWeiXin() ){

							/*if(localStorage.getItem('oauthurl'+s.worksid)){
								window.location.href = localStorage.getItem('oauthurl'+s.worksid);
								return;
							}*/

							var redirect_uri = window.location.href.split('?')[0];
							var symbol = redirect_uri.indexOf('?') > -1 ? '&' : '?';
							if (s.state.id && s.state.parentWxopenId) {
								redirect_uri = redirect_uri + symbol + 'id=' + s.state.id + '&wxopenid=' + s.state.parentWxopenId;
							}
							
							symbol = redirect_uri.indexOf('?') > -1 ? '&' : '?';
							if (!s.getQueryString('zmiti')) {
								//redirect_uri += symbol + 'zmiti=start';
							}
							
							$.ajax({
								url:'http://api.zmiti.com/v2/weixin/getoauthurl/',
								type:'post',
								data:{
									redirect_uri:redirect_uri,
									scope:'snsapi_userinfo',
									worksid:s.worksid,
									state:new Date().getTime()+''
								},
								error(){
									
								},
								success(dt){

									if(dt.getret === 0){
										localStorage.setItem('oauthurl'+s.worksid,dt.url);
										window.location.href =  dt.url;
									}else{
										alert('getoauthurl back error')
									}
								}
							})
						}
						else{

							s.loading(data.loadingImg,(scale)=>{
								s.setState({
									progress:(scale*100|0)+'%'
								})
							},()=>{
								s.setState({
									showLoading:false
								});

								$.ajax({
									url:'http://api.zmiti.com/v2/works/update_pvnum/',
									data:{
										worksid:s.worksid
									},
									success(data){
										if(data.getret === 0){
											console.log(data);
										}
									}
								});


								s.defaultName =  data.username || '智媒体';
							
								
								s.forceUpdate();

						});


						 
						}

					}


				}
			});


			this.defaultName = data.username;
		

			s.defaultName = localStorage.getItem('nickname') || data.username || '智媒体';
		

			s.headimgurl = localStorage.getItem('headimgurl');
		
			s.forceUpdate();
			

			
		});



		$(document).one('touchstart',()=>{
			/*this.refs['talkAudio'].pause();
			this.refs['talkAudio'].muted = true;
			this.refs['talkAudio'].play();
			setTimeout(()=>{
				this.refs['talkAudio'].muted = false;
			},500);
			if(this.refs['audio'] && this.refs['audio'].paused){
				this.refs['audio'].play();
			};*/
		})
		
	}

	loading(arr, fn, fnEnd){
		var arr = arr || [];
        var len = arr.length;
        if(len<=0){
        	fnEnd();
        	return;
        }
        var count = 0;
        var i = 0;
        
        function loadimg() {
            if (i === len) {
                return;
            }
            var img = new Image();
            img.onload = img.onerror = function(){
                count++;
                if (i < len - 1) {
                    i++;
                    loadimg();
                    fn && fn(i / (len - 1), img.src);
                } else {
                    fnEnd && fnEnd(img.src);
                }
            };
            img.src = arr[i];
        }
       loadimg();
    }

	isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

	componentWillMount() {
		var s = this;

	}

	clearRender(){
		clearInterval(this.talkTimer);
	}

	 
}

	ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
	

