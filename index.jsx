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
			readyForScroll: 1,
			browser: ''
		};
		this.lastSlide = this.lastSlide.bind(this);
		this.nextSlide = this.nextSlide.bind(this);


		this.throttleOnScroll = _.throttle(this.throttleOnScroll.bind(this), 100, {leading:true});
		// this.debounceOnScroll = _.throttle(this.debounceOnScroll.bind(this), 3500, {leading: true, trailing:true});

		let browser;
		const user_agent = navigator.userAgent.toLowerCase();

		if (user_agent.indexOf('safari') != -1) {
			if (user_agent.indexOf('chrome') > -1) {
				browser= 'chrome';
			} else {
				browser ='safari';
			}
		}
		else if (user_agent.indexOf('firefox') != -1) {
			browser ='firefox';
		}
		this.state.browser= browser;
	}
	// debounceOnScroll() {
	// 	//very long scrolls last 3.5 seconds, should be safe to zero out the scroll at that point
	// 	//this would create a more responsive experience since a deltaY of 1 would then trigger a slide
	
	// 	this.setState({previousScrollVal: 0});
	// }
	scrollSlide(deltaY){
		const isScrollingDown = deltaY > 0;
		if (isScrollingDown) {
			this.nextSlide();
		} else {
			this.prevSlide();
		}
		
	}
	throttleOnScroll(deltaY) {
		if (Math.abs(deltaY) >= 1 && this.state.readyForScroll) {
			if (Math.abs(deltaY) > Math.abs(this.state.previousScrollVal)) {
				this.scrollSlide(deltaY)
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

	handleScrollEvent(evt) {
		const deltaY = evt.deltaY;
		// this.throttleOnScroll(deltaY);
		// this.debounceOnScroll(deltaY);
		return;
		const isScrollingDown = deltaY > 0;
		if (isScrollingDown) {
			this.nextSlide();
		} else {
			this.prevSlide();
		}
	}
	handleWheelEvent(evt) {
		const deltaY = evt.deltaY;
		if(this.state.browser == 'safari') {
			this.scrollSlide(deltaY)
			
		}
		else {
			this.throttleOnScroll(deltaY);
		}
		// this.debounceOnScroll(deltaY);
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
				<div className="slides_wrapper" onWheel={this.handleWheelEvent.bind(this)} onScroll={this.handleScrollEvent.bind(this)}>
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
