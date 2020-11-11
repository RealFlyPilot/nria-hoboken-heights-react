const SLIDES = [{
	styles: {
		background: "#000",
	},
	video: "/assets/videos/NIRMA_Logo_Motion.mp4",
	videoMobileStartPosition: 'center',
	isLandingPage: 1,
}, {
	video: "/assets/videos/NRIMA_1_Exterior_HIGH_Cinemagraphic.mp4",
	videoLoop: true,
	videoZoomEffect: true,
	videoMobileStartPosition: 'left',
	addCornerLogo: true,
	centerBottom: {
		line1: "MANHATTAN AVE, 1300",
		line2: "COMING SOON",
	},
	hasDownArrow: true,
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
		lineHeight: '21px'
	},
	centerImage: "/assets/images/NIRMA_Logo_White.png",
	centerImageStyles: {
		width: "272px",
		marginBottom: "55px"
	},
	center: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.<br /><br />Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
	centerTextClasses: 'gotham-light',
	centerTextStyles: {
		width: "56vw",
	},
	centerTextStylesMobile: {
		width: "82vw",
	},

	contactButton: true,
	// background: "#000"
}, {
	video: "/assets/videos/NIRMA_2_Patio_High_Cinemagraphic.mp4",
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
		color: "#000"
	},
	// addCornerLogo: true,
	addDarkCornerLogo: true,
	// animateCornerLogoOnStart: true,
	contactFormSlide: true
}];

module.exports = SLIDES;
