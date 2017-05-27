import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import ZmitiHeaderApp from '../components/header/zmiti-header.jsx';

class ZmitiResultApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
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
			<div className={'zmiti-result-main-ui lt-full  '+(this.state.showResult?'show':'')} style={mainStyle}>
				<ZmitiHeaderApp {...this.props}></ZmitiHeaderApp>
				<section className='zmiti-result-main' style={{height:this.viewH - 100}}>
					<div className='zmiti-result-ty'>
						<div>
							<img src='./assets/images/age.png'/>
							<div className='zmiti-result-text'>
								<span>{this.props.nickname}</span> ，通过我的分析
							</div>
							<div className='zmiti-result-age'>{this.props.age}</div>
						</div>
					</div>
					<div className='zmiti-result-begin-read-btn'>让朋友猜我的年龄</div>
					<div className='zmiti-result-reset'>重复读一遍</div>
				</section>
			</div>
		);
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
		

		let {obserable} = this.props;

		obserable.on('setResultScroll',()=>{

			let {IScroll} = this.props;
			this.scroll = new IScroll(this.refs['zmiti-dangjian-reuslt-C'],{
				scrollbars:true
			});
			setTimeout(()=>{
				this.scroll.refresh();
			},1000)
		});

	 
		obserable.on('toggleResult',(data)=>{
			if(data){
				obserable.trigger({
					type:'setResultScroll'
				});
			}
			this.setState({
				showResult:data
			})
		})

	}
}
export default PubCom(ZmitiResultApp);