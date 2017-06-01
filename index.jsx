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
import ZmitiShareOpenApp from './shareopen/index.jsx';
import ZmitiResultApp from './result/index.jsx';
import ZmitiToastApp from './components/toast/index.jsx';
import ZmitiUserApp from './user/index.jsx';
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
			headimgurl:'./assets/images/zmiti.jpg',
			duration:0,//录音时长。
			transformResult:'',
			latitude:'',
			longitude:'',
			usercity:'',
			shareImg:window.shareInfo.shareImg,
			poetryTitle:'',
			id:'',//6NPqiCFidf
			parentWxopenId:'',//oSDVUs5MkTw7MxaXPu0KsflRfSqM
			poetryAuthor:'',
			poetryContent:'',
			userPoetryTitle:'',
			userPoetryAuthor:'',
			userPoetryContent:'',//原诗

			isShare:false,
			
			
		}

		this.zmitiMap = [
				{"name":"北京市", "log":"116.46", "lat":"39.92"},
				{"name":"上海市", "log":"121.48", "lat":"31.22"},
				{"name":"天津市", "log":"117.2", "lat":"39.13"},
				{"name":"重庆市", "log":"106.54", "lat":"29.59"},
				{"name":"石家庄", "log":"114.48", "lat":"38.03"},
				{"name":"太原市", "log":"112.53", "lat":"37.87"},
				{"name":"沈阳市", "log":"123.38", "lat":"41.8"},
				{"name":"长春市", "log":"125.35", "lat":"43.88"},
				{"name":"哈尔滨市", "log":"126.63", "lat":"45.75"},
				{"name":"杭州市", "log":"120.19", "lat":"30.26"},
				{"name":"福州市", "log":"119.3", "lat":"26.08"},
				{"name":"济南市", "log":"106.54", "lat":"29.59"},
				{"name":"郑州市", "log":"113.65", "lat":"34.76"},
				{"name":"武汉市", "log":"114.31", "lat":"30.52"},
				{"name":"长沙市", "log":"113", "lat":"28.21"},
				{"name":"广州市", "log":"113.23", "lat":"23.16"},
				{"name":"海口市", "log":"110.35", "lat":"20.02"},
				{"name":"成都市", "log":"104.06", "lat":"30.67"},
				{"name":"贵阳市", "log":"106.71", "lat":"26.57"},
				{"name":"昆明市", "log":"102.73", "lat":"25.04"},
				{"name":"南昌市", "log":"115.89", "lat":"28.68"},
				{"name":"西安市", "log":"108.95", "lat":"34.27"},
				{"name":"西宁市", "log":"101.74", "lat":"36.56"},
				{"name":"兰州市", "log":"103.73", "lat":"36.03"},
				{"name":"南宁市", "log":"106.54", "lat":"29.59"},
				{"name":"乌鲁木齐市", "log":"87.68", "lat":"43.77"},
				{"name":"呼和浩特市", "log":"111.65", "lat":"40.82"},
				{"name":"拉萨市", "log":"91.11", "lat":"29.97"},
				{"name":"银川市", "log":"106.27", "lat":"38.47"},
				{"name":"台北市", "log":"121.5", "lat":"25.14"},
				{"name":"香港", "log":"114.17", "lat":"22.27"},
				{"name":"澳门", "log":"113.33", "lat":"22.13"},
				{"name":"合肥市", "log":"117.27", "lat":"31.86"},
				{"name":"南京市", "log":"118.78", "lat":"32.04"}
			]
		
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		this.loadingImg = [
			'./assets/images/bg1.jpg',
			'./assets/images/age.png',
			'./assets/images/bufu.png',
			'./assets/images/del.png',
			'./assets/images/entry-btn.png',
			'./assets/images/guess.png',
			'./assets/images/introl.png',
			'./assets/images/line.png',
			'./assets/images/logo.png',
			'./assets/images/pause.gif',
			'./assets/images/pause.png',
			'./assets/images/person.png',
			'./assets/images/read-btn.png',
			'./assets/images/read-ty.png',
			'./assets/images/share-person.png',
			'./assets/images/shuoming.png',
			'./assets/images/text.png',
			'./assets/images/wmlogo.png',
			'./assets/images/voice.gif',
			'./assets/images/zmiti.jpg'

			

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
				{!this.state.showLoading && <ZmitiIndexApp wxConfig={this.wxConfig.bind(this)} {...data} {...this.state}></ZmitiIndexApp>}
				{!this.state.showLoading && <ZmitiContentApp {...this.state} {...data}></ZmitiContentApp>}
				{!this.state.showLoading && <ZmitiResultApp {...this.state} {...data}></ZmitiResultApp>}
				{!this.state.showLoading  && <ZmitiShareOpenApp {...this.state} {...data}></ZmitiShareOpenApp>}
				<ZmitiUserApp {...this.state} {...data}></ZmitiUserApp>
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


	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid=this.state.worksid,url){
			var s = this;

		    var durl = url || window.location.href.split('#')[0]; //window.location;
		
		    var code_durl = encodeURIComponent(durl);

			$.ajax({
				type:'get',
				url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl="+code_durl+"&worksid=1797800906",
				dataType:'jsonp',
				jsonp: "callback",
			    jsonpCallback: "jsonFlickrFeed",
			    success(data){
			    	wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId:appId, // 必填，公众号的唯一标识
							    timestamp:'1488558145' , // 必填，生成签名的时间戳
							    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
							    signature: data.signature,// 必填，签名，见附录1
							    jsApiList: [
								    'checkJsApi',
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
						    	//window.debug && alert('定位失败,重新进入');
						    	//window.location.href = window.location.href;
						    	alert('location fail');
						    },
						    cancel:function(){
						        


						    	var idx = Math.random()*s.zmitiMap.length|0;

						    	var latitude = s.zmitiMap[idx].lat; // 纬度，浮点数，范围为90 ~ -90
						        
						        var longitude = s.zmitiMap[idx].log; // 经度，浮点数，范围为180 ~ -180。
						       
						        var accuracy = 100; // 位置精度
						    	wx.posData = {
						        	longitude,
						        	latitude,
						        	accuracy
						        };
						        if((s.nickname || s.headimgurl) && s.openid){
						        	s.getPos(s.nickname,s.headimgurl);
						        }
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
		
		obserable.on('updateDuration',(data)=>{
			this.setState({
				duration:data
			})
		})

		obserable.on('toggleLoading',(data)=>{
			this.setState({
				showPoetryLoading:data
			})
		})

		obserable.on('backIndex',()=>{
			obserable.trigger({
				type:'removeParentInfo'
			});
			this.setState({
				isShare:false
			});
			obserable.trigger({
				type:'toggleContent',
				data:'hideright'
			});

			obserable.trigger({
				type:'toggleResult',
				data:'hideright'
			});
		})
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


		var id = this.getQueryString('id'),
			parentWxopenId = this.getQueryString('wxopenid');

		this.setState({
			id,
			parentWxopenId,
			isShare:id&&parentWxopenId
		},()=>{
			
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
				},3000)	
			}
			
		});

		obserable.on('removeParentInfo',()=>{

			this.setState({
				id:'',
				parentWxopenId:'',
				isShare:false
			});
			obserable.trigger({
				type:'toggleContent',
				data:'active'
			});

			this.wxConfig(window.shareInfo.title,window.shareInfo.desc.replace(/{username}/ig,s.state.nickname),s.state.shareImg,s.state.wxappid,s.worksid);
		});

		obserable.on('showShareOpen',()=>{
			this.setState({
				isShare:true
			})
		})

		$.getJSON('./assets/js/data.json',(data)=>{

			this.state.worksid = data.worksid;
			this.state.wxappid = data.wxappid;
			var s = this;
			this.worksid = data.worksid;
			this.wxappid = data.wxappid;
			this.state.wxappsecret = data.wxappsecret;
			this.forceUpdate();

			obserable.trigger({
				type:'loadTY'
			});

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
							
							s.state.showLoading = false;
							
							s.defaultName = dt.userinfo.nickname || data.username || '智媒体';

							localStorage.setItem('nickname',dt.userinfo.nickname );
							localStorage.setItem('headimgurl',dt.userinfo.headimgurl);
							s.openid = dt.userinfo.openid;

							s.nickname = dt.userinfo.nickname;
							s.headimgurl = dt.userinfo.headimgurl;

							s.wxConfig(window.shareInfo.title,window.shareInfo.desc.replace(/{username}/ig,s.nickname),s.state.shareImg,s.state.wxappid,s.worksid);
							

							if( id && parentWxopenId){

								setTimeout(()=>{
									obserable.trigger({
										type:'loadShareData',
										data:{
											id,
											parentWxopenId
										}
									});
								},1000)

							}

							if (wx.posData && wx.posData.longitude) {
								s.getPos(dt.userinfo.nickname, dt.userinfo.headimgurl);
							}

							s.state.myHeadImg = dt.userinfo.headimgurl;
							s.state.nickname = dt.userinfo.nickname;
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

							var redirect_uri =  window.location.href.split('?')[0];
							var symbol = redirect_uri.indexOf('?') > -1 ? '&' : '?';
							if (id && parentWxopenId) {
								redirect_uri = s.changeURLPar(redirect_uri,'id',id);
								redirect_uri = s.changeURLPar(redirect_uri,'wxopenid',parentWxopenId);
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
	

