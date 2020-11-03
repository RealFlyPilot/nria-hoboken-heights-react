const modules = require('./modules.jsx');

class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const slideHeaderState = this.props.options;
		const addCornerLogo = slideHeaderState.addCornerLogo;
		if(!addCornerLogo) {
			return(<div></div>);
		}
		const darkCornerLogo = slideHeaderState.addDarkCornerLogo;
		const animateCornerLogoOnStart = slideHeaderState.animateCornerLogoOnStart;

		let cornerLogoWrapperClasses = 'corner-logo-wrapper';
		if (darkCornerLogo) {
			cornerLogoWrapperClasses += ' darkMode';
		}
		if (animateCornerLogoOnStart) {
			cornerLogoWrapperClasses += ' animate';
		}
		return (
			<div className={cornerLogoWrapperClasses}>
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
