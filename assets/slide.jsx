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
	render() {
		const slideObj = this.props.obj;
		return (
			<div className="slide bg000" style={this.state.styles}>
				{slideObj.video &&
					<video autoPlay muted loop={slideObj.videoLoop ? true : false} className='background-video'>
						<source src={slideObj.video} type="video/mp4" />
					</video>
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
				<h1 className="centerBottom" dangerouslySetInnerHTML={{ __html: slideObj.centerBottom }}></h1>
			</div>
		);
	}
}


module.exports = Slide;
