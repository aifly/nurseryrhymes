import React from 'react';
import './css/courselist.css';
import ZmitiUserHeaderApp  from './header.jsx';
import IScroll from 'iscroll';
import $ from 'jquery';
export default class ZmitiCourseListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainState:1,
    	courselist:[
    	
    	]
    };
    this.viewH = document.documentElement.clientHeight;
  }

  render() {
    var className = '';
    if(this.state.mainState === 0){
       className ='active';
    }
    else if(this.state.mainState  === -1){
       className ='hide';
    }

    var headerProps = {
      type:'courselist',
      ...this.props
    }
    return (
      <div className={'zmiti-courselist-main-ui '+ className}>
      	<ZmitiUserHeaderApp {...headerProps}></ZmitiUserHeaderApp>
      	<section className='zmiti-courselist-scroll' ref='zmiti-courselist-scroll' style={{height:this.viewH - 120}}>
      		<ul style={{paddingBottom:30}}>
      			{this.state.courselist.map((item,i)=>{
      				return <li key={i} onTouchTap={this.entryDetail.bind(this,item.workdataid,item.workdatatitle)}>
                        <a href="javascript:void(0)"></a>
    			      				<aside className='zmiti-text-overflow'>
    			      					《{item.workdatatitle}》
    			      				</aside>
    			      				<aside>
    			      					<i>{item.num}人已读</i>
    			      				</aside>
			      			</li>
      			})}
      		</ul>
      	</section>
      </div>
    );
  }

  entryDetail(workdataid,workdatatitle){
    let {obserable } = this.props;
    obserable.trigger({
      type:'toggleCourseList',
      data:-1
    });
    obserable.trigger({
      type:'toggleCourseDetail',
      data:0
    })
    var s = this;
    $.ajax({
      url:'http://api.zmiti.com/v2/weixin/get_shicidetail/',
      data:{
        workdataid,
        worksid:s.props.worksid
      },
      success(data){
        if(data.getret === 0){
          obserable.trigger({
            type:'fillCourseDetail',
            data:{detailist:data.detaillist,workdatatitle}
          })
        }
      }
    })
  }

  componentDidMount() {
  	this.scroll = new IScroll(this.refs['zmiti-courselist-scroll'],{
  		scrollbars:true
  	});

    let {obserable } = this.props;
    obserable.on('toggleCourseList',(data)=>{
        this.setState({
            mainState:data
        });
    });

    obserable.on('fillCourse',data=>{
      this.setState({
        courselist:data
      },()=>{
        this.scroll.refresh();
      })
    })
  }
}
