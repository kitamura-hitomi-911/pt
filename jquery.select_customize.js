(function($){
	$.fn.select_customize = function(op){
		var settings = $.extend({
			"label_tag_name": 'p',
			'select-wrapper-css': {
				position: 'relative',
				width: 'auto',
				padding: '6px',
				border: '1px solid #ccc',
				'background-color': '#eee'
			},
			'label-css': {},
			'label-after-css': {
				position: 'absolute',
				content: '""',
				width: 0,
				height: 0,
				top: '50%',
				right: '10px',
				'margin-top': '-5px',
				border: '6px solid transparent',
				'border-top': '10px solid #333',
			},
			'select-wrapper-select-css': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				'font-size': '100%',
				'font-family': 'inherit',
				opacity: 0
			},
			'callback': null
		}, op);

		/**
		 *
		 * @param selector CSSのセレクタ名
		 * @param param_obj CSSのkey、valueのセットのオブジェクト
		 * @returns {string} CSSのソース
		 */
		function createCssSrc(selector, param_obj){
			var css_src = '';
			if(selector && param_obj && Object.keys(param_obj).length){
				css_src += selector + '{';
				for(var i in param_obj){
					css_src += i + ':' + param_obj[i] + ';';
				}
				css_src += '}\n';
			}
			return css_src;
		}
		
		return this.each(function(){
			var $this = $(this);
			var $style = $('<style/>');
			var css_src = ''
			css_src += createCssSrc('.select-wrapper', settings['select-wrapper-css']);
			css_src += createCssSrc('.select-wrapper ' + settings.label_tag_name, settings['label-css']);
			css_src += createCssSrc('.select-wrapper ' + settings.label_tag_name + ':after', settings['label-after-css']);
			css_src += createCssSrc('.select-wrapper select', settings['select-wrapper-select-css']);
			$style.append(css_src);
			$('head').append($style);
			var $current_label = $('<' + settings.label_tag_name + '/>');
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