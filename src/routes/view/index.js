import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Img from 'react-image';
import { slope, onceTransitionEnd } from './helper';
import history from '~/core/history';
import { setRuntimeVariable } from '~/actions';
import Modal from '~/components/Modal';
import Spin from '~/components/Loading/Spin';
import s from './style.scss';

let isMB = null;
if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
	//移动端
	isMB = true;
} else {
	isMB = false;
}

class View extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sliderData: [],
			direction: 0, // -1上一个，1下一个，0
			sliderNum: 5,
			currectPage: 0,
			resetTimer: false,
			timeStore: this.props.time
		};
		this.Width = window.innerWidth;
		this.Height = window.innerHeight;
		this.tranbox = null;
	}
		
	componentDidMount() {
		const { selected, rootPath } = this.props;
		if (selected.length === 0) {
			history.push(`${rootPath}list`);
		}
		this.updateSliderData(selected);
	}

	// 减时间
	handleMinus = (e) => {
		e.preventDefault();
		const { timeStore } = this.state;
		this.setState({
			timeStore: timeStore > 1 ? timeStore - 1 : 1
		});
	}

	// 加时间
	handlePlus = (e) => {
		e.preventDefault();
		const { timeStore } = this.state;
		this.setState({
			timeStore: timeStore < 60 ? timeStore + 1 : 60
		});
	}

	updateSliderData = (originData) => {
		const { currectPage } = this.state;
		let originDataLength = originData.length;
		let nextPage = currectPage + 1;
		let lastPage = currectPage - 1;

		if (nextPage >= originDataLength) {
			nextPage = 0;
		}

		if (lastPage < 0) {
			lastPage = originDataLength - 1;
		}
		this.setState({ sliderData: [originData[lastPage], originData[currectPage], originData[nextPage]] });

		if (!isMB) {
			this.onKey();
		}
	}

	onTouchStart = (e) => {
		e.preventDefault();
		this.touchX = {
			start: null,
			end: null
		};
		this.touchY = {
			start: null,
			end: null
		};
		this.touchX.start = e.touches[0].screenX;
		this.touchY.start = e.touches[0].screenY;
	}

	onTouchMove = (e) => {
		this.touchX.end = e.touches[0].screenX;
		this.touchY.end = e.touches[0].screenY;
	}

	onTouchEnd = (e) => {
		const rate = slope(this.touchX.end - this.touchX.start, this.touchY.end - this.touchY.start, 30);

		if (rate !== -1) {
			return;
		}
		const { start, end } = this.touchX;
		if (start > end && start - end > 100) {
			this.handleNext(e);
		}
		if (start < end && end - start > 100) {
			this.handleLast();
		}
	}

	handleNext = () => {
		this.setState({
			direction: 1
		}, () => {
			onceTransitionEnd(this.tranbox)
				.then(() => {
					this.handleResetPosition(true);
				});
		});
	}

	handleLast = () => {
		this.setState({
			direction: -1
		}, () => {
			onceTransitionEnd(this.tranbox)
				.then(() => {
					this.handleResetPosition();
				});
		});
	}

	handleResetPosition = (next) => {
		const { currectPage } = this.state;
		const originDataLength = this.props.selected.length;
		let operationPage = currectPage;
		if (next){
			operationPage += 1;
			if (operationPage >= originDataLength) {
				operationPage = 0;
			}
		} else {
			operationPage -= 1;
			if (operationPage < 0) {
				operationPage = originDataLength - 1;
			}
		}

		this.setState({
			direction: 0,
			currectPage: operationPage
		}, () => {
			this.updateSliderData(this.props.selected);
			this.doResetTimer();
		});
	}

	doResetTimer = () => this.setState({
		resetTimer: true
	}, () => {
		this.setState({
			resetTimer: false
		});
	});

	handlePageStyle = () => {
		const { sliderData, direction } = this.state;
		const data = {
			left: Math.floor(sliderData.length/2) * this.Width * -1 - direction * this.Width,
			width: sliderData.length * this.Width
		};
		if (direction !== 0) {
			data['transition'] = 'left 500ms';
			data['-webkit-transition'] = 'left 500ms';
		}
		return data;
	}

	autocontrol = () => {
		this.handleNext();
		this.doResetTimer();
	}
		
	renderContent = () => {
		const { sliderData } = this.state;
		const result = [];
		
		sliderData.forEach((item, index) =>{
			const imageClassData = {};
			if (!item) return;

			const { imgUrl } = item;
			const W = parseInt(imgUrl.split('&')[1], 0);
			const H = parseInt(imgUrl.split('&')[2], 0);
			const WW = window.innerWidth;
			const WH = window.innerHeight;
			const ScaleW = W/H*WH;
			const ScaleH = H/W*WW;

			let Width;
			let Height;
			if (ScaleW >= WW) {
				Width = 'auto';
				Height = ScaleH;
			}

			if (ScaleH >= WH) {
				Width = ScaleW;
				Height = 'auto';
			}


			result.push(<div style={{width: this.Width, height: this.Height, left: index*this.Width}} className={s.page}  key={`${item.mdId}-${index}`}>
				<div className={s.content}>
					<Img
						style={{
							width: Width,
							height: Height
						}}
						className={s.absolute}
						alt={item.imgUrl}
						src={[
							`${this.props.requestPath.imageUrl}/${item.imgUrl}`
						]}
						loader={
							<Spin
								spinBgColor="rgba(0,0,0,0)"
								spinColor="rgba(255,255,255,0.5)"
								spinHeight="3px"
								spinWidth="3px"
							/>
						}
					/>
					<img
						style={{
							width: Width,
							height: Height
						}}
						src={`${this.props.requestPath.imageUrl}/small/${item.imgUrl}`}
					/>
				</div>
			</div>);
		});
		return <div
			ref={el => {this.tranbox = el;}}
			className={s.pages}
			style={this.handlePageStyle()}
			onTouchStart={this.onTouchStart}
			onTouchMove={this.onTouchMove}
			onTouchEnd={this.onTouchEnd}
		>
			{result}
		</div>;
	}

	buildTimer = (value) => {
		let M = Math.floor(value/60);
		let S = Math.floor(value%60);
		if (M < 10) {
			M = `0${M}`;
		}
		if (S < 10) {
			S = `0${S}`;
		}
		return (
			<div>
				<div className={s.count}>{`${M}:${S}`}</div>
			</div>
		);
	}

	renderTimer = () => {
		const { resetTimer } = this.state;
		return (<div className={s.timer} onClick={this.showTimeModal}>{
			!resetTimer && <CountdownCircleTimer
				isPlaying
				durationSeconds={this.props.time * 60}
				trailColor="#333"
				colors={[
					['#666', .33],
					['#666', .9],
					['#FF0000']
				]}
				size={60}
				strokeWidth={4}
				renderTime={this.buildTimer}
				onComplete={this.autocontrol}
			/>
		}</div>);
	}

	renderTag = () => {
		return (
			<div className={s.tag}>
				{`${this.state.currectPage + 1}/${this.props.selected.length}`}
			</div>
		)
	}

	// 显示时间设置
	showTimeModal = (e) => {
		e.preventDefault();
		this.setState({
			timeModal: true
		});
	}

	hideTimeModal = () => {
		this.setState({
			timeModal: false,
			timeStore: this.props.time
		});
	}

	handleTimeModal = () => {
		this.props.setStore({
			time: this.state.timeStore
		});
		this.setState({
			timeModal: false
		}, () => this.doResetTimer());
	}

	goHome = () => history.push(this.props.rootPath);

	onKey = () => window.document.onkeydown = (e) => {	//对整个页面文档监听
		const keyNum = window.event ? e.keyCode :e.which;		//获取被按下的键值
		if (keyNum === 39) {
			this.handleNext();
		}
		if (keyNum === 37) {
			this.handleLast();
		}
	};

	// 去列表页选择图片
	handleList = (e) => {
		e.preventDefault();
		history.push(`${this.props.rootPath}list`);
	}
    

	renderModal = () => {
		return (<Modal
			contentLabel="time"
			isOpen={this.state.timeModal}
			onRequestClose={this.hideTimeModal}
		>
			<h3 className="al-c font-bigger pdt2 pdb2">
						设置速写时间
			</h3>
			<div className={classNames(s.lh3, 'clearfix w9 center pdb3 formBox')}>
				<div className="fl w3 al-r">间隔时间：</div>
				<div className="w4-5 fl border">
					<div
						className="fl w3 al-c font-biggest"
						onClick={this.handleMinus}
					>
						<i className="icon_minus" />
					</div>
					<div className="fl w4">
						<input type="text" value={this.state.timeStore} readOnly className="ww al-c" />
					</div>
					<div
						className="fl w3 al-c font-biggest"
						onClick={this.handlePlus}
					>
						<i className="icon_plus" />
					</div>
				</div>
				<div className="fl w2">
							&nbsp;&nbsp;分钟
				</div>
			</div>
			<div className="w9 center pdb1">
				<button className="btngreen font" onClick={this.handleTimeModal}>
							确&nbsp;&nbsp;认
				</button>
			</div>
		</Modal>);
	}

	renderMenu = () => {
		return (<div>
			<div onClick={this.goHome} className={s.backhome}>
				<i className="flaticon-left-arrow-line-symbol" />
			</div>
			<div onClick={this.handleList} className={s.pic}>
				<i className="flaticon-four-rounded-squares-button" />
			</div>
		</div>);
	}
	

	render() {
		return (
			<div className={s.root}>
				{isMB !== true && <div className={s.nav}>
					<i onClick={this.handleLast} className={`${s.navleft} flaticon-back-left-arrow-square-button-outline`} />
					<i onClick={this.handleNext} className={`${s.navright} flaticon-right-arrow-square-button-symbol`} />
				</div>}
				{this.renderMenu()}
				{this.renderContent()}
				{this.renderTimer()}
				{this.renderTag()}
				{this.renderModal()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state || {};
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({ setStore: setRuntimeVariable }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
