'use strict';

const SLIDES = require('./assets/page.js');
const Slide = require('./assets/slide.jsx');
const MusicPlayer = require('./assets/musicplayer.jsx');
const modules = require('./assets/modules.jsx');
const Header = require('./assets/header.jsx');
const MobileMenu = require('./assets/mobilemenu.jsx');

class SplashPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: SLIDES,
			slidesViewed: [0],
			transitiongState: 0, // 0 for false -1 for up 1 for down
			currIdx: 0,
			previousScrollVal: 0,
			peakScrollVal: 0,
			readyForScroll: 1,
			browser: '',
			operating_sys: '',
			touchState: 0,//0 for end, 1 for start, 2 for move
			touchDirection: null,
			touchStartCoordinate: {
				x: null,
				y: null
			},

			isPlaying: false,
			audioPlayer: new Audio('./assets/sounds/SOUND-GENERAL_MUSIC.mp3'),
			inputFocusOutEvent: null,
			scrollDebouncer: null
		};
		this.lastSlide = this.lastSlide.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);


		this.throttleOnScroll = _.throttle(this.throttleOnScroll.bind(this), 100, {leading:true});
		// this.debounceOnScroll = _.throttle(this.debounceOnScroll.bind(this), 3500, {leading: true, trailing:true});


		this.musicMute = this.musicMute.bind(this);
		this.musicPlay = this.musicPlay.bind(this);
		this.musicToggle = this.musicToggle.bind(this);

	
		/*
		 * Browser wheel event inconsistencies
		 * 
		 * Chrome - outputs many consecutive events that start with deltaY of 1/-1 and can 
		 * go into the hundreds depending on how quickly you tried to scroll. 
		 * Even the smallest consistent scroll can output multiple events of deltaY = 1/-1
		 * A new deltaY event can be created every hundreth of a second. A single scroll can output
		 * hundreds of deltaY events.
		 * 
		 * Safari - usually only outputs a single wheel event whether the scroll is long and slow or big and quick
		 * The deltaY will be 1 or -1. In some cases when the scroll is very quick, deltaY events are created in a manner similar to Chrome
		 * 
		 * Firefox on Mac is similar to Chrome
		 * 
		 * Firefox on Windows is a mix of both Chrome's and Safari's style
		 * With small quick scrolls, only a single event is output
		 * With long slow scrolls, a new deltaY event is created about every second
		 * With quick big scrolls, many events are created from deltaY of 3 to about 30, 
		 * sometimes every few ms, but it doesnt create nearly as many events as Chrome. A single scroll can output
		 * dozens of deltaY events
		 *
		 * Opera scrolls in increments of 100. A normal scroll will execute 20-30 deltaY values of 100. 
		 * A hard scroll executes a strange output. An example would be:
		 * values of 100x6 200x1 100x6 300x1 100x10 all for a single scroll 
		 * 
		*/
		let browser;
		const user_agent = navigator.userAgent.toLowerCase();
		if (user_agent.indexOf('windows') != -1){
			this.state.operating_sys = 'windows';
		}
		else if(navigator.userAgent.indexOf('OPR') != -1 || navigator.userAgent.indexOf('Opera') != -1) {
			this.state.operating_sys = 'opera';
		}
		else if (user_agent.indexOf('android') != -1){
			this.state.operating_sys = 'android';
		}
		else if (user_agent.indexOf('macintosh') != -1){
			this.state.operating_sys = 'macintosh';
		}

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
	componentDidMount() {
		$('.how_you_heard').select2({
			placeholder: "How did you hear of us?*",
			width: 'resolve',
			minimumResultsForSearch: -1
		});

		window.addEventListener('keydown', (event) => {
			if (!event.target.classList.contains('input')) {
				if (event.code == "ArrowUp") this.prevSlide()
				else if (event.code == "ArrowDown") this.nextSlide()
				else if (event.code == "ArrowLeft") this.prevSlide()
				else if (event.code == "ArrowRight") this.nextSlide()
			}
		});

		
		//See handleResize() for details
		if(this.state.operating_sys == 'android') {
			this.timerHandle = null;
			let self = this
			$( ".input" ).focusout(function() {
				self.setState({ inputFocusOutEvent: true });
			})
			window.addEventListener('resize', () => this.handleResize())
		}
	}

	/*
	 * handleResize() is used due to android soft keyboards changing the 
	 * viewport height which causes the page to suddenly shift.
	 * 
	 * The resize event is sometimes triggered twice from a single focusOut
	 * event from the .input element. The resizeTime should be large enough to
	 * last long enough for the second event to occur before the timeout is cleared.
	 * 
	 * The animation stopper will run if a text input is active because it is 
	 * is the reason a keyboard would appear
	 * 
	 * It will also run if a text input has recently had an event of focusout because
	 * we dont want to have animations as the keyboard hides itself
	 */

	handleResize(){
		const resizeTime = 1500; 
		const inputIsActive = $(document.activeElement).attr('type') === 'text';
		if(inputIsActive || this.state.inputFocusOutEvent) {
			this.setState({ inputFocusOutEvent: false });
			document.body.classList.add("resize-animation-stopper");
			clearTimeout(this.timerHandle);
			this.timerHandle = setTimeout(() => {
				document.body.classList.remove("resize-animation-stopper");
			}, resizeTime);
		}
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
	// debounceOnScroll() {
	// 	//very long scrolls last 3.5 seconds, should be safe to zero out the scroll at that point
	// 	//this would create a more responsive experience since a deltaY of 1 would then trigger a slide
	
	// 	this.setState({previousScrollVal: 0});
	// }

	musicMute(evt) {
		this.setState({ isPlaying: false });
	}
	musicPlay(evt) {
		this.setState({ isPlaying: true });
	}
	musicToggle(){
		this.setState({ isPlaying: !this.state.isPlaying })
	}
	scrollSlide(deltaY){
		const isScrollingDown = deltaY > 0;
		if (isScrollingDown) {
			this.nextSlide();
		} else {
			this.prevSlide();
		}
	}

	/*
	 * enableScroll()
	 * Some browsers have the smallest deltaY above 0 at 100 and will never go to 0. This is problematic because
	 * if a single deltaY of 100 is triggered, the first scroll will run, but then after a few moments if a second
	 * deltaY of 100 is triggered, we need a way to enable the scroll feature between the two events to make sure
	 * the second event triggers a scroll.
	 * This can run on browsers that don't have this issue without complication.
	 */
	enableScroll(){
		this.setState({readyForScroll: true,
		previousScrollVal: 0});
	}
	throttleOnScroll(deltaY) {
		if(this.scrollDebouncer != null) {
			clearTimeout(this.scrollDebouncer)

		}
		this.scrollDebouncer=setTimeout(this.enableScroll.bind(this),500);
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
		const browserWithSingleScrollEvent = this.state.browser == 'safari' || (this.state.browser == 'firefox' && this.state.operating_sys != 'macintosh');
		if(browserWithSingleScrollEvent) {
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
		return this.state.transitiongState != 0 || this.state.touchState == 2;
	}
	addIdxToViewedSlides(idx) {
		if(this.state.slidesViewed.includes(idx)) return;

		let slidesViewedArray = this.state.slidesViewed.concat(idx);
		this.setState({ slidesViewed: slidesViewedArray })
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

		this.addIdxToViewedSlides(newIdx);
	}
	prevSlide() {
		if (this.isTransitioning()) {
			return;
		}
		const positionIsNotAtTopOfSlide = document.querySelector('.activeSlide').scrollTop != 0;
		if(positionIsNotAtTopOfSlide) {
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
		this.addIdxToViewedSlides(newIdx);
	}
	lastSlide() {
		const newIdx = this.state.slides.length - 1;
		const alreadyOnLastSlide = this.state.currIdx == newIdx;

		if (this.isTransitioning() || alreadyOnLastSlide) {
			return;
		}
		if (newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
		this.addIdxToViewedSlides(newIdx);
	}

	handleTouchStart(evt){
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const coordinateObj = {
			x: coordinateX,
			y: coordinateY
		}
		this.setState({
			touchState: 1,
			touchStartCoordinate: coordinateObj
		});
		
	}
	handleTouchMove(evt){
		if(this.state.touchState != 1) return;
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const horizontalDirection = this.state.touchStartCoordinate.x > coordinateX ? 'right' : 'left';
		const verticalDirection = this.state.touchStartCoordinate.y > coordinateY ? 'down' : 'up';
		const horizontalDifference = Math.abs(this.state.touchStartCoordinate.x - coordinateX);
		const verticalDifference = Math.abs(this.state.touchStartCoordinate.y - coordinateY);
		
		let mainTouchDirection;
		if(verticalDifference > horizontalDifference) {
			mainTouchDirection = verticalDirection
		}
		else {
			mainTouchDirection = horizontalDirection
		}
		
		this.setState({
			touchState: 2,
			touchDirection: mainTouchDirection
		});
		if(mainTouchDirection == 'up') {
			
		}
		else if(mainTouchDirection == 'down') {
			this.nextSlide();
		}
		switch(mainTouchDirection) {
			case 'up':
				this.prevSlide();
				break;
			case 'down':
				this.nextSlide();
				break;
			case 'left':
				this.slideHorizontal('left');
				break;
			case 'right':
				this.slideHorizontal('right');
				break;
		}
	}
	handleTouchEnd(){
		this.setState({
			touchState: 0
		});
	}
	slideHorizontal(direction){
		const key = this.state.currIdx;
		const mobileHorizontalVideoSlideEnabled = this.state.slides[key].mobileHorizontalVideoSlideEnabled;
		if(!mobileHorizontalVideoSlideEnabled) return

		const videoMobileStartPosition = this.state.slides[key].videoMobileStartPosition
		let newVideoMobileStartPosition
		
		if(direction == 'right') {
			if(videoMobileStartPosition == 'left') newVideoMobileStartPosition = 'center'
			else if(videoMobileStartPosition == 'center') newVideoMobileStartPosition = 'right'
			else return
		}
		else {
			if(videoMobileStartPosition == 'right') newVideoMobileStartPosition = 'center'
			else if(videoMobileStartPosition == 'center') newVideoMobileStartPosition = 'left'
			else return
		}

		const slidesStateCopy = this.state.slides
		slidesStateCopy[key].videoMobileStartPosition = newVideoMobileStartPosition
		this.setState({ slides: slidesStateCopy })
	}
	contactFormSubmitted(){
		this.setState({ formSubmitted: true })
	}
	contactFormCleared(){
		this.setState({ formSubmitted: null })
	}


	render() {		
		if(this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}

		const $slides = this.state.slides.map((slide, idx) =>
			<Slide formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} currIdx={this.state.currIdx} playMusic={this.musicPlay} stopMusic={this.musicMute} slideViewed={this.state.slidesViewed.includes(idx)} goToNextSlide={this.nextSlide} scrollToLastSlide={this.lastSlide} key={idx} obj={slide} isCurrent={idx == this.state.currIdx} isPlaying={this.state.isPlaying}></Slide>
		);
		const innerStyle = {
			transform: 'translateY(-' + (this.state.currIdx * 100) + 'vh)'
		};

		const thisSlideState = this.state.slides[this.state.currIdx];
		const thisSlideSoundEffect = thisSlideState.soundEffect;
		const addCornerLogo = thisSlideState.addCornerLogo;
		const darkCornerLogo = thisSlideState.addDarkCornerLogo;
		const animateCornerLogoOnStart = thisSlideState.animateCornerLogoOnStart;
		const lastSlideIdx = (this.state.slides.length - 1);
		const lastSlideViewed = this.state.slidesViewed.includes(lastSlideIdx);

		
		let headerOptions = {
			addCornerLogo: true,
			addDarkCornerLogo: true,
			fixedHeader: true
		};
		
		if(this.state.currIdx == lastSlideIdx) {
			headerOptions.animateCornerLogoOnStart = true;
		}
		let slides_inner_classes = "slides_inner slide_idx_"+this.state.currIdx;
		
		let pageClasses = this.state.formSubmitted ? 'formSubmitted' : '';
		return (
			<div id="page" className={pageClasses}>
				<div className="submittedFormOverlay mobile-only">
					<div className="text">THANK YOU!</div>
					<div className="closeBtn" onClick={this.contactFormCleared.bind(this)}>
						<img src='/assets/images/form_close_btn.svg' />
					</div>
				</div>
				<div className="slides_wrapper" onTouchStart={this.handleTouchStart.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)} onWheel={this.handleWheelEvent.bind(this)} onScroll={this.handleScrollEvent.bind(this)}>
					<Header options={headerOptions} />
					<div
						ref="inner"
						className={slides_inner_classes}
						style={innerStyle}
						onTransitionEnd={this.watchForEventEnd.bind(this)}>
						{$slides}
					</div>
					<MusicPlayer toggleMusicPlayer={this.musicToggle} soundEffect={thisSlideSoundEffect} darkMode={darkCornerLogo} goToNextSlide={this.nextSlide} scrollToLastSlide={this.lastSlide} isFirstSlide={this.state.currIdx === 0} currIdx={this.state.currIdx} isPlaying={this.state.isPlaying}></MusicPlayer>
					<MobileMenu currIdx={this.state.currIdx} scrollToLastSlide={this.lastSlide} isPlaying={this.state.isPlaying} toggleMusic={this.musicToggle} />
				</div>
			</div>
		);
	}
}

let domContainer = document.querySelector('#container');
ReactDOM.render(<SplashPage />, domContainer);
