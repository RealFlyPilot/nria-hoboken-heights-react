const ContactForm = require('./contactform.jsx');

class ContactFormSlide extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div className="contactPageWrapper">
				<ContactForm />
				<div className="privacyPolicy">
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
			</div>
		);
	}
}
module.exports = ContactFormSlide