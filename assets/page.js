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
const flypilotFetchWPRestAPI = async (self) => {
	const acf_page_response = await fetch(ENDPOINT);
	const json = await acf_page_response.json();
	const acf_data = json
	flypilotParseData(self, acf_data)
}

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
	const page_data = acf_data[0].acf
	const SLIDES = [{
		styles: {
			background: "#000",
		},
		video: page_data.background_video_hero,
		videoMobileStartPosition: 'center',
		isLandingPage: 1,
		soundTitle: page_data.sound,
		sound_choice_start: page_data.sound_choice,
		sound_choice_stop: page_data.no_choice,
		centerImage: page_data.logo_third,//used to replace video logo on Firefox mobile
		centerImageStyles: {
			width: "272px",
			marginBottom: "55px",
		},
		centerImageStylesMobile: {
			width: "180px",
			marginBottom: "40px"
		},
		centerTextClasses: "mobile-FF-only"
	}, {
		slideClasses: "fullWidthVideo",
		video: page_data.background_video_second,
		videoLoop: true,
		videoZoomEffect: true,
		videoMobileStartPosition: 'left',
		addCornerLogo: true,
		centerBottom: {
			line1: page_data.address,
			line2: page_data.coming_soon_text,
		},
		hasDownArrow: true,
		downArrowImage: page_data.down_arrow,
		soundEffect: "./assets/sounds/SOUND-NIGHT_VIEW.mp3",
		phantomMusicPlayer: true,
		mobileHasDifferentContent: true,
		mobileContent: {
			left: {
				centerBottom: {
					line1: "SWIPE ",
					line1RightArrowBouncing: true,
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					},
				}
			},
			center: {
				centerBottom: {
					line1: page_data.address,
					line2: page_data.coming_soon_text,
				}
			},
		},
		mobileHorizontalVideoSlideEnabled: true
	}, {
		slideClasses: "backgroundFrame",
		styles: {
			fontSize: '15px',
			lineHeight: '21px',
			overflowY: "auto",
			backgroundImage: "url("+page_data.background_image+")"
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
		centerTagline: page_data.tagline_third,
		centerTextClasses: 'gotham-light',
		centerTextStyles: {
			width: "56vw",
		},
		centerTextStylesMobile: {
			width: "82vw",
		},
	
		contactButton: true,
		buttonText: page_data.button_text_third,
		
		// background: "#000"
	}, {
		slideClasses: "fullWidthVideo",
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
					line1: " SWIPE ",
					line1RightArrowBouncing: true,
					line1LeftArrowBouncing: true,
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					},
				}
			},
		},
	}, {
		// slideClasses: "fullWidthVideo",
		// video: page_data.background_video_four,
		// videoLoop: true,
		// videoZoomEffect: true,
		// videoMobileStartPosition: 'center',
		
		styles: {
			background: "rgb(21 22 23)",
			fontSize: '15px',
			lineHeight: '21px',
			overflowY: "auto",
			backgroundImage: "url("+page_data.background_image_fifth_slide+")",
			backgroundSize: 'contain',
			backgroundPosition: 'bottom left',
		},
		enableScrolling: true,
		addCornerLogo: true,
		cornerLogoHideOnLastSlide: true,
		cornerLogofadeIn: true,
		// soundEffect: "./assets/sounds/SOUND-SUNSET_VIEW.mp3",
		// mobileHorizontalVideoSlideEnabled: true,
		mobileHasDifferentContent: true,
		founderHeadline: page_data.headline_fifth,
		founderTagline: page_data.tagline_fifth,
		founderBenefits: page_data.founder_benefits,

		mobileContent: {
			center: {
				centerBottom: {
					line1: " SWIPE ",
					line1RightArrowBouncing: true,
					line1LeftArrowBouncing: true,
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					},
				}
			},
		},
		
	}, {
		styles: {
			backgroundColor: "transparent",
			color: "#000",
			overflow: "auto"
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
		agentPhoneNumber: page_data.agent_phone_number,
		rightsReserved: page_data.rights_reserved,
		buttonText: page_data.button_text_fifth,
		buttonLink: page_data.button_link_fifth,
	}];
	
	self.setState({ slides: SLIDES });
}

module.exports = flypilotFetchWPRestAPI