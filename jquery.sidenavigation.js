/*
 * jquery.sidenavigation.js v1.0.3
 *
 * Description: Allow user to navigate to site by selecting one of its sections and smoothly scrolling to it.
 * Copyright: http://www.agentimage.com
 * License: Proprietary
 */

( function() {
    
    jQuery.fn.sideNavigation = function(settings) { sideNavigation( jQuery(this), settings ); }

    function sideNavigation( object, settings ) {
        var targetObject = jQuery(object),
            defaults = {
                sectionClass: 'aios-scroll-section',
                sectionAttrTitle: 'data-aios-scroll-title',
                skipSectionId: '',
                navSectionClass: 'aios-section-nav',
                navSectionAppend: '<li class="{{scroll-id}}"><span class="scroll-section-title">{{scroll-title}}</span><a href="{{scroll-id}}" class="scroll-section-dot"><em style="font-size: 0 !important;">{{scroll-title}}</em></a></li>',
                navLinkId: 'aios-scroll-id-',
                navArrow: false,
                navArrowPrev: '<span class="aios-scroll-arrow aios-scroll-prev"></span>',
                navArrowNext: '<span class="aios-scroll-arrow aios-scroll-next"></span>',
                hasHeaderFix: false,
                headerFixElement: '.header',
                scrollSpeed: 1500
            };

        settings = jQuery.extend( defaults, settings );

        /** Check if element exists */
        function ifElExists( element ) { return jQuery( element ).length > 0 ? true : false; }

        /** Check if main element exists */
        if ( !ifElExists( object ) ) {
            console.log( 'Main element doesn\'t exists' );
            return false;
        }

        /** Check if section element exists */
        if ( !ifElExists( '.' + settings.sectionClass ) ) {
            console.log( 'Section element doesn\'t exists' );
            return false;
        }

        /** Check if section nav element exists */
        if ( !ifElExists( '.' + settings.navSectionClass ) ) {
            console.log( 'Section nav element doesn\'t exists' );
            return false;
        }

        /** Append links to nav */
        jQuery( '.' + settings.sectionClass ).each( function(i, v) {
            var sectionClassId      = jQuery( v ).attr( 'id' ),
                sectionClassTitle   = jQuery( v ).attr( settings.sectionAttrTitle ),
                navSectionAppend    = settings.navSectionAppend,
                navSectionAppend    = navSectionAppend.replace( /class\=\"\{\{scroll\-id\}\}\"/g, 'class="' + settings.navLinkId + sectionClassId + '"' ),
                navSectionAppend    = navSectionAppend.replace( /\{\{scroll\-title\}\}/g, sectionClassTitle )
                navSectionAppend    = navSectionAppend.replace( /\{\{scroll\-id\}\}/g, '#' + sectionClassId );

            if ( sectionClassId == undefined || sectionClassId == '' || sectionClassTitle == undefined  || sectionClassTitle == '' ) {
                console.log( 'All sections must have an ID and Title(Use attr "' + settings.sectionAttrTitle + '").' );
                object.remove();
                return false;
            }

            /** If section doesn't have skip id. */
            if ( settings.skipSectionId != sectionClassId ) jQuery( '.' + settings.navSectionClass ).append( navSectionAppend );
        } );

        /** Append button after appending all links to nav */
        if ( settings.navArrow ) {
            jQuery( '.' + settings.navSectionClass ).before( settings.navArrowPrev );
            jQuery( '.' + settings.navSectionClass ).after( settings.navArrowNext );
        }

        /** Get the first and last section id */
        var firstSectionClassId = jQuery( '.' + settings.sectionClass ).first().attr( 'id' );
            lastSectionClassId = jQuery( '.' + settings.sectionClass ).last().attr( 'id' );

        /** Update Navigation on Scroll */
        updateNavigation();
        jQuery( window ).on( 'scroll resize', function() {
            updateNavigation();
        } );

        /** Function: Update Navigation Function */
        function updateNavigation() {
            var scrollPosition = jQuery(window).scrollTop(),
                windowHeight = jQuery(window).height();

            jQuery( '.' + settings.sectionClass ).each( function(i, v) {
                var sectionClassId  = jQuery( v ).attr( 'id' ),
                    winPosTop       = jQuery( v ).offset().top - windowHeight / 2,
                    winPosBottom    = jQuery( v ).offset().top + jQuery( v ).height() - windowHeight / 2,
                    previousEl      = jQuery( v ).prevAll(settings.sectionClass),
                    nextEl          = jQuery( v ).nextAll(settings.sectionClass),
                    atTheBottom     = scrollPosition + windowHeight == jQuery( document ).height();
                
                /** Check if item is halfway on viewport or at the bottom of page */
                if ( ( winPosTop < scrollPosition ) && ( winPosBottom > scrollPosition ) || atTheBottom ) {

                    if ( nextEl.attr( settings.sectionAttrTitle ) != undefined ) {
                        /** Check if previous object(whole) if still in viewport */
                        if ( sectionViewport( previousEl ) && previousEl.attr( settings.sectionAttrTitle ) != undefined ) sectionClassId = previousEl.attr( 'id' );
                        
                        /** Check if next section is same id of last id */
                        if ( sectionViewport( nextEl ) && nextEl.attr( 'id' ) == lastSectionClassId && atTheBottom ) sectionClassId = lastSectionClassId;
                    } else if ( atTheBottom ) {
                        /** Check if in bottom section active the last section */
                        sectionClassId = lastSectionClassId;
                    }

                    /** Add class to main element */
                    if ( targetObject.attr( 'class' ) != undefined ) {
                        var targetObjectClass = targetObject.attr( 'class' ).split( " " ), newTargetObjectClass = [];
    
                        for (var i = 0; i < targetObjectClass.length; i++) {
                            var regExClass = targetObjectClass[i].search(/nav-active-section-/);
                            if( regExClass ) newTargetObjectClass[newTargetObjectClass.length] = targetObjectClass[i];
                        }

                        targetObject.removeClass().addClass(newTargetObjectClass.join(" ")); 
                    }
					targetObject.addClass( 'vertical-nav-active nav-active-section-' + sectionClassId );
					jQuery( 'body' ).attr( 'sidebar-active-section', sectionClassId );

                    /** Remove active class if skip section is active */
                    if ( settings.skipSectionId == sectionClassId ) targetObject.removeClass( 'vertical-nav-active' );

                    /** Add class to nav link */
                    jQuery( '.' + settings.navSectionClass + ' *[class*=' + settings.navLinkId + ']' ).removeClass( 'nav-active-section' );
                    jQuery( '.' + settings.navSectionClass + ' .' + settings.navLinkId + sectionClassId  ).addClass( 'nav-active-section' );
                }
            } );
        }

        /** Function: Check section if is in viewport */
        function sectionViewport( object ) {
            var offset          = object.offset(),
			    objectHeight    = object.outerHeight(),
			    viewTop         = jQuery(window).scrollTop(),
			    viewBottom      = viewTop + jQuery(window).height(),
                offsetBottom    = offset.top + objectHeight;
                
            return ( (offset.top >= viewTop) && (offsetBottom <= viewBottom) );
        }
        
        /** Variables : Scroll to section */
        var $viewport = jQuery( 'html, body' );
        jQuery( '.' + settings.navSectionClass + ' *[class*=' + settings.navLinkId + '] a' ).addClass( 'scroll-to-section' );

        /** Function: Scroll to section */
        function scrollToSection( sectionClassId ) {
            var sectionPos = jQuery( sectionClassId ).offset().top;

            // Stop the animation if the user scrolls. Defaults on .stop() should be fine
            $viewport.bind( "scroll mousedown DOMMouseScroll mousewheel keyup", function( e ){
                if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
            } );

            if ( settings.hasHeaderFix ) {
                var headerHeight = jQuery( settings.headerFixElement ).outerHeight( true );
                $viewport.animate({ scrollTop: sectionPos - headerHeight }, settings.scrollSpeed);
            } else {
                $viewport.animate({ scrollTop: sectionPos }, settings.scrollSpeed);
            }
        }

        /** Trigger: Scroll to section using navigation */
        jQuery( document ).on( 'click', '.scroll-to-section', function( e ) {
            e.preventDefault();

            var sectionId = jQuery( e.currentTarget ).attr( 'href' );
            scrollToSection( sectionId );
            return false;
        } );

        /** Trigger: Scroll to section using arrow prev */
        jQuery( document ).on( 'click', '.aios-scroll-prev', function( e ) {
            e.preventDefault();

            var sectionId = jQuery( '.nav-active-section' ).prev().find( 'a.scroll-to-section' ).attr( 'href' );
            if ( sectionId != firstSectionClassId ) scrollToSection( sectionId );

            return false;
        } );

        /** Trigger: Scroll to section using arrow next */
        jQuery( document ).on( 'click', '.aios-scroll-next', function( e ) {
            e.preventDefault();

            var sectionId = jQuery( '.nav-active-section' ).next().find( 'a.scroll-to-section' ).attr( 'href' );
            if ( sectionId != firstSectionClassId ) scrollToSection( sectionId );

            return false;
        } );
    }

} )();