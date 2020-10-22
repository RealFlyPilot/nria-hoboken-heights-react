class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			styles: this.props.obj.styles
		}
		if(this.state.styles) {
			this.state.styles.backgroundRepeat = "no-repeat";
			this.state.styles.backgroundPosition = "center";
		}
	}

	scrollToContactForm() {
		const {scrollToLastSlide} = this.props;
		scrollToLastSlide();
	}

	scrollToNextSlide() {
		const {goToNextSlide} = this.props;
		goToNextSlide();
	}

	render() {
		const slideObj = this.props.obj;
		let slideClasses = "slide bg000"
		const isCurrent = this.props.isCurrent;
		
		if(isCurrent) slideClasses += " runAnimations";

		return (
			<div className={slideClasses} style={this.state.styles}>
				{slideObj.video &&
					<video autoPlay muted loop={slideObj.videoLoop ? true : false} className='background-video'>
						<source src={slideObj.video} type="video/mp4" />
					</video>
				}
				{slideObj.contactFormSlide &&
					<ContactFormSlide />
					
				}
				<div className="center" style={slideObj.centerTextStyles}>
					{slideObj.centerImage &&
						<img style={slideObj.centerImageStyles} src={slideObj.centerImage}/>
					}
					<h1 dangerouslySetInnerHTML={{ __html: slideObj.center }} />
					{slideObj.contactButton &&
						<div className='btn contactButton' onClick={this.scrollToContactForm.bind(this)}>CONTACT</div>
					}
				</div>
				<div className="centerBottom">
					{slideObj.centerBottom && slideObj.centerBottom.line1 &&
						<h1  dangerouslySetInnerHTML={{ __html: slideObj.centerBottom.line1 }}></h1>
					}
					{slideObj.centerBottom && slideObj.centerBottom.line2 &&
						<h1 dangerouslySetInnerHTML={{ __html: slideObj.centerBottom.line2 }}></h1>
					}
					{slideObj.hasDownArrow &&
						<img onClick={this.scrollToNextSlide.bind(this)} className='downArrow' src='/assets/images/downarrow.svg' />
					}
				</div>
			</div>
		);
	}
}


module.exports = Slide;


class ContactFormSlide extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div className="contactPageWrapper">
				<div className='contactForm'>
					<div className='headline'>FOR INFORMATION PLEASE FILL THE FORM BELOW</div>
					<div className="two-input-group">
						<div className="form-control">
							<label className="label">First Name*</label>
							<input className="input" />
						</div>
						<div className="form-control">
							<label className="label">Last Name*</label>
							<input className="input" />
						</div>
					</div>
					
					<div className="form-control">
						<label className="label">E-mail*</label>
						<input className="input" />
					</div>
					<div className="form-control">
						<label className="label">Mobile Phone Number*</label>
						<input className="input" />
					</div>
					<div className="form-control">
						<label className="label">How did you hear of us?*</label>
						<input className="input" />
					</div>
					<div className="form-control">
						<label className="label">How may we help you?*</label>
						<textarea className="input" />
					</div>
					<div className="fine-print">NOTE: By filling out this contact form, I give you my permission to contact me via email, cell phone, or text until I opt out of any such communications.</div>
					<img className='rightArrow' src='/assets/images/rightArrow.svg' />
				</div>
				<div className="privacyPolicy">
					<div className="verticalLineContainer">
						<div className="verticalLine" />
					</div>
					
					<img className='logo' src='/assets/images/NRLiving.png' />
					<div className="contactInfo">
						<div className="address">1300 Manhattan Avenue Union City, NJ 07087</div>
						<div className="address">Manhattan Avenue Capital 1300, LLC</div>
						<div className="phone">201-400-7487</div>
						<div className="copyright">© 2020 Hoboken Heights. All rights reserved.</div>
						<div className="btn">PRIVACY POLICY</div>
					</div>
				</div>
			</div>
		);
	}
}
