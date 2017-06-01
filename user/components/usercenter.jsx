import React from 'react';
import './css/usercenter.css'
import ZmitiUserHeaderApp  from './header.jsx';
import $ from 'jquery';
export default class ZmitiUserCenterApp extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
    	mainState:0,
    	integral:0,
    	rank:1
    }
  }

  render() {
  	var headerProps = {
  		type:'usercenter',
  		...this.props
  	}
  	var className = '';
  	if(this.state.mainState === -1){
  		className= 'hide';
  	}
    return (

      <div className={'zmiti-user-center-main-ui '+className}>
      	<ZmitiUserHeaderApp {...headerProps}></ZmitiUserHeaderApp>
      	<section className='zmiti-user-info'>
			<div className='zmiti-user-headrimg'><img src={this.props.headimgurl|| './assets/images/user/zmiti.jpg'}/></div>
			<div>{this.props.nickname||'zmiti'}</div>
		</section>
		<div className='zmiti-user-line'>
			<img src='./assets/images/user/user-line.png'/>
		</div>
		<section className='zmiti-user-score'>
			<aside>
				<div><img src='./assets/images/user/currency.png'/></div>			
				<div>{this.state.integral}积分</div>
			</aside>
			<aside>
				<div>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div className=''>
					<span>{this.state.rank}</span>名
				</div>
			</aside>
		</section>
		<section className='zmiti-user-list-nav'>
			<div><a href='javascript:void(0)' onTouchTap={this.entryCourse.bind(this)}>童谣的历程</a></div>
			<div><a href='javascript:void(0)' onTouchTap={this.entryGrade.bind(this)}>个人评分排行榜</a></div>
			<div><a href='javascript:void(0)' onTouchTap={this.entryRanking.bind(this)}>童谣排行榜</a></div>
		</section>
      </div>
    );
  }
  entryCourse(){
  	let {obserable} = this.props;
  	
  	obserable.trigger({
  		type:'toggleUserIndex',
  		data:-1
  	})

  	obserable.trigger({
  		type:'toggleCourseList',
  		data:0
  	});


  	var s = this;
  	$.ajax({
  		url:'http://api.zmiti.com/v2/weixin/get_usershiciroute/',
  		data:{
  			wxopenid:s.props.openid,
  			worksid:s.props.worksid
  		},
  		success(data){
  			if(data.getret === 0 ){
    				obserable.trigger({
    					type:'fillCourse',
    					data:data.shicilist
    				});
  			}
  		}
  	})
  }

  entryGrade(){
  	let {obserable} = this.props;
  	
  	obserable.trigger({
  		type:'toggleUserIndex',
  		data:-1
  	})
  	obserable.trigger({
  		type:'toggleGrade',
  		data:0
  	});
  	var s = this;
  	$.ajax({
  		url:'http://api.zmiti.com/v2/weixin/get_userscorerank/',
  		data:{
  			wxopenid:s.props.openid,
  			worksid:s.props.worksid
  		},
  		success(data){
  			if(data.getret === 0 ){
  				obserable.trigger({
  					type:'fillGrade',
  					data:data.userranklist
  				})
  			}
  		}
  	})
  }

  entryRanking(){
  	let {obserable} = this.props;
  	
  	obserable.trigger({
  		type:'toggleUserIndex',
  		data:-1
  	});

  	obserable.trigger({
  		type:'toggleRanking',
  		data:0
  	});

  	var s = this;

  	$.ajax({
  		url:'http://api.zmiti.com/v2/weixin/get_shicirank/',
  		data:{
  			worksid:s.props.worksid
  		},
  		success(data){
  			if(data.getret === 0 ){
  				obserable.trigger({
  					type:'fillPoetryRank',
  					data:data.shicilist
  				});
  			}
  		}

  	})


  }


  componentDidMount() {
  	let {obserable} = this.props;
  	var s = this;
  	obserable.on('toggleUserIndex',(data)=>{
  		this.setState({
	  		mainState:data
	  	});
  	});

  	obserable.on('setIntegralRank',(data)=>{
  		this.setState({
  			integral:data.integral,
  			rank:data.rank
  		})
  	});
  }
}
