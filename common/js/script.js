(function( $ ) {

	var rightKey, leftKey;

	$(document).ready(function() {

		var eve = {
			asr: function( e ) {
				$(e).addClass("active").siblings().removeClass("active");
			}
		}

		$(document).on({
			keydown: function( e ) {
				if ( e.keyCode == 37 && typeof leftKey === "function" ) {
					leftKey();
				} else if ( e.keyCode == 39 && typeof rightKey === "function" ) {
					rightKey();
				}
			},
			mousewheel: function( e ) {
				if ( e.originalEvent.wheelDelta > 0 ) {
					if ( typeof leftKey === "function" ) leftKey();
				} else {
					if ( typeof rightKey === "function" ) rightKey();
				}
			}
		});
		parallax.add($("#index"))
				.add($("#index1"))
				.add($("#index2"))
				.add($("#index3"));
		parallax.background = $("body");
		parallax.scaling = 1;

		parallax.preload = function(){
			rightKey = leftKey = "";
			$(".control").hide();
		};

		parallax.index.onload = function(){
			setRight("index1");
			$(".footer-menu > li").removeClass("active");
			$("#scene .layer1").animate({
				opacity: 1,
				left: 0,
				bottom: 50
			}, 500, "easeInCirc");
			$("#scene .layer2").animate({
				opacity: 1,
				right: 80,
				bottom: 300
			}, 500, "easeInCirc");
			setTimeout(function() {
				$(".ev-text, .ev-logo").addClass("active");
			}, 500);
		};
		parallax.index1.onload = function(){
			setLeft("index");
			setRight("index2");
			$("#index1").delay(800).fadeIn("1000", "swing");
			$(".ev-text, .ev-logo").removeClass("active");
			$("#scene .layer1").css({
				opacity: 0,
				left: -50,
				bottom: 100
			}, 800, "easeInCirc");
			$("#scene .layer2").css({
				opacity: 0,
				right: -50,
				bottom: 400
			}, 800, "easeInCirc");
			// $("#event1").addClass("animated fadeInDown");
			// $('#event1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			// 	$(this).removeClass();
			// });
			eve.asr(".footer-menu > li:nth-child(1)");
		};
		parallax.index2.onload = function(){
			setLeft("index1");
			setRight("index3");
			eve.asr(".footer-menu > li:nth-child(2)");
		};
		parallax.index3.onload = function(){
			setLeft("index2");
			eve.asr(".footer-menu > li:nth-child(3)");
		};

		function setLeft( page ){
			$(".control-left").show().unbind("click").click(function() {
				parallax[page].left();
			});
			leftKey = function(){
				parallax[page].left();
			};
		}
		function setRight( page ){
			$(".control-right").show().unbind("click").click(function() {
				parallax[page].right();
			});
			rightKey = function(){
				parallax[page].right();
			};
		}

		parallax.index.show();

		$("body").on( "click", ".footer-menu > li", function() {

			var page = $(this).data("page"),
				rep = parseInt(page.replace("index", ""));

			parallax.current.hide();

			$(this).addClass("active").siblings().removeClass("active");

			switch( page ) {
				case "index1":
					$("body").stop().animate({
						"background-position-x": "-1920px"
					}, {
						complete: function() {
							parallax[page].show();
						}
					}, 1000, "swing");
					break;
				case "index2":
					$("body").stop().animate({
						"background-position-x": "-3840px"
					}, {
						complete: function() {
							parallax[page].show();
						}
					}, 1000, "swing");
					break;
				case "index3":
					$("body").stop().animate({
						"background-position-x": "-5760px"
					}, {
						complete: function() {
							parallax[page].show();
						}
					}, 1000, "swing");
					break;
			}

		});

		// event2
		$("body").on( "click", ".arms-box .arms", function() {
			var arms = $(this).data("arms"),
				mWeapon = $(".arms-img .arms-main-weapon"),
				sWeapon = $(".arms-img .arms-sub-weapon");

			if ( mWeapon.find("> img").length == 0 || sWeapon.find("> img").length == 0 ) {
				$(this).fadeOut("500");
				if ( mWeapon.find("> img").length == 0 ) {
					mWeapon.find(".arms-close").show();
					mWeapon.append("<img src='./common/img/weapon_"+ arms +".png' data-code='"+ arms +"'>");
				} else {
					sWeapon.find(".arms-close").show();
					sWeapon.append("<img src='./common/img/weapon_"+ arms +".png' data-code='"+ arms +"'>");
				}
			} else {
				alert("무기는 2개이상 선택할수 없습니다.");
			}
		});
		$("body").on( "click", ".arms-close", function() {
			var code = $(this).next("img").data("code");
			$(this).next("img").remove();
			$(".arms-box .arms[data-arms='"+code+"']").fadeIn("500");
		});
	});
})( jQuery );