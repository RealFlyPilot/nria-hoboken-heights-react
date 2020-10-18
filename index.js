(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			audioPlayer: new Audio('./assets/SOUND-GENERAL_MUSIC.mp3')
		};
	}
	handleClick(evt) {
		this.setState({ isPlaying: !this.state.isPlaying });
	}
	render() {
		let statusText = this.state.isPlaying ? 'On' : 'Off';
		if (this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}
		return React.createElement(
			'div',
			{ className: 'musicplayer', onClick: this.handleClick.bind(this) },
			'Sound ',
			React.createElement('br', null),
			statusText
		);
	}
}
module.exports = MusicPlayer;

},{}],2:[function(require,module,exports){
const SLIDES = [{
	background: "#000",
	center: "Hoboken Heights",
	bottom: "Sound Experience Yes or no"
}, {
	center: "Slide 2",
	background: "/assets/hobokenh1.webp"
}, {
	center: "Slide 3",
	background: "#000"
}, {
	center: "Slide 4",
	background: "#000"
}, {
	background: "#000",
	center: "Slide 5"
}, {
	background: "#000",
	center: "Slide 6"
}];

module.exports = SLIDES;

},{}],3:[function(require,module,exports){
class Slide extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const slideObj = this.props.obj;

		const isBackgroundImage = slideObj.background[0] !== "#";
		const styles = {};
		if (!isBackgroundImage) {
			styles.backgroundColor = slideObj.background || "#000";
		} else {
			styles.backgroundImage = "url(" + slideObj.background + ")";
			styles.backgroundRepeat = "no-repeat";
			styles.backgroundSize = "contain";
			styles.backgroundPosition = "center";
		}

		return React.createElement(
			"div",
			{ className: "slide bg000", style: styles },
			React.createElement(
				"h1",
				{ className: "center" },
				slideObj.center
			)
		);
	}
}

module.exports = Slide;

},{}],4:[function(require,module,exports){
'use strict';

const SLIDES = require('./assets/page.js');
const Slide = require('./assets/slide.jsx');
const MusicPlayer = require('./assets/musicplayer.jsx');

class SplashPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: SLIDES,
			transitiongState: 0, // 0 for false -1 for up 1 for down
			currIdx: 0
		};
	}
	handleWheelEvent(evt) {
		const isScrollingDown = evt.deltaY > 0;
		if (isScrollingDown) {
			this.nextSlide();
		} else {
			this.prevSlide();
		}
	}
	watchForEventEnd() {
		this.setState({ transitiongState: 0 });
	}
	isTransitioning() {
		return this.state.transitiongState != 0;
	}
	nextSlide() {
		if (this.isTransitioning()) {
			return;
		}
		const newIdx = this.state.currIdx + 1;
		if (newIdx >= SLIDES.length) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
	}
	prevSlide() {
		if (this.isTransitioning()) {
			return;
		}
		const newIdx = this.state.currIdx - 1;
		if (newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: -1,
			currIdx: newIdx
		});
	}
	componentDidUpdate() {
		const that = this;
		return;
		this.refs.inner.addEventListener('transitionend', evt => {
			that.setState({
				transitiongState: 0,
				currIdx: this.state.currIdx + delta
			});
		}, false);
	}
	render() {
		const $slides = this.state.slides.map((slide, idx) => React.createElement(Slide, { key: idx, obj: slide }));
		let classes = "slides_wrapper";
		const innerStyle = {
			transform: 'translateY(-' + this.state.currIdx * 100 + 'vh)'
		};
		return React.createElement(
			'div',
			{ id: 'page' },
			React.createElement(MusicPlayer, null),
			React.createElement(
				'div',
				{ className: 'slides_wrapper', onWheel: this.handleWheelEvent.bind(this) },
				React.createElement(
					'div',
					{
						ref: 'inner',
						className: 'slides_inner',
						style: innerStyle,
						onTransitionEnd: this.watchForEventEnd.bind(this) },
					$slides
				)
			)
		);
	}
}

let domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(SplashPage, null), domContainer);

},{"./assets/musicplayer.jsx":1,"./assets/page.js":2,"./assets/slide.jsx":3}]},{},[4]);
