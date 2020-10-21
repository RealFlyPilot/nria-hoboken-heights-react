(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			audioPlayer: new Audio('./assets/sounds/SOUND-GENERAL_MUSIC.mp3')
		};
	}
	handleClick(evt) {
		this.setState({ isPlaying: !this.state.isPlaying });
	}
	scrollToContactForm() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
	}

	render() {
		let statusText = this.state.isPlaying ? 'ON' : 'OFF';
		if (this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}

		let classes = "musicplayer_container";
		if (this.props.isFirstSlide) {
			classes += " center_layout";
		} else {
			classes += " corner_layout";
		}

		return React.createElement(
			'div',
			{ className: classes },
			React.createElement(
				'div',
				{ className: 'musicplayer centered_content', onClick: this.handleClick.bind(this) },
				React.createElement(
					'div',
					{ className: 'landing_page_sound_player' },
					'SOUND EXPERIENCE',
					React.createElement(SoundExperienceSettings, { isPlaying: this.state.isPlaying })
				)
			),
			React.createElement(
				'div',
				{ className: 'corner_content' },
				React.createElement(
					'div',
					{ className: 'musicplayer', onClick: this.handleClick.bind(this) },
					React.createElement(
						'div',
						null,
						'SOUND',
						React.createElement('br', null),
						statusText
					)
				),
				React.createElement('div', { className: 'separator' }),
				React.createElement(
					'div',
					{ onClick: this.scrollToContactForm.bind(this) },
					'CONTACT'
				)
			)
		);
	}
}
module.exports = MusicPlayer;

class SoundExperienceSettings extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return React.createElement(
			'div',
			{ className: 'settings' },
			React.createElement(
				'span',
				{ className: this.props.isPlaying ? 'selected_option' : '' },
				'YES'
			),
			' ',
			React.createElement('div', { className: 'separator' }),
			' ',
			React.createElement(
				'span',
				{ className: !this.props.isPlaying ? 'selected_option' : '' },
				'NO'
			)
		);
	}
}

},{}],2:[function(require,module,exports){
const SLIDES = [{
	styles: {
		background: "#000"
	},
	video: "/assets/videos/NIRMA_Logo_Motion.mp4",
	isLandingPage: 1
}, {
	video: "/assets/videos/NIRMA_1_Exterior_High_Cinemagraphic.mp4",
	videoLoop: true,
	addCornerLogo: true,
	centerBottom: "MANHATTAN AVE, 1300<br />COMING SOON"
}, {
	styles: {
		backgroundImage: "url(/assets/images/hobokenh1.webp)",
		backgroundSize: "contain",
		fontSize: '15px',
		lineHeight: '21px'
	},
	centerImage: "/assets/images/NIRMA_Logo_White.png",
	centerImageStyles: {
		width: "272px",
		marginBottom: "55px"
	},
	center: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.<br /><br />Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
	centerTextStyles: {
		width: "56vw",
		fontFamily: '"Gotham-Light", sans-serif',
		fontWeight: '300'
	},
	contactButton: true
	// background: "#000"
}, {
	video: "/assets/videos/NIRMA_2_Patio_High_Cinemagraphic.mp4",
	videoLoop: true,
	addCornerLogo: true
}, {
	styles: {
		backgroundColor: "#fff",
		color: "#000"
	},
	center: "Slide 6"
}];

module.exports = SLIDES;

},{}],3:[function(require,module,exports){
class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			styles: this.props.obj.styles
		};
		if (this.state.styles) {
			this.state.styles.backgroundRepeat = "no-repeat";
			this.state.styles.backgroundPosition = "center";
		}
	}
	scrollToContactForm() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
	}
	render() {
		const slideObj = this.props.obj;
		return React.createElement(
			"div",
			{ className: "slide bg000", style: this.state.styles },
			slideObj.video && React.createElement(
				"video",
				{ autoPlay: true, muted: true, loop: slideObj.videoLoop ? true : false, className: "background-video" },
				React.createElement("source", { src: slideObj.video, type: "video/mp4" })
			),
			React.createElement(
				"div",
				{ className: "center", style: slideObj.centerTextStyles },
				slideObj.centerImage && React.createElement("img", { style: slideObj.centerImageStyles, src: slideObj.centerImage }),
				React.createElement("h1", { dangerouslySetInnerHTML: { __html: slideObj.center } }),
				slideObj.contactButton && React.createElement(
					"div",
					{ className: "btn contactButton", onClick: this.scrollToContactForm.bind(this) },
					"CONTACT"
				)
			),
			React.createElement("h1", { className: "centerBottom", dangerouslySetInnerHTML: { __html: slideObj.centerBottom } })
		);
	}
}

module.exports = Slide;

},{}],4:[function(require,module,exports){
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
		this.lastSlide = this.lastSlide.bind(this);
	}
	handleWheelEvent(evt) {
		const isScrollingDown = evt.deltaY > 0;
		if (isScrollingDown) {
			this.nextSlide();
		} else {
			this.prevSlide();
		}
	}
	watchForEventEnd() {
		this.setState({ transitiongState: 0 });
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
	componentDidUpdate() {
		const that = this;
		return;
		this.refs.inner.addEventListener('transitionend', evt => {
			that.setState({
				transitiongState: 0,
				currIdx: this.state.currIdx + delta
			});
		}, false);
	}
	render() {
		const $slides = this.state.slides.map((slide, idx) => React.createElement(Slide, { scrollToLastSlide: this.lastSlide, key: idx, obj: slide }));
		let classes = "slides_wrapper";
		const innerStyle = {
			transform: 'translateY(-' + this.state.currIdx * 100 + 'vh)'
		};

		return React.createElement(
			'div',
			{ id: 'page' },
			this.state.slides[this.state.currIdx].addCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_White.png' }),
			React.createElement(MusicPlayer, { scrollToLastSlide: this.lastSlide, isFirstSlide: this.state.currIdx === 0 }),
			React.createElement(
				'div',
				{ className: 'slides_wrapper', onWheel: this.handleWheelEvent.bind(this) },
				React.createElement(
					'div',
					{
						ref: 'inner',
						className: 'slides_inner',
						style: innerStyle,
						onTransitionEnd: this.watchForEventEnd.bind(this) },
					$slides
				)
			)
		);
	}
}

let domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(SplashPage, null), domContainer);

},{"./assets/musicplayer.jsx":1,"./assets/page.js":2,"./assets/slide.jsx":3}]},{},[4]);
