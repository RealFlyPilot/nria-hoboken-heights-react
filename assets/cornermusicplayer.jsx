class CornerMusicPlayer extends React.Component {
	constructor(props) {
		super(props);
	}
	
	animationHasEnded() {
		const {animationEnded} = this.props;
		animationEnded();
	}

	toggleMusicPlayer() {
		const {togglePlayer} = this.props;
		togglePlayer();
	}

	scrollToBottomSlide() {
		const {scrollToContactFormSlide} = this.props;
		scrollToContactFormSlide();
	}

	render(){
		const statusText = this.props.musicIsPlaying ? 'ON' : 'OFF';
		return (

			<div className='corner_content slideInAnimationWrapper' >
				<div className='button musicplayer slideInAnimationElementContainer' onClick={this.toggleMusicPlayer.bind(this)}>
					<div className='slideInAnimationElement slideInAnimationElementLeft'>
					SOUND<br />{statusText}
					</div>
				</div>
				<div className='separator' />
				<div className="button  slideInAnimationElementContainer" onClick={this.scrollToBottomSlide.bind(this)}>
					<div className="text slideInAnimationElement slideInAnimationElementRight" onAnimationEnd={this.animationHasEnded.bind(this)}>CONTACT</div>
				</div>
			</div>
		);
	}
}

module.exports = CornerMusicPlayer;