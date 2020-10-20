class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			audioPlayer: new Audio('./assets/SOUND-GENERAL_MUSIC.mp3')
		}
	}
	handleClick(evt) {
		this.setState({ isPlaying: !this.state.isPlaying });
	}
	render() {
		let statusText = this.state.isPlaying ? 'On' : 'Off';
		if(this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}
		let classes = "musicplayer";
		if(this.props.isFirstSlide) {
			classes += " center_layout";
		}

		return (
			<div className={classes} onClick={this.handleClick.bind(this)}>
				Sound <br />{statusText}
			</div>
		);
	}
}
module.exports = MusicPlayer;
