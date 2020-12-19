const ContactFormSlide = require('./contactformslide.jsx');
const Header = require('./header.jsx');
const LandingPageMusicPlayer = require('./landingpagemusicplayer.jsx');
const MusicPlayer = require('./musicplayer.jsx');

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
	scrollToTop() {
		const {scrollToFirstSlide} = this.props;
		scrollToFirstSlide();
	}

	scrollToNextSlide() {
		const {goToNextSlide} = this.props;
		goToNextSlide();
	}

	slideHorizontal(direction) {
		this.props.horizontalSlide(direction);
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

	contactFormSubmitted(){
		const {formSubmitted} = this.props;
		formSubmitted();
	}

	contactFormCleared(){
		const {formCleared} = this.props;
		formCleared();
	}
	createHubspotForm(){
		const {createHubspotContactForm} = this.props;
		createHubspotContactForm();
	}

	handleLangChange = e => {
		let element = e.target
		const scrolled = element.scrollTop > 0 ? true : false
        this.props.onSlideScroll(scrolled);
    }

	openPrivacyPolicyModal(){
		const {showPrivacyPolicy} = this.props
		showPrivacyPolicy()
	}
	render() {
		this.playSoundEffect();

		const slideObj = this.props.obj;

		let slideClasses = "slide bg000"
		let videoClasses = 'background-video'
		let landing_page_sound_player_classes = 'landing_page_sound_player';
		let centerTextClasses = 'center';
		let centerBottomClasses = "centerBottom";

		const isCurrent = this.props.isCurrent;
		const headerOptions = {
			addCornerLogo: slideObj.addCornerLogo,
			addDarkCornerLogo: slideObj.addDarkCornerLogo,
			animateCornerLogoOnStart: slideObj.animateCornerLogoOnStart,
			cornerLogoHideOnLastSlide: slideObj.cornerLogoHideOnLastSlide,
			cornerLogofadeIn: slideObj.cornerLogofadeIn
		};
		
		slideClasses += slideObj.slideClasses != undefined ? " " + slideObj.slideClasses : '';
		if(isCurrent) slideClasses += " runAnimations activeSlide";
		if(this.props.slideViewed) slideClasses += " runAnimationOnce";
		if(slideObj.videoZoomEffect) videoClasses += ' videoZoomEffect'
		slideClasses += slideObj.videoMobileStartPosition ? ' mobile-video-position-' + slideObj.videoMobileStartPosition : ' mobile-video-position-left'
		slideClasses += slideObj.contactFormSlide ? ' contactFormSlide' : '';
		
		// if(!this.state.landingPageAnimationFinished) {
		// 	landing_page_sound_player_classes += " animationHasNotRun";
		// }

		if(slideObj.centerTextClasses) {
			centerTextClasses += ' ' + slideObj.centerTextClasses;
		}

		if(slideObj.mobileHasDifferentContent) {
			centerTextClasses += ' not-mobile';
			centerBottomClasses += ' not-mobile';
		}
		
		let centerTextStyles;
		let slideStyles;
		if(window.innerWidth > 768){
			centerTextStyles = slideObj.centerTextStyles
			slideStyles = this.state.styles
		}
		else {
			centerTextStyles = slideObj.centerTextStylesMobile
			slideStyles = {...this.state.styles, ...slideObj.stylesMobile}
		}

		let centerImageStyles;
		if(window.innerWidth > 768){
			centerImageStyles = slideObj.centerImageStyles
		}
		else {
			centerImageStyles = slideObj.centerImageStylesMobile
		}

		let right_arrow_bouncing = <div className='right_arrow_bouncing' onClick={() => this.slideHorizontal('right')}/>
		let left_arrow_bouncing = <div className='left_arrow_bouncing' onClick={() => this.slideHorizontal('left')}/>
		
		const disableVideo = slideObj.isLandingPage && this.props.isFirefoxAndroid ? true : false //This will be used because videos do not autoplay on FF mobile
		return (
			
			<div className={slideClasses} style={slideStyles} onScroll={this.handleLangChange}>
				<Header options={headerOptions} scrollToFirstSlide={this.scrollToTop.bind(this)} />
				
				{slideObj.phantomMusicPlayer &&
					// This music player should only appear on the second slide to create the visual effect of it sliding down and up with the second slide.
					// The regular music player is fixed in the right top corner
					<MusicPlayer currIdx={this.props.currIdx} toggleMusicPlayer={this.musicToggle}  goToNextSlide={this.scrollToNextSlide} scrollToLastSlide={this.scrollToContactForm} isPlaying={this.props.isPlaying}></MusicPlayer>
				}
				{slideObj.video && !disableVideo && 
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className="videoContainer"
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${slideObj.videoLoop ? 'loop="true"' : ''}
							muted='true'
							autoplay='true'
							playsinline='true'
							preload="metadata"
							>
							<source src="${slideObj.video}" type="video/mp4" />
							</video>`
						}}
					/>
				}
				{slideObj.contactFormSlide &&
					<ContactFormSlide scrollToFirstSlide={this.scrollToTop.bind(this)} slideObj={slideObj} createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} showPrivacyPolicy={this.openPrivacyPolicyModal.bind(this)}  />
					
				}
				<div className={centerTextClasses} style={centerTextStyles}>
					{slideObj.centerImage &&
						<img onClick={this.scrollToTop.bind(this)} style={centerImageStyles} src={slideObj.centerImage}/>
					}
					{slideObj.centerTagline &&
						<p className="centerTagline">{slideObj.centerTagline}</p>
					}
					<div className="centerContent" dangerouslySetInnerHTML={{ __html: slideObj.center }} />
					{slideObj.contactButton &&
						<div className='btn contactButton' onClick={this.scrollToContactForm.bind(this)}>{slideObj.buttonText}</div>
					}
				</div>
				
				<div className={centerBottomClasses}>
					{slideObj.isLandingPage &&
						<div className="musicplayer_container center_layout">
							<div className='musicplayer centered_content'>
								<div className={landing_page_sound_player_classes}>
									<div className='title'>{slideObj.soundTitle}</div>
									<LandingPageMusicPlayer slideData={slideObj} animationEnded={this.landingPageAnimationEnded} nextSlide={this.scrollToNextSlide} muteMusic={this.musicMute} playMusic={this.musicPlay} isPlaying={this.props.isPlaying} />
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
						<img onClick={this.scrollToNextSlide.bind(this)} className='downArrow' src={slideObj.downArrowImage} />
					}
				</div>
				{slideObj.mobileHasDifferentContent && slideObj.mobileContent.center && 
					<div className={"centerBottom mobile-only mobile-content-center " + (isCurrent && slideObj.videoMobileStartPosition == 'center' ? ' animate' : '')}>
						<h1 style={slideObj.mobileContent.center.centerBottom.lineStyles} className="line">
							{slideObj.mobileContent.center.centerBottom.line1LeftArrowBouncing && left_arrow_bouncing}
							<div dangerouslySetInnerHTML={{ __html: slideObj.mobileContent.center.centerBottom.line1}} />
							{slideObj.mobileContent.center.centerBottom.line1RightArrowBouncing && right_arrow_bouncing}
						</h1>
						<h1 style={slideObj.mobileContent.center.centerBottom.lineStyles} className="line" dangerouslySetInnerHTML={{ __html: slideObj.mobileContent.center.centerBottom.line2}}></h1>
					</div>
				}
				{slideObj.mobileHasDifferentContent && slideObj.mobileContent.left && 
					<div className={"centerBottom mobile-only mobile-content-left " + (isCurrent && slideObj.videoMobileStartPosition == 'left' ? ' animate' : '')}>
						<h1 style={slideObj.mobileContent.left.centerBottom.lineStyles} className="line" >
							<div dangerouslySetInnerHTML={{ __html: slideObj.mobileContent.left.centerBottom.line1}} />
							{slideObj.mobileContent.left.centerBottom.line1RightArrowBouncing && right_arrow_bouncing}
						</h1>
					</div>
				}
			</div>
		);
	}
}


module.exports = Slide;
