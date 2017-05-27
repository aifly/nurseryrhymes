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
		if(this.state.imgW>0){
			//bgStyle.marginLeft = - (this.state.imgW - this.viewW) / 2;
		}

		var intrStyle = '';
		if(this.state.isEntry){
			intrStyle = 'active';
		}
		return (
			<div className={'zmiti-index-main-ui lt-full '+ (this.state.animate?'active':'')} style={bgStyle}>
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
		this.setState({
			readTY:true
		});
		setTimeout(()=>{
			this.setState({
				readTY:false
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
		},200)
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

		

		let {IScroll } = this.props;
		this.scroll = new IScroll(this.refs['zmiti-index-introduce-scorll'],{
			scrollbars:true
		});
	}
}
export default PubCom(ZmitiIndexApp);