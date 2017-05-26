import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

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
		switch(this.props.theme){
			case "PAPER":
			break;
			case "DANGJIAN":
			var mainStyle = {
					background:"#fff url(./assets/images/bg.png) no-repeat center top / cover "
				}
				var arr = ["A",'B','C',"D"];
			component = <div ref='zmiti-dangjian-reuslt-C' className='zmiti-dangjian-result lt-full' style={mainStyle}>
				<section className='zmiti-dangjian-reuslt-C' style={{paddingBottom:50}}>
					<header className='zmiti-dangjian-header'>
						标准答案
					</header>
					<div className='zmiti-dangjian-q-list-C'>
						{this.props.myAnswer.length>=this.props.question.length && <div className='zmiti-dangjian-reuslt-q-list'>
						{this.props.question.map((item,i)=>{
							return <div key={i} className='zmiti-dangjian-answer-C'>
								<article>
									{item.img && <img src={item.img}/>}	
									<div>{(i+1)+ '、' +item.title}</div>
								</article>
								{item.answer.map((a,k)=>{
									if(a.isRight){
										if(k === this.props.myAnswer[i]){
											return <div key={i+new Date().getTime()+2} className={'zmiti-dangjian-result-a-item right '+(a.isRight?'active':'') }><span>{arr[k]+'、'+a.content}</span></div>		
										}else{
											return <div key={i+new Date().getTime()+100} className={'zmiti-dangjian-result-a-item error ' }><span>{arr[k]+'、'+a.content}</span></div>		
										}
									}									
									return <div key={k} className={'zmiti-dangjian-result-a-item '+(this.props.myAnswer[i] === k ?'active':'') }><span>{arr[k]+'、'+a.content}</span></div>
								})}
							</div>
						})}
						<div onTouchTap={this.backToShare.bind(this)} className={'zmiti-dangjian-back-btn '+(this.state.back?'active':'')}>返回</div>
					</div>}
					</div>
				</section>
			</div>
			break;
		}

		return (
			<div className={'zmiti-result-main-ui lt-full  '+(this.state.showResult?'show':'')}>
				{component}
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