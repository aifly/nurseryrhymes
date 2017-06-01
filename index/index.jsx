import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

import ZmitiHeaderApp from '../components/header/zmiti-header.jsx';


class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			beginTest:false,
			imgW:0,
			transformY:0,
			isEntry:false,
			indexClass:'show'
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
		if(this.state.imgW>0){
			//bgStyle.marginLeft = - (this.state.imgW - this.viewW) / 2;
		}

		var intrStyle = '';
		if(this.state.isEntry){
			intrStyle = 'active';
		}
		return (
			<div className={'zmiti-index-main-ui lt-full '+ (this.state.animate?'active ':' ') + this.state.indexClass} style={bgStyle}>
				<section className={'zmiti-index-cover lt-full '+(this.state.isEntry?'hide':'')}>
					<div className={'zmiti-index-bg '}>
						<img src='./assets/images/line.png'/>
					</div>
					<div className='zmiti-index-logo'>
						<img src='./assets/images/logo.png'/>
					</div>
					<div className='zmiti-index-text'>
						<img src='./assets/images/text.png'/>
					</div>
					<div className='zmiti-index-read'>
						<img src='./assets/images/read-ty.png'/>
					</div>

					<div className='zmiti-begin-read'>
						<img className='zmiti-index-person' src='./assets/images/person.png'/>
						<img onTouchTap={this.entryIntr.bind(this)} className= {'zmiti-entry-btn '+(this.state.entryTap?'active':'')} src='./assets/images/entry-btn.png'/>
					</div>
				</section>
				<section className={'zmiti-index-introduce lt-full '+ intrStyle }style={bgStyle}>
					<ZmitiHeaderApp {...this.props}></ZmitiHeaderApp>
					<section className='zmiti-index-introduce-main' style={{height:this.viewH - 100}}>
						<div className='zmiti-index-introduce-blue'>
							
						</div>
						<div className='zmiti-index-introduce-white'  ref='zmiti-index-introduce-scorll'>
							<section className='zmiti-index-introduce-scorll'>
								<header>
									<img src='./assets/images/shuoming.png'/>
								</header>
								{window.intrData.map((item,i)=>{
									return <section key={i}>{item}</section>
								})}
							</section>
						</div>
						<section className='zmiti-index-btn-group'>
							<aside className={this.state.readTY?'active':''} onTouchTap={this.readTY.bind(this)}><img src='./assets/images/read-btn.png'/></aside>
							<aside className={this.state.guessTY?'active':''} onTouchTap={this.guessTY.bind(this)}><img src='./assets/images/guess.png'/></aside>
						</section>
					</section>
				</section>
			</div>
		);
	}
 
	componentWillMount() {
		document.getElementsByTagName('html')[0].style.fontSize = this.viewW / 10 +　'px';
	}

	readTY(){
		let {obserable} = this.props;
		this.setState({
			readTY:true
		});
		setTimeout(()=>{
			this.setState({
				readTY:false,
				indexClass:'hideleft'
			});

			obserable.trigger({
				type:'toggleContent',
				data:'active'
			});

		},200)
	}

	guessTY(){


		this.setState({
			guessTY:true
		});
		setTimeout(()=>{
			this.setState({
				guessTY:false
			});
		},200);


		let {obserable} = this.props;
		obserable.trigger({
			type:'showShareOpen'
		});

		setTimeout(()=>{
			obserable.trigger({
				type:'loadShareData',
				data:{}
			});
		},500)
		
		return;


		var s = this;
		var params = {};
		
		obserable.trigger({
			type:'toggleLoading',
			data:true
		})
	
		params = {
			worksid:s.props.worksid,
			type:2
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
					
						s.state.id = data.list[0].subproductid;
						s.state.parentWxopenId = data.list[0].subproductid;

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

						obserable.trigger({
							type:'showShareOpen'
						});


						setTimeout(()=>{
							obserable.trigger({
								type:'fillShare',
								data:data
							})
						},1500);

						obserable.trigger({
							type:'toggleIndex',
							data:'show'
						});

						setTimeout(()=>{
					    	s.state.showPoetryLoading = false;
							s.forceUpdate();
						},500);
						setTimeout(()=>{
							var url = window.location.href.split('?')[0];
							url = s.changeURLPar('id',s.state.id);
							url = s.changeURLPar('wxopenid',s.state.parentWxopenId);
							s.props.wxConfig(s.props.nickname+'儿童节重返'+s.state.avgAge+'岁',window.shareInfo.desc,s.props.shareImg,s.props.wxappid,url);
						},2000)
					}
					else{
						window.debug && alert('没有获取到诗词，请刷新重试');
					}
				}else{
					obserable.trigger({
						type:'toggleLoading',
						data:false
					})
					window.degub && alert('getret => ' + data.getret + ' getmsg => '+data.getmsg);
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

	entryIntr(){
		this.setState({
			entryTap:true
		});

		setTimeout(()=>{
			this.setState({
				entryTap:false
			})

			setTimeout(()=>{
				this.setState({
					isEntry:true
				})
			},200)
		},200)
	}

	componentDidMount() {
		
		setTimeout(()=>{
			this.setState({
				animate:true,
			})
		},200)

		

		let {obserable } = this.props;

		obserable.on('toggleIndex',(data)=>{
			this.setState({
				indexClass:data
			})
		})
	}
}
export default PubCom(ZmitiIndexApp);