(function ($) {
	layer.config({
	  extend: ['skin/geyskin/style.css'], //加载您的扩展样式
	  skin: 'layer-ext-geyskin'
	});
	var prilayer, Prilayer;


	function DefaultData() {}
	DefaultData.prototype = {
		move: false,
		closeBtn: 1,
		title: '浪里个浪',
		shift: 0,
		shadeClose: true,
		width: 'auto',
		height: 'auto',
		confirm: '你好吗？',
		content: '<div style="padding:50px;">老鸨子划船不用浆啊，全靠浪~~~</div>',
		btn: ['确认', '取消'],
		trigger: 'hover',
		direction: 1,
		time: 0,
		tip: '我是小提示！',
		tipColor: "#F90",
		selector: 'a',
		url:'http://www.layui.com',
		maxmin: true,
		events: [],
		titleicon: 0,
		importantMsgType: '1',
		importantMsg: '唱起来！',
		importantSubmsg: '拉尔啦~拉尔啦~拉尔~拉尔啦！',
		minWidth: "560px",
		type: 1,//针对msg类型写的有success等
		msgContent: "我是msg！",
		time: 2000,//默认msg存在时间为3s
		msgEvent: function () {
			console.log("msg")
		},
		success: function(layero, index){
	    console.log(layero, index);
	  }

	}
	function createTitleIcon(index,iconType) {
		var title = $("#layui-layer"+index).find(".layui-layer-title").text();
		var titleIcon = "<span class='layui-layer-ico title-icon title-icon"+iconType+"'></span><span class='title-text'>"+title+"</span>";
		$("#layui-layer"+index).find(".layui-layer-title").html(titleIcon);

	}
	function initData(thisObj,settings) {
		$.extend(thisObj, settings);
    thisObj.success()
		if((thisObj.content.indexOf('#') == 0) || (thisObj.content.indexOf('.')) == 0) {
			thisObj.content = $(thisObj.content).html();
		}else {
			thisObj.content = thisObj.content;
		}
	}

	Prilayer = {
		defaultData: {},
		init: function (settings) {
			this.defaultData = new DefaultData();
			initData(this.defaultData,settings);
		},
		custom: function($prilayer) {
			var thisObj = this;
			$prilayer.on('click', function() {
				thisObj.init($(this).data());
				var defaultData = thisObj.defaultData;
				var customIndex = layer.open({
					type: 1,
					title: defaultData.title,
					closeBtn: defaultData.closeBtn,
					shift: defaultData.shift,
					shadeClose: defaultData.shadeClose,
					move: defaultData.move,
					area:[defaultData.width, defaultData.height],
					content: defaultData.content
				});
				layer.style(customIndex, {
					minWidth:defaultData.minWidth
				})
				createTitleIcon(customIndex, defaultData.titleicon);
			});
		},
		importantMsg: function($prilayer) {
			var thisObj = this;
			$prilayer.on('click', function() {
				thisObj.init($(this).data());
				var defaultData = thisObj.defaultData;

				var customIndex = layer.open({
					type: 1,
					title: defaultData.title,
					closeBtn: defaultData.closeBtn,
					shift: defaultData.shift,
					shadeClose: defaultData.shadeClose,
					move: defaultData.move,
					area:[defaultData.width, defaultData.height],
					content: '<div class="layer-import-msg-block">'+
							'<div class="main-msg main-msg'+ defaultData.importantMsgType +'">'+
							'<span class="layer-icon layer-icon'+defaultData.importantMsgType+'"></span>'+ defaultData.importantMsg+
							'</div>'+
							'<p class="submsg">'+ defaultData.importantSubmsg +'</p></div>'
				});
				layer.style(customIndex, {
					minWidth:defaultData.minWidth
				})
				createTitleIcon(customIndex, defaultData.titleicon);
			});
		},
		tips: function($prilayer) {
			var thisObj = this;
			thisObj.init($prilayer.data());
			var defaultData = thisObj.defaultData;
			if(defaultData.trigger == 'hover') {
				var tipIndex;
				$prilayer.on('mouseover', function() {
					tipIndex = layer.tips(defaultData.tip, $(this), {
						tips: [defaultData.direction, defaultData.tipColor],
						time: defaultData.time
					})
				});
				$prilayer.on('mouseleave', function() {
					layer.close(tipIndex);
				});
			}else if(defaultData.trigger == 'click') {

				var tipIndex;
				$(document).on('click',function(){
					layer.close(tipIndex);
				})
				$prilayer.on('click', function(event) {
					event.stopPropagation();
					tipIndex = layer.tips(defaultData.tip, $(this), {
						tips: [defaultData.direction, defaultData.tipColor],
						time: defaultData.time
					});
				});
			}
		},
		iframe: function($prilayer) {
			var thisObj = this;
			$prilayer.on('click', function() {
				thisObj.init($(this).data());
				var defaultData = thisObj.defaultData;
				var iframeIndex = layer.open({
					type: 2,
					title: defaultData.title,
					closeBtn: defaultData.closeBtn,
					shift: defaultData.shift,
					shadeClose: defaultData.shadeClose,
					move: defaultData.move,
					area: [defaultData.width, defaultData.height],
					maxmin: defaultData.maxmin,
					content: defaultData.url
				});
				createTitleIcon(iframeIndex, defaultData.titleicon);
			});
		},
		msg: function($prilayer) {
			var thisObj = this;
			var typeObj = {
				"success": 1,
				"error": 2,
				"question": 3,
				"locked": 4,
				"sadface": 5,
				"happyface": 6,
				"prompt": 7,
				"loading": 8,
				"warn": 9
			}
			$prilayer.on("click", function() {
				thisObj.init($(this).data());
				var defaultData = thisObj.defaultData;
				var msgIndex = layer.msg(defaultData.content,
				{
					icon: typeObj[defaultData.type],
					time: defaultData.time,
					shade: [0.1, '#ffffff']
				})
				$("#layui-layer"+msgIndex).addClass("prilayer-msg prilayer-msg-"+defaultData.type);
			})
		}
	}
	$(".prilayer").each(function() {
		var $prilayer = $(this);
		var dataObj = $(this).data();
		var layertype = dataObj.layertype;
		if(layertype == 'custom') {
			Prilayer.custom($prilayer);
		}else if(layertype == 'confirm') {
			Prilayer.confirm($prilayer, dataObj);
		}else if(layertype == 'tips') {
			Prilayer.tips($prilayer, dataObj);
		}else if(layertype == 'iframe') {
			Prilayer.iframe($prilayer);
		}else if(layertype == 'importantMsg') {
			Prilayer.importantMsg($prilayer);
		}else if(layertype == 'msg') {
			Prilayer.msg($prilayer);
		}
	});
	window.prilayer = {
		defaultData: {},
		init: function (settings) {
			this.defaultData = new DefaultData();
			initData(this.defaultData,settings);
		},
		custom: function (settings) {
			this.defaultData = new DefaultData();
			this.init(settings);
			var customIndex = layer.open({
				type: 1,
				title: this.defaultData.title,
				closeBtn: this.defaultData.closeBtn,
				shift: this.defaultData.shift,
				shadeClose: this.defaultData.shadeClose,
				move: this.defaultData.move,
				area:[this.defaultData.width, this.defaultData.height],
				content: this.defaultData.content
			});
			layer.style(customIndex, {
				minWidth:this.defaultData.minWidth
			})
			createTitleIcon(customIndex, this.defaultData.titleicon);
		},
		importantMsg: function(settings) {
			this.defaultData = new DefaultData();
			this.init(settings);

			var customIndex = layer.open({
				type: 1,
				title: this.defaultData.title,
				closeBtn: this.defaultData.closeBtn,
				shift: this.defaultData.shift,
				shadeClose:this. defaultData.shadeClose,
				move: this.defaultData.move,
				area:[this.defaultData.width, this.defaultData.height],
				content: '<div class="layer-import-msg-block">'+
						'<div class="main-msg main-msg'+ this.defaultData.importantMsgType +'">'+
						'<span class="layer-icon layer-icon'+this.defaultData.importantMsgType+'"></span>'+ this.defaultData.importantMsg+
						'</div>'+
						'<p class="submsg">'+ this.defaultData.importantSubmsg +'</p></div>'
			});
			layer.style(customIndex, {
				minWidth: this.defaultData.minWidth
			});
			createTitleIcon(customIndex, this.defaultData.titleicon);

		},
		confirm: function (settings) {
			this.defaultData = new DefaultData();
			this.init(settings);
			var confirmIndex = layer.confirm (this.defaultData.confirm, {
					btn: this.defaultData.btn
				},
				this.defaultData.events[0],
				this.defaultData.events[1]
			)
			createTitleIcon(confirmIndex, this.defaultData.titleicon);
		},
		tips: function (settings) {
			this.defaultData = new DefaultData();
			this.init(settings);
			var defaultData = this.defaultData;
			if(defaultData.trigger == 'hover') {
				var tipIndex;
				$(defaultData.selector).on('mouseover', function() {
					tipIndex = layer.tips(defaultData.tip, $(this), {
						tips: [defaultData.direction, defaultData.tipColor],
						time: defaultData.time
					})
				});
				$(defaultData.selector).on('mouseleave', function() {
					layer.close(tipIndex);
				});
			}else if(defaultData.trigger == 'click') {
				var tipIndex;
				$(document).on('click',function(){
					layer.close(tipIndex);
				})
				$(defaultData.selector).on('click', function(event) {
					event.stopPropagation();
					tipIndex = layer.tips(defaultData.tip, $(this), {
						tips: [defaultData.direction, defaultData.tipColor],
						time: defaultData.time
					});
				});
			}
		},
		iframe: function(settings) {
			this.defaultData = new DefaultData();
			this.init(settings);
			var defaultData = this.defaultData;
			var iframeIndex = layer.open({
				type: 2,
				title: defaultData.title,
				closeBtn: defaultData.closeBtn,
				shift: defaultData.shift,
				shadeClose: defaultData.shadeClose,
				move: defaultData.move,
				area: [defaultData.width, defaultData.height],
				maxmin: defaultData.maxmin,
				content: defaultData.url
			});
			createTitleIcon(iframeIndex, defaultData.titleicon);
		},
		msg: function(settings) {
			this.defaultData = new DefaultData();
			this.init(settings);
			var defaultData = this.defaultData;
			var typeObj = {
				"success": 1,
				"error": 2,
				"question": 3,
				"locked": 4,
				"sadface": 5,
				"happyface": 6,
				"prompt": 7,
				"loading": 8,
				"warn": 9
			}
			var msgIndex = layer.msg(defaultData.content,
			{
				icon: typeObj[defaultData.type],
				time: defaultData.time,
				shade: [0.1, '#ffffff']
			},defaultData.msgEvent)
			$("#layui-layer"+msgIndex).addClass("prilayer-msg prilayer-msg-"+defaultData.type);
		}
	}
	$(document).on("click",".prilayer-cancel-btn", function () {
		var index = layer.index;
		layer.close(index);
	});
})(jQuery)
