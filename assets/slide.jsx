const ContactFormSlide = require('./contactformslide.jsx');
const Header = require('./header.jsx');
const LandingPageMusicPlayer = require('./landingpagemusicplayer.jsx');

class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			styles: this.props.obj.styles,
			landingPageAnimationFinished: 0,
			soundEffect: new Audio()
		}
		this.landingPageAnimationEnded = this.landingPageAnimationEnded.bind(this);
		
		this.musicPlay = this.musicPlay.bind(this);
		this.musicMute = this.musicMute.bind(this);
		this.scrollToNextSlide = this.scrollToNextSlide.bind(this);
		
		this.state.soundEffect.loop = true;

		if(this.state.styles) {
			this.state.styles.backgroundRepeat = "no-repeat";
		}
	}

	musicMute() {
		const {stopMusic} = this.props;
		stopMusic();
	}
	
	musicPlay(evt) {
		const {playMusic} = this.props;
		playMusic();
	}

	landingPageAnimationEnded(){
		this.setState({landingPageAnimationFinished: 1});
	}

	scrollToContactForm() {
		const {scrollToLastSlide} = this.props;
		scrollToLastSlide();
	}

	scrollToNextSlide() {
		const {goToNextSlide} = this.props;
		goToNextSlide();
	}

	playSoundEffect(){
		const soundEffect = this.props.obj.soundEffect;
		const musicIsPlaying = this.props.isPlaying;
		const isCurrent = this.props.isCurrent;
		if(isCurrent && musicIsPlaying && soundEffect) {
			const updateSoundSource = this.state.soundEffect.src.indexOf(soundEffect.substring(1)) == -1;
			const soundIsPaused = this.state.soundEffect.paused;
			if (updateSoundSource){
				this.state.soundEffect.src = soundEffect
			}
			if (soundIsPaused) {
				this.state.soundEffect.play();
			}
		}
		else this.state.soundEffect.pause()
	}

	render() {
		this.playSoundEffect();

		const slideObj = this.props.obj;
		console.log(slideObj);
		let slideClasses = "slide bg000"
		let videoClasses = 'background-video'
		let landing_page_sound_player_classes = 'landing_page_sound_player';
		
		const isCurrent = this.props.isCurrent;
		const headerOptions = {
			addCornerLogo: slideObj.addCornerLogo,
			addDarkCornerLogo: slideObj.addDarkCornerLogo,
			animateCornerLogoOnStart: slideObj.animateCornerLogoOnStart,
			cornerLogoHideOnLastSlide: slideObj.cornerLogoHideOnLastSlide,
			cornerLogofadeIn: slideObj.cornerLogofadeIn
		};
		
		slideClasses += slideObj.slideClasses != undefined ? " " + slideObj.slideClasses : '';
		if(isCurrent) slideClasses += " runAnimations";
		if(this.props.slideViewed) slideClasses += " runAnimationOnce";
		if(slideObj.videoZoomEffect) videoClasses += ' videoZoomEffect'
		
		if(!this.state.landingPageAnimationFinished) {
			landing_page_sound_player_classes += " animationHasNotRun";
		}
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
					{slideObj.isLandingPage &&
						<div className="musicplayer_container center_layout">
							<div className='musicplayer centered_content'>
								<div className={landing_page_sound_player_classes}>
									<div className='title'>SOUND EXPERIENCE</div>
									<LandingPageMusicPlayer animationEnded={this.landingPageAnimationEnded} nextSlide={this.scrollToNextSlide} muteMusic={this.musicMute} playMusic={this.musicPlay} isPlaying={this.props.isPlaying} />
								</div>
							</div>
						</div>
					}
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
