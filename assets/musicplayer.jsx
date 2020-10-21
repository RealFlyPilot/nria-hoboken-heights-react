class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			audioPlayer: new Audio('./assets/sounds/SOUND-GENERAL_MUSIC.mp3'),
		}
	}
	handleClick(evt) {
		this.setState({ isPlaying: !this.state.isPlaying });
	}
	scrollToContactForm() {
		const {scrollToLastSlide} = this.props;
		scrollToLastSlide();
	}

	render() {
		let statusText = this.state.isPlaying ? 'ON' : 'OFF';
		if(this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}

		let classes = "musicplayer_container";
		if(this.props.isFirstSlide) {
			classes += " center_layout";
		}
		else {
			classes += " corner_layout";
		}

		return (
			<div className={classes}>
				<div className='musicplayer centered_content' onClick={this.handleClick.bind(this)}>
					<div className="landing_page_sound_player">
						SOUND EXPERIENCE
						<SoundExperienceSettings isPlaying={this.state.isPlaying} />
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
	render(){
		return (
			<div className='settings'>
				<span className={this.props.isPlaying ? 'selected_option' : ''}>YES</span> <div className='separator' /> <span className={!this.props.isPlaying ? 'selected_option' : ''}>NO</span>
			</div>
		);
	}
}