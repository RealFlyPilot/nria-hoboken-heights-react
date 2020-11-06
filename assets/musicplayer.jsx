const CornerMusicPlayer = require('./cornermusicplayer.jsx');


class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cornerMusicPlayerAnimationFinished: 0
		}
		
		this.scrollToContactForm = this.scrollToContactForm.bind(this);
		this.cornerMusicPlayerAnimationEnded = this.cornerMusicPlayerAnimationEnded.bind(this);
		this.toggleMusic = this.toggleMusic.bind(this);
	}
	toggleMusic() {
		const {toggleMusicPlayer} = this.props;
		toggleMusicPlayer();
	}
	scrollToContactForm() {
		const {scrollToLastSlide} = this.props;
		scrollToLastSlide();
	}

	cornerMusicPlayerAnimationEnded(){
		this.setState({cornerMusicPlayerAnimationFinished: 1});
	}

	render() {
		let classes = "musicplayer_container";
		let corner_content_wrapper_classes = 'corner_content_wrapper';

		if(this.props.isFirstSlide) {
			classes += " center_layout";
		}
		else {
			classes += " corner_layout";
		}

		if(this.props.darkMode) {
			classes += " darkMode";
		}

		if(!this.state.cornerMusicPlayerAnimationFinished) {
			corner_content_wrapper_classes += " animationHasNotRun";
		}

		return (
			<div className={classes}>
				<div className={corner_content_wrapper_classes}>
					<CornerMusicPlayer animationEnded={this.cornerMusicPlayerAnimationEnded} scrollToContactFormSlide={this.scrollToContactForm} togglePlayer={this.toggleMusic} musicIsPlaying={this.props.isPlaying}/>
				</div>
			</div>
		);
	}
}

module.exports = MusicPlayer;