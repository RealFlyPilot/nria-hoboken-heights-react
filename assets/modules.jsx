const modules = {
	explodeString: function(string) {
		const spans = string.split("").map(function(char, index){
			return <span className='letter cascading-animation' key={index}>{char}</span>;
		});
		return spans;
	}
};

module.exports = modules;
