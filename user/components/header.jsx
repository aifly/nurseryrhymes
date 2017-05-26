import React, { Component } from 'react';

import './css/header.css';

export  default class ZmitiUserHeaderApp extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {

		var mainStyle = {
			background:'url(./assets/images/user/user-top-bg.png) no-repeat center top '
		}
		return (
			<header className='zmiti-user-header' style={mainStyle} >
				<div onTouchStart={()=>{this.setState({active:true})}} onTouchEnd={()=>{this.setState({active:false})}} className={'zmiti-user-back '+(this.state.active?'active':'')} onTouchTap={this.back.bind(this)}>返回</div>
			</header>
		);
	} 

	back(){
		let {type,obserable} = this.props;
		switch(type){//退回到读诗的页面
			case 'usercenter':
				obserable.trigger({
					type:'toggleUserCenter',
					data:false
				});
				obserable.trigger({
					type:'toggleUser',
					data:false
				});
			break;
			case 'courselist'://打开诗词历程页面
				obserable.trigger({
			  		type:'toggleCourseList',
			  		data:1
			  	});
			  	obserable.trigger({
			  		type:'toggleUserIndex',
			  		data:0
			  	})

			break;
			case 'grade':

			  	obserable.trigger({
			  		type:'toggleUserIndex',
			  		data:0
			  	})
			  	obserable.trigger({
			  		type:'toggleGrade',
			  		data:1
			  	})

			break;
			case 'ranking':
				obserable.trigger({
			  		type:'toggleUserIndex',
			  		data:0
			  	});

			  	obserable.trigger({
			  		type:'toggleRanking',
			  		data:-1
			  	})
			break;
			case "courseDetail":
				 obserable.trigger({
			      type:'toggleCourseList',
			      data:0
			    });
			    obserable.trigger({
			      type:'toggleCourseDetail',
			      data:1
			    })
			break;
		}
	}
}
