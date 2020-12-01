const ContactForm = require('./contactform.jsx');

class ContactFormSlide extends React.Component {
	constructor(props) {
		super(props);
	}
	contactFormSubmitted(){
		const {formSubmitted} = this.props;
		formSubmitted();
	}

	contactFormCleared(){
		const {formCleared} = this.props;
		formCleared();
	}

	scrollToTop(){
		const {scrollToFirstSlide} = this.props
		scrollToFirstSlide()
	}

	render(){
		return (
			<div className="contactPageWrapper">
				<ContactForm scrollToFirstSlide={this.scrollToTop.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} />
				<div className="privacyPolicy not-mobile">
					<div className="verticalLineContainer">
						<div className="verticalLine" />
					</div>
					
					<img className='logo' src={this.props.slideObj.contactLogo} />
					<div className="contactInfo">
						<div className="address">{this.props.slideObj.companyAddress}</div>
						<div className="address">{this.props.slideObj.companyName}</div>
						<div className="address">{this.props.slideObj.agentName}</div>
						<div className="address">{this.props.slideObj.agentCompany}</div>
						<div className="phone">{this.props.slideObj.agentPhoneNumber}</div>
						<div className="copyright">{this.props.slideObj.rightsReserved}</div>
						<div className="btn">{this.props.slideObj.buttonText}</div>
					</div>
				</div>
				<div className="mobilePrivacyPolicy mobile-only">
					<div className="contactInfo">
						<div className="address">1300 Manhattan Avenue Union City, NJ 07087</div>
						<div className="address">Manhattan Avenue Capital 1300, LLC</div><br />
						<div className="address">Richard Stabile</div>
						<div className="address">RE/MAX Real Estate Limited</div>
						<a href='tel:2014007487'><div className="phone">201-400-7487</div></a><br />
						<div className="copyright">© 2020 Hoboken Heights. All rights reserved.</div>
						<a href='#'>Privacy Policy</a>
					</div>
				</div>
			</div>
		);
	}
}
module.exports = ContactFormSlide