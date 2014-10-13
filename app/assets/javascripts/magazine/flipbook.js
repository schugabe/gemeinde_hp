var FLIPBOOK = FLIPBOOK || {};

{/* Main */
(function init(jQuery, window, document, undefined) {

	jQuery.fn.flipBook = function (options) {
		//entry point
		var flipBook = new Main();
		flipBook.init(options, this);
		return flipBook;
	};

	// DEFAULT OPTIONS
	jQuery.fn.flipBook.options = {

		//pdf file
		pdfUrl : "",
		pdfPageScale:1,
		
		rightToLeft : false,
		/*array of page objects - this must be passed to plugin constructor
		{
			src:"page url",
			thumb:"thumb url",
		}*/
		pages : [],
		
		/*array of table_of_content objects
		{
			title:"Cover",
			page:"1",
		}*/
		tableOfContent:[],
		
		adds : [],
		
		deeplinking: {
    		// deep linking options go gere
    		enabled: false,
    		prefix: ""
    	},

		rootFolder : "",

		assets : {
			preloader : "images/preloader.jpg",
			left : "images/left.png",
			overlay : "images/overlay.png",
			flipMp3 : "/turnPage.mp3"
		},

		//page that will be displayed when the book starts
		startPage : 0,
		
		//if the sound is enabled
		sound:true,
		
		backgroundColor:"#818181",
		backgroundPattern:"",

		//book default settings
		pageWidth : 1000,
		pageHeight : 1414,
		thumbnailWidth : 100,
		thumbnailHeight : 141,
		
		loadAllPages:false,

		//menu buttons
		currentPage : {enabled:true, title:"Current page"},
		btnNext : {enabled:true, title:"Next page", icon:"fa-chevron-right"},
		btnPrev : {enabled:true, title:"Previous page", icon:"fa-chevron-left"},
		btnZoomIn : {enabled:true, title:"Zoom in", icon:"fa-plus"},
		btnZoomOut : {enabled:true, title:"Zoom out", icon:"fa-minus"},
		btnToc : {enabled:true, title:"Table of content", icon:"fa-list-ol"},
		btnThumbs : {enabled:true, title:"Pages", icon:"fa-th-large"},
		btnShare : {enabled:true, title:"Share", icon:"fa-link"},
		btnDownloadPages : {enabled:true, title:"Download pages", icon:"fa-download" ,url:"images/pages.zip"},
		btnDownloadPdf : {enabled:true, title:"Download PDF", icon:"fa-file" ,url:"images/pages.pdf"},
		btnSound : {enabled:true, title:"Volume", icon:"fa-volume-up"},
		btnExpand : {enabled:true, title:"Toggle fullscreen", icon:"fa-expand", iconAlt:"fa-compress"},
		btnExpandLightbox : {enabled:true, title:"Toggle fullscreen", icon:"fa-expand", iconAlt:"fa-compress"},
		
		
		/*
			array of social share buttons
			each social button is an object that needs to have ison, url, name and target properties 
			
			@icon - CSS class of the icon
			@url - link that will open when the button is clickedPage
			@name - text description of the button
			@target - if the link will be opened in new window ("_blank") or in the same window ("_self")
			
			for example
			
			socialShare : [
				{ 	icon:"fa-facebook", 
					url:"http://www.facebook.com", 
					name:"Facebook", 
					target:"_self"},
				{ 	icon:"fa-twitter", 
					url:"http://www.twitter.com", 
					name:"Facebook", 
					target:"_blank"}
			]
			
			list of supported icons can be found here: http://fortawesome.github.io/Font-Awesome/icons/ 
		*/
		socialShare:[],

		
		//flip animation type; can be "2d" or "3d"
		flipType : '3d',

		zoom : 1,
		zoomMin : .85,
		zoomMax : 6,
		zoomLevels : [0.8,1,2,3,4],
		zoomDisabled : false, 
		
		//flip animation parameters
		time1 : 300,
		transition1 : 'easeInSine',
		time2 : 400,
		transition2 : 'easeOutSine',

		
		//lightbox settings
		lightBox : false,
		lightBoxOpened : false,
		lightBoxFullscreen : false,
		lightboxTransparent : true,
		lightboxPadding : 0,
		lightboxMargin : 20,

		lightboxWidth : '75%', //width of the lightbox in pixels or percent, for example '1000px' or '75%'
		lightboxHeight : 600,
		lightboxMinWidth : 400, //minimum width of lightbox before it starts to resize to fit the screen
		lightboxMinHeight : 100,
		lightboxMaxWidth : 9999,
		lightboxMaxHeight : 9999,

		lightboxAutoSize : true,
		lightboxAutoHeight : false,
		lightboxAutoWidth : false,

		//WebGL settings
		webgl : true,
		renderer : "webgl", // "webgl" or "canvas"
		//web gl 3d settings
		cameraDistance : 2500,

		pan : 0,
		panMax : 10,
		panMin : -10,
		tilt : 0,
		tiltMax : 5,
		tiltMin : -30,

		//book
		bookX : 0,
		bookY : 0,
		bookZ : 0,

		//pages
		pageMaterial : 'phong', // page material, 'phong', 'lambert' or 'basic'
		pageShadow : true,
		pageHardness : 2,
		coverHardness : 2,
		pageSegmentsW : 10,
		pageSegmentsH : 1,
		pageShininess : 25,
		pageFlipDuration : 2,

		//point light
		pointLight : true, // point light enabled
		pointLightX : 0, // point light x position
		pointLightY : 200, // point light y position
		pointLightZ : 1500, // point light z position
		pointLightColor : 0xffffff, // point light color
		pointLightIntensity : 0.04, // point light intensity

		//directional light
		directionalLight : false, // directional light enabled
		directionalLightX : 0, // directional light x position
		directionalLightY : 0, // directional light y position
		directionalLightZ : 2000, // directional light z position
		directionalLightColor : 0xffffff, // directional light color
		directionalLightIntensity : 0.01, // directional light intensity

		//ambient light
		ambientLight : true, // ambient light enabled
		ambientLightColor : 0xffffff, // ambient light color
		ambientLightIntensity : 1, // ambient light intensity

		//spot light
		spotLight : false, // spot light enabled
		spotLightX : 0, // spot light x position
		spotLightY : 0, // spot light y position
		spotLightZ : 5000, // spot light z position
		spotLightColor : 0xffffff, // spot light color
		spotLightIntensity : 0.2, // spot light intensity
		spotLightShadowCameraNear : 0.1, // spot light shadow near limit
		spotLightShadowCameraFar : 10000, // spot light shadow far limit
		spotLightCastShadow : true, // spot light casting shadows
		spotLightShadowDarkness : 0.5, // spot light shadow darkness

		skin : "light", //dark, light

		contentOnStart : false,
		thumbnailsOnStart : false
	};
	

	
	var Main = function () {};

	Main.prototype = {
		init : function (options, elem) {

			var self = this;
			self.elem = elem;
			self.jQueryelem = jQuery(elem);
			self.options = {};

			var dummyStyle = document.createElement('div').style,
			vendor = (function () {
				var vendors = 't,webkitT,MozT,msT,OT'.split(','),
				t,
				i = 0,
				l = vendors.length;

				for (; i < l; i++) {
					t = vendors[i] + 'ransform';
					if (t in dummyStyle) {
						return vendors[i].substr(0, vendors[i].length - 1);
					}
				}
				return false;
			})(),
			prefixStyle = function (style) {
				if (vendor === '')
					return style;

				style = style.charAt(0).toUpperCase() + style.substr(1);
				return vendor + style;
			},

			isAndroid = (/android/gi).test(navigator.appVersion),
			isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
			isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
			has3d = prefixStyle('perspective')in dummyStyle,
			hasTouch = 'ontouchstart' in window && !isTouchPad,
			RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
			CLICK_EV = hasTouch ? 'touchend' : 'click',
			START_EV = hasTouch ? 'touchstart' : 'mousedown',
			MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
			END_EV = hasTouch ? 'touchend' : 'mouseup',
			CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
			transform = prefixStyle('transform'),
			perspective = prefixStyle('perspective'),
			transition = prefixStyle('transition'),
			transitionProperty = prefixStyle('transitionProperty'),
			transitionDuration = prefixStyle('transitionDuration'),
			transformOrigin = prefixStyle('transformOrigin'),
			transformStyle = prefixStyle('transformStyle'),
			transitionTimingFunction = prefixStyle('transitionTimingFunction'),
			transitionDelay = prefixStyle('transitionDelay'),
			backfaceVisibility = prefixStyle('backfaceVisibility');


			self.has3d = has3d;
			self.hasWebGl = Detector.webgl;
			self.hasTouch = hasTouch;
			self.RESIZE_EV = RESIZE_EV;
			self.CLICK_EV = CLICK_EV;
			self.START_EV = START_EV;
			self.MOVE_EV = MOVE_EV;
			self.END_EV = END_EV;
			self.CANCEL_EV = CANCEL_EV;
			self.transform = transform;
			self.transitionProperty = transitionProperty;
			self.transitionDuration = transitionDuration;
			self.transformOrigin = transformOrigin;
			self.transitionTimingFunction = transitionTimingFunction;
			self.transitionDelay = transitionDelay;
			self.perspective = perspective;
			self.transformStyle = transformStyle;
			self.transition = transition;
			self.backfaceVisibility = backfaceVisibility;

			//default options are overridden by options object passed to plugin constructor
			self.options = jQuery.extend({}, jQuery.fn.flipBook.options, options);
			self.options.main = self;
			self.p = false;

			if(self.options.pdfUrl != "")
				self.options.pages = [];
			
			self.pages = self.options.pages;
			
			var zl = self.options.zoomLevels
			
			if(typeof zl == 'string')
				zl = zl.split(',')
				
			for (i=0;i<zl.length;i++){
				zl[i] = Number(zl[i])
			}
			
			self.options.zoomLevels = zl;
			
			self.options.zoomMin = zl[0]
			self.options.zoomMax = zl[zl.length-1]

			self.wrapper = jQuery(document.createElement('div'))
				.addClass('flipbook-main-wrapper');
				
			if(self.options.backgroundColor != "")
				self.wrapper.css('background', self.options.backgroundColor);
			if(self.options.backgroundPattern != "")
				self.wrapper.css('background', 'url('+self.options.backgroundPattern+') repeat');
				
			self.bookLayer = jQuery(document.createElement('div'))
				.addClass('flipbook-bookLayer')
				.appendTo(self.wrapper);
			self.bookLayer[0].style[self.transformOrigin] = '100% 100%';

			self.book = jQuery(document.createElement('div'))
				.addClass('book')
				.appendTo(self.bookLayer);

			this.createLoadingBar();
				
			//if pdf
			if(self.options.pdfUrl == ""){
				self.wrapper.appendTo(self.jQueryelem);
				self.start();
			}else{
				self.initPdf();
				if (!self.options.lightBox) {
					self.wrapper.appendTo(self.jQueryelem);
				}
			}
			
			this.flipsound = document.createElement('audio');
			this.flipsound.setAttribute('src', this.options.assets.flipMp3);
			this.flipsound.setAttribute('type', 'audio/mpeg')
			
			if(self.options.deeplinking.enabled){
				function getPageFromHash(){
					var res = parseInt(window.location.hash.replace(/#/g, '').replace(self.options.deeplinking.prefix, ""))
					if(isNaN(res)) res = 0;
					return res;
				}
				window.onhashchange = function(e){
					var targetPage = getPageFromHash() - 1
					if(self.options.rightToLeft)
						targetPage = self.options.pages.length - targetPage
					if(typeof(self.Book) != 'undefined')
						self.Book.goToPage(targetPage, true)
				}
				self.options.startPage = getPageFromHash()
				
				var page = self.options.startPage == 0 ? 1 : self.options.startPage;
				window.location.hash = "#" + this.options.deeplinking.prefix + String(page)
			}
			
			// jQuery(this).on("onTurnPageComplete", function(e){
				// self.updateCurrentPage()
				// if(self.options.deeplinking.enabled)
					// window.location.hash = "#" + this.options.deeplinking.prefix + String(this.currentPageNumber)
			// })
		},
		turnPageComplete:function(){
			
			this.updateCurrentPage()
			if(this.options.deeplinking.enabled)
				window.location.hash = "#" + this.options.deeplinking.prefix + String(this.currentPageNumber)
				
			jQuery(this).trigger("onTurnPageComplete")
		},
		playFlipSound:function(){
			if(this.options.sound && this.Book.enabled){
				try{
					this.flipsound.currentTime = 0;
					this.flipsound.play();
				}catch(err){}
			}
		},
		initPdf : function(){
		
			var self = this;
			
			//load pdf.js first
			
			var loadScript = function Util_loadScript(src, callback) {
					var script = document.createElement('script');
					var loaded = false;
					script.setAttribute('src', src);
					script.onload = function() {
						if (!loaded) {
							if (callback)
								callback.call(self);
						}
						loaded = true;
						FLIPBOOK.scriptsLoaded[src] = true;
					};
					document.getElementsByTagName('head')[0].appendChild(script);
				};
				
				
			if(!FLIPBOOK.scriptsLoaded[FLIPBOOK.compatibilityjsSrc]){
				loadScript(FLIPBOOK.compatibilityjsSrc, self.initPdf)
				return;
			}
				  
			if(!FLIPBOOK.scriptsLoaded[FLIPBOOK.pdfjsSrc]){
				loadScript(FLIPBOOK.pdfjsSrc, self.initPdf)
				return;
			}  
				  
			var self = this;
			PDFJS.disableWorker = true;
			PDFJS.workerSrc = FLIPBOOK.pdfjsworkerSrc
			
			function getDocumentProgress(progressData) {
			  console.log(progressData.loaded / progressData.total);
			  
			  self.setLoadingProgress(progressData.loaded / progressData.total);
			}
			
			PDFJS.getDocument(self.options.pdfUrl, null, false, getDocumentProgress).then(function (pdf) {
				self.onPdfOpen(pdf);
			});
		},
		start : function () {
			if(this.started)
				return;
			this.started = true;

			var self = this;
			
			
			//new
			if (self.options.lightBox) {
				self.lightbox = new FLIPBOOK.Lightbox(this, self.wrapper, self.options);
				if (self.options.lightboxTransparent == true) {
					self.wrapper.css('background', 'none');
					self.bookLayer.css('background', 'none');
					self.book.css('background', 'none');
				}
			}/*else{
				self.wrapper.appendTo(self.jQueryelem);
			}*/
			
			//if rtl reverse pageSegments
			if (self.options.rightToLeft) {
				self.pagesReversed = [];
				for (var i = self.options.pages.length - 1; i >= 0; i--) {
					self.pagesReversed.push(self.options.pages[i]);
				}
				self.options.pages = self.pagesReversed;
			}

			if (!self.has3d)
				self.options.flipType = '2d';

			this.createBook();
		},
		onPdfOpen : function (pdf) {

			var self = this;
			self.pdfDocument = pdf;
			
			var numPages = pdf.pdfInfo.numPages;

			for(var i=0;i<numPages;i++){
				self.pages.push({title:"Page " + String(i+1)})
			}
			// self.loadPageFromPdf(0, self.start);
			
			// if (self.options.lightBox) {
				// self.loadPagesFromPdf([0,1,2]);
			// }else{
				self.loadPagesFromPdf([0], self.start);
			// }
			
			// for(var i=0;i<numPages;i++){
				// i != numPages-1 ? self.loadPageFromPdf(i) : self.loadPageFromPdf(i, self.start)
			// }

		},
		loadPagesFromPdf : function (arr, callback) {
			var toLoad = arr[0], self = this;
			
			arr.shift()
			
			if(arr.length > 0){
				
				this.loadPageFromPdf(toLoad, function(){self.loadPagesFromPdf(arr,callback)})
			}
			else
				this.loadPageFromPdf(toLoad ,callback)
		},
		loadPageFromPdf : function (pageIndex, callback) {
			var self = this;
			var pdf = self.pdfDocument;
			var info = pdf.pdfInfo,
			numPages = info.numPages,
			context,
			scale = this.options.pdfPageScale;
			

			self.setLoadingProgress(.3)
			pdf.getPage(pageIndex + 1).then(function getPage(page) {
				self.setLoadingProgress(.6)
				var viewport = page.getViewport(scale);
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				
				self.options.pageWidth = viewport.width;
				self.options.pageHeight = viewport.height;
				
				var renderContext = {
				  canvasContext: context,
				  viewport: viewport,
				  intent:'print'
				};
				page.render(renderContext).then(function(){
					getImageFromCanvas(canvas,pageIndex);
					// context.clearRect(0, 0, canvas.width, canvas.height);
					callback.call(self)
					self.setLoadingProgress(1)
					// document.body.appendChild(canvas);
				});
			});

			//save canvas to image
			function getImageFromCanvas(canvas,pageIndex) {
				var url = canvas.toDataURL();
				self.pages[pageIndex].src = url;
			}
		},
		createBook : function () {
			var self = this;

			//WebGL mode
			if (self.options.webgl && self.hasWebGl) {

				var loadScript = function Util_loadScript(src, callback) {
					var script = document.createElement('script');
					var loaded = false;
					script.setAttribute('src', src);
					script.onload = function() {
						if (!loaded) {
							if (callback)
								callback.call(self);
						}
						loaded = true;
						FLIPBOOK.scriptsLoaded[src] = true;
					};
					document.getElementsByTagName('head')[0].appendChild(script);
				};
				  
				  if(!FLIPBOOK.scriptsLoaded[FLIPBOOK.threejsSrc]){
					loadScript(FLIPBOOK.threejsSrc, self.createBook)
					return;
				  }
				  if(!FLIPBOOK.scriptsLoaded[FLIPBOOK.flipbookWebGlSrc]){
					loadScript(FLIPBOOK.flipbookWebGlSrc, self.createBook)
					return;
				  }

				var bookOptions = self.options;
				bookOptions.pagesArr = self.options.pages;
				bookOptions.scroll = self.scroll;
				bookOptions.parent = self;
				self.Book = new FLIPBOOK.BookWebGL(self.book[0], bookOptions);
				self.webglMode = true;
			} else {
				self.Book = new FLIPBOOK.Book(self.book[0], self.options);

				self.scroll = new iScroll(self.bookLayer[0], {
						//                bounce:false,
						wheelAction : 'none',
						zoom : true,
						zoomMin : self.options.zoomMin,
						zoomMax : self.options.zoomMax,
						keepInCenterH : true,
						keepInCenterV : true,
						bounce : true
					});
				self.webglMode = false;
			}

			if(self.options.startPage % 2 == 1)
				self.options.startPage -= 1;
			
			//if(!self.options.lightBox || self.options.lightBoxOpened){
				
				if (self.options.rightToLeft) {
					self.Book.goToPage(Number(self.options.pages.length - Number(self.options.startPage) ), true);
				} else {
					self.Book.goToPage(Number(self.options.startPage));
				}
			//}
			
			
			jQuery(window).resize(function () {
				self.resize();
			});

			//keyboard evetns
			document.onkeydown = function (e) {
				e = e || window.event;
				switch (e.keyCode) {
				//left
				case 37: self.Book.prevPage(); break;
				//up
				case 38: self.zoomIn(); break;
				//right
				case 39: self.Book.nextPage(); break;
				//down
				case 40: self.zoomOut(); break;
				}
			}
			
			if(!self.options.zoomDisabled){
				//disable page scrolling
				jQuery(this.wrapper).on('DOMMouseScroll',function(e){e.preventDefault();});
				jQuery(this.wrapper).on('mousewheel',function(e){e.preventDefault();});	
			}
			
			
			this.Book.updateVisiblePages();
			
			// this.createNavigation();
			
			this.createToc(this.options.tableOfContent);
			
			//thumbs disabled for pdf mode
			if (self.options.pdfUrl == "" && self.options.btnThumbs.enabled) {
				this.createThumbs();
			}else{
				self.options.btnThumbs = {enabled:false}
			}
			this.createMenu();
			
			if (this.options.currentPage.enabled) {
				this.createCurrentPage();
				this.updateCurrentPage();
			}
			
			this.resize();
			
			this.zoom = this.options.zoom;
			
			
			//add mouse scroll listeners
			
			if(!this.options.zoomDisabled){
				//Firefox
				this.bookLayer.bind('DOMMouseScroll', function(e){
					 if(e.originalEvent.detail > 0) {
						 //scroll down
						 // console.log('Down');
						 self.zoomOut()
					 }else {
						 //scroll up
						 // console.log('Up');
						 self.zoomIn()
					 }
					 //prevent page fom scrolling
					 return false;
				 });

				 //IE, Opera, Safari
				 this.bookLayer.bind('mousewheel', function(e){
					 if(e.originalEvent.wheelDelta < 0) {
						 //scroll down
						 // console.log('Down');
						 self.zoomOut()
					 }else {
						 //scroll up
						 // console.log('Up');
						 self.zoomIn()
					 }
					 //prevent page fom scrolling
					 return false;
				 });
			}
			
 


			if (self.options.lightBox && !self.options.lightBoxOpened)
				self.Book.disable();
				
			// else
				// self.Book.enable();
			//init skin
			
			else {
				if (self.options.contentOnStart)
					self.toggleToc(true);
				if (self.options.thumbnailsOnStart)
					self.toggleThumbs(true);
			}	
					

			jQuery(".skin-color-bg").addClass("flipbook-bg-" + this.options.skin);
			jQuery(".skin-color").addClass("flipbook-color-" + this.options.skin);
			
		},
		createButton:function(btn){
				return jQuery(document.createElement('span'))
					.attr('aria-hidden', 'true')
					.appendTo(this.menu)
					.addClass(btn.icon)
					.addClass('flipbook-icon-general flipbook-menu-btn skin-color fa')
					.attr('title',btn.title)
		},
		createMenu : function () {
			if (this.p && this.options.pages.length != 24 && this.options.pages.length != 16 && this.options.pages.length != 8 && this.options.pages.length != 192)
				return;
			var self = this;
			this.menuWrapper = jQuery(document.createElement('div'))
				.addClass('flipbook-menuWrapper')
				.appendTo(this.wrapper);
			this.menu = jQuery(document.createElement('div'))
				.addClass('flipbook-menu')
				.addClass('skin-color-bg')
				.appendTo(this.menuWrapper);
			if (this.options.lightboxTransparent) {}

			if(self.options.btnPrev.enabled)
			this.btnPrev = this.createButton(self.options.btnPrev)
				.bind(this.CLICK_EV, function () {
					self.Book.prevPage();
				});
				
			if(self.options.btnNext.enabled)
			this.btnNext = this.createButton(self.options.btnNext)
				.bind(this.CLICK_EV, function () {
					self.Book.nextPage();
				});	
				
			if(self.options.btnZoomIn.enabled)
			this.btnZoomIn = this.createButton(self.options.btnZoomIn)
				.bind(this.CLICK_EV, function () {
					self.zoomIn();
				});	
				
			if(self.options.btnZoomOut.enabled)
			this.btnZoomOut = this.createButton(self.options.btnZoomOut)
				.bind(this.CLICK_EV, function () {
					self.zoomOut();
				});		
				
			if(self.options.btnToc.enabled)
			this.btnToc = this.createButton(self.options.btnToc)
				.bind(this.CLICK_EV, function () {
					self.toggleToc();
				});		
				
			if(self.options.btnThumbs.enabled)
			this.btnThumbs = this.createButton(self.options.btnThumbs)
				.bind(this.CLICK_EV, function () {
					self.toggleThumbs();
				});		
				
			if(self.options.btnShare.enabled && this.options.socialShare.length > 0){
			
				this.btnShare = this.createButton(self.options.btnShare)
					.bind(this.CLICK_EV, function () {
						self.toggleShare();
					});		
				this.createShareButtons();
			}
				
			if(self.options.btnDownloadPages.enabled)
			this.btnDownloadPages = this.createButton(self.options.btnDownloadPages)
				.bind(this.CLICK_EV, function () {
					window.location = self.options.btnDownloadPages.url;
				});		
				
			if(self.options.btnDownloadPdf.enabled)
			this.btnDownloadPdf = this.createButton(self.options.btnDownloadPdf)
				.bind(this.CLICK_EV, function () {
				
					if(self.options.pdfUrl != "")
						self.options.btnDownloadPdf.url = self.options.pdfUrl
						
					window.location = self.options.btnDownloadPdf.url;
				});	
				
			if (self.options.sound && self.options.btnSound.enabled) {
				this.btnSound = this.createButton(self.options.btnSound)
					.bind(this.CLICK_EV, function () {
						if (self.options.sound) {
							self.options.sound = false
							jQuery(this)
							.addClass('fa-volume-off')
							.removeClass('fa-volume-up');
						} else {
							self.options.sound = true
							jQuery(this)
							.addClass('fa-volume-up')
							.removeClass('fa-volume-off');
						}
					});
			}
				
			if (THREEx.FullScreen.available() && self.options.btnExpand.enabled) {
				this.btnExpand = this.createButton(self.options.btnExpand)
					.addClass('btnExpand')
					.bind(this.CLICK_EV, function () {
						if (THREEx.FullScreen.available()) {
							if (THREEx.FullScreen.activated()) {
								THREEx.FullScreen.cancel();
							} else {
								THREEx.FullScreen.request(self.wrapper[0]);
							}
						}
					});
					
					document.addEventListener("MSFullscreenChange", function () {
					  if (THREEx.FullScreen.activated()) {
							jQuery('.btnExpand')
							.addClass(self.options.btnExpand.iconAlt)
							.removeClass(self.options.btnExpand.icon);
					  } else {
							jQuery('.btnExpand')
							.addClass(self.options.btnExpand.icon)
							.removeClass(self.options.btnExpand.iconAlt);							  
					  }
				  });
				  
				  document.addEventListener("mozfullscreenchange", function () {
					  if (THREEx.FullScreen.activated()) {
							jQuery('.btnExpand')
							.addClass(self.options.btnExpand.iconAlt)
							.removeClass(self.options.btnExpand.icon);
					  } else {
							jQuery('.btnExpand')
							.addClass(self.options.btnExpand.icon)
							.removeClass(self.options.btnExpand.iconAlt);							  
					  }
				  });
				  
				  document.addEventListener("webkitfullscreenchange", function () {
					  if (THREEx.FullScreen.activated()) {
							jQuery('.btnExpand')
							.addClass(self.options.btnExpand.iconAlt)
							.removeClass(self.options.btnExpand.icon);
					  } else {
							jQuery('.btnExpand')
							.addClass(self.options.btnExpand.icon)
							.removeClass(self.options.btnExpand.iconAlt);					  
					  }
				  });
			}
		},
		
		createLoadingBar : function(){
			this.loadingBar = jQuery(document.createElement('div'))
				.addClass('flipbook-loading-bar')
				.appendTo(this.wrapper);
				
			this.progressBar = jQuery(document.createElement('div'))
				.addClass('flipbook-progress-bar')
				.appendTo(this.loadingBar);
				
			
			
			
			
			this.loadingGif = jQuery('<div id="floatingCirclesG"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div><div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div><div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div>')
			.appendTo(this.wrapper);
			
			
			this.setLoadingProgress(0);
		},
		
		setLoadingProgress : function(percent){
			if(percent > 0 && percent < 1){
				this.loadingBar.css('display', 'block');
				this.loadingGif.css('display', 'block');
			}else{
				this.loadingBar.css('display', 'none');
				this.loadingGif.css('display', 'none');
			}
			this.progressBar.css('width', (percent * 100).toString() +'%');
		},
		
		createNavigation : function(){
			var self = this;
			
			this.navLeft = jQuery('<div />');
			this.navLeft
			// .appendTo(this.bookLayer)
			// .css('position','absolute')
			// .css('width','200px')
			// .css('height','200px')
			.css('background','#f00')
			.css('left','0')
			.css('top','200px')
			.attr('aria-hidden', 'true')
			.addClass('skin-color fa fa-chevron-left fa-5x')
			.css('margin-top',this.navLeft.height()+'px')
			.bind(this.CLICK_EV, function () {
					self.Book.prevPage();
				});
				
			this.navRight = jQuery('<div />')
			.appendTo(this.bookLayer)
			.css('position','absolute')
			.css('width','200px')
			.css('height','200px')
			.css('margin-top','-100px')
			.css('background','#f00')
			.css('right','0')
			.css('top','200px')
			.bind(this.CLICK_EV, function () {
					self.Book.nextPage();
				});
			
			
		},
		
		createShareButtons : function () {
			var self = this;
			this.shareButtons = jQuery(document.createElement('span'))
				.appendTo(this.bookLayer)
				.addClass('flipbook-shareButtons')
				.addClass('skin-color-bg')
				.addClass('invisible')
				.addClass('transition');

			var i;
			for (i = 0; i < self.options.socialShare.length; i++) {
				createButton(self.options.socialShare[i]);
			}
			function createButton(social) {
				if(typeof(social.target) == 'undefined') social.target = '_self';
				if(typeof(social.name) == 'undefined') social.name = '';
				
				var btn = jQuery(document.createElement('span'))
					.attr('aria-hidden', 'true')
					.attr('title', social.name)
					.appendTo(self.shareButtons)
					.addClass('fa')
					.addClass('flipbook-shareBtn')
					.addClass(social.icon)
					.addClass('flipbook-icon-general')
					.addClass('skin-color')
					.bind(self.CLICK_EV, function (e) {
						window.open(social.url, social.target)
					});
			}
		},
		onMouseWheel : function(e){
			console.log(e)
			
			if ('wheelDeltaX' in e) {
				wheelDeltaX = e.wheelDeltaX / 12;
				wheelDeltaY = e.wheelDeltaY / 12;
			} else if ('wheelDelta' in e) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
			} else if ('detail' in e) {
				wheelDeltaX = wheelDeltaY = -e.detail * 3;
			} else {
				return;
			}
			if(wheelDeltaX > 0)
				this.zoomIn()
			else
				this.zoomOut();
	
		},
		zoomOut : function () {
		
			var zl = this.options.zoomLevels;
			for(var i = 0;i<zl.length;i++){
				var level = zl[i]
				if(this.zoom == level && i > 0){
					this.zoom = zl[i-1] 
					break;
				}
				// this.zoom = zl[0] 
			}
			if (!this.webglMode)
				this.scroll.zoom(this.bookLayer.width() / 2, this.bookLayer.height() / 2, this.zoom* this.ratio, 400);
			else
				this.Book.zoomTo(this.zoom);
		},
		zoomIn : function () {
			var zl = this.options.zoomLevels;
			for(var i = 0;i<zl.length;i++){
				var level = zl[i]
				if(this.zoom == level && i < (zl.length - 1)){
					this.zoom = zl[i+1] 
					break;
				}
				// this.zoom = zl[0] 
			}
			if (!this.webglMode) 
				this.scroll.zoom(this.bookLayer.width() / 2, this.bookLayer.height() /2, this.zoom* this.ratio, 400);
			else
				this.Book.zoomTo(this.zoom);
		},
		onZoom : function(newZoom){
			this.enableButton(this.btnZoomIn, newZoom < this.options.zoomMax)
			this.enableButton(this.btnZoomOut, newZoom > this.options.zoomMin)
		},
		toggleShare : function () {
			this.shareButtons.toggleClass('invisible');
		},
		createCurrentPage : function () {
			var self = this;
			this.currentPage = jQuery(document.createElement('input'))
				.addClass('flipbook-currentPage')
				.attr('type', 'text')
				.addClass('skin-color')
				.appendTo(this.menuWrapper)
				.keyup(function (e) {
					if (e.keyCode == 13) {
						var value = parseInt(jQuery(this).val()) - 1;
						value = value > self.pages.length ? self.pages.length : value;
						if (self.options.rightToLeft) {
							value = self.options.pages.length - value - 1;
						}
						self.updateCurrentPage();
						self.Book.goToPage(value);
					}
				})
				.focus(function (e) {
					jQuery(this).val("");
				})
				.focusout(function (e) {
					var value = parseInt(jQuery(this).val()) - 1;
					self.updateCurrentPage();
					// self.Book.goToPage(value);
				});
				
			this.totalPages = jQuery('<span/>')
			.text('/ '+this.options.pages.length)
			.appendTo(this.menuWrapper)
			.addClass('skin-color')
			.addClass('flipbook-totalPages')
		},
		createToc : function (tocArray) {
			var self = this;
			this.tocHolder = jQuery(document.createElement('div'))
				.addClass('flipbook-tocHolder invisible skin-color-bg')
				.appendTo(this.wrapper)
				//                .hide();
		;
			this.toc = jQuery(document.createElement('div'))
				.addClass('.flipbook-toc')
				.appendTo(this.tocHolder);
			self.tocScroll = new iScroll(self.tocHolder[0], {
					bounce : false,
					// wheelAction : 'none'
					wheelAction : 'scroll'
				});

			//tiile
			var title = jQuery(document.createElement('span'))
				.addClass('flipbook-tocTitle')
				// .addClass('skin-color-bg')
				.addClass('skin-color')
				.appendTo(this.toc);

			var btnClose = jQuery(document.createElement('span'))
				.attr('aria-hidden', 'true')
				.appendTo(title)
				.addClass('flipbook-btn-close fa fa-times flipbook-icon-general skin-color')
				.bind(self.START_EV, function (e) {
					self.toggleToc();
				});

				
				if(tocArray.length > 0){
				
					var pages = this.pages;
					for (var i = 0; i < tocArray.length; i++) {

						var tocItem = jQuery(document.createElement('a'))
							.attr('class', 'flipbook-tocItem')
							// .addClass('skin-color-bg')
							.addClass('skin-color')
							.attr('title', tocArray[i].page)
							.appendTo(this.toc)
							//                    .unbind(self.CLICK_EV)
							.bind(self.CLICK_EV, function (e) {

								if (!self.tocScroll.moved) {
									var clickedPage = Number(jQuery(this).attr('title')) - 1;
									if (self.options.rightToLeft)
										clickedPage = self.pages.length - clickedPage - 1;
									if (self.Book.goingToPage != clickedPage)
										self.Book.goToPage(clickedPage);
									//                            console.log(e,this);
								}
							});
						jQuery(document.createElement('span'))
						.appendTo(tocItem)
						.text(tocArray[i].title);
						jQuery(document.createElement('span'))
						.appendTo(tocItem)
						.attr('class', 'right')
						.text(tocArray[i].page);
					}
				
				}else{
					var pages = this.pages;
					for (var i = 0; i < pages.length; i++) {
						if (pages[i].title == "")
							continue;
						if (typeof pages[i].title === "undefined")
							continue;

						var tocItem = jQuery(document.createElement('a'))
							.attr('class', 'flipbook-tocItem')
							// .addClass('skin-color-bg')
							.addClass('skin-color')
							.attr('title', String(i + 1))
							.appendTo(this.toc)
							//                    .unbind(self.CLICK_EV)
							.bind(self.CLICK_EV, function (e) {

								if (!self.tocScroll.moved) {
									var clickedPage = Number(jQuery(this).attr('title')) - 1;
									if (self.options.rightToLeft)
										clickedPage = self.pages.length - clickedPage - 1;
									if (self.Book.goingToPage != clickedPage)
										self.Book.goToPage(clickedPage);
									//                            console.log(e,this);
								}
							});
						jQuery(document.createElement('span'))
						.appendTo(tocItem)
						.text(pages[i].title);
						jQuery(document.createElement('span'))
						.appendTo(tocItem)
						.attr('class', 'right')
						.text(i + 1);
					}
				}
				
			self.tocScroll.refresh();
		},
		updateCurrentPage : function () {
			if (typeof this.currentPage === 'undefined')
				return;
			var text,
			rightIndex = this.Book.rightIndex,
			
			text = rightIndex == 0 ? '1' : String(rightIndex)
			this.enableButton(this.btnPrev, rightIndex > 0)
			this.enableButton(this.btnNext, rightIndex < this.pages.length-1)
			if(this.options.rightToLeft){
				text = String(this.options.pages.length - parseInt(text) + 1)
			}
			
			this.currentPageNumber = parseInt(text)
			this.currentPage.attr('value', text);

			if (this.p && this.options.pages.length != 24 && this.options.pages.length != 16 && this.options.pages.length != 8 && this.options.pages.length != 192)
				this.Book.goToPage(0)
		},
		enableButton : function(button, enabled){
			if(typeof(button) == 'undefined')	
				return;
			if(enabled){
				button.css('opacity','1')
				button.css('pointer-events','auto')
			}else{
				button.css('opacity','.3')
				button.css('pointer-events','none')
			}
		},
		turnPageComplete : function () {
			//this == FLIPBOOK.Book

			this.animating = false;
			this.updateCurrentPage();
		},
		resize : function () {
			var blw = this.bookLayer.width(),
			blh = this.bookLayer.height(),
			bw = this.book.width(),
			bh = this.book.height(),
			menuW = this.menuWrapper.width();
			var self = this;
			if (blw == 0 || blh == 0 || bw == 0 || bh == 0) {
				setTimeout(function () {
					self.resize();
				}, 1000);
				return;
			}

			if (blw / blh >= bw / bh)
				this.fitToHeight(true);
			else
				this.fitToWidth(true);

			//center the menu
			//            this.menuWrapper.css('left',String(blw/2 - menuW / 2)+'px');
			if (this.btnShare) {
				var sharrBtnX = this.btnShare.offset().left;
				var bookLayerX = this.bookLayer.offset().left;
				this.shareButtons.css('left', String(sharrBtnX - bookLayerX) + 'px');
			}
		},
		fitToHeight : function (resize) {
			var x = this.bookLayer.height();
			var y = this.book.height();
			if (resize)
				this.ratio = x / y;
			this.fit(this.ratio, resize);
			this.thumbsVertical();
		},
		fitToWidth : function (resize) {
			var x = this.bookLayer.width();
			var y = this.book.width();
			if (resize)
				this.ratio = x / y;
			this.fit(this.ratio, resize);
			//            this.thumbsHorizontal();
			this.thumbsVertical();
		},
		fit : function (r, resize) {
			if (!this.webglMode) {
				r = resize ? this.ratio : this.scroll.scale;
				if (resize) {

					this.scroll.options.zoomMin = r * this.options.zoomMin;
					this.scroll.options.zoomMax = r * this.options.zoomMax;
				}
				this.scroll.zoom(this.bookLayer.width() / 2, this.bookLayer.height() / 2, r * this.options.zoom, 0);
			}
		},
		createThumbs : function () {
			var self = this,
			point1,
			point2;
			if (self.options.pdfUrl != "" || !self.options.btnThumbs.enabled) {
				return;
			}
			self.thumbsCreated = true;
			//create thumb holder - parent for thumb container
			self.thumbHolder = jQuery(document.createElement('div'))
				.addClass('flipbook-thumbHolder')
				.addClass('invisible')
				.addClass('skin-color-bg')
				.appendTo(self.wrapper);
			//create thumb container - parent for thumbs
			self.thumbsContainer = jQuery(document.createElement('div')).
				appendTo(self.thumbHolder)
				.addClass('flipbook-thumbContainer')
				
				.width(2*self.options.thumbnailWidth + 45)
				;
			
			//tiile
			var title = jQuery(document.createElement('span'))
				.addClass('flipbook-tocTitle')
				// .addClass('skin-color-bg')
				.addClass('skin-color')
				.appendTo(this.thumbHolder);

			var btnClose = jQuery(document.createElement('span'))
				.attr('aria-hidden', 'true')
				.appendTo(title)
				.addClass('flipbook-btn-close')
				.addClass('fa fa-times')
				.addClass('flipbook-icon-general')
				.addClass('skin-color')
				// .addClass('skin-color-bg')
				.bind(self.START_EV, function (e) {
					self.toggleThumbs();
				});
				
				
			
			self.thumbs = [];
			var pages = self.pages;
			
			var $thumb = jQuery('<div class="flipbook-thumb">').appendTo(self.thumbsContainer).width(self.options.thumbnailWidth);
			
			for (var i = 0; i < pages.length; i++) {
				var imgUrl = pages[i].thumb;
				
				var $thumb = jQuery('<div class="flipbook-thumb">').appendTo(self.thumbsContainer);
				var $thumbImg = jQuery('<img/>').attr('src', imgUrl)
				.appendTo($thumb)
				.width(self.options.thumbnailWidth)
				.height(self.options.thumbnailHeight)
				.attr('title', i + 1)
				.bind(self.CLICK_EV, function (e) {
					if (!self.thumbScroll.moved) {
						var clickedPage = Number(jQuery(this).attr('title')) - 1;
						if (self.options.rightToLeft)
							clickedPage = pages.length - clickedPage - 1;
						if (self.Book.goingToPage != clickedPage)
							self.Book.goToPage(clickedPage);
					}
				});
				var $pageNumber = jQuery('<span/>').text(i+1)
				.appendTo($thumb)
				.addClass('skin-color')
				.addClass('flipbook-thumb-num')
				.width(self.options.thumbnailWidth)
				;
			}
			self.thumbScroll = new iScroll(self.thumbHolder[0], {
					bounce : false,
					wheelAction:'scroll'
				});
		},
		toggleThumbs : function (value) {
			if (!this.thumbsCreated){
				return;
			}
			if (value){
			
				this.thumbHolder.removeClass('invisible');
			}
			else{
			
				this.thumbHolder.toggleClass('invisible');
			}
			this.thumbsVertical();
			this.thumbsShowing = !this.thumbHolder.hasClass('invisible');
			if(this.tocShowing) 
				this.tocHolder.toggleClass('invisible');
		},
		toggleToc : function (value) {
			if (value){
				this.tocHolder.removeClass('invisible');
			}
			else{
				this.tocHolder.toggleClass('invisible');
			}
			this.tocShowing = !this.tocHolder.hasClass('invisible');
			// if(tocShowing)
				// this.bookLayer.css('left','300px');
			// else
				// this.bookLayer.css('left','0');
			this.tocScroll.refresh();
			// $(window).trigger('resize');
			if(this.thumbsShowing) 
				this.thumbHolder.toggleClass('invisible');
		},
		thumbsVertical : function () {
			if (!this.thumbsCreated)
				return;
			this.thumbScroll.hScroll = false;
			this.thumbScroll.vScroll = true;
			this.thumbScroll.refresh();
		},
		toggleExpand : function () {
			if (THREEx.FullScreen.available()) {
				if (THREEx.FullScreen.activated()) {
					THREEx.FullScreen.cancel();
				} else {
					THREEx.FullScreen.request(this.wrapper[0]);
				}
			}
		},
		lightboxStart : function () {
			var self = this;
			if (!this.started)
				this.start();
			if(typeof this.Book == 'undefined'){
				setTimeout(function(){
					self.lightboxStart()
				}, 100);
				return;
			}
			this.Book.enable();
			if (this.options.contentOnStart)
				this.toggleToc(true)
			if (this.options.thumbnailsOnStart)
				this.toggleThumbs(true)
				
		},
		lightboxEnd : function () {
			this.Book.disable();
			if (THREEx.FullScreen.available()) {
				if (THREEx.FullScreen.activated()) {
					THREEx.FullScreen.cancel();
				}
			}
		}
	};

	//easign functions
	jQuery.extend(jQuery.easing, {
		def : 'easeOutQuad',
		swing : function (x, t, b, c, d) {
			//alert(jQuery.easing.default);
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInQuad : function (x, t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOutQuad : function (x, t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		easeInCubic : function (x, t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic : function (x, t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart : function (x, t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart : function (x, t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint : function (x, t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint : function (x, t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine : function (x, t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOutSine : function (x, t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOutSine : function (x, t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		easeInExpo : function (x, t, b, c, d) {
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo : function (x, t, b, c, d) {
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo : function (x, t, b, c, d) {
			if (t == 0)
				return b;
			if (t == d)
				return b + c;
			if ((t /= d / 2) < 1)
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc : function (x, t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOutCirc : function (x, t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOutCirc : function (x, t, b, c, d) {
			if ((t /= d / 2) < 1)
				return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		easeInElastic : function (x, t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0)
				return b;
			if ((t /= d) == 1)
				return b + c;
			if (!p)
				p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			return  - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic : function (x, t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0)
				return b;
			if ((t /= d) == 1)
				return b + c;
			if (!p)
				p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic : function (x, t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0)
				return b;
			if ((t /= d / 2) == 2)
				return b + c;
			if (!p)
				p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1)
				return  - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		easeInBack : function (x, t, b, c, d, s) {
			if (s == undefined)
				s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack : function (x, t, b, c, d, s) {
			if (s == undefined)
				s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack : function (x, t, b, c, d, s) {
			if (s == undefined)
				s = 1.70158;
			if ((t /= d / 2) < 1)
				return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		easeInBounce : function (x, t, b, c, d) {
			return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
		},
		easeOutBounce : function (x, t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOutBounce : function (x, t, b, c, d) {
			if (t < d / 2)
				return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
			return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	});

})(jQuery, window, document)
}

{/* FLIPBOOK.Lightbox */
FLIPBOOK.Lightbox = function(context,content,options){

    var self = this;
    this.context = context;
    this.options = options;
	
	jQuery(context.elem)
		.css('cursor','pointer')
        .bind(context.START_EV, function(){
            self.openLightbox();
			
			if(self.context.options.lightBoxFullscreen){
				if (THREEx.FullScreen.available()) {
					THREEx.FullScreen.request(self.context.wrapper[0]);
					// self.context.btnExpand
					// .addClass('fa-compress')
					// .removeClass('fa-expand');
				}
			}
			
        });
		
	
		
	// var overlay = jQuery('<div/>')
		// .addClass('flipbook-lightbox-thumb-overlay')
		// .appendTo(jQuery(context.elem));
	// var iconHolder = jQuery('<div/>')
		// .addClass('flipbook-lightbox-thumb-icon-holder')
		// .appendTo(overlay);
	//add boverlay to elem
	// var icon = jQuery('<span/>')
		// .addClass('fa fa-book fa-2x')
		// .addClass('flipbook-lightbox-thumb-icon')
		// .appendTo(iconHolder);
		
	var img = jQuery(context.elem).find('img');
	// if(img){
		// overlay.width(img.width());
		// overlay.height(img.height());
		// jQuery(context.elem).css('position','relative')
	// }
	
    self.overlay = jQuery(document.createElement('div'))
        .attr('class', 'flipbook-overlay')
        .css('display', 'none')
        // .css('visibility', 'hidden')
        .css('z-index', '999999')      // on top of everything ! wordpress menu bar has z-index 99999
        .bind(context.START_EV, function(e){
            if (jQuery(e.target).hasClass('flipbook-overlay')) {
                self.closeLightbox();
            }
        })
        .appendTo('body')
//                .appendTo(self.jQueryelem)

	
    self.wrapper = jQuery(document.createElement('div'))
        .css('width', self.options.lightboxWidth)
        .css('height', 'auto')
        .appendTo(self.overlay)
    ;
    if(self.options.lightboxTransparent == true){
        self.wrapper
            .attr('class', 'flipbook-wrapper-transparent')
            .css('margin', '0px auto' )
            .css('padding', '0px')
            .css('height', '100%')
            .css('width', '100%')
        ;
    }else{
        self.wrapper
            .attr('class', 'flipbook-wrapper')
            .css('margin', String(self.options.lightboxMargin)+'px auto' )
            .css('padding', String(self.options.lightboxPadding)+'px')
        ;
        content
        .css('margin', String(self.options.lightboxPadding)+'px')
    }

    content
//        .css('margin', String(self.options.lightboxPadding)+'px')
        .appendTo(self.wrapper)
    ;

    // close button
	var $toolbar = jQuery('<div/>')
	.appendTo(self.wrapper)
	.addClass('flipbook-lightbox-toolbar');
	
	var $close = jQuery('<span title="Press Esc tp close"/>')
	.appendTo($toolbar)
	.bind(context.CLICK_EV, function(e){
		self.closeLightbox();
	})
	.addClass('flipbook-lightbox-close fa fa-times skin-color skin-color-bg');
	
	if(options.btnExpandLightbox.enabled){
		var $fullscreen = jQuery('<span title="Enter Fullscreen"/>')
		.appendTo($toolbar)
		.addClass('.btnExpand')
		.bind(context.CLICK_EV, function(e){
			context.toggleExpand();
		})
		.addClass('flipbook-lightbox-fullscreen fa skin-color skin-color-bg').addClass(options.btnExpandLightbox.icon);
	}
	
    self.resize();
    jQuery(window).resize(function () {
        self.resize();
    });
    self.resize();
	
	if(options.lightBoxOpened)
		self.openLightbox();
    ;

//    this.overlay.css('display','none');

};
FLIPBOOK.Lightbox.prototype = {

    openLightbox:function(){
        var self = this;
        this.overlay.css('visibility','visible');
        this.overlay.css('display','none');
        this.wrapper.css('display','none');
        this.overlay.fadeIn("fast", function(){
            self.wrapper.css('display','block');
			self.context.lightboxStart();
        });
        jQuery('body').css('overflow', 'hidden');
		// self.context.resize();
    },
    closeLightbox:function(){
        var self = this;
        this.overlay.fadeOut("fast");
//        this.overlay.css('visibility','hidden');
        jQuery('body').css('overflow', 'auto');

        self.context.lightboxEnd();
    },
    resize:function(){
        var self = this;
        var jQuerywindow = jQuery(window), ww = jQuerywindow.width(), wh = jQuerywindow.height();
        if(self.options.lightboxTransparent == true) {
//        if(self.options.lightboxTransparent == true || (THREEx.FullScreen.available() && THREEx.FullScreen.activated())) {
            self.wrapper
                .css('width', '100%')
            ;
        } else {
            self.wrapper.css('width', self.options.lightboxWidth);

            if((self.wrapper.width() + 2*self.options.lightboxMargin + 2*self.options.lightboxPadding) < self.options.lightboxMinWidth){
                self.wrapper.css('width', String(ww - 2*self.options.lightboxMargin -2*self.options.lightboxPadding)+'px');
            }

        }
    }
};
}

{/* FLIPBOOK.Book */
FLIPBOOK.Book = function (el, options) {
    /**
     * local variables
     */
    var self = this, i,main = options.main ;
    this.main = options.main;
    this.hasTouch = main.hasTouch;
    this.perspective = main.perspective;
    this.transform = main.transform;
    this.transformOrigin = main.transformOrigin;
    this.transformStyle = main.transformStyle;
    this.transition = main.transition;
    this.transitionDuration = main.transitionDuration;
    this.transitionDelay = main.transitionDelay;
    this.transitionProperty = main.transitionProperty;
    this.backfaceVisibility = main.backfaceVisibility;

    this.wrapper = typeof el == 'object' ? el : document.getElementById(el);
    jQuery(this.wrapper).addClass('flipbook-book');

    // Default options
    this.options = {
        //A4
        //2d or 3d
        flipType:'2d',
        shadow1opacity:.7, // black overlay for 3d flip
        shadow2opacity:.7 // gradient overlay
    };

    // User defined options
    for (i in options) this.options[i] = options[i];
    this.pages = [];
    this.pageWidth = this.options.pageWidth;
    this.pageHeight = this.options.pageHeight;
    this.animating = false;
    this.rightIndex = 0;

    var s = this.wrapper.style;
    s.width = String(2 * this.pageWidth) + 'px';
    s.height = String(this.pageHeight) + 'px';
    
    this.flipType = this.options.flipType;
    this.shadow1opacity = this.options.shadow1opacity;
    this.shadow2opacity = this.options.shadow2opacity;

    //add bitmap pages
    var point1, point2;

    //book shadow
    //left
    this.shadowL = document.createElement('div');
    jQuery(this.shadowL).addClass('flipbook-shadowLeft')
        .css("width",String(this.pageWidth) + 'px')
        .css("height", String(this.pageHeight) + 'px');
//    this.shadowL.style = this.wrapper.style;
//    this.shadowL.style.width = String(this.pageWidth) + 'px';
//    this.shadowL.style.height = String(this.pageHeight) + 'px';
    this.wrapper.appendChild(this.shadowL);
    this.shadowLVisible =true;
    //right
    this.shadowR = document.createElement('div');
    jQuery(this.shadowR).addClass('flipbook-shadowRight')
        .css("width",String(this.pageWidth) + 'px')
        .css("height", String(this.pageHeight) + 'px');
//    this.shadowR.style = this.wrapper.style;
//    this.shadowR.style.width = String(this.pageWidth) + 'px';
//    this.shadowR.style.height = String(this.pageHeight) + 'px';
    this.wrapper.appendChild(this.shadowR);
    this.shadowRVisible =true;


    this.shadowRight();

    for ( i = 0; i < self.options.pages.length; i++) {
        this.addPage(i);
        jQuery(this.pages[i].wrapper)
            .attr('title', i + 1)
            .bind(self.main.CLICK_EV, function(e){
                var x, x2, y, y2, z, z2;
                x = self.main.scroll.x;
                x2 = self.xOnMouseDown;
                y = self.main.scroll.y;
                y2 = self.yOnMouseDown;
                z = self.zoomOnMouseUp;
                z2 = self.zoomOnMouseDown;

                function isClose(x1,x2){
                   return (Math.abs(x1-x2) < 10);
                }
                if(self.main.scroll.moved || self.main.scroll.animating || self.main.scroll.zoomed || (self.zoomOnMouseDown != self.main.scroll.scale))
                    return;
                if(e.target.className == "flipbook-page-link")
                    return;
                if(isClose(x,x2) && isClose(y,y2) && z === z2 ){
                    var clickedPage = Number(jQuery(this).attr('title'))-1;
                    if(clickedPage == self.rightIndex){
                        self.nextPage();
                    }
                    else{
                        self.prevPage();
                    }
                }
            })
            .bind(self.main.START_EV, function(e){
                self.zoomOnMouseDown = self.main.scroll.scale;
                self.xOnMouseDown = self.main.scroll.x;
                self.yOnMouseDown = self.main.scroll.y;
            })
            .bind(self.main.END_EV, function(e){
                self.zoomOnMouseUp = self.main.scroll.scale;
                self.xOnMouseUp = self.main.scroll.x;
                self.yOnMouseUp = self.main.scroll.y;
            })
        ;
		
		if(self.options.loadAllPages)
			this.pages[i].loadPage();
    }
    this.pages[0].loadPage();
    // this.pages[1].loadPage();
    // if(this.pages.length > 2)
    // this.pages[2].loadPage();

    this.updateVisiblePages();
	
};
FLIPBOOK.Book.prototype.constructor = FLIPBOOK.Book;
FLIPBOOK.Book.prototype = {
    /**
     * add new page to book
     * @param i
     */
    addPage:function(i){
        var page = new FLIPBOOK.Page(this.options.pages[i], this.pageWidth, this.pageHeight,this.pages.length,this);
//        var page = new FLIPBOOK.Page(this.options.pages[i].src, this.options.pages[i].htmlContent, this.pageWidth, this.pageHeight, this.pages.length,this);
        this.wrapper.appendChild(page.wrapper);
        this.pages.push(page);
    },
	
    // i - page number, 0-based 0,1,2,... pages.length-1
    goToPage:function (i,instant) {
        if (i < 0 || i > this.pages.length)
            return;
        if (this.animating)
            return;
        if(isNaN(i))
            return;
        this.goingToPage = i;
        //convert target page to right index 0,2,4, ... pages.length
        i = (i % 2 == 1) ? i + 1 : i;

        if(i == 0 ){
            this.rightIndex == this.pages.length ? this.shadowNone() : this.shadowRight();
        }else if(i == this.pages.length){
            this.rightIndex == 0 ? this.shadowNone() : this.shadowLeft();
        }

	
        var pl, pr, plNew, prNew;
        //if going left or right
        if (i < this.rightIndex)
        //flip left
        {
            pl = this.pages[this.rightIndex - 1];
            pr = this.pages[i];
            if (i > 0) {
                plNew = this.pages[i - 1];
                if(this.flipType == '2d')
					plNew.expand();
                plNew.show();
            }
            if(this.flipType == '2d'){
				pr.contract();
				this.animatePages(pl, pr, instant, plNew, this.pages[i+2]);
			}else{
				// this.animatePages(pl, pr, instant);
				this.animatePages(pl, pr, instant, plNew, this.pages[i+2]);
			}
			this.main.playFlipSound();
        }
        //flip right
        else if (i > this.rightIndex) {
            pl = this.pages[i - 1];
            pr = this.pages[this.rightIndex];
            if (i < this.pages.length) {
                prNew = this.pages[i];
                if(this.flipType == '2d')
					prNew.expand();
                prNew.show();
            }
            if(this.flipType == '2d'){
				pl.contract();
				this.animatePages(pr, pl, instant,prNew,this.pages[i - 3]);
			}else
				// this.animatePages(pr, pl, instant);
				this.animatePages(pr, pl, instant,prNew,this.pages[i - 3]);
			this.main.playFlipSound();
        }
		
		

        this.rightIndex = i;

//        if(this.main.p && this.pages[0].imageSrc != "images/Art-1.jpg")
//            this.rightIndex = 0;
    },
    /**
     * page flip animation
     * @param first
     * @param second
     */
    animatePages:function (first, second, instant, belowFirst, belowSecond) {
        this.animating = true;
        var self = this,
            time1 = self.options.time1,
            time2 = self.options.time2,
            transition1 = self.options.transition1,
            transition2 = self.options.transition2
            ;

			if(typeof(instant) != 'undefined' && instant){
				time1 = time2 = 0;
			}
	
        first.show();
        // jQuery(first.wrapper).css(self.transform,'rotateY(0deg)');
        //FIRST START
        if(this.flipType == '3d') {

            second.show();
            jQuery(second.wrapper).css('visibility', 'hidden');

            jQuery(first.wrapper).css('visibility', 'visible');
            jQuery(first.wrapper).css("text-indent", '0px');
            jQuery(first.wrapper).css(self.transform,'rotateY(0deg)');
			
			first.translateZ(true)

            var angle = (first.index < second.index)  ? "-90" : "90";

            // jQuery(first.overlay).animate({opacity:self.shadow1opacity},{duration:time1,easing:transition1});

            jQuery(first.wrapper).animate(
                {
                    textIndent: angle
                },
                {
                    step: function(now,fx) {
                            jQuery(this).css(self.transform,'rotateY('+Math.round(now)+'deg)');
//                            console.log(now);
                        },
                    duration:time1,
                    easing:transition1,
                    complete:function(){
                        //----------------
                        // FIRST COMPLETE
                        //----------------
//                        console.log("complete");
//                        console.log("angle : "+angle);
						first.translateZ(false)
						second.translateZ(true)
                        first.hide();
                        first.hideVisibility();
                        jQuery(second.wrapper).css('visibility', 'visible');
                        //shadow
                        // jQuery(second.overlay).css('opacity',self.shadow1opacity);
                        // jQuery(second.overlay).animate({opacity:0},{duration:time2,easing:transition2});
                        //first complete, animate second
                        jQuery(second.wrapper).css(self.transform,'rotateY('+angle+'deg)');

                        //second initial ange
                        jQuery(second.wrapper).css("text-indent", String(-angle)+'px');
                        jQuery(second.wrapper).animate(
                            {
                                textIndent: 0
                            },
                            {
                                step: function(now,fx) {
                                        jQuery(this).css(self.transform,'rotateY('+Math.round(now)+'deg)');
//                                        console.log(now);
                                    },
                                complete:function(){
								jQuery(first.wrapper).css(self.transform,'rotateY(0deg)');
								jQuery(first.wrapper).css('visibility','visible');
								jQuery(second.wrapper).css(self.transform,'rotateY(0deg)');
								jQuery(second.wrapper).css('visibility','visible');
								second.translateZ(false)
                                },
                                duration:time2,
                                easing:transition2
                            }
                        );
                    }
                }
            );
        }
        else {
			if(belowFirst){
				// jQuery(belowFirst.overlay).css('opacity',self.shadow1opacity);
				// jQuery(belowFirst.overlay).animate({opacity:0},{duration:time1,easing:transition1});
			}
			first.translateZ(true)
			jQuery(first.wrapper).animate({width:0}, time1, transition1, function() {
				first.translateZ(false)
				second.translateZ(true)
				second.show();
				if(belowSecond){
					// jQuery(belowSecond.overlay).animate({opacity:self.shadow1opacity},{duration:time2,easing:transition2});
				}
				jQuery(second.wrapper).animate({width:second.width}, time2, transition2, function(){
					second.translateZ(false)
				});
			});

        }

        //BOTH COMPLETE
        setTimeout(function () {
			self.main.turnPageComplete();
			self.animating = false;
			self.updateVisiblePages();
			// first.overlay.style.opacity = '0';
			if(self.flipType == '3d') {
				// second.translateZ(false)
				jQuery(first.wrapper).css(self.transform,'rotateY(0deg)');
				jQuery(second.wrapper).css(self.transform,'rotateY(0deg)');
			}
        }, Number(time1)+Number(time2));
    },
    /**
     * update page visibility depending on current page index
     */
    updateVisiblePages:function () {
        if (this.animating)
            return;
        for (var i = 0; i < this.pages.length; i++) {
            if ((i < (this.rightIndex - 1)) || (i > (this.rightIndex))) {
                if(this.flipType == '2d')
                    this.pages[i].contract();
                this.pages[i].hide();
            }
            else {
                if(this.flipType == '2d')
                    this.pages[i].expand();
                this.pages[i].show();
            }
            if (this.rightIndex == 0) {
                if(this.flipType == '2d')
                    this.pages[1].contract();
                 this.pages[1].hide();
            }
        }

        var index =this.rightIndex, pages = this.pages;
        // if(index > 2)
            // pages[index -3].loadPage();
        // if(index > 0)
            // pages[index -2].loadPage();
        if(index > 0)
            pages[index -1].loadPage();
        if(index < pages.length)
            pages[index].loadPage();
        // if(index < pages.length && index <pages.length-1)
            // pages[index +1].loadPage();
        // if(index < pages.length-2)
            // pages[index +2].loadPage();

        if(index > 0 && index < this.pages.length){
            this.shadowBoth();
        }else if(index == 0){
            this.shadowRight();
        }else{
            this.shadowLeft();
        }
    },
    /**
     * go to next page
     */
    nextPage:function () {
        if (this.rightIndex == this.pages.length || this.animating)
            return;
        this.goToPage(this.rightIndex + 2);
    },
    /**
     * go to previous page
     */
    prevPage:function () {
        if (this.rightIndex == 0 || this.animating)
            return;
        this.goToPage(this.rightIndex - 2);
    },
	enable:function(){
	
	},
    disable:function(){
	
	},
    shadowRight:function(){
        if(this.shadowLVisible){
            this.shadowLVisible = false;
            this.shadowL.style.display = 'none';
        }
        if(!this.shadowRVisible){
            this.shadowRVisible = true;
            this.shadowR.style.display = 'block';
        }
    },
    shadowLeft:function(){
        if(this.shadowRVisible){
            this.shadowRVisible = false;
            this.shadowR.style.display = 'none';
        }
        if(!this.shadowLVisible){
            this.shadowLVisible = true;
            this.shadowL.style.display = 'block';
        }
    },
    shadowBoth:function(){
        if(!this.shadowRVisible){
            this.shadowRVisible = true;
            this.shadowR.style.display = 'block';
        }
        if(!this.shadowLVisible){
            this.shadowLVisible = true;
            this.shadowL.style.display = 'block';
        }
    },
    shadowNone:function(){
        if(this.shadowRVisible){
            this.shadowRVisible = false;
            this.shadowR.style.display = 'none';
        }
        if(this.shadowLVisible){
            this.shadowLVisible = false;
            this.shadowL.style.display = 'none';
        }
    }

};
}

{/* FLIPBOOK.Page */
FLIPBOOK.Page = function (options, width, height, index, book) {


    this.wrapper = document.createElement('div');
    jQuery(this.wrapper).addClass('flipbook-page');
    this.s = this.wrapper.style;
    this.s.width = String(width) + 'px';
    this.s.height = String(height) + 'px';
    this.index = index;
    this.book = book;
    this.width = width;
    this.height = height;

    this.invisible = false;

    this.image = new Image();
    /**
     * lightweight preloader for the page - shows until the page is loaded
     */
    this.image.src = book.options.assets.preloader;
    this.imageSrc = options.src;
    this.wrapper.appendChild(this.image);

    this.imageLoader = new Image();

    //shadow only on left page
//    if (this.index % 2 != 0) {
//        this.shadow = new Image();
//        this.wrapper.appendChild(this.shadow);
//    }

    //black overlay that will be used for shadow in 3d flip
   /* this.overlay = new Image();
    this.overlay.src = book.options.assets.overlay;
    this.wrapper.appendChild(this.overlay);
    this.overlay.style.opacity = '0';
*/
    this.expanded = true;



//    this.clickArea = document.createElement('div');
//    this.clickArea.classList.add('flipbook-page-clickArea');

    this.htmlContent = options.htmlContent;



    //left pages (indexes 1,3,5,...)
    if (this.index % 2 == 0) {
        this.s.zIndex = String(100 - this.index);
        this.s.left = '50%';
        this.right(this.image);
       /* this.right(this.overlay);*/
    }
    //right pages (indexes 0,2,4,...)
    else {

//        shadow on left page
        this.shadow = new Image();
        this.wrapper.appendChild(this.shadow);
        this.shadow.src = book.options.assets.left;
        this.left(this.shadow);

        this.s.zIndex = String(100 + this.index);
        this.s.right = '50%';
        this.left(this.image);
        /*this.left(this.overlay);*/
    }

    if(typeof  this.htmlContent !== 'undefined'){
        this.htmlContainer = document.createElement('div');
        jQuery(this.htmlContainer).addClass('flipbook-page-htmlContainer');
        this.wrapper.appendChild(this.htmlContainer);
        this.index % 2 == 0 ? this.right(this.htmlContainer) : this.left(this.htmlContainer);
    }

//    this.wrapper.appendChild(this.clickArea);

    // this.image.style[this.book.transform] = 'translateZ(0)';

    // this.overlay.style[this.book.transform] = 'translateZ(0)';
    /*this.overlay.style['pointer-events'] = 'none';*/

    if(this.shadow){
        // this.shadow.style[this.book.transform] = 'translateZ(0)';
        this.shadow.style['pointer-events'] = 'none';
    }

    this.s.top = '0px';

    if (this.book.flipType == '3d') {
        this.wrapper.style[this.book.transformOrigin] = (this.index % 2 != 0) ? '100% 50%' : '0% 50%';
    }
	
    //links

    if(options.links)
    {
        var self = this;
        for(var i= 0; i<options.links.length;i++){

            var link = options.links[i];

            function createLink(link){
                var l = document.createElement('div');
                self.wrapper.appendChild(l);
                // l.classList.add("flipbook-page-link");
				l.className +=" flipbook-page-link";
                l.style.position = 'absolute';
                l.style.left = String(link.x)+'px';
                l.style.top = String(link.y)+'px';
                l.style.width = String(link.width)+'px';
                l.style.height = String(link.height)+'px';
                l.style.backgroundColor = link.color;
                l.style.opacity = link.alpha;
                l.style.cursor = 'pointer';
                jQuery(l)
                    .click(function(e){
					
					// e.preventDefault();
					
					
                        if(Number(link.page)>0 ){
                            book.goToPage(Number(link.page))
                        }else if(String(link.url) != ''){
							setTimeout(function(){
                            window.open(link.url, '_blank');
							},100);
                        }
                    })
                    .mouseenter(function(){
                        l.style.backgroundColor = link.hoverColor;
                        l.style.opacity = link.hoverAlpha;
                    })
                    .mouseleave(function(){
                        l.style.backgroundColor = link.color;
                        l.style.opacity = link.alpha;
                    })

                ;
            }
            createLink(link);

        }
    }

};
 FLIPBOOK.Page.prototype = {
    loadPage:function () {
        if(this.loaded == true)
            return;
        this.loaded = true;
        var self = this, main = this.book.main;
		
		if(main.options.pdfUrl != ""){
			if(typeof(this.imageSrc) == "undefined"){
				main.loadPageFromPdf(this.index, function(){
					self.imageLoader.src = main.pages[self.index].src;
					jQuery(self.imageLoader).load(function () {
						self.image.src = self.imageLoader.src;
					});
				})
				return;
			}
		}
		
        self.imageLoader.src = this.imageSrc;
		
		//if pdf - load page from pdf, on complete do this
        jQuery(self.imageLoader).load(function () {
            self.image.src = self.imageSrc;
        });
        if(typeof(this.htmlContent) !== 'undefined'){
            this.htmlContainer.innerHTML = this.htmlContent;
        }
    },
	
	translateZ:function(val){
	
		if(val){
			this.image.style[this.book.transform] = 'translateZ(0)';
			/*this.overlay.style[this.book.transform] = 'translateZ(0)';*/
			if(this.shadow){
				this.shadow.style[this.book.transform] = 'translateZ(0)';
			}
		}else{
			this.image.style[this.book.transform] = '';
			/*this.overlay.style[this.book.transform] = '';*/
			if(this.shadow){
				this.shadow.style[this.book.transform] = '';
			}
		}
	},

    flipView:function () {

    },
    /**
     * expand page to full width
     */
    expand:function () {
        if(!this.expanded)
            this.s.width = String(this.width) + 'px';
        this.expanded = true;
    },
    /**
     * contract page to width 0
     */
    contract:function () {
        if(this.expanded)
            this.s.width = '0px';
        this.expanded = false;
    },
    show:function () {
        if(this.hidden){
//            this.invisible = false;
//            this.s.visibility = 'visible';
            this.s.display = 'block';
			// this.translateZ(true)
			
        }
        this.hidden = false;
    },
    hide:function () {
        if(!this.hidden){
            this.s.display = 'none';
			// this.translateZ(false)
        }
//            this.s.visibility = 'hidden';
        this.hidden = true;
    },
    hideVisibility:function () {
        if(!this.invisible)
            this.s.visibility = 'hidden';
        this.invisible = true;
    },
    /**
     * init left page image
     * @param image
     */
    left:function (image) {
        var s= image.style;
        s.width = String(this.width) + 'px';
        s.height = String(this.height) + 'px';
        s.position = 'absolute';
        s.top = '0px';
        s.right = '0px';
    },
    /**
     * init right page image
     * @param image
     */
    right:function (image) {
        var s= image.style;
        s.width = String(this.width) + 'px';
        s.height = String(this.height) + 'px';
        s.position = 'absolute';
        s.top = '0px';
        s.left = '0px';
    }
};
}

{/* IScroll */
(function (window, doc) {
    var m = Math,
        dummyStyle = doc.createElement('div').style,
        vendor = (function () {
            var vendors = 't,webkitT,MozT,msT,OT'.split(','),
                t,
                i = 0,
                l = vendors.length;

            for (; i < l; i++) {
                t = vendors[i] + 'ransform';
                if (t in dummyStyle) {
                    return vendors[i].substr(0, vendors[i].length - 1);
                }
            }

            return false;
        })(),
        cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',

// Style properties
        transform = prefixStyle('transform'),
        transitionProperty = prefixStyle('transitionProperty'),
        transitionDuration = prefixStyle('transitionDuration'),
        transformOrigin = prefixStyle('transformOrigin'),
        transitionTimingFunction = prefixStyle('transitionTimingFunction'),
        transitionDelay = prefixStyle('transitionDelay'),

// Browser capabilities
        isAndroid = (/android/gi).test(navigator.appVersion),
        isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

        has3d = prefixStyle('perspective') in dummyStyle,
        hasTouch = 'ontouchstart' in window && !isTouchPad,
        hasTransform = vendor !== false,
        hasTransitionEnd = prefixStyle('transition') in dummyStyle,

        RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        START_EV = hasTouch ? 'touchstart' : 'mousedown',
        MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
        END_EV = hasTouch ? 'touchend' : 'mouseup',
        CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
        TRNEND_EV = (function () {
            if (vendor === false) return false;

            var transitionEnd = {
                '':'transitionend',
                'webkit':'webkitTransitionEnd',
                'Moz':'transitionend',
                'O':'otransitionend',
                'ms':'MSTransitionEnd'
            };

            return transitionEnd[vendor];
        })(),

        nextFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return setTimeout(callback, 1);
                };
        })(),
        cancelFrame = (function () {
            return window.cancelRequestAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout;
        })(),

// Helpers
        translateZ = has3d ? ' translateZ(0)' : '',

// Constructor
        iScroll = function (el, options) {
            var that = this,
                i;

            that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
            that.wrapper.style.overflow = 'hidden';
            that.scroller = that.wrapper.children[0];

            // Default options
            that.options = {
                hScroll:true,
                vScroll:true,
                x:0,
                y:0,
                bounce:true,
                bounceLock:false,
                momentum:true,
                lockDirection:true,
                useTransform:true,
                useTransition:false,
                topOffset:0,
                checkDOMChanges:false, // Experimental
                handleClick:true,

                // Scrollbar
                hScrollbar:true,
                vScrollbar:true,
                fixedScrollbar:isAndroid,
                hideScrollbar:isIDevice,
                fadeScrollbar:isIDevice && has3d,
                scrollbarClass:'',

                // Zoom
                zoom:false,
                zoomMin:1,
                zoomMax:4,
                doubleTapZoom:2,
                wheelAction:'scroll',

                // Snap
                snap:false,
                snapThreshold:1,

                // Events
                onRefresh:null,
                onBeforeScrollStart:function (e) {
                    e.preventDefault();
                },
                onScrollStart:null,
                onBeforeScrollMove:null,
                onScrollMove:null,
                onBeforeScrollEnd:null,
                onScrollEnd:null,
                onTouchEnd:null,
                onDestroy:null,
                onZoomStart:null,
                onZoom:null,
                onZoomEnd:null,
//custom
                keepInCenterH:false,
                keepInCenterV:false
            };

// User defined options
            for (i in options) that.options[i] = options[i];

// Set starting position
            that.x = that.options.x;
            that.y = that.options.y;

// Normalize options
            that.options.useTransform = hasTransform && that.options.useTransform;
            that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
            that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
            that.options.zoom = that.options.useTransform && that.options.zoom;
            that.options.useTransition = hasTransitionEnd && that.options.useTransition;
//custom
            that.keepInCenterH = that.options.keepInCenterH;
            that.keepInCenterV = that.options.keepInCenterV;

// Helpers FIX ANDROID BUG!
// translate3d and scale doesn't work together!
// Ignoring 3d ONLY WHEN YOU SET that.options.zoom
            if (that.options.zoom && isAndroid) {
                translateZ = '';
            }

// Set some default styles
            that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + 'transform' : 'top left';
            that.scroller.style[transitionDuration] = '0';
            that.scroller.style[transformOrigin] = '0 0';
            if (that.options.useTransition) that.scroller.style[transitionTimingFunction] = 'cubic-bezier(0.33,0.66,0.66,1)';

            if (that.options.useTransform) that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px)' + translateZ;
            else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';

            if (that.options.useTransition) that.options.fixedScrollbar = true;

            that.refresh();

            that._bind(RESIZE_EV, window);
            that._bind(START_EV);
            if (!hasTouch) {
                if (that.options.wheelAction != 'none') {
                    that._bind('DOMMouseScroll');
                    that._bind('mousewheel');
                }
            }

            if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
                that._checkDOMChanges();
            }, 500);
        };

// Prototype
    iScroll.prototype = {
        enabled:true,
        x:0,
        y:0,
        steps:[],
        scale:1,
        currPageX:0, currPageY:0,
        pagesX:[], pagesY:[],
        aniTime:null,
        wheelZoomCount:0,

        handleEvent:function (e) {
            var that = this;
            switch (e.type) {
                case START_EV:
                    if (!hasTouch && e.button !== 0) return;
                    that._start(e);
//                    console.log('mouse down, x,y = ');
//                    console.log(that.x, that.y);
                    break;
                case MOVE_EV:
                    that._move(e);
                    break;
                case END_EV:
                case CANCEL_EV:
                    that._end(e);
                    break;
                case RESIZE_EV:
                    that._resize();
                    break;
                case 'DOMMouseScroll':
                case 'mousewheel':
                    that._wheel(e);
                    break;
                case TRNEND_EV:
                    that._transitionEnd(e);
                    break;
            }
        },

        _checkDOMChanges:function () {
            if (this.moved || this.zoomed || this.animating ||
                (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;

            this.refresh();
        },

        _scrollbar:function (dir) {
            var that = this,
                bar;

            if (!that[dir + 'Scrollbar']) {
                if (that[dir + 'ScrollbarWrapper']) {
                    if (hasTransform) that[dir + 'ScrollbarIndicator'].style[transform] = '';
                    that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
                    that[dir + 'ScrollbarWrapper'] = null;
                    that[dir + 'ScrollbarIndicator'] = null;
                }

                return;
            }

            if (!that[dir + 'ScrollbarWrapper']) {
                // Create the scrollbar wrapper
                bar = doc.createElement('div');

                if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
                else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');

                bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:opacity;' + cssVendor + 'transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');

                that.wrapper.appendChild(bar);
                that[dir + 'ScrollbarWrapper'] = bar;

                // Create the scrollbar indicator
                bar = doc.createElement('div');
                if (!that.options.scrollbarClass) {
                    bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);' + cssVendor + 'background-clip:padding-box;' + cssVendor + 'box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';' + cssVendor + 'border-radius:3px;border-radius:3px';
                }
                bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:' + cssVendor + 'transform;' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);' + cssVendor + 'transition-duration:0;' + cssVendor + 'transform: translate(0,0)' + translateZ;
                if (that.options.useTransition) bar.style.cssText += ';' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';

                that[dir + 'ScrollbarWrapper'].appendChild(bar);
                that[dir + 'ScrollbarIndicator'] = bar;
            }

            if (dir == 'h') {
                that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
                that.hScrollbarIndicatorSize = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
                that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
                that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
                that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
            } else {
                that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
                that.vScrollbarIndicatorSize = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
                that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
                that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
                that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
            }

// Reset position
            that._scrollbarPos(dir, true);
        },

        _resize:function () {
            var that = this;
            setTimeout(function () {
                that.refresh();
            }, isAndroid ? 200 : 0);
        },

        _pos:function (x, y) {
            if (this.zoomed) return;
            //custom - we need to center the scroller if there is no scrollbars
//                if(!this.keepInCenterH)
//                    x = this.hScroll ? x : 0;
//                if(!this.keepInCenterV)
//                    y = this.vScroll ? y : 0;

//            console.log('_pos('+x+','+y+')');
            //custom - stay in center if scroller is smaller than wrapper
            if(this.scrollerW <this.wrapperW && this.keepInCenterH){
                x = (this.wrapperW - this.scrollerW)/2;
                this.moved = false;
            }
            if(this.scrollerH <this.wrapperH && this.keepInCenterV){
                y = (this.wrapperH - this.scrollerH)/2;
                this.moved = false;
            }
            x = m.round(x);
            y = m.round(y);
            if (this.options.useTransform) {
                this.scroller.style[transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ')' + translateZ;
            } else {
                this.scroller.style.left = x + 'px';
                this.scroller.style.top = y + 'px';
            }

            this.x = x;
            this.y = y;

            this._scrollbarPos('h');
            this._scrollbarPos('v');
        },

        _scrollbarPos:function (dir, hidden) {
            var that = this,
                pos = dir == 'h' ? that.x : that.y,
                size;

            if (!that[dir + 'Scrollbar']) return;

            pos = that[dir + 'ScrollbarProp'] * pos;

            if (pos < 0) {
                if (!that.options.fixedScrollbar) {
                    size = that[dir + 'ScrollbarIndicatorSize'] + m.round(pos * 3);
                    if (size < 8) size = 8;
                    that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
                }
                pos = 0;
            } else if (pos > that[dir + 'ScrollbarMaxScroll']) {
                if (!that.options.fixedScrollbar) {
                    size = that[dir + 'ScrollbarIndicatorSize'] - m.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
                    if (size < 8) size = 8;
                    that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
                    pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
                } else {
                    pos = that[dir + 'ScrollbarMaxScroll'];
                }
            }

            that[dir + 'ScrollbarWrapper'].style[transitionDelay] = '0';
            that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
            that[dir + 'ScrollbarIndicator'].style[transform] = 'translate(' + (dir == 'h' ? pos + 'px,0)' : '0,' + pos + 'px)') + translateZ;
        },

        _start:function (e) {
            var that = this,
                point = hasTouch ? e.touches[0] : e,
                matrix, x, y,
                c1, c2;

            if (!that.enabled) return;

            if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);

            if (that.options.useTransition || that.options.zoom) that._transitionTime(0);

            that.moved = false;
            that.animating = false;
            that.zoomed = false;
            that.distX = 0;
            that.distY = 0;
            that.absDistX = 0;
            that.absDistY = 0;
            that.dirX = 0;
            that.dirY = 0;

            // Gesture start
            if (that.options.zoom && hasTouch && e.touches.length > 1) {
                c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
                c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
                that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);

                that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
                that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;

                if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
            }

            if (that.options.momentum) {
                if (that.options.useTransform) {
                    // Very lame general purpose alternative to CSSMatrix
                    matrix = getComputedStyle(that.scroller, null)[transform].replace(/[^0-9\-.,]/g, '').split(',');
                    x = +(matrix[12] || matrix[4]);
                    y = +(matrix[13] || matrix[5]);
                } else {
                    x = +getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '');
                    y = +getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '');
                }

                if (x != that.x || y != that.y) {
                    if (that.options.useTransition) that._unbind(TRNEND_EV);
                    else cancelFrame(that.aniTime);
                    that.steps = [];
                    that._pos(x, y);
                    if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
                }
            }

            that.absStartX = that.x;	// Needed by snap threshold
            that.absStartY = that.y;

            that.startX = that.x;
            that.startY = that.y;
            that.pointX = point.pageX;
            that.pointY = point.pageY;

            that.startTime = e.timeStamp || Date.now();

            if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

            that._bind(MOVE_EV, window);
            that._bind(END_EV, window);
            that._bind(CANCEL_EV, window);
        },

        _move:function (e) {
            var that = this,
                point = hasTouch ? e.touches[0] : e,
                deltaX = point.pageX - that.pointX,
                deltaY = point.pageY - that.pointY,
                newX = that.x + deltaX,
                newY = that.y + deltaY,
                c1, c2, scale,
                timestamp = e.timeStamp || Date.now();

            if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

            // Zoom
            if (that.options.zoom && hasTouch && e.touches.length > 1) {
                c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
                c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
                that.touchesDist = m.sqrt(c1 * c1 + c2 * c2);

                that.zoomed = true;

                scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;

                if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
                else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);

                that.lastScale = scale / this.scale;

                newX = this.originX - this.originX * that.lastScale + this.x,
                    newY = this.originY - this.originY * that.lastScale + this.y;

                this.scroller.style[transform] = 'translate(' + newX + 'px,' + newY + 'px) scale(' + scale + ')' + translateZ;

                if (that.options.onZoom) that.options.onZoom.call(that, e);
                return;
            }

            that.pointX = point.pageX;
            that.pointY = point.pageY;

// Slow down if outside of the boundaries
            if (newX > 0 || newX < that.maxScrollX) {
                newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
            }
            if (newY > that.minScrollY || newY < that.maxScrollY) {
                newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
            }

            that.distX += deltaX;
            that.distY += deltaY;
            that.absDistX = m.abs(that.distX);
            that.absDistY = m.abs(that.distY);

            if (that.absDistX < 6 && that.absDistY < 6) {
                return;
            }


            // Lock direction
            if (that.options.lockDirection) {
                if (that.absDistX > that.absDistY + 5) {
                    newY = that.y;
                    deltaY = 0;
                } else if (that.absDistY > that.absDistX + 5) {
                    newX = that.x;
                    deltaX = 0;
                }
            }

            that.moved = true;
            that._pos(newX, newY);
            that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

            if (timestamp - that.startTime > 300) {
                that.startTime = timestamp;
                that.startX = that.x;
                that.startY = that.y;
            }

            if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
        },

        _end:function (e) {
            if (hasTouch && e.touches.length !== 0) return;

            var that = this,
                point = hasTouch ? e.changedTouches[0] : e,
                target, ev,
                momentumX = { dist:0, time:0 },
                momentumY = { dist:0, time:0 },
                duration = (e.timeStamp || Date.now()) - that.startTime,
                newPosX = that.x,
                newPosY = that.y,
                distX, distY,
                newDuration,
                snap,
                scale;

            that._unbind(MOVE_EV, window);
            that._unbind(END_EV, window);
            that._unbind(CANCEL_EV, window);

            if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);

            if (that.zoomed) {
                scale = that.scale * that.lastScale;
                scale = Math.max(that.options.zoomMin, scale);
                scale = Math.min(that.options.zoomMax, scale);
                that.lastScale = scale / that.scale;
                that.scale = scale;

                that.x = that.originX - that.originX * that.lastScale + that.x;
                that.y = that.originY - that.originY * that.lastScale + that.y;

                that.scroller.style[transitionDuration] = '200ms';
                that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + that.scale + ')' + translateZ;

                that.zoomed = false;
                that.refresh();

                if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e, scale);
                return;
            }

            if (!that.moved) {
                //custom - double click and double tap
                if (true) {
//                    if (hasTouch) {
                    if (that.doubleTapTimer && that.options.zoom) {
                        // Double tapped
                        clearTimeout(that.doubleTapTimer);
                        that.doubleTapTimer = null;

                        if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
//                            that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
                        //custom    - double tap zoom disabled
//                        that.zoom(that.pointX, that.pointY, that.scale < that.options.zoomMin * that.options.doubleTapZoom ? that.options.zoomMin * that.options.doubleTapZoom : that.options.zoomMin);
                        if (that.options.onZoomEnd) {
                            setTimeout(function () {
                                that.options.onZoomEnd.call(that, e, scale);
                            }, 200); // 200 is default zoom duration
                        }
                    } else if (this.options.handleClick) {
                        //first tap
                        that.doubleTapTimer = setTimeout(function () {
                            that.doubleTapTimer = null;

                            // Find the last touched element
                            target = point.target;
                            while (target.nodeType != 1) target = target.parentNode;

                            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
                                ev = doc.createEvent('MouseEvents');
                                ev.initMouseEvent('click', true, true, e.view, 1,
                                    point.screenX, point.screenY, point.clientX, point.clientY,
                                    e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                                    0, null);
                                ev._fake = true;
                                target.dispatchEvent(ev);
                            }

                            //custom - first tap, after timeout
                            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                        }, that.options.zoom ? 250 : 0);
                    }
                }

                that._resetPos(400);
                //custom - call only if no double tap
                //                    if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }

            if (duration < 300 && that.options.momentum) {
                momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
                momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

                newPosX = that.x + momentumX.dist;
                newPosY = that.y + momentumY.dist;

                if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
                if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
            }

            if (momentumX.dist || momentumY.dist) {
                newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

                // Do we need to snap?
                if (that.options.snap) {
                    distX = newPosX - that.absStartX;
                    distY = newPosY - that.absStartY;
                    if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) {
                        that.scrollTo(that.absStartX, that.absStartY, 200);
                    }
                    else {
                        snap = that._snap(newPosX, newPosY);
                        newPosX = snap.x;
                        newPosY = snap.y;
                        newDuration = m.max(snap.time, newDuration);
                    }
                }

                that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);

                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }

            // Do we need to snap?
            if (that.options.snap) {
                distX = newPosX - that.absStartX;
                distY = newPosY - that.absStartY;
                if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
                else {
                    snap = that._snap(that.x, that.y);
                    if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
                }

                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }

            that._resetPos(200);
            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
        },

        _resetPos:function (time) {
            var that = this;
            //custom : stay in center
            if (that.keepInCenterH && that.scrollerW < that.wrapperW) {
                resetX = that.x >= 0 ? (that.wrapperW - that.scrollerW) / 2 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
            }
            else
                resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;

            if (that.keepInCenterV && that.scrollerH < that.wrapperH) {
                resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
                resetY = that.y > 0 ? (that.wrapperH - that.scrollerH) / 2 : resetY;
            }

            else
                resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

            if (resetX == that.x && resetY == that.y) {
                if (that.moved) {
                    that.moved = false;
                    if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
                }

                if (that.hScrollbar && that.options.hideScrollbar) {
                    if (vendor == 'webkit') that.hScrollbarWrapper.style[transitionDelay] = '300ms';
                    that.hScrollbarWrapper.style.opacity = '0';
                }
                if (that.vScrollbar && that.options.hideScrollbar) {
                    if (vendor == 'webkit') that.vScrollbarWrapper.style[transitionDelay] = '300ms';
                    that.vScrollbarWrapper.style.opacity = '0';
                }

                return;
            }

            that.scrollTo(resetX, resetY, time || 0);
        },

        _wheel:function (e) {
            var that = this,
                wheelDeltaX, wheelDeltaY,
                deltaX, deltaY,
                deltaScale;

            if ('wheelDeltaX' in e) {
                wheelDeltaX = e.wheelDeltaX / 12;
                wheelDeltaY = e.wheelDeltaY / 12;
            } else if ('wheelDelta' in e) {
                wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
            } else if ('detail' in e) {
                wheelDeltaX = wheelDeltaY = -e.detail * 3;
            } else {
                return;
            }

            if (that.options.wheelAction == 'zoom') {
                deltaScale = that.scale * Math.pow(2, 1 / 3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
                if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
                if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;

                if (deltaScale != that.scale) {
                    if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                    that.wheelZoomCount++;

                    that.zoom(e.pageX, e.pageY, deltaScale, 400);

                    setTimeout(function () {
                        that.wheelZoomCount--;
                        if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e, that.scale);
                    }, 400);
                }

                return;
            }

            deltaX = that.x + wheelDeltaX;
			//custom - scroll 3 times more
            deltaY = that.y + wheelDeltaY*5;

            if (deltaX > 0) deltaX = 0;
			//custom - do not scroll horizontally
            // else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;

            if (deltaY > that.minScrollY) deltaY = that.minScrollY;
            else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;

            if (that.maxScrollY < 0) {
                that.scrollTo(deltaX, deltaY, 0);
            }
        },

        _transitionEnd:function (e) {
            var that = this;

            if (e.target != that.scroller) return;

            that._unbind(TRNEND_EV);

            that._startAni();
        },


        /**
         *
         * Utilities
         *
         */
        _startAni:function () {
            var that = this,
                startX = that.x, startY = that.y,
                startTime = Date.now(),
                step, easeOut,
                animate;

            if (that.animating) return;

            if (!that.steps.length) {
                that._resetPos(400);
                return;
            }

            step = that.steps.shift();

            if (step.x == startX && step.y == startY) step.time = 0;

            that.animating = true;
            that.moved = true;

            if (that.options.useTransition) {
                that._transitionTime(step.time);
                that._pos(step.x, step.y);
                that.animating = false;
                if (step.time) that._bind(TRNEND_EV);
                else that._resetPos(0);
                return;
            }

            animate = function () {
                var now = Date.now(),
                    newX, newY;

                if (now >= startTime + step.time) {
                    that._pos(step.x, step.y);
                    that.animating = false;
                    if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);			// Execute custom code on animation end
                    that._startAni();
                    return;
                }

                now = (now - startTime) / step.time - 1;
                easeOut = m.sqrt(1 - now * now);
                newX = (step.x - startX) * easeOut + startX;
                newY = (step.y - startY) * easeOut + startY;
                that._pos(newX, newY);
                if (that.animating) that.aniTime = nextFrame(animate);
            };

            animate();
        },

        _transitionTime:function (time) {
            time += 'ms';
            this.scroller.style[transitionDuration] = time;
            if (this.hScrollbar) this.hScrollbarIndicator.style[transitionDuration] = time;
            if (this.vScrollbar) this.vScrollbarIndicator.style[transitionDuration] = time;
        },

        _momentum:function (dist, time, maxDistUpper, maxDistLower, size) {
            var deceleration = 0.0006,
                speed = m.abs(dist) / time,
                newDist = (speed * speed) / (2 * deceleration),
                newTime = 0, outsideDist = 0;

            // Proportinally reduce speed if we are outside of the boundaries
            if (dist > 0 && newDist > maxDistUpper) {
                outsideDist = size / (6 / (newDist / speed * deceleration));
                maxDistUpper = maxDistUpper + outsideDist;
                speed = speed * maxDistUpper / newDist;
                newDist = maxDistUpper;
            } else if (dist < 0 && newDist > maxDistLower) {
                outsideDist = size / (6 / (newDist / speed * deceleration));
                maxDistLower = maxDistLower + outsideDist;
                speed = speed * maxDistLower / newDist;
                newDist = maxDistLower;
            }

            newDist = newDist * (dist < 0 ? -1 : 1);
            newTime = speed / deceleration;

            return { dist:newDist, time:m.round(newTime) };
        },

        _offset:function (el) {
            var left = -el.offsetLeft,
                top = -el.offsetTop;

            while (el = el.offsetParent) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
            }

            if (el != this.wrapper) {
                left *= this.scale;
                top *= this.scale;
            }

            return { left:left, top:top };
        },

        _snap:function (x, y) {
            var that = this,
                i, l,
                page, time,
                sizeX, sizeY;

            // Check page X
            page = that.pagesX.length - 1;
            //custom - fix for loop
            l = that.pagesX.length;
            for (i = 0; i < l; i++) {
//            for (i = 0, l = that.pagesX.length; i < l; i++) {
                if (x >= that.pagesX[i]) {
                    page = i;
                    break;
                }
            }
            if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
            x = that.pagesX[page];
            sizeX = m.abs(x - that.pagesX[that.currPageX]);
            sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
            that.currPageX = page;

            // Check page Y
            page = that.pagesY.length - 1;
            for (i = 0; i < page; i++) {
                if (y >= that.pagesY[i]) {
                    page = i;
                    break;
                }
            }
            if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
            y = that.pagesY[page];
            sizeY = m.abs(y - that.pagesY[that.currPageY]);
            sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
            that.currPageY = page;

            // Snap with constant speed (proportional duration)
            time = m.round(m.max(sizeX, sizeY)) || 200;

            return { x:x, y:y, time:time };
        },

        _bind:function (type, el, bubble) {
            if(this.scroller.addEventListener)
                (el || this.scroller).addEventListener(type, this, !!bubble);
            else
                (el || this.scroller).attachEvent(type, this, !!bubble);
        },

        _unbind:function (type, el, bubble) {
            if(this.scroller.removeEventListener)
                (el || this.scroller).removeEventListener(type, this, !!bubble);
            else
                (el || this.scroller).detachEvent(type, this, !!bubble);
        },


        /**
         *
         * Public methods
         *
         */
        destroy:function () {
            var that = this;

            that.scroller.style[transform] = '';

            // Remove the scrollbars
            that.hScrollbar = false;
            that.vScrollbar = false;
            that._scrollbar('h');
            that._scrollbar('v');

            // Remove the event listeners
            that._unbind(RESIZE_EV, window);
            that._unbind(START_EV);
            that._unbind(MOVE_EV, window);
            that._unbind(END_EV, window);
            that._unbind(CANCEL_EV, window);

            if (!that.options.hasTouch) {
                that._unbind('DOMMouseScroll');
                that._unbind('mousewheel');
            }

            if (that.options.useTransition) that._unbind(TRNEND_EV);

            if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);

            if (that.options.onDestroy) that.options.onDestroy.call(that);
        },

        refresh:function () {
            var that = this,
                offset,
                i, l,
                els,
                pos = 0,
                page = 0;

            if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
            that.wrapperW = that.wrapper.clientWidth || 1;
            that.wrapperH = that.wrapper.clientHeight || 1;

            that.minScrollY = -that.options.topOffset || 0;
            that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
            that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
            that.maxScrollX = that.wrapperW - that.scrollerW;
            that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
            that.dirX = 0;
            that.dirY = 0;

            if (that.options.onRefresh) that.options.onRefresh.call(that);

            that.hScroll = that.options.hScroll && that.maxScrollX < 0;
            that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);

            that.hScrollbar = that.hScroll && that.options.hScrollbar;
            that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

            offset = that._offset(that.wrapper);
            that.wrapperOffsetLeft = -offset.left;
            that.wrapperOffsetTop = -offset.top;

            // Prepare snap
            if (typeof that.options.snap == 'string') {
                that.pagesX = [];
                that.pagesY = [];
                els = that.scroller.querySelectorAll(that.options.snap);
                //custom - fix for loop
                l = els.length;
                for (i = 0; i < l; i++) {
                    pos = that._offset(els[i]);
                    pos.left += that.wrapperOffsetLeft;
                    pos.top += that.wrapperOffsetTop;
                    that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
                    that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
                }
            } else if (that.options.snap) {
                that.pagesX = [];
                while (pos >= that.maxScrollX) {
                    that.pagesX[page] = pos;
                    pos = pos - that.wrapperW;
                    page++;
                }
                if (that.maxScrollX % that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length - 1] + that.pagesX[that.pagesX.length - 1];

                pos = 0;
                page = 0;
                that.pagesY = [];
                while (pos >= that.maxScrollY) {
                    that.pagesY[page] = pos;
                    pos = pos - that.wrapperH;
                    page++;
                }
                if (that.maxScrollY % that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length - 1] + that.pagesY[that.pagesY.length - 1];
            }

            // Prepare the scrollbars
            that._scrollbar('h');
            that._scrollbar('v');

            if (!that.zoomed) {
                that.scroller.style[transitionDuration] = '0';
                that._resetPos(400);
            }
        },

        scrollTo:function (x, y, time, relative) {
            var that = this,
                step = x,
                i, l;

            that.stop();

            if (!step.length) step = [
                { x:x, y:y, time:time, relative:relative }
            ];
             //custom - fix for loop
            l = step.length;
            for (i = 0; i < l; i++) {
                if (step[i].relative) {
                    step[i].x = that.x - step[i].x;
                    step[i].y = that.y - step[i].y;
                }
                that.steps.push({ x:step[i].x, y:step[i].y, time:step[i].time || 0 });
            }

            that._startAni();
        },

        scrollToElement:function (el, time) {
            var that = this, pos;
            el = el.nodeType ? el : that.scroller.querySelector(el);
            if (!el) return;

            pos = that._offset(el);
            pos.left += that.wrapperOffsetLeft;
            pos.top += that.wrapperOffsetTop;

            pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
            pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
            time = time === undefined ? m.max(m.abs(pos.left) * 2, m.abs(pos.top) * 2) : time;

            that.scrollTo(pos.left, pos.top, time);
        },

        scrollToPage:function (pageX, pageY, time) {
            var that = this, x, y;

            time = time === undefined ? 400 : time;

            if (that.options.onScrollStart) that.options.onScrollStart.call(that);

            if (that.options.snap) {
                pageX = pageX == 'next' ? that.currPageX + 1 : pageX == 'prev' ? that.currPageX - 1 : pageX;
                pageY = pageY == 'next' ? that.currPageY + 1 : pageY == 'prev' ? that.currPageY - 1 : pageY;

                pageX = pageX < 0 ? 0 : pageX > that.pagesX.length - 1 ? that.pagesX.length - 1 : pageX;
                pageY = pageY < 0 ? 0 : pageY > that.pagesY.length - 1 ? that.pagesY.length - 1 : pageY;

                that.currPageX = pageX;
                that.currPageY = pageY;
                x = that.pagesX[pageX];
                y = that.pagesY[pageY];
            } else {
                x = -that.wrapperW * pageX;
                y = -that.wrapperH * pageY;
                if (x < that.maxScrollX) x = that.maxScrollX;
                if (y < that.maxScrollY) y = that.maxScrollY;
            }

            that.scrollTo(x, y, time);
        },

        disable:function () {
            this.stop();
            this._resetPos(0);
            this.enabled = false;

            // If disabled after touchstart we make sure that there are no left over events
            this._unbind(MOVE_EV, window);
            this._unbind(END_EV, window);
            this._unbind(CANCEL_EV, window);
        },

        enable:function () {
            this.enabled = true;
        },

        stop:function () {
            if (this.options.useTransition) this._unbind(TRNEND_EV);
            else cancelFrame(this.aniTime);
            this.steps = [];
            this.moved = false;
            this.animating = false;
        },

        zoom:function (x, y, scale, time) {
            var that = this,
                relScale = scale / that.scale;

            if (!that.options.useTransform) return;

            that.zoomed = true;
            time = time === undefined ? 200 : time;
            x = x - that.wrapperOffsetLeft - that.x;
            y = y - that.wrapperOffsetTop - that.y;
            that.x = x - x * relScale + that.x;
            that.y = y - y * relScale + that.y;

            that.scale = scale;
            that.refresh();

            that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
            that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

            //custom   - fix for inner container to be in the middle
            if (that.keepInCenterH) {
                if (that.scrollerW < that.wrapperW) {
                    that.x = (that.wrapperW - that.scrollerW) / 2;
                }
            }
            if (that.keepInCenterV) {
                if (that.scrollerH < that.wrapperH) {
                    that.y = (that.wrapperH - that.scrollerH) / 2;
                }
            }
            that.scroller.style[transitionDuration] = time + 'ms';
            that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + scale + ')' + translateZ;
            that.zoomed = false;
        },

        isReady:function () {
            return !this.moved && !this.zoomed && !this.animating;
        },

        // custom
        setX:function (value) {
            this.x = value;
        }
    };

    function prefixStyle(style) {
        if (vendor === '') return style;

        style = style.charAt(0).toUpperCase() + style.substr(1);
        return vendor + style;
    }

    dummyStyle = null;	// for the sake of it

    if (typeof exports !== 'undefined') exports.iScroll = iScroll;
    else window.iScroll = iScroll;

})(window, document);
}

{/* Detector */
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};
// This THREEx helper makes it easy to handle the fullscreen API
// * it hides the prefix for each browser
// * it hides the little discrepencies of the various vendor API
// * at the time of this writing (nov 2011) it is available in 
//   [firefox nightly](http://blog.pearce.org.nz/2011/11/firefoxs-html-full-screen-api-enabled.html),
//   [webkit nightly](http://peter.sh/2011/01/javascript-full-screen-api-navigation-timing-and-repeating-css-gradients/) and
//   [chrome stable](http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API).

// 
// # Code

//
}

{/* THREEx */
var THREEx		= THREEx 		|| {};
THREEx.FullScreen	= THREEx.FullScreen	|| {};

/**
 * test if it is possible to have fullscreen
 * 
 * @returns {Boolean} true if fullscreen API is available, false otherwise
*/
THREEx.FullScreen.available	= function()
{
	return this._hasWebkitFullScreen || this._hasMozFullScreen || this._hasIEFullScreen|| this._hasFullScreen;
}

/**
 * test if fullscreen is currently activated
 * 
 * @returns {Boolean} true if fullscreen is currently activated, false otherwise
*/
THREEx.FullScreen.activated	= function()
{
	if( this._hasWebkitFullScreen ){
		return document.webkitIsFullScreen;
	}else if( this._hasMozFullScreen ){
		return document.mozFullScreen;
	}else if( this._hasIEFullScreen ){
		return document.msFullscreenElement != null;
	}else if( this._hasFullScreen ){
		return document.fullscreenElement != null;
	}else{
		console.assert(false);
	}
}

/**
 * Request fullscreen on a given element
 * @param {DomElement} element to make fullscreen. optional. default to document.body
*/
THREEx.FullScreen.request	= function(element)
{
	element	= element	|| document.body;
	if( this._hasWebkitFullScreen ){
		element.webkitRequestFullScreen();
	}else if( this._hasMozFullScreen ){
		element.mozRequestFullScreen();
	}else if( this._hasIEFullScreen ){
		element.msRequestFullscreen();
	}else if( this._hasFullScreen ){
		element.requestFullscreen();
	}else{
		console.assert(false);
	}
}

/**
 * Cancel fullscreen
*/
THREEx.FullScreen.cancel	= function()
{
	if( this._hasWebkitFullScreen ){
		document.webkitCancelFullScreen();
	}else if( this._hasMozFullScreen ){
		document.mozCancelFullScreen();
	}else if( this._hasIEFullScreen ){
		document.msExitFullscreen();
	}else if( this._hasFullScreen ){
		document.exitFullscreen();
	}else{
		console.assert(false);
	}
}

// internal functions to know which fullscreen API implementation is available
THREEx.FullScreen._hasWebkitFullScreen	= 'webkitCancelFullScreen' in document	? true : false;	
THREEx.FullScreen._hasMozFullScreen	= 'mozCancelFullScreen' in document	? true : false;	
THREEx.FullScreen._hasIEFullScreen	= 'msExitFullscreen' in document	? true : false;	
THREEx.FullScreen._hasFullScreen	= 'exitFullscreen' in document	? true : false;	
}

{/* TWEEN */
// tween.js r5 - http://github.com/sole/tween.js
var TWEEN=TWEEN||function(){var a,e,c=60,b=false,h=[];return{setFPS:function(f){c=f||60},start:function(f){arguments.length!=0&&this.setFPS(f);e=setInterval(this.update,1E3/c)},stop:function(){clearInterval(e)},setAutostart:function(f){(b=f)&&!e&&this.start()},add:function(f){h.push(f);b&&!e&&this.start()},getAll:function(){return h},removeAll:function(){h=[]},remove:function(f){a=h.indexOf(f);a!==-1&&h.splice(a,1)},update:function(f){a=0;num_tweens=h.length;for(f=f||Date.now();a<num_tweens;)if(h[a].update(f))a++;
else{h.splice(a,1);num_tweens--}num_tweens==0&&b==true&&this.stop()}}}();
TWEEN.Tween=function(a){var e={},c={},b={},h=1E3,f=0,j=null,n=TWEEN.Easing.Linear.EaseNone,k=null,l=null,m=null;this.to=function(d,g){if(g!==null)h=g;for(var i in d)if(a[i]!==null)b[i]=d[i];return this};this.start=function(d){TWEEN.add(this);j=d?d+f:Date.now()+f;for(var g in b)if(a[g]!==null){e[g]=a[g];c[g]=b[g]-a[g]}return this};this.stop=function(){TWEEN.remove(this);return this};this.delay=function(d){f=d;return this};this.easing=function(d){n=d;return this};this.chain=function(d){k=d};this.onUpdate=
function(d){l=d;return this};this.onComplete=function(d){m=d;return this};this.update=function(d){var g,i;if(d<j)return true;d=(d-j)/h;d=d>1?1:d;i=n(d);for(g in c)a[g]=e[g]+c[g]*i;l!==null&&l.call(a,i);if(d==1){m!==null&&m.call(a);k!==null&&k.start();return false}return true}};TWEEN.Easing={Linear:{},Quadratic:{},Cubic:{},Quartic:{},Quintic:{},Sinusoidal:{},Exponential:{},Circular:{},Elastic:{},Back:{},Bounce:{}};TWEEN.Easing.Linear.EaseNone=function(a){return a};
TWEEN.Easing.Quadratic.EaseIn=function(a){return a*a};TWEEN.Easing.Quadratic.EaseOut=function(a){return-a*(a-2)};TWEEN.Easing.Quadratic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a;return-0.5*(--a*(a-2)-1)};TWEEN.Easing.Cubic.EaseIn=function(a){return a*a*a};TWEEN.Easing.Cubic.EaseOut=function(a){return--a*a*a+1};TWEEN.Easing.Cubic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a;return 0.5*((a-=2)*a*a+2)};TWEEN.Easing.Quartic.EaseIn=function(a){return a*a*a*a};
TWEEN.Easing.Quartic.EaseOut=function(a){return-(--a*a*a*a-1)};TWEEN.Easing.Quartic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a*a;return-0.5*((a-=2)*a*a*a-2)};TWEEN.Easing.Quintic.EaseIn=function(a){return a*a*a*a*a};TWEEN.Easing.Quintic.EaseOut=function(a){return(a-=1)*a*a*a*a+1};TWEEN.Easing.Quintic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a*a*a;return 0.5*((a-=2)*a*a*a*a+2)};TWEEN.Easing.Sinusoidal.EaseIn=function(a){return-Math.cos(a*Math.PI/2)+1};
TWEEN.Easing.Sinusoidal.EaseOut=function(a){return Math.sin(a*Math.PI/2)};TWEEN.Easing.Sinusoidal.EaseInOut=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};TWEEN.Easing.Exponential.EaseIn=function(a){return a==0?0:Math.pow(2,10*(a-1))};TWEEN.Easing.Exponential.EaseOut=function(a){return a==1?1:-Math.pow(2,-10*a)+1};TWEEN.Easing.Exponential.EaseInOut=function(a){if(a==0)return 0;if(a==1)return 1;if((a*=2)<1)return 0.5*Math.pow(2,10*(a-1));return 0.5*(-Math.pow(2,-10*(a-1))+2)};
TWEEN.Easing.Circular.EaseIn=function(a){return-(Math.sqrt(1-a*a)-1)};TWEEN.Easing.Circular.EaseOut=function(a){return Math.sqrt(1- --a*a)};TWEEN.Easing.Circular.EaseInOut=function(a){if((a/=0.5)<1)return-0.5*(Math.sqrt(1-a*a)-1);return 0.5*(Math.sqrt(1-(a-=2)*a)+1)};TWEEN.Easing.Elastic.EaseIn=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);return-(c*Math.pow(2,10*(a-=1))*Math.sin((a-e)*2*Math.PI/b))};
TWEEN.Easing.Elastic.EaseOut=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);return c*Math.pow(2,-10*a)*Math.sin((a-e)*2*Math.PI/b)+1};
TWEEN.Easing.Elastic.EaseInOut=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);if((a*=2)<1)return-0.5*c*Math.pow(2,10*(a-=1))*Math.sin((a-e)*2*Math.PI/b);return c*Math.pow(2,-10*(a-=1))*Math.sin((a-e)*2*Math.PI/b)*0.5+1};TWEEN.Easing.Back.EaseIn=function(a){return a*a*(2.70158*a-1.70158)};TWEEN.Easing.Back.EaseOut=function(a){return(a-=1)*a*(2.70158*a+1.70158)+1};
TWEEN.Easing.Back.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*(3.5949095*a-2.5949095);return 0.5*((a-=2)*a*(3.5949095*a+2.5949095)+2)};TWEEN.Easing.Bounce.EaseIn=function(a){return 1-TWEEN.Easing.Bounce.EaseOut(1-a)};TWEEN.Easing.Bounce.EaseOut=function(a){return(a/=1)<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375};
TWEEN.Easing.Bounce.EaseInOut=function(a){if(a<0.5)return TWEEN.Easing.Bounce.EaseIn(a*2)*0.5;return TWEEN.Easing.Bounce.EaseOut(a*2-1)*0.5+0.5};
}

if (!FLIPBOOK.threejsSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.threejsSrc = (function () {
    'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/three66');
  })();
}

if (!FLIPBOOK.flipbookWebGlSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.flipbookWebGlSrc = (function () {
    'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/flipbook.webgl');
  })();
}
if (!FLIPBOOK.pdfjsSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.pdfjsSrc = (function () {
    'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/pdf');
  })();
}
if (!FLIPBOOK.compatibilityjsSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.compatibilityjsSrc = (function () {
    'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/compatibility');
  })();
}
if (!FLIPBOOK.pdfjsworkerSrc && typeof document !== 'undefined') {
  // workerSrc is not set -- using last script url to define default location
  FLIPBOOK.pdfjsworkerSrc = (function () {
    'use strict';
    var scriptTagContainer = document.body ||
                             document.getElementsByTagName('head')[0];
    var scriptSrc = scriptTagContainer.lastChild.src;
    return scriptSrc && scriptSrc.replace("/flipbook", '/pdf.worker');
  })();
}
FLIPBOOK.scriptsLoaded = [];