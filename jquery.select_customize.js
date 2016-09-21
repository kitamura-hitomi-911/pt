(function($){
	$.fn.select_customize = function(op){
		var settings = $.extend({
			'select-wrapper-css': {
				position: 'relative',
				width: '300px',
				padding: '6px',
				border: '1px solid #ccc',
				'background-color': '#eee'
			},
			'tag_name': 'p',
			'callback': null
		}, op);
		return this.each(function(){
			var $this = $(this);
			var $style = $('<style/>');
			var css_src = '.select-wrapper{';
			for(var i in settings['select-wrapper-css']){
				css_src += i+':'+settings['select-wrapper-css'][i]+';';
			}
			css_src += '}';
			css_src += '.select-wrapper select {position: absolute;top: 0;left: 0;width: 100%;height: 100%;\ont-size: 100%;font-family: inherit;opacity: 0;}';
			$style.append(css_src);
			$('head').append($style);
			var $current_label = $('<' + settings.tag_name + '/>');
			$this.wrap('<div class="select-wrapper"></div>').before($current_label);
			setCurrentValue();
			$this.change(setCurrentValue);
			function setCurrentValue(){
				$current_label.html($this.find('option:selected').text());
				settings.callback && settings.callback($this.find('option:selected'));
				return;
			}

			console.log($this);
		});
	};
})(jQuery);