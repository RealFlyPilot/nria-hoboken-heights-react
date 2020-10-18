'use strict';

const SLIDES = require('./assets/page.js');
const Slide = require('./assets/slide.jsx');
const MusicPlayer = require('./assets/musicplayer.jsx');

class SplashPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: SLIDES,
			transitiongState: 0, // 0 for false -1 for up 1 for down
			currIdx: 0
		};
	}
	handleWheelEvent(evt) {
		const isScrollingDown = evt.deltaY > 0;
		if(isScrollingDown) {
			this.nextSlide();
		} else {
			this.prevSlide();
		}
	}
	watchForEventEnd() {
		this.setState({transitiongState: 0});
	}
	isTransitioning() {
		return this.state.transitiongState != 0;
	}
	nextSlide() {
		if(this.isTransitioning()) {
			return;
		}
		const newIdx = this.state.currIdx + 1;
		if(newIdx >= SLIDES.length) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
	}
	prevSlide() {
		if(this.isTransitioning()) {
			return;
		}
		const newIdx = this.state.currIdx - 1;
		if(newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: -1,
			currIdx: newIdx
		});
	}
	componentDidUpdate() {
		const that = this;
		return;
		this.refs.inner.addEventListener('transitionend', (evt) => {
			that.setState({
				transitiongState: 0,
				currIdx: (this.state.currIdx + delta)
			});
		}, false);
	}
	render() {
		const $slides = this.state.slides.map((slide, idx) =>
			<Slide key={idx} obj={slide}></Slide>
		);
		let classes = "slides_wrapper";
		const innerStyle = {
			transform: 'translateY(-' + (this.state.currIdx * 100) + 'vh)'
		};
		return (
			<div id="page">
				<MusicPlayer></MusicPlayer>
				<div className="slides_wrapper" onWheel={this.handleWheelEvent.bind(this)}>
					<div
						ref="inner"
						className="slides_inner"
						style={innerStyle}
						onTransitionEnd={this.watchForEventEnd.bind(this)}>
						{$slides}
					</div>
				</div>
			</div>
		);
	}
}

let domContainer = document.querySelector('#container');
ReactDOM.render(<SplashPage />, domContainer);
