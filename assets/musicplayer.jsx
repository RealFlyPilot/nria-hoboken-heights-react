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

	componentDidUpdate(prevProps) {
		if (prevProps.currIdx !== this.props.currIdx && this.props.currIdx == 1) {
			this.cornerMusicPlayerAnimationEnded()
		}
	}

	render() {
		let classes = "musicplayer_container";
		let corner_content_wrapper_classes = 'corner_content_wrapper';

		// if(this.props.isFirstSlide) {
		// 	classes += " center_layout";
		// }
		// else {
		// }
		classes += " corner_layout";
		
		if(this.props.darkMode) {
			classes += " darkMode";
		}

		if(!this.state.cornerMusicPlayerAnimationFinished && this.props.currIdx != 1) {
			corner_content_wrapper_classes += " animationHasNotRun";
		}

		const statusText = this.props.isPlaying ? 'ON' : 'OFF';

		return (
			<div className={classes}>
				<div className={corner_content_wrapper_classes}>
					<div className='corner_content slideInAnimationWrapper' >
					<div className='button musicplayer slideInAnimationElementContainer' onClick={this.toggleMusic.bind(this)}>
						<div className='slideInAnimationElement slideInAnimationElementLeft'>
						SOUND<br />{statusText}
						</div>
					</div>
					<div className='separator' />
					<div className="button slideInAnimationElementContainer" onClick={this.scrollToContactForm.bind(this)}>
						<div className="text slideInAnimationElement slideInAnimationElementRight">CONTACT</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
}

module.exports = MusicPlayer;