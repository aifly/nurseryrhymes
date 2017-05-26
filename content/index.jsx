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
					<div className='zmiti-content-begin-read-btn'>{this.state.isBeginRead?'结束':'开始读'}</div>
					<div className='zmiti-content-reset'>重新选择</div>
				</section>
			</div>
		);
	}
 
	componentWillMount() {
		
	}

	componentDidMount() {
		
	}
}
export default PubCom(ZmitiContentApp);