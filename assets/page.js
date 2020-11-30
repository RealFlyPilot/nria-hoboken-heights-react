const fetchWPRestAPI = async (self) => {
	const acf_page_response = await fetch('https://nriahh.wpengine.com/wp-json/acf/v3/pages/');
	const json = await acf_page_response.json();
	const page_data = json[0].acf
	console.log(page_data)
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
	}, {
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
					line1: "SWIPE <div class='right_arrow_bouncing'></div>",
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					},
				}
			},
			center: {
				centerBottom: {
					line1: "MANHATTAN AVE, 1300",
					line2: "COMING SOON",
				}
			},
		},
		mobileHorizontalVideoSlideEnabled: true
	}, {
		slideClasses: "backgroundFrame",
		styles: {
			fontSize: '15px',
			lineHeight: '21px',
			overflow: "scroll",
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
			marginBottom: "55px"
		},
		centerImageStylesMobile: {
			width: "180px",
			marginBottom: "40px"
		},
		center: page_data.content_third,
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
					},
				}
			},
		},
		
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
		buttonLink: page_data.button_link_fifth,
	}];
	
	self.setState({ slides: SLIDES });
}

module.exports = fetchWPRestAPI