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

	render(){
		return (
			<div className="contactPageWrapper">
				<ContactForm formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} />
				<div className="privacyPolicy not-mobile">
					<div className="verticalLineContainer">
						<div className="verticalLine" />
					</div>
					
					<img className='logo' src='/assets/images/NRLiving.png' />
					<div className="contactInfo">
						<div className="address">1300 Manhattan Avenue Union City, NJ 07087</div>
						<div className="address">Manhattan Avenue Capital 1300, LLC</div><br />
						<div className="address">Richard Stabile</div>
						<div className="address">RE/MAX Real Estate Limited</div>
						<div className="phone">201-400-7487</div>
						<div className="copyright">© 2020 Hoboken Heights. All rights reserved.</div>
						<div className="btn">PRIVACY POLICY</div>
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