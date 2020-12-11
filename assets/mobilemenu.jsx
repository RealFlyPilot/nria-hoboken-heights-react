class MobileMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileMenuOpen: 0
		}
	}

	lastSlide(){
		const {scrollToLastSlide} = this.props;
		scrollToLastSlide();
		this.closeMobileMenu();
	}
	toggleSound(){
		const {toggleMusic} = this.props;
		toggleMusic();
	}

	expandMobileMenu(){
		this.setState({mobileMenuOpen: 1});
	}
	closeMobileMenu(){
		this.setState({mobileMenuOpen: 0});
	}
	render() {
		let mobileMenuClasses = 'mobileMenu';
		let expandedMobileMenuClasses = 'expandedMobileMenu';
		let hamburgerClasses = 'hamburger';
		expandedMobileMenuClasses += this.state.mobileMenuOpen ? ' open' : '';
		hamburgerClasses += this.props.currIdx == 4 ? ' darkMode' : '';

		return (
			<div className={mobileMenuClasses}>
				<div className="hamburgerWrapper">
					<div className={hamburgerClasses} onClick={this.expandMobileMenu.bind(this)}>
						<div className="line"></div>
						<div className="line"></div>
					</div>
				</div>
				<div className={expandedMobileMenuClasses}>
					<div className="menuItemsContainer">
						<div className="text">HOBOKEN HEIGHTS</div>
						<div className="separator"></div>
						<div className="logo">
							<img src="/assets/images/NIRMA_Logo_Symbol_White.png" alt=""/>
						</div>
						<div className="sound" onClick={this.toggleSound.bind(this)}>
							{this.props.isPlaying && 
								<img src="/assets/images/mobile_sound_on.svg" alt=""/>
							}
							{!this.props.isPlaying && 
								<img src="/assets/images/mobile_sound_off.svg" alt=""/>
							}
						</div>
						<div className="contact" onClick={this.lastSlide.bind(this)}>
							<img src="/assets/images/mobile_mail.svg" alt=""/>
						</div>
						<div className="close_btn" onClick={this.closeMobileMenu.bind(this)}>
							<img src="/assets/images/mobile_menu_x.svg" alt=""/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = MobileMenu;
