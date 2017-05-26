import React, { Component } from 'react';
import './assets/css/index.css';
import $ from 'jquery';


import ZmitiUserCenterApp  from './components/usercenter.jsx';
import ZmitiCourseListApp  from './components/courselist.jsx';
import ZmitiCourseDetailApp  from './components/coursedetail.jsx';
import ZmitiGradeApp  from './components/grade.jsx';
import ZmitiRankingListApp  from './components/rankinglist.jsx';

export default class ZmitiUserApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
	}

	render() {


		return (
			<div className={'zmiti-user-main-ui '+(this.state.show?'active':'')}>
				<ZmitiUserCenterApp {...this.props}></ZmitiUserCenterApp>
				<ZmitiCourseListApp {...this.props}></ZmitiCourseListApp>
				<ZmitiCourseDetailApp {...this.props}></ZmitiCourseDetailApp>
				<ZmitiGradeApp {...this.props}></ZmitiGradeApp>
				<ZmitiRankingListApp {...this.props}></ZmitiRankingListApp>
			</div>
		);
	}


	componentDidMount() {
		let {obserable} =  this.props;
		obserable.on('toggleUserCenter',(data)=>{
			this.setState({
				show:data
			});
		});

		
	}
}
