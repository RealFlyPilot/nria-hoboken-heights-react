const LandingPageMusicPlayer = require('./landingpagemusicplayer.jsx');

const CornerMusicPlayer = require('./cornermusicplayer.jsx');

class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			audioPlayer: new Audio('./assets/sounds/SOUND-GENERAL_MUSIC.mp3'),
			landingPageAnimationFinished: 0,
			cornerMusicPlayerAnimationFinished: 0
		}
		
		this.musicPlay = this.musicPlay.bind(this);
		this.musicMute = this.musicMute.bind(this);
		this.scrollToNextSlide = this.scrollToNextSlide.bind(this);
		this.scrollToContactForm = this.scrollToContactForm.bind(this);
		this.landingPageAnimationEnded = this.landingPageAnimationEnded.bind(this);
		this.cornerMusicPlayerAnimationEnded = this.cornerMusicPlayerAnimationEnded.bind(this);
		this.handleClick = this.handleClick.bind(this);
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

	landingPageAnimationEnded(){
		this.setState({landingPageAnimationFinished: 1});
	}

	cornerMusicPlayerAnimationEnded(){
		this.setState({cornerMusicPlayerAnimationFinished: 1});
	}
	

	render() {
		
		let classes = "musicplayer_container";
		let landing_page_sound_player_classes = 'landing_page_sound_player';
		let corner_content_wrapper_classes = 'corner_content_wrapper';

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

		if(!this.state.cornerMusicPlayerAnimationFinished) {
			corner_content_wrapper_classes += " animationHasNotRun";
		}

		return (
			<div className={classes}>
				<div className='musicplayer centered_content'>
					<div className={landing_page_sound_player_classes}>
						<div className='title'>SOUND EXPERIENCE</div>
						<LandingPageMusicPlayer animationEnded={this.landingPageAnimationEnded} nextSlide={this.scrollToNextSlide} muteMusic={this.musicMute} playMusic={this.musicPlay} isPlaying={this.state.isPlaying} />
					</div>
				</div>
				<div className={corner_content_wrapper_classes}>
					<CornerMusicPlayer animationEnded={this.cornerMusicPlayerAnimationEnded} scrollToContactFormSlide={this.scrollToContactForm} togglePlayer={this.handleClick} musicIsPlaying={this.state.isPlaying}/>
				</div>
			</div>
		);
	}
}

module.exports = MusicPlayer;