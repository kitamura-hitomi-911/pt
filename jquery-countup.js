/**
 * Created by hinit on 2017/01/27.
 */

(function($){
	var Drumroll = function($elm, op){
		this.$elm = $elm;
		this.op = $.extend({}, this.op, op);
		this.current_num;
		this.after_num;
		this.timer;
		this.animation_time;
		this.animation_per;
		this.animation_max_cnt;
		this.animation_cnt;
		this.init();
		console.log(this);
		return;
	};
	Drumroll.prototype.init = function(){
		this.current_num = this.op.default_num;
		this.animation_time = this.op.animation_time;
		this.animation_per = this.op.animation_per;
		this.animation_max_cnt = Math.floor(this.animation_time/this.animation_per);
		this.animation_cnt = 0;
		this.$elm.html(this._createSrc(this.current_num));
		return;
	};
	Drumroll.prototype.op = {
		animation_time: 800, // アニメーションしている長さ
		default_num: 4000,//初期値
		animation_per: 10 // ms置きにアニメーションするか
	};
	Drumroll.prototype.moveTo = function(num){
		console.log(num);
		if(this.current_num == num && !this.timer){
			return;
		}
		this.after_num = num;
		this._render();
		return;
	};
	Drumroll.prototype._render = function(){
		var that = this;
		this.animation_cnt++;
		if(this.animation_cnt <= this.animation_max_cnt && this.current_num!=this.after_num){
			// 残りの時間で表示する値を取得
			var method = this.after_num-this.current_num>=0?'floor':'ceil';
			var disp_num = Math[method]((this.after_num - this.current_num) * this.animation_cnt / this.animation_max_cnt) + this.current_num*1;
			this.$elm.html(this._createSrc(disp_num));
			this.timer = setTimeout(function(){
				that._render()
			}, this.animation_per );
		}else{
			this.current_num = this.after_num;
			clearTimeout(this.timer);
			this.timer = null;
			this.animation_cnt = 0;
		}
	};
	Drumroll.prototype._createSrc = function(num){
		var num_str_ary = (num+'').split('');
		var src = '';
		for(var i=0;i<num_str_ary.length;i++){
			src += '<span class="num num'+num_str_ary[i]+'">'+num_str_ary[i]+'</span>';
		}
		return src;
	}
	$.fn.drumroll = function(){
		var args = Array.prototype.slice.call(arguments);
		var isMethodCall = (args.length > 0) && ($.type(args[0]) === 'string');
		var method = isMethodCall ? args[0] : undefined;
		var op = isMethodCall ? undefined : args[0];
		var returnValue = this;
		if(isMethodCall){
			this.each(function(){
				var $el = $(this);
				var instance = $el.data('drumroll');
				var res = instance[method] && instance[method].apply(instance, args.slice(1));
				if((res !== instance) && (res !== undefined)){
					returnValue = res;
				}
			});
		}else{
			this.each(function(){
				var $el = $(this);
				var instance = new Drumroll($el, op);
				$el.data('drumroll', instance);
			});
		}
	};
})(jQuery);
