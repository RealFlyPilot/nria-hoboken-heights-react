const ContactFormSlide = require('./contactformslide.jsx');
const Header = require('./header.jsx');

class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			styles: this.props.obj.styles
		}
		if(this.state.styles) {
			this.state.styles.backgroundRepeat = "no-repeat";
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
		let videoClasses = 'background-video'
		
		const isCurrent = this.props.isCurrent;
		const headerOptions = {
			addCornerLogo: slideObj.addCornerLogo,
			addDarkCornerLogo: slideObj.addDarkCornerLogo,
			animateCornerLogoOnStart: slideObj.animateCornerLogoOnStart
		};
		
		if(isCurrent) slideClasses += " runAnimations";
		if(slideObj.videoZoomEffect) videoClasses += ' videoZoomEffect'
		
		return (
			<div className={slideClasses} style={this.state.styles}>
				<Header options={headerOptions} />
				{slideObj.video &&
					<video autoPlay muted loop={slideObj.videoLoop ? true : false} className={videoClasses}>
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
