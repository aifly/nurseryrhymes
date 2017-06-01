import React from 'react';
import './css/rankinglist.css';
import $ from 'jquery';
export default class ZmitiRankingListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	rankinglist:[
    	
    	],
      sortByRead:false,
      sortByScore:true,
      readDesc:false,
      scoreDesc:false
    };
    this.viewH = document.documentElement.clientHeight;
  }

  render() {

    var className = '';
    if(this.state.mainState === 0){
      className = 'active';
    }
    var headerProps = {
      type:'ranking',
      ...this.props
    }
    return (
      <div className={'zmiti-rankinglist-main-ui active' } >
      	<div className='zmiti-rankinglist-header'>识岁排行榜</div>
        <div className='zmiti-rankinglist-back'><a href='./'>返回</a></div>
        <ul className='zmiti-rankinglist-title'>
          <li>昵称</li>
          <li onTouchTap={this.sortByRead.bind(this)} className={(this.state.sortByRead &&this.state.readDesc ? ' zmiti-read-desc':'') + (this.state.sortByRead && !this.state.readDesc ? ' zmiti-read-asc' :'')}>
            所获年龄
            <span></span>
            <span></span>
          </li>
          <li onTouchTap={this.sortByScore.bind(this)} className={(this.state.sortByScore &&this.state.scoreDesc ? ' zmiti-score-desc':'') + (this.state.sortByScore && !this.state.scoreDesc ? ' zmiti-score-asc':'')}>
            识岁人数
            <span></span>
            <span></span>
          </li>
        </ul>
      	<section className='zmiti-rankinglist-scroll' ref='zmiti-rankinglist-scroll' style={{height:this.viewH - 150}}>
      		<ul style={{paddingBottom:30}}>
      			{this.state.rankinglist.map((item,i)=>{
      				return <li key={i}>
			      				<aside className='zmiti-text-overflow'>
			      					<img src={item.headimgurl||'./assets/images/zmiti.jpg'}/>{item.nickname}
			      				</aside>
			      				<aside>
			      					{item.avgvalue}岁
			      				</aside>
                    <aside>{item.personcount}人</aside>
			      			</li>
      			})}
      		</ul>
      	</section>
      </div>
    );
  }
  sortByScore(){
    this.setState({
      sortByRead:false,
      sortByScore:true,
      scoreDesc:!this.state.scoreDesc
    },()=>{
      if(!this.state.scoreDesc){
        this.state.rankinglist.sort((a,b)=>{
          return a.personcount - b.personcount;
        })  
      }else{
        this.state.rankinglist.sort((a,b)=>{
          return b.personcount - a.personcount;
        })
      }
      this.forceUpdate();
    });
  }
  sortByRead(){
    this.setState({
      sortByRead:true,
      sortByScore:false,
      readDesc:!this.state.readDesc
    },()=>{
      if(!this.state.readDesc){
        this.state.rankinglist.sort((a,b)=>{
          return a.avgvalue - b.avgvalue;
        })  
      }else{
        this.state.rankinglist.sort((a,b)=>{
          return b.avgvalue - a.avgvalue;
        })
      }
      this.forceUpdate();
    })
  }

  componentDidMount() {
    let {IScroll} = this.props;
  	this.scroll = new IScroll(this.refs['zmiti-rankinglist-scroll'],{
  		scrollbars:true
  	});

    var s = this;

    $.ajax({
      url:'http://api.zmiti.com/v2/weixin/get_agerank/',
      data:{
        worksid:'1797800906'
      },
      success(data){
        if(data.getret === 0 ){
          console.log(data)
          s.setState({
            rankinglist:data.list
          },()=>{
            s.scroll.refresh();
            s.sortByScore();
          });
        }
      }
    })
  }
}
