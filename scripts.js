
(function(){
	var $window = $(window);
	var isBig = $window.scrollTop()!=0;
	$window.scroll(function(){
		var window_top = $window.scrollTop();
		if(window_top > 0 && !isBig){
			isBig = true;
			$("#profile").switchClass("profile-card","profile-card-small");
			$("#profile-image").switchClass("profile-image","profile-image-small");
			$("#header").switchClass("top-padding","top-padding-small");
		}
		if(window_top == 0 && isBig) {
			isBig = false;
			$("#profile").switchClass("profile-card-small","profile-card");
			$("#profile-image").switchClass("profile-image-small","profile-image");
			$("#header").switchClass("top-padding-small","top-padding");
		}
	})
})();
