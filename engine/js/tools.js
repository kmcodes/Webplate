/**
 * File: tools.js
 * Type: Javascript tools file
 * Author: Chris Humboldt
 * Last Edited: 23 April 2015
 */


// Table of contents
// ---------------------------------------------------------------------------------------
// Variables
// Basic checks
// Dates
// Development
// DOM
// Forms
// Objects
// Strings
// URL
// Webplate

// Variables
// ---------------------------------------------------------------------------------------
var $bodyElement = document.getElementsByTagName('body')[0];
var $htmlElement = document.getElementsByTagName('html')[0];
var $navEndPosition = 0;
var $navigationWidth;
var $navTrackPosition;
var $navigation = document.getElementById('navigation');
var $navigationTrigger = document.getElementById('navigation-trigger');

// Create web function object
// ---------------------------------------------------------------------------------------
var web = {
	// Basic checks
	exists: function($element) {
		if ($element == null || typeof($element) == 'undefined') {
			return false;
		} else {
			return true;
		}
	},
	hasWhiteSpace: function($check) {
		return /\s/.test($check);
	},
	isColor: function($color) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
	},
	isDate: function($date) {
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
	},
	isEmail: function($email) {
		return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($email);
	},
	isExtension: function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	},
	isFullInteger: function($int) {
		return /^[0-9]+$/.test($int);
	},
	isImage: function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'];
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	},
	IsInteger: function($int) {
		return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
	},
	isPassword: function($password) {
		return /^[A-Za-z0-9]{6,}$/.test($password);
	},
	// Dates
	crtDBDate: function() {
		var $now = new Date();
		return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
	},
	// Development
	addEvent: function($elem, $type, $eventHandle) {
		if ($elem == null || typeof($elem) == 'undefined') return;
		if ($elem.addEventListener) {
			$elem.addEventListener($type, $eventHandle, false);
		} else if ($elem.attachEvent) {
			$elem.attachEvent("on" + $type, $eventHandle);
		} else {
			$elem["on" + $type] = $eventHandle;
		}
	},
	classAdd: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($selector.className.indexOf($class) === -1) {
			$selector.className = $selector.className === '' ? $class : $selector.className + ' ' + $class;
		}
	},
	classRemove: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($crtClass.indexOf($class) > -1) {
			$selector.className = $selector.className.split(' ').filter(function($val) {
				return $val != $class;
			}).toString().replace(/,/g, ' ');
		}
	},
	hasClass: function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	},
	idAdd: function($selector, $id) {
		$selector.setAttribute('id', $id);
	},
	log: function($text) {
		if (window.console) {
			console.log($text);
		}
	},
	// DOM
	square: function($selector, $multiplier) {
		// Variables
		var $elements = document.querySelectorAll($selector);
		if (typeof($multiplier) === 'undefined') {
			$multiplier = 1;
		}

		// Loop through elements
		for (var $i = 0; $i < $elements.length; $i++) {
			$elements[$i].style.height = Math.floor($elements[$i].offsetWidth * $multiplier) + 'px';
		}
	},
	wallpaper: function($selector) {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			// Variables
			var $thisWallpaper = $elements[$i].getAttribute('data-wallpaper');

			// Set the dimensions
			if ($thisWallpaper !== null) {
				$elements[$i].style.backgroundImage = 'url("' + $thisWallpaper + '")';
			}
		}
	},
	// Forms
	lockSubmit: function($selector) {
		var $elements = document.querySelectorAll($selector);

		for ($i = 0; $i < $elements.length; $i++) {
			$elements[$i].onclick = function($ev) {
				if ($ev.keyCode == 13) {
					return false;
				}
			};
		}
	},
	// Objects
	// As per Leon Revill
	// URL: http://www.revillweb.com/tutorials/super-useful-javascript-functions/
	searchObjects: function($obj, $key, $val) {
		var $objects = [];

		for (var $i in $obj) {
			if (typeof $obj[$i] == 'object') {
				$objects = $objects.concat(searchObjects($obj[$i], $key, $val));
			} else if ($i == $key && $obj[$key] == $val) {
				$objects.push($obj);
			}
		}

		return $objects;
	},
	// Strings
	getExtension: function($file) {
		return $file.split('.').pop().toLowerCase();
	},
	RandomString: function($stringLength) {
		var $chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

		var $len = $stringLength || 5;
		var $randomString = '';

		for (var $i = 0; $i < $len; $i++) {
			$rNum = Math.floor(Math.random() * $chars.length);
			$randomString += $chars[$rNum];
		}

		return $randomString;
	},
	ucAll: function($string) {
		return $string.toUpperCase();
	},
	ucFirst: function($string) {
		return $string.charAt(0).toUpperCase() + $string.slice(1);
	},
	// URL
	getUrl: function() {
		var $windowLocation = window.location;
		var $fullPath = $windowLocation.href;
		var $arPath = $windowLocation.href.split('/');
		var $hashSplit = $windowLocation.href.split('#');
		var $protocol = $arPath[0];
		var $host = $arPath[2];
		var $baseUrl = $protocol + '//' + $host;
		var $hashUrl = $windowLocation.hash.substring(1);
		var $sitePath = $hashSplit[0];
		var $arReturn = [];

		// Set the return array
		$arReturn['hash'] = $hashUrl;
		$arReturn['host'] = $host;
		$arReturn['baseUrl'] = $baseUrl;
		$arReturn['sitePath'] = $sitePath;
		$arReturn['fullPath'] = $fullPath;

		// Return
		return $arReturn;
	},
	// Webplate
	navHide: function() {
		var $webNavigation = document.getElementById('web-navigation');

		Velocity($webNavigation, {
			left: 0
		}, {
			duration: 200,
			easing: 'ease-out',
			complete: function() {
				this.classRemove($htmlElement, 'web-nav-shown');
				this.classAdd($htmlElement, 'web-nav-hidden');
			}
		});

		// Set nav end position
		$navEndPosition = 0;

		// Hide overlay
		this.overlayHide();
	},
	navShow: function() {
		// Variables
		var $webNavigation = document.getElementById('web-navigation');
		var $navigationWidth = $webNavigation.offsetWidth;

		Velocity($webNavigation, {
			left: $navigationWidth
		}, {
			duration: 200,
			easing: 'ease-out',
			complete: function() {
				this.classAdd($htmlElement, 'web-nav-shown');
				this.classRemove($htmlElement, 'web-nav-hidden');
			}
		});

		// Set nav end position
		$navEndPosition = 260;

		// Show overlay
		this.overlayShow();
	},
	navigation: function() {
		// Check
		if (this.exists($navigation)) {
			// Variables
			var $navigationClone = $navigation.cloneNode(true);

			// Duplicate navigation & change class name
			$navigationClone.setAttribute('id', 'web-navigation');
			$bodyElement.appendChild($navigationClone);

			// On click
			$navigationTrigger.onclick = function($ev) {
				$ev.preventDefault();

				// Check state
				if (this.hasClass($htmlElement, 'web-nav-shown')) {
					this.navHide();
				} else {
					this.navShow();
				}
			};

			// Close nav again
			var $webOverlay = document.getElementById('web-overlay');
			var $webNavigation = document.getElementById('web-navigation');
			var $webNavigationLinks = $webNavigation.getElementsByTagName('a');

			$webOverlay.onclick = function() {
				this.navHide();
			};

			for ($i = 0; $i < $webNavigationLinks.length; $i++) {
				$webNavigationLinks[$i].onclick = function($ev) {
					this.navHide();
				};
			};
		}
	},
	overlayHide: function() {
		var $webOverlay = document.getElementById('web-overlay');

		Velocity($webOverlay, {
			opacity: 0
		}, {
			display: 'none',
			duration: 200
		});
	},
	overlayShow: function() {
		var $webOverlay = document.getElementById('web-overlay');

		Velocity($webOverlay, {
			opacity: 0.4
		}, {
			display: 'block',
			duration: 200
		});
	},
	scroll: function() {
		// Some variables
		var $doc = document.documentElement;
		var $lastScroll = 0;
		var $scrollTop;

		// Setup
		this.classAdd($htmlElement, 'web-scroll-none');

		// On scroll event
		this.addEvent(window, 'scroll', function() {
			// Remove scroll nonw class
			if (web.hasClass($htmlElement, 'web-scroll-none')) {
				web.classRemove($htmlElement, 'web-scroll-none');
			}

			// Sets the current scroll position
			$scrollTop = (window.pageYOffset || $doc.scrollTop) - ($doc.clientTop || 0);

			// Determine direction of scroll
			if ($scrollTop > $lastScroll) {
				if (!web.hasClass($htmlElement, 'web-scroll-down')) {
					web.classRemove($htmlElement, 'web-scroll-up');
					web.classAdd($htmlElement, 'web-scroll-down');
				}
			} else {
				if (web.hasClass($htmlElement, 'web-scroll-down')) {
					web.classRemove($htmlElement, 'web-scroll-down');
					web.classAdd($htmlElement, 'web-scroll-up');
				}
			}

			// Updates scroll position
			$lastScroll = $scrollTop;
		});
	},
	scrollTo: function($selector, $offset, $offsetLarge) {
		// Variables
		var $elements = document.querySelectorAll($selector);
		var $offset = $offset || 0;
		var $offsetLarge = $offsetLarge || false;

		for ($i = 0; $i < $elements.length; $i++) {
			$elements[$i].onclick = function($ev) {
				return function($ev) {
					$ev.preventDefault();

					// Check the screen size
					var $vOffset = $offset;
					if (($offsetLarge !== false) && (window.innerWidth > 700)) {
						$vOffset = $offsetLarge;
					}
					Velocity(document.getElementById(this.getAttribute('data-scroll-to')), "scroll", {
						duration: 1200,
						easing: "easeOutCubic",
						offset: $vOffset
					});
				};
			}($i);
		}
	},
	windowType: function() {
		this.windowTypeExecute();
		this.addEvent(window, 'resize', function() {
			web.windowTypeExecute();
		});
	},
	windowTypeExecute: function() {
		// Some variables
		if (window.innerWidth <= 700) {
			// Set the class
			if (this.hasClass($htmlElement, 'web-view-large')) {
				this.classRemove($htmlElement, 'web-view-large');
			}
			if (this.hasClass($htmlElement, 'web-view-small') == false) {
				this.classAdd($htmlElement, 'web-view-small');
			}
		} else {
			// Set the class
			if (this.hasClass($htmlElement, 'web-view-small')) {
				this.classRemove($htmlElement, 'web-view-small');
			}
			if (this.hasClass($htmlElement, 'web-view-large') == false) {
				this.classAdd($htmlElement, 'web-view-large');
			}
			if (this.hasClass($htmlElement, 'web-nav-shown')) {
				this.navHide();
			}
		}
	}
};