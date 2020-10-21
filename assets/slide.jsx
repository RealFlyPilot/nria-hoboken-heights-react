class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			styles: this.props.obj.styles
		}
		if(this.state.styles) {
			this.state.styles.backgroundRepeat = "no-repeat";
			this.state.styles.backgroundPosition = "center";
		}
	}
	render() {
		const slideObj = this.props.obj;
		return (
			<div className="slide bg000" style={this.state.styles}>
				{slideObj.video &&
					<video autoPlay muted loop={slideObj.videoLoop ? true : false} className='background-video'>
						<source src={slideObj.video} type="video/mp4" />
					</video>
				}
				<h1 className="center">{slideObj.center}</h1>
			</div>
		);
	}
}


module.exports = Slide;
