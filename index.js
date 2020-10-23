(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class ContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
			formSubmitted: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit() {
		console.log('A form was submitted: ');
		console.log(this.state);
		this.setState({
			formSubmitted: true,
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: ''
		});
	}
	resetForm() {
		this.setState({
			formSubmitted: null
		});
	}
	render() {
		let contactFormClasses = 'contactForm';
		if (this.state.formSubmitted) {
			contactFormClasses += ' submitted';
		}

		return React.createElement(
			'form',
			{ className: contactFormClasses },
			React.createElement(
				'div',
				{ className: 'submittedFormOverlay' },
				React.createElement(
					'div',
					{ className: 'text' },
					'THANK YOU!'
				),
				React.createElement(
					'div',
					{ className: 'closeBtn', onClick: this.resetForm },
					'X'
				)
			),
			React.createElement(
				'div',
				{ className: 'headline' },
				'FOR INFORMATION PLEASE FILL THE FORM BELOW'
			),
			React.createElement(
				'div',
				{ className: 'two-input-group' },
				React.createElement(
					'div',
					{ className: 'form-control' },
					React.createElement(
						'label',
						{ className: 'label' },
						'First Name*'
					),
					React.createElement('input', { className: 'input',
						name: 'first_name',
						type: 'text',
						value: this.state.first_name,
						onChange: this.handleInputChange })
				),
				React.createElement(
					'div',
					{ className: 'form-control' },
					React.createElement(
						'label',
						{ className: 'label' },
						'Last Name*'
					),
					React.createElement('input', { className: 'input',
						name: 'last_name',
						type: 'text',
						value: this.state.last_name,
						onChange: this.handleInputChange })
				)
			),
			React.createElement(
				'div',
				{ className: 'form-control' },
				React.createElement(
					'label',
					{ className: 'label' },
					'E-mail*'
				),
				React.createElement('input', { className: 'input',
					name: 'email',
					type: 'text',
					value: this.state.email,
					onChange: this.handleInputChange })
			),
			React.createElement(
				'div',
				{ className: 'form-control' },
				React.createElement(
					'label',
					{ className: 'label' },
					'Mobile Phone Number*'
				),
				React.createElement('input', { className: 'input',
					name: 'mobilephone',
					type: 'text',
					value: this.state.mobilephone,
					onChange: this.handleInputChange })
			),
			React.createElement(
				'div',
				{ className: 'form-control' },
				React.createElement(
					'label',
					{ className: 'label' },
					'How did you hear of us?*'
				),
				React.createElement('input', { className: 'input',
					name: 'how_you_heard',
					type: 'text',
					value: this.state.how_you_heard,
					onChange: this.handleInputChange })
			),
			React.createElement(
				'div',
				{ className: 'form-control' },
				React.createElement(
					'label',
					{ className: 'label' },
					'How may we help you?*'
				),
				React.createElement('textarea', { className: 'input textarea',
					name: 'how_can_we_help',
					type: 'text',
					value: this.state.how_can_we_help,
					onChange: this.handleInputChange })
			),
			React.createElement(
				'div',
				{ className: 'fine-print' },
				'NOTE: By filling out this contact form, I give you my permission to contact me via email, cell phone, or text until I opt out of any such communications.'
			),
			React.createElement('img', { className: 'rightArrow', src: '/assets/images/rightarrow.svg', onClick: this.handleSubmit })
		);
	}
}

module.exports = ContactForm;

},{}],2:[function(require,module,exports){
const ContactForm = require('./contactform.jsx');

class ContactFormSlide extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return React.createElement(
			"div",
			{ className: "contactPageWrapper" },
			React.createElement(ContactForm, null),
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
module.exports = ContactFormSlide;

},{"./contactform.jsx":1}],3:[function(require,module,exports){
class CornerMusicPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	animationHasEnded() {
		const { animationEnded } = this.props;
		animationEnded();
	}

	toggleMusicPlayer() {
		const { togglePlayer } = this.props;
		togglePlayer();
	}

	scrollToBottomSlide() {
		const { scrollToContactFormSlide } = this.props;
		scrollToContactFormSlide();
	}

	render() {
		const statusText = this.props.musicIsPlaying ? 'ON' : 'OFF';
		return React.createElement(
			'div',
			{ className: 'corner_content slideInAnimationWrapper' },
			React.createElement(
				'div',
				{ className: 'musicplayer slideInAnimationElementContainer', onClick: this.toggleMusicPlayer.bind(this) },
				React.createElement(
					'div',
					{ className: 'slideInAnimationElement slideInAnimationElementLeft' },
					'SOUND',
					React.createElement('br', null),
					statusText
				)
			),
			React.createElement('div', { className: 'separator' }),
			React.createElement(
				'div',
				{ className: 'slideInAnimationElementContainer', onClick: this.scrollToBottomSlide.bind(this) },
				React.createElement(
					'div',
					{ className: 'text slideInAnimationElement slideInAnimationElementRight', onAnimationEnd: this.animationHasEnded.bind(this) },
					'CONTACT'
				)
			)
		);
	}
}

module.exports = CornerMusicPlayer;

},{}],4:[function(require,module,exports){
class LandingPageMusicPlayer extends React.Component {
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
		let settingsClasses = 'settings slideInAnimationWrapper';
		let playButtonClasses = 'button play slideInAnimationElementContainer';
		let muteButtonClasses = 'button mute slideInAnimationElementContainer';

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
					{ className: 'text slideInAnimationElement slideInAnimationElementLeft' },
					'YES'
				)
			),
			React.createElement('div', { className: 'separator' }),
			React.createElement(
				'div',
				{ onClick: this.stopMusicPlayer.bind(this), className: muteButtonClasses, onAnimationEnd: this.animationHasEnded.bind(this) },
				React.createElement(
					'div',
					{ className: 'text slideInAnimationElement slideInAnimationElementRight' },
					'NO'
				)
			)
		);
	}
}

module.exports = LandingPageMusicPlayer;

},{}],5:[function(require,module,exports){
const LandingPageMusicPlayer = require('./landingpagemusicplayer.jsx');

const CornerMusicPlayer = require('./cornermusicplayer.jsx');

class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			audioPlayer: new Audio('./assets/sounds/SOUND-GENERAL_MUSIC.mp3'),
			landingPageAnimationFinished: 0,
			cornerMusicPlayerAnimationFinished: 0
		};

		this.musicPlay = this.musicPlay.bind(this);
		this.musicMute = this.musicMute.bind(this);
		this.scrollToNextSlide = this.scrollToNextSlide.bind(this);
		this.scrollToContactForm = this.scrollToContactForm.bind(this);
		this.landingPageAnimationEnded = this.landingPageAnimationEnded.bind(this);
		this.cornerMusicPlayerAnimationEnded = this.cornerMusicPlayerAnimationEnded.bind(this);
		this.handleClick = this.handleClick.bind(this);
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

	landingPageAnimationEnded() {
		this.setState({ landingPageAnimationFinished: 1 });
	}

	cornerMusicPlayerAnimationEnded() {
		this.setState({ cornerMusicPlayerAnimationFinished: 1 });
	}

	render() {

		let classes = "musicplayer_container";
		let landing_page_sound_player_classes = 'landing_page_sound_player';
		let corner_content_wrapper_classes = 'corner_content_wrapper';

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

		if (!this.state.cornerMusicPlayerAnimationFinished) {
			corner_content_wrapper_classes += " animationHasNotRun";
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
					React.createElement(LandingPageMusicPlayer, { animationEnded: this.landingPageAnimationEnded, nextSlide: this.scrollToNextSlide, muteMusic: this.musicMute, playMusic: this.musicPlay, isPlaying: this.state.isPlaying })
				)
			),
			React.createElement(
				'div',
				{ className: corner_content_wrapper_classes },
				React.createElement(CornerMusicPlayer, { animationEnded: this.cornerMusicPlayerAnimationEnded, scrollToContactFormSlide: this.scrollToContactForm, togglePlayer: this.handleClick, musicIsPlaying: this.state.isPlaying })
			)
		);
	}
}

module.exports = MusicPlayer;

},{"./cornermusicplayer.jsx":3,"./landingpagemusicplayer.jsx":4}],6:[function(require,module,exports){
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
		backgroundSize: "cover",
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

},{}],7:[function(require,module,exports){
const ContactFormSlide = require('./contactformslide.jsx');

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

},{"./contactformslide.jsx":2}],8:[function(require,module,exports){
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

		this.throttleOnScrollStart = _.throttle(this.throttleOnScrollStart.bind(this), 100, { leading: true, trailing: true });
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
				this.setState({ peakScrollVal: deltaY });
				this.setState({ readyForScroll: null });
			}
		} else {
			if (Math.abs(this.state.peakScrollVal) / 2 >= Math.abs(deltaY)) {
				this.setState({ readyForScroll: true });
			} else if (Math.abs(deltaY) > Math.abs(this.state.peakScrollVal)) {
				this.setState({ peakScrollVal: deltaY });
			}
		}

		this.setState({ previousScrollVal: deltaY });
	}

	handleWheelEvent(evt) {
		const deltaY = evt.deltaY;
		console.log(deltaY);
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
	componentDidMount() {
		window.addEventListener('keydown', event => {
			if (!event.target.classList.contains('input')) {
				if (event.code == "ArrowUp") this.prevSlide();else if (event.code == "ArrowDown") this.nextSlide();else if (event.code == "ArrowLeft") this.prevSlide();else if (event.code == "ArrowRight") this.nextSlide();
			}
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

},{"./assets/musicplayer.jsx":5,"./assets/page.js":6,"./assets/slide.jsx":7}]},{},[8]);
