class ContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
			// formSubmitted: '',
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}
	

	componentDidMount() {
		//This is a fix to detect changes on the select2
		jQuery(this.refs.how_you_heard).on("change",  (e)=> {
			this.handleInputChange(e)
		})
		this.createHubspotForm()//this is used to create the form on load
	}

	createHubspotForm(){
		const {createHubspotContactForm} = this.props;
		createHubspotContactForm();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});

		console.log('changed')
	}

	handleSubmit() {
		this.setState ({
			// formSubmitted: true,
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
		});
		const {formSubmitted} = this.props;
		formSubmitted();
	}
	resetForm(){
		// this.setState ({
		// 	formSubmitted: null
		// })
		const {formCleared} = this.props;
		formCleared();
	}

	scrollToTop(){
		const {scrollToFirstSlide} = this.props
		scrollToFirstSlide()
	}

    render() {
		
		let contactFormClasses = 'contactForm';
		// if(this.state.formSubmitted){
		// 	contactFormClasses += ' submitted'
		// }
		const select2Styles = {
			width:"100%"
		}

		const select2Initialized = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').hasClass("select2-hidden-accessible")
		if(!select2Initialized) {
			// $('.how_you_heard').select2({
			// 	placeholder: "How did you hear of us?*",
			// 	width: 'resolve',
			// 	minimumResultsForSearch: -1
			// });
			const hubspotFormExists = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').length
			if(hubspotFormExists) {
				const disabledOptionText = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217 option:disabled')[0].innerHTML
				$('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
					placeholder: disabledOptionText,
					width: 'resolve',
					minimumResultsForSearch: -1
				});
			}
		}
		return (
			<form className={contactFormClasses}>
				<div className="submittedFormOverlay">
					<div className="text">THANK YOU!</div>
					<div className="closeBtn" onClick={this.resetForm}>
						<img src='/assets/images/form_close_btn.svg' />
					</div>
				</div>
				<div className='headline'>FOR INFORMATION PLEASE FILL THE FORM BELOW</div>
				<div className="hubspotFormWrapper" id="hubspotFormWrapper">

				</div>
				{/* <div className="two-input-group">
					<div className="form-control">
						<label className="label">First Name*</label>
						<input className="input"
							name="first_name"
							type="text"
							value={this.state.first_name}
							onChange={this.handleInputChange}
							placeholder="First Name*" />
					</div>
					<div className="form-control">
						<label className="label">Last Name*</label>
						<input className="input"
							name="last_name"
							type="text"
							value={this.state.last_name}
							onChange={this.handleInputChange}
							placeholder="Last Name*" />
					</div>
				</div>
				<div className="form-control">
					<label className="label">E-mail*</label>
					<input className="input"
						name="email"
						type="text"
						value={this.state.email}
						onChange={this.handleInputChange}
						placeholder="E-mail*" />
				</div>
				<div className="form-control">
					<label className="label">Mobile Phone Number*</label>
					<input className="input"
						name="mobilephone"
						type="text"
						value={this.state.mobilephone}
						onChange={this.handleInputChange}
						placeholder="Mobile Phone Number*" />
				</div>
				<div className="form-control">
					<label className="label">How did you hear of us?*</label>
					<select style={select2Styles}
						className='how_you_heard'
						value={this.state.how_you_heard}
						name="how_you_heard"
						onChange={this.handleInputChange}
						ref='how_you_heard'
						>

						<option className='emptyOption'></option>
						<option value="Google">Google</option>
						<option value="Friend">Friend</option>
						<option value="Newspaper">Newspaper</option>
					</select>
				</div>
				<div className="form-control">
					<label className="label">How may we help you?*</label>
					<textarea className="input textarea" 
						name="how_can_we_help"
						type="text"
						value={this.state.how_can_we_help}
						onChange={this.handleInputChange}
						placeholder="How may we help you?*" />
				</div>
				<div className="fine-print">NOTE: By filling out this contact form, I give you my permission to contact me via email, cell phone, or text until I opt out of any such communications.</div>
				<div className="rightArrowContainer">
					<img className='rightArrow not-mobile' src='/assets/images/rightarrow.svg' onClick={this.handleSubmit} />
					<img className='logo mobile-only' src='/assets/images/NRIA_Logo--White.png' />
					<div className="mobileRightArrowContainer mobile-only" onClick={this.handleSubmit}>
						<div className="text gotham-medium">SEND</div>
						<img className='rightArrow' src='/assets/images/mobileSubmitArrow.svg' />
					</div>
					
				</div> */}
			</form>
		);
	}
}

module.exports = ContactForm;