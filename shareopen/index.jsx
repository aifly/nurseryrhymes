import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import ZmitiAudioApp from '../components/header/zmiti-audio.jsx';

import ZmitiHeaderApp from '../components/header/zmiti-header.jsx';
import ZmitiKeyboardApp from '../components/keyboard/index.jsx';


class ZmitiShareOpenApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			beginTest:false,
			imgW:0,
			transformY:0,
			isEntry:true,
			score:0,
			headimgurl:'./assets/images/zmiti.jpg',
			nickname:'',
			age:'',
			avgAge:0,
			shareOpenClass:'active'
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
			<div onTouchStart={this.mainTap.bind(this)} className={'zmiti-shareopen-main-ui lt-full ' + this.state.shareOpenClass} style={bgStyle}>
				<ZmitiHeaderApp {...this.props}></ZmitiHeaderApp>
				<div className='zmiti-shareopen-main'>
					<div><img src={this.state.headimgurl}/>{this.state.nickname}在<span>听音识岁--嫩声读童谣</span></div>
					<div>活动中评为 <span>{this.state.avgAge}</span> 岁<img src='./assets/images/bufu.png'/></div>
					<div className=''>请您来判断岁数</div>
					<img className='zmiti-shareopen-img' src='./assets/images/share-person.png'/>

					<section>
						<ZmitiAudioApp text='听听他(她)的声音' className='zmiti-share-audio' {...this.props}></ZmitiAudioApp>
					</section>
				</div>
				<section className='zmiti-share-input-C'>
					<div onTouchStart={()=>{this.setState({showKeyboard:true})}} className='zmiti-share-input'>{this.state.age || '请填写年龄'}</div>
					<div className='zmiti-share-submit' onTouchTap={this.submit.bind(this)}>提交</div>
				</section>
				<div className='zmiti-share-btns'>
					<aside>
						<section onTouchTap={this.readTY.bind(this)} >我也读童谣</section>
					</aside>
					<aside>
						<section onTouchTap={this.guessOthers.bind(this)}>再帮别人来认岁</section>
					</aside>
				</div>
				<ZmitiKeyboardApp show={this.state.showKeyboard} obserable={this.props.obserable}></ZmitiKeyboardApp>
			</div>
		);
	}

	mainTap(e){//zmiti-dangjian-tel-input
		if(e.target.classList.contains('zmiti-share-input') || $(e.target).parents('.zmiti-keyboard-main-ui').size()>0){
			return;
		}
		this.setState({
			showKeyboard:false
		});
	}

	readTY(){
		let {obserable} = this.props;

		obserable.trigger({
			type:'removeParentInfo'
		});
	}

	guessOthers(){
		var s = this;
		var params = {};
		let {obserable} = this.props;
		obserable.trigger({
			type:'toggleLoading',
			data:true
		})
		var id = this.getQueryString('id'),
			parentWxopenId = this.getQueryString('wxopenid');
			
			params = {
				id:id,
				///wxopenid:parentWxopenId,
				//workdataid:s.props.workdataid
			}

			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/get_shicioriginaltext',
				data:params,
				error(){
					
					obserable.trigger({
						type:'toggleLoading',
						data:false
					})
					window.debug && alert('get_shicioriginaltext error')
				},
				success(data){
					if(data.getret === 0){
						if(data.list.length>0){
							s.state.headimgurl = data.list[0].headimgurl;
							s.state.nickname = data.list[0].nickname;
							s.state.userPoetryContent = data.list[0].changetext;
							s.state.poetryContent = data.list[0].originaltext;
							s.state.poetryTitle = data.list[0].workdatatitle;
							s.state.poetryAuthor = data.list[0].author;
							s.state.avgAge = data.list[0].avgvalue;
							s.state.duration = data.list[0].duration;
							s.state.workdataid = data.list[0].workdataid;
							s.state.serverId = data.list[0].voicemedia_id;


							///s.wxConfig(s.state.nickname+'邀请您来读童谣','读童谣',s.props.shareImg,s.props.wxappid);
							
							wx.downloadVoice({
								isShowProgressTips:0, // 默认为1，显示进度提示
								serverId:data.list[0].voicemedia_id,
								fail(){
									window.debug && alert('录音过期。');
								},
								success(res){

									
									obserable.trigger({
										type:"getLocalId",
										data:res.localId
									});
								}
							});

							obserable.trigger({
								type:'toggleLoading',
								data:false
							})

							setTimeout(()=>{
						    	s.state.showPoetryLoading = false;
								s.forceUpdate();
							},500);
							setTimeout(()=>{
								s.wxConfig(s.state.nickname+'邀请您来读童谣','读童谣',s.props.shareImg,s.props.wxappid);
							},2000)
						}
						else{
							window.debug && alert('没有获取到诗词，请刷新重试');
						}
					}else{
						window.debug && alert( data.getmsg )
					}
				}
			})
	}

	submit(){
		let {obserable} = this.props;
		var s = this;
		if(!s.state.age){
			obserable.trigger({
				type:"showToast",
				data:'年龄不能为空'
			});
			return;
		}
		var id = this.getQueryString('id'),
			parentWxopenId = this.getQueryString('wxopenid');
		var serverId = s.state.serverId;

		$.ajax({
			url:'http://api.zmiti.com/v2/weixin/post_shiciresult/',
			type:'post',
			data:{
				worksid:s.props.worksid,
				workdataid:s.props.workdataid,
				wxopenid:s.props.openid,
				parentwxopenid:id,
				id:id,
				mediaid:serverId,
				score:s.state.age,
				duration:s.props.duration||1,
				changetext:'zmiti-tongyao',//s.props.transformResult.replace(/<[^>]+>/g,""),
				usercity:s.props.usercity,
				longitude:s.props.longitude,
				latitude:s.props.latitude,
				wxname:s.state.nickname,
				workdatatitle:s.props.poetryTitle
			},
			error(){
				 alert('post_shiciresult error 接口错误');
			},
			success(data){

				if( data.getret === 0){
					obserable.trigger({
						type:'showToast',
						data:'提交成功'
					})
					var id = data.id;
					/*obserable.trigger({
						type:'updateParentInfo',
						data:{
							id,
							parentWxopenId:s.props.openid
						}
					});*/



					s.wxConfig(s.state.nickname+'邀请您来读童谣','读童谣',s.props.shareImg,s.props.wxappid);

					var integral = 10;
					$.ajax({
						url:'http://api.zmiti.com/v2/weixin/add_wxuser/',
				   		type:'post',
				   		data:{
				   			wxopenid:s.props.openid,
				   			worksid:s.props.worksid,
				   			nickname:s.state.nickname,
				   			headimgurl:s.state.headimgurl,
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
				else{
					obserable.trigger({
						type:'showToast',
						data:'提交失败'
					})
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
 	
 	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid=this.props.worksid){
			var s = this;

		   var durl = location.href.split('#')[0];//+symbol+'id='+this.state.id+'&wxopenid='+ this.props.openid; //window.location;
		   	durl = s.changeURLPar(durl,'id',s.id);
		   	durl = s.changeURLPar(durl,'wxopenid',s.parentWxopenId);

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

	 getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }


	componentDidMount() {
		let {obserable} = this.props;
		obserable.on('modifyTel',(data)=>{
			if(typeof data === 'string'){
				if(data === 'del'){
					this.state.age = this.state.age.substring(0,this.state.age.length-1);	
				}else if(data === 'back'){
					this.state.showKeyboard = false;
				}
			}else{
				this.state.age += data;
			}

			this.state.age = this.state.age.substring(0,2);	
			console.log(this.state.age);

			
			this.forceUpdate()
		});


		var s = this;
		var params = {};
		var id = this.getQueryString('id'),
			parentWxopenId = this.getQueryString('wxopenid');
			this.id = id;
			this.parentWxopenId = parentWxopenId;
			if(!this.state.isOther && id && parentWxopenId){
				params = {
					id:id,
					wxopenid:parentWxopenId,
					workdataid:s.props.workdataid
				}
			}

			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/get_shicioriginaltext',
				data:params,
				error(){
					s.setState({
			    		showPoetryLoading:false
			    	});
					window.debug && alert('get_shicioriginaltext error')
				},
				success(data){
					if(data.getret === 0){
						if(data.list.length>0){
							s.state.headimgurl = data.list[0].headimgurl;
							s.state.nickname = data.list[0].nickname;
							s.state.userPoetryContent = data.list[0].changetext;
							s.state.poetryContent = data.list[0].originaltext;
							s.state.poetryTitle = data.list[0].workdatatitle;
							s.state.poetryAuthor = data.list[0].author;
							s.state.avgAge = data.list[0].avgvalue;
							s.state.duration = data.list[0].duration;
							s.state.workdataid = data.list[0].workdataid;
							s.state.serverId = data.list[0].voicemedia_id;


							///s.wxConfig(s.state.nickname+'邀请您来读童谣','读童谣',s.props.shareImg,s.props.wxappid);
							
							wx.downloadVoice({
								isShowProgressTips:0, // 默认为1，显示进度提示
								serverId:data.list[0].voicemedia_id,
								fail(){
									window.debug && alert('录音过期。');
								},
								success(res){

									
									obserable.trigger({
										type:"getLocalId",
										data:res.localId
									});
								}
							})

							setTimeout(()=>{
						    	s.state.showPoetryLoading = false;
								s.forceUpdate();
							},500);
							setTimeout(()=>{
								s.wxConfig(s.state.nickname+'邀请您来读童谣','读童谣',s.props.shareImg,s.props.wxappid);
							},2000)
						}
						else{
							window.debug && alert('没有获取到诗词，请刷新重试');
						}
					}else{
						window.debug && alert( data.getmsg )
					}
				}
			})
	}
}
export default PubCom(ZmitiShareOpenApp);