var currentBootstrapBreakPoint;	
var version;
var gutter;
(function( $ ) {
	
	
	function printInfo() {
		var styleLabel = 'font-size:13px; color:#00ff00; font-weight:bold; padding-right: 5px; text-align: right; font-family: monospace;';
		var styleValue = 'font-size:13px; font-family: monospace; color:#ffffff;';
		var brHtml = '<br />';				
		var infoHtml = '<div style="position:relative">' +
		'<div class="move closeBox" style="position:absolute;right:5px;font-size:15px;cursor:pointer;color:red;font-weight:bold;">X</div>' +		
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
				'<tr>' +
					'<td style="'+styleLabel+'">' +				
						'.container' +
					'</td>' +	
					'<td style="'+styleValue+'">' +							
						 $('.container').width() + 'px' +	
					'</td>' +							
				'</tr>' +
				'<tr>' +
					'<td style="'+styleLabel+'">' +				
						'gutter' +
					'</td>' +	
					'<td style="'+styleValue+'">' +							
						 gutter +	
					'</td>' +							
				'</tr>' +
				'</tr>';
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
			'<tr><td colspan="2" style="font-size:14px;text-align: center; color: white;font-weight: bold; font-family: monospace; cursor:pointer" class="toggleGrid">' +
				'toggleGrid()' +
			'</td></tr>' +
		'</table>' + 													
		'<div class="move moveBottom" style="text-align:center;cursor:pointer;color:red;">▼</div>' +								
		'</div>';	
		$('.mode-informer').html(infoHtml);

		if($('#grid-debugger').is(':visible')){
			$('.toggleGrid').css({color: '#00ff00'});
		}else{
			$('.toggleGrid').css({color: 'white'});
		}
		
		$('.toggleGrid').off('click').on('click', function(){
			toggleGrid();
		});

		$('.moveLeft').off('click').on('click', function(){
			$('.mode-informer').css({
					left: 10,
					right: 'auto'
				});
		});
		
		$('.moveRight').off('click').on('click', function(){
			$('.mode-informer').css({
				left: 'auto',
				right: 10
			});
		});
		
		$('.moveTop').off('click').on('click', function(){
			$('.mode-informer').css({
				top: 10,
				bottom: 'auto',
			});
		});
		
		$('.moveBottom').off('click').on('click', function(){
			$('.mode-informer').css({
				top: 'auto',
				bottom: 10,
			});
		});		
		
		$('.closeBox').off('click').on('click', function(){
			$('.mode-informer').hide();
		});		
	}
	
	function findBootstrapBreakPoints(e) {
		if(version == '3.x' || !version){
			var envs = ['xs', 'sm', 'md', 'lg'];
			$el = $('<div>');
			$el.appendTo($('body'));
			for (var i = envs.length - 1; i >= 0; i--) {
				var env = envs[i];
				$el.addClass('hidden-'+env);
				if ($el.is(':hidden')) {
					$elGutter = $('<div>');
					$elGutter.addClass('col-'+env+'-1');
					gutter = $elGutter.css('padding-left');
					$elGutter.remove();
					$el.remove();
					try {
						console.log(env);
					}catch(Exception){
						
					}
					if(env){
						currentBootstrapBreakPoint = env;
						version = '3.x';
						printInfo();
						return env;					
					}
				}
			}
		}
		
		if(version == '2.x' || !version){
			var envs = ['phone', 'tablet', 'desktop'];
			$el = $('<div>');
			$el.appendTo($('body'));
		
			for (var i = envs.length - 1; i >= 0; i--) {
				var env = envs[i];
				$el.addClass('hidden-'+env);
				if ($el.is(':hidden')) {
					$elGutter = $('<div>');
					$elGutter.addClass('span1');
					gutter = $elGutter.css('padding-left');
					$el.remove();
					try {
						console.log(env);
					}catch(Exception){
						
					}
					if(env){
						currentBootstrapBreakPoint = env;
						version = '2.x';
						printInfo();
						return env;
					}
				}
			}
		}
		printInfo();
		return;
	}

	function gridCreate(){
		//$('#grid-debugger').remove();

		$('<div />', {id: "grid-debugger"}).css({
			'display': 'none',
			'height': '100%',
			'width': '100%',
		    'box-sizing': 'padding-box',
		    'height': '100%',
		    'left': 0,
		    'pointer-events': 'none',
		    'position': 'fixed',
		    'top': 0,
		    'z-index': 9999
		}).prependTo('body');

		$('<div />', { class: "container" }).css({height: '100%'})
		.appendTo('#grid-debugger');

		$('<div />', { class: "row" }).css({height: '100%'}).appendTo('#grid-debugger .container');

		if(version = '3.x'){
			classColumn = 'col-xs-1 col-sm-1 col-md-1 col-lg-1';
			htmlColumn = '<div class="visible-xs">xs</div><div class="visible-sm">sm</div><div class="visible-md">md</div><div class="visible-lg">lg</div>';
		}else{
			classColumn = 'span1';
			htmlColumn = '<div class="visible-phone">phone</div><div class="visible-tablet">tablet</div><div class="visible-desktop">desktop</div>';
		}

		for (i = 12; i >= 1; i--) { 
		  $('<div />', { class: classColumn, id: 'checkWidth'+i})
		    .css({
		    	'height': '100%',
		      	'background-color': 'black',
			    'border-color': 'white',
			    'border-style': 'solid',
			    'opacity': '0.1',
			    'outline': '1px solid red',
			    'text-align': 'center',
			    'font-size': '18px',
			    'font-weight': 'bold',
			    'font-family': 'monospace',
			    'color': 'white'
			})
		  .html(htmlColumn+' <div class="infoWidth"></div>')
		  .prependTo('#grid-debugger .container .row');
		}
		//Adjust gutter
		$('#grid-debugger .container .row > div').css({
			'padding': 0,
			'border-width': '0 '+gutter
		}).hover(function(){
			$(this).css('opacity', '0.75');
		},function(){
			$(this).css('opacity', '0.1');
		})
		//console.log($('#checkWidth1').width());
		//$('#grid-debugger .container .row div.infoWidth').html( $('#checkWidth1').width() + 'gutter '+gutter );
		//$('#grid-debugger .container .row div.infoWidth').html( 'gutter '+gutter );
	}

	function toggleGrid(){
		$('#grid-debugger').toggle('fade', function(){
			if($(this).is(':visible')){
				$('.toggleGrid').css({color: '#00ff00'});
			}else{
				$('.toggleGrid').css({color: 'white'});
			}
		});
	}


	$(window).resize(function(e){
		findBootstrapBreakPoints(e);
	});
	$(window).scroll(function(e){
		findBootstrapBreakPoints(e);
	});
	$(document).ready(function(e){
		$('<div class="mode-informer" style="z-index:99999; opacity:0.75;background:#000;color:#fff;padding:10px 20px;border-radius:4px;position: fixed;bottom:10px;right:10px">%mode%</div>').appendTo('body').hover(function(){
			$(this).css('opacity', 1);
		},function(){
			$(this).css('opacity', 0.75);			
		});

		findBootstrapBreakPoints(e);
		gridCreate();
	});	

	
}( jQuery ));
