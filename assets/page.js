const SLIDES = [{
	styles: {
		background: "#000",
	},
	video: "/assets/videos/NIRMA_Logo_Motion.mp4",
	isLandingPage: 1,
}, {
	video: "/assets/videos/NIRMA_1_Exterior_High_Cinemagraphic.mp4",
	videoLoop: true,
	addCornerLogo: true,
	centerBottom: "MANHATTAN AVE, 1300<br />COMING SOON",
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
	contactButton: true,
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
