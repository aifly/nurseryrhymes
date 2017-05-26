import React from 'react';
import './css/coursedetail.css';
import IScroll from 'iscroll';
import ZmitiUserHeaderApp  from './header.jsx';
export default class ZmitiCourseDetailApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	workdatatitle:'静夜思',
    	userlist:[
    		
    	]

    }
    this.viewH = document.documentElement.clientHeight;
  }

  render() {
    var className = '';
    if(this.state.mainState === 0){
        className = 'active';
    }
    var headerProps = {
        type:'courseDetail',
        ...this.props
    }
    return (
		<div className={'zmiti-coursedetail-main-ui '+ className}>
			<ZmitiUserHeaderApp {...headerProps}></ZmitiUserHeaderApp>
			<div className='zmiti-coursedetail-title zmiti-text-overflow'>{this.state.workdatatitle}</div>
			<section className='zmiti-courcedetail-scroll' style={{height:this.viewH - 120}} ref='zmiti-courcedetail-scroll'>
				<ul style={{paddingBottom:30}}>
					{this.state.userlist.map((item,i)=>{
						return <li key= {i}>
							<div></div>
							<div>
								<aside>
									<span className='zmiti-courcedetail-date'>{item.posttime}</span>
									<img className='zmiti-headimgurl' src={item.headimgurl||'./assets/images/user/zmiti.jpg'}/>
									<span className={'zmiti-text-overflow zmiti-courcedetail-nickname '+(i===0 ?'zmiti-first-user':'')}>{item.nickname}</span>
									{i===0 && <span className='zmiti-first-author'>创始者</span>}
                                    <img src='./assets/images/user/voice.png' onTouchTap={this.playAudio.bind(this,item.voicemedia_id)}/>
								</aside>								
								<aside>
									<i>{item.score}分</i>
								</aside>								
							</div>
						</li>
					})}
				</ul>
			</section>
		</div>
    );
  }

  playAudio(serverId){
     wx.downloadVoice({
          serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          fail(){
            alert('录音失效');
          },
          success: function (res) {
              var localId = res.localId; // 返回音频的本地ID
              wx.playVoice({
                localId
              });
          }
     })
  }

  componentDidMount() {
      this.scroll = new IScroll(this.refs['zmiti-courcedetail-scroll'],{
            scrollbars:true
      });

      setTimeout(()=>{
        this.scroll.refresh()
      },500)

      let {obserable} = this.props;
      obserable.on('toggleCourseDetail',(data)=>{
            this.setState({
                mainState:data
            })
      });

      obserable.on('fillCourseDetail',(data)=>{
        data.detailist.forEach((item,i)=>{
            item.posttime = item.posttime.substring(5,10) 
        });
        this.setState({
            userlist:data.detailist,
            workdatatitle:data.workdatatitle
        })
      })
  }
}
