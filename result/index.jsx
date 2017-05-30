import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import ZmitiHeaderApp from '../components/header/zmiti-header.jsx';
import ZmitiAudioApp from '../components/header/zmiti-audio.jsx';

class ZmitiResultApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			resultClass:'hideright'
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var component = '';
		
		var mainStyle = {
					background:"#fff url(./assets/images/bg1.jpg) no-repeat center top / cover "
				}
		return (
			<div className={'zmiti-result-main-ui lt-full  '+ this.state.resultClass} style={mainStyle}>
				<ZmitiHeaderApp {...this.props}></ZmitiHeaderApp>
				<section className='zmiti-result-main' style={{height:this.viewH - 100}}>
					<div className='zmiti-result-ty'>
						<div>
							<img src='./assets/images/age.png'/>
							<div className='zmiti-result-text'>
								<span>{this.props.nickname}</span> ，通过我的分析
							</div>
							<div className='zmiti-result-age'>{this.state.age}</div>
							<ZmitiAudioApp {...this.props}></ZmitiAudioApp>
						</div>
					</div>
					<div className='zmiti-result-begin-read-btn' onTouchTap={this.share.bind(this)}>让朋友猜我的年龄</div>
					<div className='zmiti-result-reset' onTouchTap={this.readAgin.bind(this)}>重复读一遍</div>

				</section>
				{this.state.showMask && <div onTouchStart={()=>{this.setState({showMask:false})}} className='zmiti-mask lt-full' style={{background:'url(./assets/images/arron1.png) no-repeat center top / cover'}}></div>}
			</div>
		);
	}

	share(){
		this.setState({
			showMask:true
		})
	}

	readAgin(){
		let {obserable} = this.props;
		obserable.trigger({
			type:'toggleResult',
			data:'hideright'
		});
		obserable.trigger({
			type:'toggleContent',
			data:'active'
		});
	}

	backToShare(){
		let {obserable} = this.props;

		this.setState({
			back:true
		});

		setTimeout(()=>{
			this.setState({
				back:false
			});

			obserable.trigger({
				type:'backToShare'
			})
		},200)
		
	}


	componentDidMount() {
		

		var {obserable,IScroll} = this.props;

		
	 
		obserable.on('toggleResult',(data)=>{
			this.setState({
				resultClass:data
			});
		})

		obserable.on('updateScore',(data)=>{
			
			var age = 40;
				age = Math.random()*data|0;
				age >= 30 && (age = Math.random()*30|0);
				age<=5 && (age = Math.random()*10|0+5);

			this.setState({
				score: data
			},()=>{
				
				
				this.setState({
					age
				});
			});
			obserable.trigger({
				type:'getScale',
				data:data+(Math.random()*4|0+1)
			});

			return age;
			
		});

		


		/*this.scroll = new IScroll(this.refs['zmiti-result-scroll'],{
			scrollbars:true
		});

		setTimeout(()=>{
			this.scroll.refresh();
		},800)*/

	}
}
export default PubCom(ZmitiResultApp);