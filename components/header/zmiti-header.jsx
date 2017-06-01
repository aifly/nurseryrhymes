import React, { Component } from 'react';
import {PubCom} from '../public/pub.jsx';
import './css/header.css';
import $ from 'jquery';

class ZmitiHeaderApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			isRefresh:false
		};
	}

	render() {
		return (
			<div className='zmiti-header-main-ui'>
				<header className='zmiti-index-header'>
					<section>
						<section className='zmiti-headimg' onTouchTap={this.showUserCenter.bind(this)}>
							<img src={this.props.headimgurl||'./assets/images/zmiti.jpg'}/>
						</section>
						<section className='zmiti-user-info '>
							<div className='zmiti-text-overflow'>{this.props.nickname||'zmiti'}</div>
							<div><span>积分:{this.props.score||10}</span></div>
							
						</section>
					</section>
					<section>
						{this.props.showRefreshBtn && <div  className='zmiti-reload-poetry'>
													<a href='./ranking.html'>排行榜</a>
												</div>}
					</section>
				</header>
			</div>
		);
	}

	showUserCenter(){
		let {obserable} = this.props;
		obserable.trigger({
			type:'toggleUserCenter',
			data:true
		});
		obserable.trigger({
			type:'toggleUser',
			data:true
		});
		var s = this;
		$.ajax({
			url:'http://api.zmiti.com/v2/weixin/get_userrank/',
			data:{
				wxopenid:s.props.openid
			},
			error(){
				alert('服务器返回错误');
			},
			success(data){
				if(data.getret === 0){
					obserable.trigger({
						type:'setIntegralRank',
						data:{
							integral:data.integral,
							rank:data.rank
						}
					})
				}else{
					alert('getret  : '+ data.getret + ' msg : ' + data.getmsg);	
				}
			}
		})
	}

	refreshPoetry(){
		/*let {obserable} = this.props;
		obserable.trigger({
			type:'refreshPoetry',
			data:{
				type:'poetry',
				isOther:false
			}
		})*/
	}

	componentDidMount() {

	}
}
ZmitiHeaderApp.defaultProps = {
	showRefreshBtn:true
}
export default PubCom(ZmitiHeaderApp);