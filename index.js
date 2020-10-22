(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			audioPlayer: new Audio('./assets/sounds/SOUND-GENERAL_MUSIC.mp3'),
			landingPageAnimationFinished: 0
		};

		this.musicPlay = this.musicPlay.bind(this);
		this.musicMute = this.musicMute.bind(this);
		this.scrollToNextSlide = this.scrollToNextSlide.bind(this);
		this.endAnimation = this.endAnimation.bind(this);
	}
	handleClick(evt) {
		this.setState({ isPlaying: !this.state.isPlaying });
	}
	musicPlay(evt) {
		this.setState({ isPlaying: true });
	}
	musicMute(evt) {
		this.setState({ isPlaying: false });
	}
	scrollToContactForm() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
	}

	scrollToNextSlide() {
		const { goToNextSlide } = this.props;
		goToNextSlide();
	}

	endAnimation() {
		this.setState({ landingPageAnimationFinished: 1 });
	}

	render() {
		let statusText = this.state.isPlaying ? 'ON' : 'OFF';
		let classes = "musicplayer_container";
		let landing_page_sound_player_classes = 'landing_page_sound_player';

		if (this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}

		if (this.props.isFirstSlide) {
			classes += " center_layout";
		} else {
			classes += " corner_layout";
		}

		if (this.props.darkMode) {
			classes += " darkMode";
		}

		if (!this.state.landingPageAnimationFinished) {
			landing_page_sound_player_classes += " animationHasNotRun";
		}

		return React.createElement(
			'div',
			{ className: classes },
			React.createElement(
				'div',
				{ className: 'musicplayer centered_content' },
				React.createElement(
					'div',
					{ className: landing_page_sound_player_classes },
					React.createElement(
						'div',
						{ className: 'title' },
						'SOUND EXPERIENCE'
					),
					React.createElement(SoundExperienceSettings, { animationEnded: this.endAnimation, nextSlide: this.scrollToNextSlide, muteMusic: this.musicMute, playMusic: this.musicPlay, isPlaying: this.state.isPlaying })
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

	startMusicPlayer() {
		const { nextSlide } = this.props;
		const { playMusic } = this.props;
		playMusic();
		nextSlide();
	}

	stopMusicPlayer() {
		const { nextSlide } = this.props;
		const { muteMusic } = this.props;
		muteMusic();
		nextSlide();
	}

	animationHasEnded() {
		const { animationEnded } = this.props;
		animationEnded();
	}

	render() {
		let playButtonClasses = 'button play';
		let muteButtonClasses = 'button mute';
		let settingsClasses = 'settings';

		if (this.props.isPlaying) {
			playButtonClasses += " selected_option";
		} else {
			muteButtonClasses += " selected_option";
		}

		return React.createElement(
			'div',
			{ className: settingsClasses },
			React.createElement(
				'div',
				{ className: playButtonClasses, onClick: this.startMusicPlayer.bind(this) },
				React.createElement(
					'div',
					{ className: 'text' },
					'YES'
				)
			),
			React.createElement('div', { className: 'separator' }),
			React.createElement(
				'div',
				{ onClick: this.stopMusicPlayer.bind(this), className: muteButtonClasses, onAnimationEnd: this.animationHasEnded.bind(this) },
				React.createElement(
					'div',
					{ className: 'text' },
					'NO'
				)
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
	centerBottom: {
		line1: "MANHATTAN AVE, 1300",
		line2: "COMING SOON"
	},
	hasDownArrow: true
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
	addCornerLogo: true,
	addDarkCornerLogo: true,
	animateCornerLogoOnStart: true,
	contactFormSlide: true
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

	scrollToNextSlide() {
		const { goToNextSlide } = this.props;
		goToNextSlide();
	}

	render() {
		const slideObj = this.props.obj;
		let slideClasses = "slide bg000";
		const isCurrent = this.props.isCurrent;

		if (isCurrent) slideClasses += " runAnimations";

		return React.createElement(
			"div",
			{ className: slideClasses, style: this.state.styles },
			slideObj.video && React.createElement(
				"video",
				{ autoPlay: true, muted: true, loop: slideObj.videoLoop ? true : false, className: "background-video" },
				React.createElement("source", { src: slideObj.video, type: "video/mp4" })
			),
			slideObj.contactFormSlide && React.createElement(ContactFormSlide, null),
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
			React.createElement(
				"div",
				{ className: "centerBottom" },
				slideObj.centerBottom && slideObj.centerBottom.line1 && React.createElement("h1", { dangerouslySetInnerHTML: { __html: slideObj.centerBottom.line1 } }),
				slideObj.centerBottom && slideObj.centerBottom.line2 && React.createElement("h1", { dangerouslySetInnerHTML: { __html: slideObj.centerBottom.line2 } }),
				slideObj.hasDownArrow && React.createElement("img", { onClick: this.scrollToNextSlide.bind(this), className: "downArrow", src: "/assets/images/downarrow.svg" })
			)
		);
	}
}

module.exports = Slide;

class ContactFormSlide extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return React.createElement(
			"div",
			{ className: "contactPageWrapper" },
			React.createElement(
				"div",
				{ className: "contactForm" },
				React.createElement(
					"div",
					{ className: "headline" },
					"FOR INFORMATION PLEASE FILL THE FORM BELOW"
				),
				React.createElement(
					"div",
					{ className: "two-input-group" },
					React.createElement(
						"div",
						{ className: "form-control" },
						React.createElement(
							"label",
							{ className: "label" },
							"First Name*"
						),
						React.createElement("input", { className: "input" })
					),
					React.createElement(
						"div",
						{ className: "form-control" },
						React.createElement(
							"label",
							{ className: "label" },
							"Last Name*"
						),
						React.createElement("input", { className: "input" })
					)
				),
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						{ className: "label" },
						"E-mail*"
					),
					React.createElement("input", { className: "input" })
				),
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						{ className: "label" },
						"Mobile Phone Number*"
					),
					React.createElement("input", { className: "input" })
				),
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						{ className: "label" },
						"How did you hear of us?*"
					),
					React.createElement("input", { className: "input" })
				),
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						{ className: "label" },
						"How may we help you?*"
					),
					React.createElement("textarea", { className: "input" })
				),
				React.createElement(
					"div",
					{ className: "fine-print" },
					"NOTE: By filling out this contact form, I give you my permission to contact me via email, cell phone, or text until I opt out of any such communications."
				),
				React.createElement("img", { className: "rightArrow", src: "/assets/images/rightArrow.svg" })
			),
			React.createElement(
				"div",
				{ className: "privacyPolicy" },
				React.createElement(
					"div",
					{ className: "verticalLineContainer" },
					React.createElement("div", { className: "verticalLine" })
				),
				React.createElement("img", { className: "logo", src: "/assets/images/NRLiving.png" }),
				React.createElement(
					"div",
					{ className: "contactInfo" },
					React.createElement(
						"div",
						{ className: "address" },
						"1300 Manhattan Avenue Union City, NJ 07087"
					),
					React.createElement(
						"div",
						{ className: "address" },
						"Manhattan Avenue Capital 1300, LLC"
					),
					React.createElement(
						"div",
						{ className: "phone" },
						"201-400-7487"
					),
					React.createElement(
						"div",
						{ className: "copyright" },
						"\xA9 2020 Hoboken Heights. All rights reserved."
					),
					React.createElement(
						"div",
						{ className: "btn" },
						"PRIVACY POLICY"
					)
				)
			)
		);
	}
}

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
		this.nextSlide = this.nextSlide.bind(this);
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
	explodeString(string) {
		const spans = string.split("").map(function (char, index) {
			return React.createElement(
				'span',
				{ className: 'letter cascading-animation', key: index },
				char
			);
		});
		return spans;
	}
	render() {
		const $slides = this.state.slides.map((slide, idx) => React.createElement(Slide, { goToNextSlide: this.nextSlide, scrollToLastSlide: this.lastSlide, key: idx, obj: slide, isCurrent: idx == this.state.currIdx }));
		const innerStyle = {
			transform: 'translateY(-' + this.state.currIdx * 100 + 'vh)'
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
		return React.createElement(
			'div',
			{ id: 'page' },
			addCornerLogo && React.createElement(
				'div',
				{ className: cornerLogoWrapperClasses },
				React.createElement(
					'div',
					{ className: 'text' },
					this.explodeString('HOBOKEN HEIGHTS'),
					React.createElement('div', { className: 'cascading-animation separator' })
				),
				darkCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_Black.png' }),
				!darkCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_White.png' })
			),
			React.createElement(MusicPlayer, { darkMode: darkCornerLogo, goToNextSlide: this.nextSlide, scrollToLastSlide: this.lastSlide, isFirstSlide: this.state.currIdx === 0 }),
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
