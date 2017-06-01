import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

import ZmitiRankingListApp from './ranking/rankinglist.jsx';
import Obserable from './components/public/obserable';
var obserable = new Obserable();

export class App extends Component {
	constructor(props) {
		super(props);


		this.state = {
			 
			isShare:false,
		}

		 
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		 
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
				<ZmitiRankingListApp {...data}></ZmitiRankingListApp>
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
			</div>
		);
	}

	


	getPos(nickname,headimgurl){
	    	var s = this;
	    	return;
	    	
	    	 
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

	 
}

ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
	

