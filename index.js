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
			how_can_we_help: ''
			// formSubmitted: '',
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

		console.log('changed');
	}

	handleSubmit() {
		console.log('A form was submitted: ');
		console.log(this.state);
		this.setState({
			// formSubmitted: true,
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: ''
		});
		const { formSubmitted } = this.props;
		formSubmitted();
	}
	resetForm() {
		// this.setState ({
		// 	formSubmitted: null
		// })
		const { formCleared } = this.props;
		formCleared();
	}

	scrollToTop() {
		const { scrollToFirstSlide } = this.props;
		scrollToFirstSlide();
	}

	componentDidMount() {

		//This is a fix to detect changes on the select2
		jQuery(this.refs.how_you_heard).on("change", e => {
			this.handleInputChange(e);
		});
	}

	render() {
		let contactFormClasses = 'contactForm';
		// if(this.state.formSubmitted){
		// 	contactFormClasses += ' submitted'
		// }
		const select2Styles = {
			width: "100%"
		};
		const slideTopOffset = $('.contactForm').length ? $('.contactForm').closest('.slide').position().top : 0;
		const contactFormTopOffset = $('.contactForm').length ? $('.contactForm').offset().top : 0;
		const cornerLogoTopOffset = $('.corner-logo-wrapper.fixed').offset().top;
		const cornerLogoHeight = $('.corner-logo-wrapper.fixed').height();
		const cornerLogoLeft = $('.corner-logo-wrapper.fixed').position().left;
		const phantomClickableLogoTopOffset = slideTopOffset + cornerLogoTopOffset;

		let phantomClickableLogoHeight = cornerLogoHeight;
		if (contactFormTopOffset <= cornerLogoTopOffset + cornerLogoHeight) {
			phantomClickableLogoHeight = contactFormTopOffset - cornerLogoTopOffset > 0 ? contactFormTopOffset - cornerLogoTopOffset : 0;
		}

		const phantomClickableLogoStyles = {
			position: "fixed",
			top: phantomClickableLogoTopOffset,
			left: cornerLogoLeft,
			width: "400px",
			height: phantomClickableLogoHeight,
			cursor: "pointer"
		};
		const select2Initialized = $('.how_you_heard').hasClass("select2-hidden-accessible");
		if (!select2Initialized) {
			$('.how_you_heard').select2({
				placeholder: "How did you hear of us?*",
				width: 'resolve',
				minimumResultsForSearch: -1
			});
		}
		return React.createElement(
			'form',
			{ className: contactFormClasses },
			React.createElement('div', { onClick: this.scrollToTop.bind(this), className: 'phantomClickableLogo', style: phantomClickableLogoStyles }),
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
					React.createElement('img', { src: '/assets/images/form_close_btn.svg' })
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
						onChange: this.handleInputChange,
						placeholder: 'First Name*' })
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
						onChange: this.handleInputChange,
						placeholder: 'Last Name*' })
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
					onChange: this.handleInputChange,
					placeholder: 'E-mail*' })
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
					onChange: this.handleInputChange,
					placeholder: 'Mobile Phone Number*' })
			),
			React.createElement(
				'div',
				{ className: 'form-control' },
				React.createElement(
					'label',
					{ className: 'label' },
					'How did you hear of us?*'
				),
				React.createElement(
					'select',
					{ style: select2Styles,
						className: 'how_you_heard',
						value: this.state.how_you_heard,
						name: 'how_you_heard',
						onChange: this.handleInputChange,
						ref: 'how_you_heard'
					},
					React.createElement('option', { className: 'emptyOption' }),
					React.createElement(
						'option',
						{ value: 'Google' },
						'Google'
					),
					React.createElement(
						'option',
						{ value: 'Friend' },
						'Friend'
					),
					React.createElement(
						'option',
						{ value: 'Newspaper' },
						'Newspaper'
					)
				)
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
					onChange: this.handleInputChange,
					placeholder: 'How may we help you?*' })
			),
			React.createElement(
				'div',
				{ className: 'fine-print' },
				'NOTE: By filling out this contact form, I give you my permission to contact me via email, cell phone, or text until I opt out of any such communications.'
			),
			React.createElement(
				'div',
				{ className: 'rightArrowContainer' },
				React.createElement('img', { className: 'rightArrow not-mobile', src: '/assets/images/rightarrow.svg', onClick: this.handleSubmit }),
				React.createElement('img', { className: 'logo mobile-only', src: '/assets/images/NRIA_Logo--White.png' }),
				React.createElement(
					'div',
					{ className: 'mobileRightArrowContainer mobile-only', onClick: this.handleSubmit },
					React.createElement(
						'div',
						{ className: 'text gotham-medium' },
						'SEND'
					),
					React.createElement('img', { className: 'rightArrow', src: '/assets/images/mobileSubmitArrow.svg' })
				)
			)
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
	contactFormSubmitted() {
		const { formSubmitted } = this.props;
		formSubmitted();
	}

	contactFormCleared() {
		const { formCleared } = this.props;
		formCleared();
	}

	scrollToTop() {
		const { scrollToFirstSlide } = this.props;
		scrollToFirstSlide();
	}

	render() {
		return React.createElement(
			"div",
			{ className: "contactPageWrapper" },
			React.createElement(ContactForm, { scrollToFirstSlide: this.scrollToTop.bind(this), formCleared: this.contactFormCleared.bind(this), formSubmitted: this.contactFormSubmitted.bind(this) }),
			React.createElement(
				"div",
				{ className: "privacyPolicy not-mobile" },
				React.createElement(
					"div",
					{ className: "verticalLineContainer" },
					React.createElement("div", { className: "verticalLine" })
				),
				React.createElement("img", { className: "logo", src: this.props.slideObj.contactLogo }),
				React.createElement(
					"div",
					{ className: "contactInfo" },
					React.createElement(
						"div",
						{ className: "address" },
						this.props.slideObj.companyAddress
					),
					React.createElement(
						"div",
						{ className: "address" },
						this.props.slideObj.companyName
					),
					React.createElement(
						"div",
						{ className: "address" },
						this.props.slideObj.agentName
					),
					React.createElement(
						"div",
						{ className: "address" },
						this.props.slideObj.agentCompany
					),
					React.createElement(
						"div",
						{ className: "phone" },
						this.props.slideObj.agentPhoneNumber
					),
					React.createElement(
						"div",
						{ className: "copyright" },
						this.props.slideObj.rightsReserved
					),
					React.createElement(
						"div",
						{ className: "btn" },
						this.props.slideObj.buttonText
					)
				)
			),
			React.createElement(
				"div",
				{ className: "mobilePrivacyPolicy mobile-only" },
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
					React.createElement("br", null),
					React.createElement(
						"div",
						{ className: "address" },
						"Richard Stabile"
					),
					React.createElement(
						"div",
						{ className: "address" },
						"RE/MAX Real Estate Limited"
					),
					React.createElement(
						"a",
						{ href: "tel:2014007487" },
						React.createElement(
							"div",
							{ className: "phone" },
							"201-400-7487"
						)
					),
					React.createElement("br", null),
					React.createElement(
						"div",
						{ className: "copyright" },
						"\xA9 2020 Hoboken Heights. All rights reserved."
					),
					React.createElement(
						"a",
						{ href: "#" },
						"Privacy Policy"
					)
				)
			)
		);
	}
}
module.exports = ContactFormSlide;

},{"./contactform.jsx":1}],3:[function(require,module,exports){
const modules = require('./modules.jsx');

class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	firstSlide() {
		const { scrollToFirstSlide } = this.props;
		scrollToFirstSlide();
	}
	render() {
		const slideHeaderState = this.props.options;
		const fixedHeader = slideHeaderState.fixedHeader;
		const addCornerLogo = slideHeaderState.addCornerLogo;
		if (!addCornerLogo) {
			return React.createElement('div', null);
		}
		const darkCornerLogo = slideHeaderState.addDarkCornerLogo;
		const animateCornerLogoOnStart = slideHeaderState.animateCornerLogoOnStart;
		const cornerLogoHideOnLastSlide = slideHeaderState.cornerLogoHideOnLastSlide;
		const cornerLogofadeIn = slideHeaderState.cornerLogofadeIn;

		let cornerLogoWrapperClasses = 'corner-logo-wrapper';
		if (darkCornerLogo) {
			cornerLogoWrapperClasses += ' darkMode';
		}
		if (animateCornerLogoOnStart) {
			cornerLogoWrapperClasses += ' animate';
		}
		if (fixedHeader) {
			cornerLogoWrapperClasses += ' fixed';
		}
		if (cornerLogoHideOnLastSlide) {
			cornerLogoWrapperClasses += ' cornerLogoHideOnLastSlide';
		}
		if (cornerLogofadeIn) {
			cornerLogoWrapperClasses += ' cornerLogofadeIn';
		}
		return React.createElement(
			'div',
			{ className: cornerLogoWrapperClasses, onClick: this.firstSlide.bind(this) },
			React.createElement(
				'div',
				{ className: 'text' },
				modules.explodeString('HOBOKEN HEIGHTS'),
				React.createElement('div', { className: 'cascading-animation separator' })
			),
			darkCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_Black.png' }),
			!darkCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_White.png' })
		);
	}
}

module.exports = Header;

},{"./modules.jsx":6}],4:[function(require,module,exports){
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
					this.props.slideData.sound_choice_start
				)
			),
			React.createElement('div', { className: 'separator' }),
			React.createElement(
				'div',
				{ onClick: this.stopMusicPlayer.bind(this), className: muteButtonClasses, onAnimationEnd: this.animationHasEnded.bind(this) },
				React.createElement(
					'div',
					{ className: 'text slideInAnimationElement slideInAnimationElementRight' },
					this.props.slideData.sound_choice_stop
				)
			)
		);
	}
}

module.exports = LandingPageMusicPlayer;

},{}],5:[function(require,module,exports){
class MobileMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileMenuOpen: 0
		};
	}

	lastSlide() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
		this.closeMobileMenu();
	}
	toggleSound() {
		const { toggleMusic } = this.props;
		toggleMusic();
	}

	expandMobileMenu() {
		this.setState({ mobileMenuOpen: 1 });
	}
	closeMobileMenu() {
		this.setState({ mobileMenuOpen: 0 });
	}
	render() {

		let mobileMenuClasses = 'mobileMenu';
		let expandedMobileMenuClasses = 'expandedMobileMenu';
		let hamburgerClasses = 'hamburger';
		expandedMobileMenuClasses += this.state.mobileMenuOpen ? ' open' : '';
		hamburgerClasses += this.props.currIdx == 4 ? ' darkMode' : '';

		return React.createElement(
			'div',
			{ className: mobileMenuClasses },
			React.createElement(
				'div',
				{ className: 'hamburgerWrapper' },
				React.createElement(
					'div',
					{ className: hamburgerClasses, onClick: this.expandMobileMenu.bind(this) },
					React.createElement('div', { className: 'line' }),
					React.createElement('div', { className: 'line' })
				)
			),
			React.createElement(
				'div',
				{ className: expandedMobileMenuClasses },
				React.createElement(
					'div',
					{ className: 'menuItemsContainer' },
					React.createElement(
						'div',
						{ className: 'text' },
						'HOBOKEN HEIGHTS'
					),
					React.createElement('div', { className: 'separator' }),
					React.createElement(
						'div',
						{ className: 'logo' },
						React.createElement('img', { src: '/assets/images/NIRMA_Logo_Symbol_White.png', alt: '' })
					),
					React.createElement(
						'div',
						{ className: 'sound', onClick: this.toggleSound.bind(this) },
						this.props.isPlaying && React.createElement('img', { src: '/assets/images/mobile_sound_on.svg', alt: '' }),
						!this.props.isPlaying && React.createElement('img', { src: '/assets/images/mobile_sound_off.svg', alt: '' })
					),
					React.createElement(
						'div',
						{ className: 'contact', onClick: this.lastSlide.bind(this) },
						React.createElement('img', { src: '/assets/images/mobile_mail.svg', alt: '' })
					),
					React.createElement(
						'div',
						{ className: 'close_btn', onClick: this.closeMobileMenu.bind(this) },
						React.createElement('img', { src: '/assets/images/mobile_menu_x.svg', alt: '' })
					)
				)
			)
		);
	}
}

module.exports = MobileMenu;

},{}],6:[function(require,module,exports){
const modules = {
	explodeString: function (string) {
		const spans = string.split("").map(function (char, index) {
			return React.createElement(
				"span",
				{ className: "letter cascading-animation", key: index },
				char
			);
		});
		return spans;
	}
};

module.exports = modules;

},{}],7:[function(require,module,exports){
class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cornerMusicPlayerAnimationFinished: 0
		};

		this.scrollToContactForm = this.scrollToContactForm.bind(this);
		this.cornerMusicPlayerAnimationEnded = this.cornerMusicPlayerAnimationEnded.bind(this);
		this.toggleMusic = this.toggleMusic.bind(this);
	}
	toggleMusic() {
		const { toggleMusicPlayer } = this.props;
		toggleMusicPlayer();
	}
	scrollToContactForm() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
	}

	cornerMusicPlayerAnimationEnded() {
		this.setState({ cornerMusicPlayerAnimationFinished: 1 });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currIdx !== this.props.currIdx && this.props.currIdx == 1) {
			this.cornerMusicPlayerAnimationEnded();
		}
	}

	render() {
		let classes = "musicplayer_container";
		let corner_content_wrapper_classes = 'corner_content_wrapper';

		// if(this.props.isFirstSlide) {
		// 	classes += " center_layout";
		// }
		// else {
		// }
		classes += " corner_layout";

		if (this.props.darkMode) {
			classes += " darkMode";
		}

		if (!this.state.cornerMusicPlayerAnimationFinished && this.props.currIdx != 1) {
			corner_content_wrapper_classes += " animationHasNotRun";
		}

		const statusText = this.props.isPlaying ? 'ON' : 'OFF';

		return React.createElement(
			"div",
			{ className: classes },
			React.createElement(
				"div",
				{ className: corner_content_wrapper_classes },
				React.createElement(
					"div",
					{ className: "corner_content slideInAnimationWrapper" },
					React.createElement(
						"div",
						{ className: "button musicplayer slideInAnimationElementContainer", onClick: this.toggleMusic.bind(this) },
						React.createElement(
							"div",
							{ className: "slideInAnimationElement slideInAnimationElementLeft" },
							"SOUND",
							React.createElement("br", null),
							statusText
						)
					),
					React.createElement("div", { className: "separator" }),
					React.createElement(
						"div",
						{ className: "button slideInAnimationElementContainer", onClick: this.scrollToContactForm.bind(this) },
						React.createElement(
							"div",
							{ className: "text slideInAnimationElement slideInAnimationElementRight" },
							"CONTACT"
						)
					)
				)
			)
		);
	}
}

module.exports = MusicPlayer;

},{}],8:[function(require,module,exports){
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * These functions are used to fetch data from Wordpress's Advanced Custom Fields 
 * using the Wordpress REST API to be used with React
 * 
 * These functions require the Wordpress plugin ACF to REST API
 * https://github.com/airesvsg/acf-to-rest-api
 * 
 * Usage:
 * Require this file at the top of the main index.jsx file:
 * const flypilotFetchWPRestAPI = require('./assets/page.js');
 *
 * Within componentDidMount() execute the function:
 * flypilotFetchWPRestAPI(this)
 * 
 * By passing (this) in the above function, we will be able to set states using self
 * in our flypilotFetchWPRestAPI() and flypilotParseData() functions
 * 
 * In the plugin settings you will find information about the request version:
 * https://mywordpresssite.wpengine.com/wp-admin/options-permalink.php#acf-to-rest-api-settings
 * 
 * All the available endpoints are shown in the ACF to REST API github readme
 * 
 * You will need to set the ENDPOINT value to that which you desire.
 * For example:
 * const ENDPOINT = 'https://mysite.wpengine.com/wp-json/acf/v3/pages/';
 * 
 */

const ENDPOINT = 'https://nriahh.wpengine.com/wp-json/acf/v3/pages/';

/* 
 * flypilotFetchWPRestAPI()
 * This will receive the data from the endpoint. The data received should be used within flypilotParseData
 * You should not have to edit this function
 */
const flypilotFetchWPRestAPI = (() => {
	var _ref = _asyncToGenerator(function* (self) {
		const acf_page_response = yield fetch(ENDPOINT);
		const json = yield acf_page_response.json();
		const acf_data = json;
		flypilotParseData(self, acf_data);
	});

	return function flypilotFetchWPRestAPI(_x) {
		return _ref.apply(this, arguments);
	};
})();

/*
 * flypilotParseData()
 * You will need to edit the code within flypilotParseData brackets
 * 
 * The default function is simply:
 * const flypilotParseData = (self, acf_data) => {}
 * 
 * To set states you can use self:
 * self.setState({ myState:  acf_data.myProperty});
 * 
 * The data received will be in the acf_data variable:
 * myValue = acf_data.value
 * 
 */

const flypilotParseData = (self, acf_data) => {
	const page_data = acf_data[0].acf;
	const SLIDES = [{
		styles: {
			background: "#000"
		},
		video: page_data.background_video_hero,
		videoMobileStartPosition: 'center',
		isLandingPage: 1,
		soundTitle: page_data.sound,
		sound_choice_start: page_data.sound_choice,
		sound_choice_stop: page_data.no_choice
	}, {
		video: page_data.background_video_second,
		videoLoop: true,
		videoZoomEffect: true,
		videoMobileStartPosition: 'left',
		addCornerLogo: true,
		centerBottom: {
			line1: page_data.address,
			line2: page_data.coming_soon_text
		},
		hasDownArrow: true,
		downArrowImage: page_data.down_arrow,
		soundEffect: "./assets/sounds/SOUND-NIGHT_VIEW.mp3",
		phantomMusicPlayer: true,
		mobileHasDifferentContent: true,
		mobileContent: {
			left: {
				centerBottom: {
					line1: "SWIPE <div class='right_arrow_bouncing'></div>",
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					}
				}
			},
			center: {
				centerBottom: {
					line1: "MANHATTAN AVE, 1300",
					line2: "COMING SOON"
				}
			}
		},
		mobileHorizontalVideoSlideEnabled: true
	}, {
		slideClasses: "backgroundFrame",
		styles: {
			fontSize: '15px',
			lineHeight: '21px',
			overflow: "scroll",
			backgroundImage: "url(" + page_data.background_image + ")"
		},
		stylesMobile: {
			paddingTop: '63px',
			paddingBottom: '63px',
			alignItems: "flex-start"
		},
		enableScrolling: true,
		centerImage: page_data.logo_third,
		centerImageStyles: {
			width: "272px",
			marginBottom: "55px",
			cursor: "pointer"
		},
		centerImageStylesMobile: {
			width: "180px",
			marginBottom: "40px"
		},
		center: page_data.content_third,
		centerTextClasses: 'gotham-light',
		centerTextStyles: {
			width: "56vw"
		},
		centerTextStylesMobile: {
			width: "82vw"
		},

		contactButton: true,
		buttonText: page_data.button_text_third

		// background: "#000"
	}, {
		video: page_data.background_video_four,
		videoLoop: true,
		videoZoomEffect: true,
		videoMobileStartPosition: 'center',
		addCornerLogo: true,
		cornerLogoHideOnLastSlide: true,
		cornerLogofadeIn: true,
		soundEffect: "./assets/sounds/SOUND-SUNSET_VIEW.mp3",
		mobileHorizontalVideoSlideEnabled: true,
		mobileHasDifferentContent: true,

		mobileContent: {
			center: {
				centerBottom: {
					line1: "<div class='left_arrow_bouncing'></div> SWIPE <div class='right_arrow_bouncing'></div>",
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					}
				}
			}
		}

	}, {
		styles: {
			backgroundColor: "transparent",
			color: "#000",
			overflow: "scroll"
		},
		// addCornerLogo: true,
		addDarkCornerLogo: true,
		// animateCornerLogoOnStart: true,
		contactFormSlide: true,
		enableScrolling: true,
		contactLogo: page_data.contact_logo,
		companyAddress: page_data.company_address,
		companyName: page_data.company_name,
		agentName: page_data.agent_name,
		rightsReserved: page_data.rights_reserved,
		buttonText: page_data.button_text_fifth,
		buttonLink: page_data.button_link_fifth
	}];

	self.setState({ slides: SLIDES });
};

module.exports = flypilotFetchWPRestAPI;

},{}],9:[function(require,module,exports){
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const ContactFormSlide = require('./contactformslide.jsx');
const Header = require('./header.jsx');
const LandingPageMusicPlayer = require('./landingpagemusicplayer.jsx');
const MusicPlayer = require('./musicplayer.jsx');

class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			styles: this.props.obj.styles,
			landingPageAnimationFinished: 0,
			soundEffect: new Audio()
		};
		this.landingPageAnimationEnded = this.landingPageAnimationEnded.bind(this);

		this.musicPlay = this.musicPlay.bind(this);
		this.musicMute = this.musicMute.bind(this);
		this.scrollToNextSlide = this.scrollToNextSlide.bind(this);

		this.state.soundEffect.loop = true;

		if (this.state.styles) {
			this.state.styles.backgroundRepeat = "no-repeat";
		}
	}

	musicMute() {
		const { stopMusic } = this.props;
		stopMusic();
	}

	musicPlay(evt) {
		const { playMusic } = this.props;
		playMusic();
	}

	landingPageAnimationEnded() {
		this.setState({ landingPageAnimationFinished: 1 });
	}

	scrollToContactForm() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
	}
	scrollToTop() {
		const { scrollToFirstSlide } = this.props;
		scrollToFirstSlide();
	}

	scrollToNextSlide() {
		const { goToNextSlide } = this.props;
		goToNextSlide();
	}

	playSoundEffect() {
		const soundEffect = this.props.obj.soundEffect;
		const musicIsPlaying = this.props.isPlaying;
		const isCurrent = this.props.isCurrent;
		if (isCurrent && musicIsPlaying && soundEffect) {
			const updateSoundSource = this.state.soundEffect.src.indexOf(soundEffect.substring(1)) == -1;
			const soundIsPaused = this.state.soundEffect.paused;
			if (updateSoundSource) {
				this.state.soundEffect.src = soundEffect;
			}
			if (soundIsPaused) {
				this.state.soundEffect.play();
			}
		} else this.state.soundEffect.pause();
	}

	contactFormSubmitted() {
		const { formSubmitted } = this.props;
		formSubmitted();
	}

	contactFormCleared() {
		const { formCleared } = this.props;
		formCleared();
	}

	render() {
		this.playSoundEffect();

		const slideObj = this.props.obj;

		let slideClasses = "slide bg000";
		let videoClasses = 'background-video';
		let landing_page_sound_player_classes = 'landing_page_sound_player';
		let centerTextClasses = 'center';
		let centerBottomClasses = "centerBottom";

		const isCurrent = this.props.isCurrent;
		const headerOptions = {
			addCornerLogo: slideObj.addCornerLogo,
			addDarkCornerLogo: slideObj.addDarkCornerLogo,
			animateCornerLogoOnStart: slideObj.animateCornerLogoOnStart,
			cornerLogoHideOnLastSlide: slideObj.cornerLogoHideOnLastSlide,
			cornerLogofadeIn: slideObj.cornerLogofadeIn
		};

		slideClasses += slideObj.slideClasses != undefined ? " " + slideObj.slideClasses : '';
		if (isCurrent) slideClasses += " runAnimations activeSlide";
		if (this.props.slideViewed) slideClasses += " runAnimationOnce";
		if (slideObj.videoZoomEffect) videoClasses += ' videoZoomEffect';
		slideClasses += slideObj.videoMobileStartPosition ? ' mobile-video-position-' + slideObj.videoMobileStartPosition : ' mobile-video-position-left';
		slideClasses += slideObj.contactFormSlide ? ' contactFormSlide' : '';

		// if(!this.state.landingPageAnimationFinished) {
		// 	landing_page_sound_player_classes += " animationHasNotRun";
		// }

		if (slideObj.centerTextClasses) {
			centerTextClasses += ' ' + slideObj.centerTextClasses;
		}

		if (slideObj.mobileHasDifferentContent) {
			centerTextClasses += ' not-mobile';
			centerBottomClasses += ' not-mobile';
		}

		let centerTextStyles;
		let slideStyles;
		if (window.innerWidth > 768) {
			centerTextStyles = slideObj.centerTextStyles;
			slideStyles = this.state.styles;
		} else {
			centerTextStyles = slideObj.centerTextStylesMobile;
			slideStyles = _extends({}, this.state.styles, slideObj.stylesMobile);
		}

		let centerImageStyles;
		if (window.innerWidth > 768) {
			centerImageStyles = slideObj.centerImageStyles;
		} else {
			centerImageStyles = slideObj.centerImageStylesMobile;
		}

		return React.createElement(
			'div',
			{ className: slideClasses, style: slideStyles },
			React.createElement(Header, { options: headerOptions, scrollToFirstSlide: this.scrollToTop.bind(this) }),
			slideObj.phantomMusicPlayer &&
			// This music player should only appear on the second slide to create the visual effect of it sliding down and up with the second slide.
			// The regular music player is fixed in the right top corner
			React.createElement(MusicPlayer, { currIdx: this.props.currIdx, toggleMusicPlayer: this.musicToggle, goToNextSlide: this.scrollToNextSlide, scrollToLastSlide: this.scrollToContactForm, isPlaying: this.props.isPlaying }),
			slideObj.video &&
			//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
			React.createElement('div', {
				className: 'videoContainer',
				dangerouslySetInnerHTML: {
					__html: `
							<video
							class="${videoClasses}"
							${slideObj.videoLoop ? 'loop' : ''}
							muted
							autoplay
							playsinline
							preload="metadata"
							>
							<source src="${slideObj.video}" type="video/mp4" />
							</video>`
				}
			}),
			slideObj.contactFormSlide && React.createElement(ContactFormSlide, { scrollToFirstSlide: this.scrollToTop.bind(this), slideObj: slideObj, formCleared: this.contactFormCleared.bind(this), formSubmitted: this.contactFormSubmitted.bind(this) }),
			React.createElement(
				'div',
				{ className: centerTextClasses, style: centerTextStyles },
				slideObj.centerImage && React.createElement('img', { onClick: this.scrollToTop.bind(this), style: centerImageStyles, src: slideObj.centerImage }),
				React.createElement('h1', { dangerouslySetInnerHTML: { __html: slideObj.center } }),
				slideObj.contactButton && React.createElement(
					'div',
					{ className: 'btn contactButton', onClick: this.scrollToContactForm.bind(this) },
					slideObj.buttonText
				)
			),
			React.createElement(
				'div',
				{ className: centerBottomClasses },
				slideObj.isLandingPage && React.createElement(
					'div',
					{ className: 'musicplayer_container center_layout' },
					React.createElement(
						'div',
						{ className: 'musicplayer centered_content' },
						React.createElement(
							'div',
							{ className: landing_page_sound_player_classes },
							React.createElement(
								'div',
								{ className: 'title' },
								slideObj.soundTitle
							),
							React.createElement(LandingPageMusicPlayer, { slideData: slideObj, animationEnded: this.landingPageAnimationEnded, nextSlide: this.scrollToNextSlide, muteMusic: this.musicMute, playMusic: this.musicPlay, isPlaying: this.props.isPlaying })
						)
					)
				),
				slideObj.centerBottom && slideObj.centerBottom.line1 && React.createElement('h1', { dangerouslySetInnerHTML: { __html: slideObj.centerBottom.line1 } }),
				slideObj.centerBottom && slideObj.centerBottom.line2 && React.createElement('h1', { dangerouslySetInnerHTML: { __html: slideObj.centerBottom.line2 } }),
				slideObj.hasDownArrow && React.createElement('img', { onClick: this.scrollToNextSlide.bind(this), className: 'downArrow', src: slideObj.downArrowImage })
			),
			slideObj.mobileHasDifferentContent && slideObj.mobileContent.left && React.createElement(
				'div',
				{ className: "centerBottom mobile-only mobile-content-left " + (isCurrent && slideObj.videoMobileStartPosition == 'left' ? ' animate' : '') },
				React.createElement('h1', { style: slideObj.mobileContent.left.centerBottom.lineStyles, className: 'line', dangerouslySetInnerHTML: { __html: slideObj.mobileContent.left.centerBottom.line1 } })
			),
			slideObj.mobileHasDifferentContent && slideObj.mobileContent.center && React.createElement(
				'div',
				{ className: "centerBottom mobile-only mobile-content-center " + (isCurrent && slideObj.videoMobileStartPosition == 'center' ? ' animate' : '') },
				React.createElement('h1', { style: slideObj.mobileContent.center.centerBottom.lineStyles, className: 'line', dangerouslySetInnerHTML: { __html: slideObj.mobileContent.center.centerBottom.line1 } }),
				React.createElement('h1', { style: slideObj.mobileContent.center.centerBottom.lineStyles, className: 'line', dangerouslySetInnerHTML: { __html: slideObj.mobileContent.center.centerBottom.line2 } })
			)
		);
	}
}

module.exports = Slide;

},{"./contactformslide.jsx":2,"./header.jsx":3,"./landingpagemusicplayer.jsx":4,"./musicplayer.jsx":7}],10:[function(require,module,exports){
'use strict';

const flypilotFetchWPRestAPI = require('./assets/page.js');
const Slide = require('./assets/slide.jsx');
const MusicPlayer = require('./assets/musicplayer.jsx');
const modules = require('./assets/modules.jsx');
const Header = require('./assets/header.jsx');
const MobileMenu = require('./assets/mobilemenu.jsx');

class SplashPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: [{}],
			slidesViewed: [0],
			transitiongState: 0, // 0 for false -1 for up 1 for down
			currIdx: 0,
			previousScrollVal: 0,
			peakScrollVal: 0,
			readyForScroll: 1,
			browser: '',
			operating_sys: '',
			touchState: 0, //0 for end, 1 for start, 2 for move
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
		this.watchForEventEnd = this.watchForEventEnd.bind(this);
		this.firstSlide = this.firstSlide.bind(this);
		this.lastSlide = this.lastSlide.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);

		this.throttleOnScroll = _.throttle(this.throttleOnScroll.bind(this), 100, { leading: true });
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
		if (user_agent.indexOf('windows') != -1) {
			this.state.operating_sys = 'windows';
		} else if (navigator.userAgent.indexOf('OPR') != -1 || navigator.userAgent.indexOf('Opera') != -1) {
			this.state.operating_sys = 'opera';
		} else if (user_agent.indexOf('android') != -1) {
			this.state.operating_sys = 'android';
		} else if (user_agent.indexOf('macintosh') != -1) {
			this.state.operating_sys = 'macintosh';
		}

		if (user_agent.indexOf('safari') != -1) {
			if (user_agent.indexOf('chrome') > -1) {
				browser = 'chrome';
			} else {
				browser = 'safari';
			}
		} else if (user_agent.indexOf('firefox') != -1) {
			browser = 'firefox';
		}
		this.state.browser = browser;
	}
	componentDidMount() {
		flypilotFetchWPRestAPI(this);

		window.addEventListener('keydown', event => {
			if (!event.target.classList.contains('input')) {
				if (event.code == "ArrowUp") this.prevSlide();else if (event.code == "ArrowDown") this.nextSlide();else if (event.code == "ArrowLeft") this.prevSlide();else if (event.code == "ArrowRight") this.nextSlide();
			}
		});

		//See handleResize() for details
		if (this.state.operating_sys == 'android') {
			this.timerHandle = null;
			let self = this;
			$(".input").focusout(function () {
				self.setState({ inputFocusOutEvent: true });
			});
			window.addEventListener('resize', () => this.handleResize());
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

	handleResize() {
		const resizeTime = 1500;
		const inputIsActive = $(document.activeElement).attr('type') === 'text';
		if (inputIsActive || this.state.inputFocusOutEvent) {
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
		// this.refs.inner.addEventListener('transitionend', (evt) => {
		// 	that.setState({
		// 		transitiongState: 0,
		// 		currIdx: (this.state.currIdx + delta)
		// 	});
		// }, false);
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
	musicToggle() {
		this.setState({ isPlaying: !this.state.isPlaying });
	}
	scrollSlide(deltaY) {
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
	enableScroll() {
		this.setState({
			readyForScroll: true,
			previousScrollVal: 0
		});
		this.scrollDebouncer = null;
	}
	throttleOnScroll(deltaY) {
		if (this.scrollDebouncer != null) {
			clearTimeout(this.scrollDebouncer);
		}
		this.scrollDebouncer = setTimeout(this.enableScroll.bind(this), 500);
		if (Math.abs(deltaY) >= 1 && this.state.readyForScroll) {
			if (Math.abs(deltaY) > Math.abs(this.state.previousScrollVal)) {
				this.scrollSlide(deltaY);
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
	handleScrollEvent(evt) {
		const deltaY = evt.deltaY;
		// this.throttleOnScroll(deltaY);
		// this.debounceOnScroll(deltaY);
		return;
		// const isScrollingDown = deltaY > 0;
		// if (isScrollingDown) {
		// 	this.nextSlide();
		// } else {
		// 	this.prevSlide();
		// }
	}
	handleWheelEvent(evt) {
		const deltaY = evt.deltaY;
		// const browserWithSingleScrollEvent = this.state.browser == 'safari' || (this.state.browser == 'firefox' && this.state.operating_sys != 'macintosh');
		// if(browserWithSingleScrollEvent) {
		// 	this.scrollSlide(deltaY)
		// }
		// else {
		// 	this.throttleOnScroll(deltaY);
		// }
		this.throttleOnScroll(deltaY);
		// this.debounceOnScroll(deltaY);
		return;
		// const isScrollingDown = deltaY > 0;
		// if (isScrollingDown) {
		// 	this.nextSlide();
		// } else {
		// 	this.prevSlide();
		// }
	}
	watchForEventEnd(e) {
		//The onTransitionEnd event triggers many properties and not only for .slides_inner . We only want to run this function for the transform property
		const isSlidesInner = e.target.classList.contains('slides_inner');
		if (!isSlidesInner) {
			return;
		}

		// const transitionProperty = e.propertyName
		// if(transitionProperty != 'transform') return;
		this.setState({ transitiongState: 0 });
	}
	isTransitioning() {
		return this.state.transitiongState != 0 || this.state.touchState == 2;
	}
	addIdxToViewedSlides(idx) {
		if (this.state.slidesViewed.includes(idx)) return;

		let slidesViewedArray = this.state.slidesViewed.concat(idx);
		this.setState({ slidesViewed: slidesViewedArray });
	}

	//animationsStopped is used to prevent animation issues with the android keyboard appearing when dealing with form inputs
	animationsStopped() {
		const isStopped = document.body.classList.contains("resize-animation-stopper");
		return isStopped;
	}
	nextSlide() {
		if (this.isTransitioning() || this.animationsStopped()) {
			return;
		}

		if (this.state.slides[this.state.currIdx].enableScrolling) {
			const scrollBottom = document.querySelector('.activeSlide').scrollHeight - document.querySelector('.activeSlide').offsetHeight - document.querySelector('.activeSlide').scrollTop;
			if (scrollBottom > 0) {
				//scrollBottom can be negative
				return;
			}
		}
		const newIdx = this.state.currIdx + 1;
		if (newIdx >= this.state.slides.length) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});

		this.addIdxToViewedSlides(newIdx);
	}
	prevSlide() {
		if (this.isTransitioning() || this.animationsStopped()) {
			return;
		}
		const positionIsNotAtTopOfSlide = document.querySelector('.activeSlide').scrollTop != 0;
		if (positionIsNotAtTopOfSlide) {
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
	firstSlide() {
		const newIdx = 0;
		const alreadyOnFirstSlide = this.state.currIdx == newIdx;

		if (this.isTransitioning() || alreadyOnFirstSlide) {
			return;
		}
		this.setState({
			transitiongState: 1,
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

	handleTouchStart(evt) {
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const coordinateObj = {
			x: coordinateX,
			y: coordinateY
		};
		this.setState({
			touchState: 1,
			touchStartCoordinate: coordinateObj
		});
	}
	handleTouchMove(evt) {
		if (this.state.touchState != 1) return;
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const horizontalDirection = this.state.touchStartCoordinate.x > coordinateX ? 'right' : 'left';
		const verticalDirection = this.state.touchStartCoordinate.y > coordinateY ? 'down' : 'up';
		const horizontalDifference = Math.abs(this.state.touchStartCoordinate.x - coordinateX);
		const verticalDifference = Math.abs(this.state.touchStartCoordinate.y - coordinateY);

		let mainTouchDirection;
		if (verticalDifference > horizontalDifference) {
			mainTouchDirection = verticalDirection;
		} else {
			mainTouchDirection = horizontalDirection;
		}

		this.setState({
			touchState: 2,
			touchDirection: mainTouchDirection
		});
		if (mainTouchDirection == 'up') {} else if (mainTouchDirection == 'down') {
			this.nextSlide();
		}
		switch (mainTouchDirection) {
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
	handleTouchEnd() {
		this.setState({
			touchState: 0
		});

		jQuery("html, body").animate({ scrollTop: 0 }); //possible fix to hide address bar on iPhone when body is > 100vh
	}
	slideHorizontal(direction) {
		const key = this.state.currIdx;
		const mobileHorizontalVideoSlideEnabled = this.state.slides[key].mobileHorizontalVideoSlideEnabled;
		if (!mobileHorizontalVideoSlideEnabled) return;

		const videoMobileStartPosition = this.state.slides[key].videoMobileStartPosition;
		let newVideoMobileStartPosition;

		if (direction == 'right') {
			if (videoMobileStartPosition == 'left') newVideoMobileStartPosition = 'center';else if (videoMobileStartPosition == 'center') newVideoMobileStartPosition = 'right';else return;
		} else {
			if (videoMobileStartPosition == 'right') newVideoMobileStartPosition = 'center';else if (videoMobileStartPosition == 'center') newVideoMobileStartPosition = 'left';else return;
		}

		const slidesStateCopy = this.state.slides;
		slidesStateCopy[key].videoMobileStartPosition = newVideoMobileStartPosition;
		this.setState({ slides: slidesStateCopy });
	}
	contactFormSubmitted() {
		this.setState({ formSubmitted: true });
	}
	contactFormCleared() {
		this.setState({ formSubmitted: null });
	}

	render() {
		if (this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}

		const $slides = this.state.slides.map((slide, idx) => React.createElement(Slide, { scrollToFirstSlide: this.firstSlide, formCleared: this.contactFormCleared.bind(this), formSubmitted: this.contactFormSubmitted.bind(this), currIdx: this.state.currIdx, playMusic: this.musicPlay, stopMusic: this.musicMute, slideViewed: this.state.slidesViewed.includes(idx), goToNextSlide: this.nextSlide, scrollToLastSlide: this.lastSlide, key: idx, obj: slide, isCurrent: idx == this.state.currIdx, isPlaying: this.state.isPlaying }));
		const innerStyle = {
			transform: 'translateY(-' + this.state.currIdx * 100 + 'vh)'
		};

		const thisSlideState = this.state.slides[this.state.currIdx];
		const thisSlideSoundEffect = thisSlideState.soundEffect;
		const addCornerLogo = thisSlideState.addCornerLogo;
		const darkCornerLogo = thisSlideState.addDarkCornerLogo;
		const animateCornerLogoOnStart = thisSlideState.animateCornerLogoOnStart;
		const lastSlideIdx = this.state.slides.length - 1;
		const lastSlideViewed = this.state.slidesViewed.includes(lastSlideIdx);

		let headerOptions = {
			addCornerLogo: true,
			addDarkCornerLogo: true,
			fixedHeader: true
		};

		if (this.state.currIdx == lastSlideIdx) {
			headerOptions.animateCornerLogoOnStart = true;
		}
		let slides_inner_classes = "slides_inner slide_idx_" + this.state.currIdx;

		let pageClasses = this.state.formSubmitted ? 'formSubmitted' : '';
		return React.createElement(
			'div',
			{ id: 'page', className: pageClasses },
			React.createElement(
				'div',
				{ className: 'submittedFormOverlay mobile-only' },
				React.createElement(
					'div',
					{ className: 'text' },
					'THANK YOU!'
				),
				React.createElement(
					'div',
					{ className: 'closeBtn', onClick: this.contactFormCleared.bind(this) },
					React.createElement('img', { src: '/assets/images/form_close_btn.svg' })
				)
			),
			React.createElement(
				'div',
				{ className: 'slides_wrapper', onTouchStart: this.handleTouchStart.bind(this), onTouchMove: this.handleTouchMove.bind(this), onTouchEnd: this.handleTouchEnd.bind(this), onWheel: this.handleWheelEvent.bind(this), onScroll: this.handleScrollEvent.bind(this) },
				React.createElement(Header, { options: headerOptions, scrollToFirstSlide: this.firstSlide }),
				React.createElement(
					'div',
					{
						ref: 'inner',
						className: slides_inner_classes,
						style: innerStyle,
						onTransitionEnd: e => this.watchForEventEnd(e) },
					$slides
				),
				React.createElement(MusicPlayer, { toggleMusicPlayer: this.musicToggle, soundEffect: thisSlideSoundEffect, darkMode: darkCornerLogo, goToNextSlide: this.nextSlide, scrollToLastSlide: this.lastSlide, isFirstSlide: this.state.currIdx === 0, currIdx: this.state.currIdx, isPlaying: this.state.isPlaying }),
				React.createElement(MobileMenu, { currIdx: this.state.currIdx, scrollToLastSlide: this.lastSlide, isPlaying: this.state.isPlaying, toggleMusic: this.musicToggle })
			)
		);
	}
}

let domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(SplashPage, null), domContainer);

},{"./assets/header.jsx":3,"./assets/mobilemenu.jsx":5,"./assets/modules.jsx":6,"./assets/musicplayer.jsx":7,"./assets/page.js":8,"./assets/slide.jsx":9}]},{},[10]);
