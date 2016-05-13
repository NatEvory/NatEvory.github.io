
(function(){
	var $window = $(window);
	var isBig = $window.scrollTop()!=0;
	$window.scroll(sizeProfile);

	function sizeProfile(){
		var window_top = $window.scrollTop();
		if(window_top > 100 && !isBig){
			isBig = true;
			shrinkProfile();
		}
		if(window_top == 0 && isBig) {
			isBig = false;
			growProfile();
		}
	}

	function shrinkProfile(){
		$("#profile").switchClass("profile-card","profile-card-small");
		$("#profile-image").switchClass("profile-image","profile-image-small");
		$("#header").switchClass("top-padding","top-padding-small");
	}
	function growProfile(){
		$("#profile").switchClass("profile-card-small","profile-card");
		$("#profile-image").switchClass("profile-image-small","profile-image");
		$("#header").switchClass("top-padding-small","top-padding");
	}
})();
