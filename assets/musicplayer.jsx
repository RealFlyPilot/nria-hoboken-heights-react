class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			audioPlayer: new Audio('./assets/sounds/SOUND-GENERAL_MUSIC.mp3'),
			landingPageAnimationFinished: 0
		}
		
		this.musicPlay = this.musicPlay.bind(this);
		this.musicMute = this.musicMute.bind(this);
		this.scrollToNextSlide = this.scrollToNextSlide.bind(this);
		this.endAnimation = this.endAnimation.bind(this);
	}
	handleClick(evt) {
		this.setState({ isPlaying: !this.state.isPlaying });
	}
	musicPlay(evt) {
		this.setState({ isPlaying: true });
	}
	musicMute(evt) {
		this.setState({ isPlaying: false });
	}
	scrollToContactForm() {
		const {scrollToLastSlide} = this.props;
		scrollToLastSlide();
	}

	scrollToNextSlide(){
		const {goToNextSlide} = this.props;
		goToNextSlide();
	}

	endAnimation(){
		this.setState({landingPageAnimationFinished: 1});
	}
	

	render() {
		let statusText = this.state.isPlaying ? 'ON' : 'OFF';
		let classes = "musicplayer_container";
		let landing_page_sound_player_classes = 'landing_page_sound_player';

		if(this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}

		if(this.props.isFirstSlide) {
			classes += " center_layout";
		}
		else {
			classes += " corner_layout";
		}

		if(this.props.darkMode) {
			classes += " darkMode";
		}

		
		if(!this.state.landingPageAnimationFinished) {
			landing_page_sound_player_classes += " animationHasNotRun";
		}

		

		return (
			<div className={classes}>
				<div className='musicplayer centered_content'>
					<div className={landing_page_sound_player_classes}>
						<div className='title'>SOUND EXPERIENCE</div>
						<SoundExperienceSettings animationEnded={this.endAnimation} nextSlide={this.scrollToNextSlide} muteMusic={this.musicMute} playMusic={this.musicPlay} isPlaying={this.state.isPlaying} />
					</div>
				</div>
				<div className='corner_content'>
					<div className='musicplayer' onClick={this.handleClick.bind(this)}>
						<div>
						SOUND<br />{statusText}
						</div>
					</div>
					<div className='separator' />
					<div onClick={this.scrollToContactForm.bind(this)}>CONTACT</div>
				</div>
			</div>
		);
	}
}
module.exports = MusicPlayer;


class SoundExperienceSettings extends React.Component {
	constructor(props) {
		super(props);
	}

	startMusicPlayer() {
		const {nextSlide} = this.props;
		const {playMusic} = this.props;
		playMusic();
		nextSlide();
	}

	stopMusicPlayer() {
		const {nextSlide} = this.props;
		const {muteMusic} = this.props;
		muteMusic();
		nextSlide();
	}

	animationHasEnded() {
		const {animationEnded} = this.props;
		animationEnded();
	}
	

	render(){
		let playButtonClasses = 'button play';
		let muteButtonClasses = 'button mute';
		let settingsClasses = 'settings';

		if(this.props.isPlaying) {
			playButtonClasses += " selected_option";
		}
		else {
			muteButtonClasses += " selected_option";
		}

		
		
		return (
			<div className={settingsClasses}>
				<div className={playButtonClasses} onClick={this.startMusicPlayer.bind(this)}>
					<div className='text'>YES</div>
				</div>
				<div className='separator' />
				<div onClick={this.stopMusicPlayer.bind(this)} className={muteButtonClasses} onAnimationEnd={this.animationHasEnded.bind(this)}>
					<div className='text'>NO</div>
				</div>
			</div>
		);
	}
}