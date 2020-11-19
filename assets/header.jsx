const modules = require('./modules.jsx');

class Header extends React.Component {
	constructor(props) {
		super(props);

	}
	firstSlide(){
		const {scrollToFirstSlide} = this.props;
		scrollToFirstSlide();
	}
	render() {
		const slideHeaderState = this.props.options;
		const fixedHeader = slideHeaderState.fixedHeader;
		const addCornerLogo = slideHeaderState.addCornerLogo;
		if(!addCornerLogo) {
			return(<div></div>);
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
		return (
			<div className={cornerLogoWrapperClasses} onClick={this.firstSlide.bind(this)}>
				<div className='text'>
					{modules.explodeString('HOBOKEN HEIGHTS')}
					<div className='cascading-animation separator' />
				</div>
				{darkCornerLogo && 
					<img className='corner-logo' src='/assets/images/NIRMA_Logo_Symbol_Black.png' />
				}
				{!darkCornerLogo && 
					<img className='corner-logo' src='/assets/images/NIRMA_Logo_Symbol_White.png' />
				}
				
			</div>
		);
	}
}

module.exports = Header;
