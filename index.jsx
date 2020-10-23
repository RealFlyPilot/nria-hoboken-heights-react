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
			currIdx: 0,
			previousScrollVal: 0,
			peakScrollVal: 0,
			readyForScroll: 1
		};
		this.lastSlide = this.lastSlide.bind(this);
		this.nextSlide = this.nextSlide.bind(this);


		this.throttleOnScrollStart = _.throttle(this.throttleOnScrollStart.bind(this), 100, {leading:true,trailing:true});
	}
	throttleOnScrollStart(deltaY) {
		if (Math.abs(deltaY) >= 1 && this.state.readyForScroll) {
			if (Math.abs(deltaY) > Math.abs(this.state.previousScrollVal)) {
				const isScrollingDown = deltaY > 0;
				if (isScrollingDown) {
					this.nextSlide();
				} else {
					this.prevSlide();
				}
				this.setState({peakScrollVal: deltaY});
				this.setState({readyForScroll: null});
			}
		}
		else {
			if (Math.abs(this.state.peakScrollVal)/2 >= Math.abs(deltaY)) {
				this.setState({readyForScroll: true});
			}
			else if (Math.abs(deltaY) > Math.abs(this.state.peakScrollVal)) {
				this.setState({peakScrollVal: deltaY});
			}
		}

		this.setState({previousScrollVal: deltaY});
	}

	handleWheelEvent(evt) {
		const deltaY = evt.deltaY;
		this.throttleOnScrollStart(deltaY);
		return;
		const isScrollingDown = deltaY > 0;
		if (isScrollingDown) {
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
		if (this.isTransitioning()) {
			return;
		}
		const newIdx = this.state.currIdx + 1;
		if (newIdx >= SLIDES.length) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
	}
	prevSlide() {
		if (this.isTransitioning()) {
			return;
		}
		const newIdx = this.state.currIdx - 1;
		if (newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: -1,
			currIdx: newIdx
		});
	}
	lastSlide() {
		if (this.isTransitioning()) {
			return;
		}
		const newIdx = this.state.slides.length - 1;
		if (newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
	}
	componentDidMount() {
		window.addEventListener('keydown', (event) => {
			if (!event.target.classList.contains('input')) {
				if (event.code == "ArrowUp") this.prevSlide()
				else if (event.code == "ArrowDown") this.nextSlide()
				else if (event.code == "ArrowLeft") this.prevSlide()
				else if (event.code == "ArrowRight") this.nextSlide()
			}
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
	explodeString(string){
		const spans = string.split("").map(function(char, index){
			return <span className='letter cascading-animation' key={index}>{char}</span>;
		})
		return spans;
	}
	render() {
		const $slides = this.state.slides.map((slide, idx) =>
			<Slide goToNextSlide={this.nextSlide} scrollToLastSlide={this.lastSlide} key={idx} obj={slide} isCurrent={idx == this.state.currIdx}></Slide>
		);
		const innerStyle = {
			transform: 'translateY(-' + (this.state.currIdx * 100) + 'vh)'
		};

		const thisSlideState = this.state.slides[this.state.currIdx];
		const addCornerLogo = thisSlideState.addCornerLogo;
		const darkCornerLogo = thisSlideState.addDarkCornerLogo;
		const animateCornerLogoOnStart = thisSlideState.animateCornerLogoOnStart;

		let cornerLogoWrapperClasses = 'corner-logo-wrapper';
		if (darkCornerLogo) {
			cornerLogoWrapperClasses += ' darkMode';
		}
		if (animateCornerLogoOnStart) {
			cornerLogoWrapperClasses += ' animate';
		}
		return (
			<div id="page">
				{addCornerLogo &&
					<div className={cornerLogoWrapperClasses}>
						<div className='text'>
							{this.explodeString('HOBOKEN HEIGHTS')}
							<div className='cascading-animation separator' />
						</div>
						{darkCornerLogo && 
							<img className='corner-logo' src='/assets/images/NIRMA_Logo_Symbol_Black.png' />
						}
						{!darkCornerLogo && 
							<img className='corner-logo' src='/assets/images/NIRMA_Logo_Symbol_White.png' />
						}
						
					</div>
				}
				<MusicPlayer darkMode={darkCornerLogo} goToNextSlide={this.nextSlide} scrollToLastSlide={this.lastSlide} isFirstSlide={this.state.currIdx === 0}></MusicPlayer>
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
