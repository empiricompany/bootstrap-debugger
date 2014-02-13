var currentBootstrapBreakPoint;	
(function( $ ) {
	function findBootstrapBreakPoints(e) {
		var envs = ['xs', 'sm', 'md', 'lg'];
		var envs2 = ['phone', 'tablet', 'desktop'];
		var version;
		$el = $('<div>');
		$el.appendTo($('body'));
	
		for (var i = envs.length - 1; i >= 0; i--) {
			var env = envs[i];
			$el.addClass('hidden-'+env);
			if ($el.is(':hidden')) {
				$el.remove();
				try {
					console.log(env2);					
					console.log(env);
				}catch(Exception){
					
				}
				if(env){
					currentBootstrapBreakPoint = env;
					version = '3.x';
				}
			}
		}
		if(!version){
			for (var i = envs2.length - 1; i >= 0; i--) {
				var env2 = envs2[i];
				$el.addClass('hidden-'+env2);
				if ($el.is(':hidden')) {
					$el.remove();
					try {
						console.log(env2);					
					}catch(Exception){
						
					}
					if(env2){
						currentBootstrapBreakPoint = env2;
						version = '2.x';					
					}
				}
			}
		}
				
		var styleLabel = 'font-size:13px; color:#00ff00; font-weight:bold; padding-right: 5px; text-align: right; font-family: monospace;';
		var styleValue = 'font-size:13px; font-family: monospace; color:#ffffff;';
		var brHtml = '<br />';				
		var infoHtml = '<div style="position:relative">' +
		'<div class="move moveTop" style="text-align:center;;cursor:pointer;color:red;">▲</div>' +
		'<div class="move moveLeft" style="position:absolute;top:50%;;cursor:pointer;color:red;">◀</div>' +
		'<div class="move moveRight" style="position:absolute;top:50%;right:0;cursor:pointer;color:red;">▶</div>' +					
		'<table style="clear:both;">' +
			'<tr><td colspan="2" style="font-size:14px;text-align: center; color: #ffff00;font-weight: bold; font-family: monospace;">responsive debugger</td></tr>';
			if(currentBootstrapBreakPoint){			
				infoHtml+= '<tr>' +
					'<td style="'+styleLabel+'">' +				
						'version:' +
					'</td>' +	
					'<td style="'+styleValue+'">' +							
						version +						
					'</td>' +							
				'</tr>' +
				'<tr>' +
					'<td style="'+styleLabel+'">' +				
						'break-point:' +
					'</td>' +	
					'<td style="'+styleValue+'">' +							
						'@screen-'+currentBootstrapBreakPoint +						
					'</td>' +							
				'</tr>' +
				'<tr>';
			}
			infoHtml+= '<td style="'+styleLabel+'">' +					
					'width:' +
				'</td>' +	
				'<td style="'+styleValue+'">' +
					 $(window).width() + 'px' +
				'</td>' +						
			'</tr>' +
			'<tr>' +					
				'<td style="'+styleLabel+'">' +							
					'height:' +
				'</td>' +	
				'<td style="'+styleValue+'">' +	
					 $(window).height() + 'px' +
				'</td>' +													
			'</tr>' +
			'<tr>' +					
				'<td style="'+styleLabel+'">' +						
					'offsetTop:' + 
				'</td>' +	
				'<td style="'+styleValue+'">' +	
					 $(window).scrollTop() + 'px' +
				'</td>' +													
			'</tr>' +
		'</table>' + 													
		'<div class="move moveBottom" style="text-align:center;;cursor:pointer;color:red;">▼</div>' +								
		'</div>';	
		$('.mode-informer').html(infoHtml);
			
		return currentBootstrapBreakPoint;
	}
	
	$('.moveLeft').live('click', function(){
		$('.mode-informer').css({
			left: 10,
			right: 'auto'
		});
	});
	
	$('.moveRight').live('click', function(){
		$('.mode-informer').css({
			left: 'auto',
			right: 10
		});
	});
	
	$('.moveTop').live('click', function(){
		$('.mode-informer').css({
			top: 10,
			bottom: 'auto',
		});
	});
	
	$('.moveBottom').live('click', function(){
		$('.mode-informer').css({
			top: 'auto',
			bottom: 10,
		});
	});			
	
	$(window).resize(function(e){
		findBootstrapBreakPoints(e);
	});
	$(window).scroll(function(e){
		findBootstrapBreakPoints(e);
	});
	$(document).ready(function(e){
		$('<div class="mode-informer" style="z-index:99999; opacity:0.75;background:#000;color:#fff;padding:10px;border-radius:4px;position: fixed;bottom:10px;right:10px">%mode%</div>').appendTo('body').hover(function(){
			$(this).css('opacity', 1);
		},function(){
			$(this).css('opacity', 0.75);			
		});
		findBootstrapBreakPoints(e);
	});	
	
}( jQuery ));
