class Slide extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const slideObj = this.props.obj;

		const isBackgroundImage = slideObj.background[0] !== "#";
		const styles = {};
		if(!isBackgroundImage) {
			styles.backgroundColor = slideObj.background || "#000"
		} else {
			styles.backgroundImage = "url(" + slideObj.background + ")";
			styles.backgroundRepeat = "no-repeat";
			styles.backgroundSize = "contain";
			styles.backgroundPosition = "center";
		}

		return (
			<div className="slide bg000" style={styles}>
				<h1 className="center">{slideObj.center}</h1>
			</div>
		);
	}
}


module.exports = Slide;
