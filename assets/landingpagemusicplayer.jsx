class LandingPageMusicPlayer extends React.Component {
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
		document.querySelector('.background-video').play()
	}

	animationHasEnded() {
		const {animationEnded} = this.props;
		animationEnded();
	}
	
	render(){
		let settingsClasses = 'settings slideInAnimationWrapper';
		let playButtonClasses = 'button play slideInAnimationElementContainer';
		let muteButtonClasses = 'button mute slideInAnimationElementContainer';

		if(this.props.isPlaying) {
			playButtonClasses += " selected_option";
		}
		else {
			muteButtonClasses += " selected_option";
		}

		return (
			<div className={settingsClasses}>
				<div className={playButtonClasses} onClick={this.startMusicPlayer.bind(this)}>
					<div className='text slideInAnimationElement slideInAnimationElementLeft'>{this.props.slideData.sound_choice_start}</div>
				</div>
				<div className='separator' />
				<div onClick={this.stopMusicPlayer.bind(this)} className={muteButtonClasses} onAnimationEnd={this.animationHasEnded.bind(this)}>
					<div className='text slideInAnimationElement slideInAnimationElementRight'>{this.props.slideData.sound_choice_stop}</div>
				</div>
			</div>
		);
	}
}

module.exports = LandingPageMusicPlayer;