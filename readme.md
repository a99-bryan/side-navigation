# Side Navigation
Selecting one of its sections and smoothly scrolling to it.

## Samples
* <a href="https://im-demos.agentimage.com/resources/side-navigation/">Default</a>
* <a href="https://im-demos.agentimage.com/resources/side-navigation/example-with-skip.html">Skip slider section </a>

## Installation
- Activate the script under AIOS All in One 

## Options

<table style="font-size: 13px;">
    <thead>
        <tr>
            <th>Option</th>
            <th>Default value</th>
            <th>Description/Callback signature</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>sectionClass</td>
            <td>aios-scroll-section</td>
            <td>Lists of section that will be add on side navigation.</td>
        </tr>
        <tr>
            <td>sectionAttrTitle</td>
            <td>data-aios-scroll-title</td>
            <td>The title to add on side navigation, to remove title you can hide it using css or override "navSectionAppend" option.</td>
        </tr>
        <tr>
            <td>skipSectionId</td>
            <td>empty</td>
            <td>This will not be add on side navigation.</td>
        </tr>
        <tr>
            <td>navSectionClass</td>
            <td>aios-section-nav</td>
            <td>On this class will append the lists of sections.</td>
        </tr>
        <tr>
            <td>navSectionAppend</td>
            <td>html</td>
            <td>
                This will append on "navSectionClass", both {{scroll-id}} in a class parent and anchor tag with href are important.<br>
                Default html:<br>
                <pre>&lt;li class="{{scroll-id}}">
    &lt;span class="scroll-section-title">{{scroll-title}}&lt;/span>
    &lt;a href="{{scroll-id}}" class="scroll-section-dot">&lt;em style="font-size: 0 !important;">{{scroll-title}&lt;/em>&lt;/a>
&lt;/li></pre>
            <td></td>
        </tr>
        <tr>
            <td>navArrow</td>
            <td>false</td>
            <td>This will display previous and next arrow.</td>
        </tr>
        <tr>
            <td>navArrowPrev</td>
            <td><pre>&lt;span class="aios-scroll-arrow aios-scroll-prev">&lt;/span></pre></td>
            <td>HTML Structure to append Previous arrow.</td>
        </tr>
        <tr>
            <td>navArrowNext</td>
            <td><pre>&lt;span class="aios-scroll-arrow aios-scroll-next">&lt;/span></pre></td>
            <td>HTML Structure to append Next arrow.</td>
        </tr>
        <tr>
            <td>hasHeaderFix</td>
            <td>false(boolean)</td>
            <td>Scroll to section minus the height of header.</td>
        </tr>
        <tr>
            <td>headerFixElement</td>
            <td>.header</td>
            <td>Element that will get the height to minus from scrollto.</td>
        </tr>
        <tr>
            <td>scrollSpeed</td>
            <td>1500</td>
            <td>Scroll speed to section.</td>
        </tr>
    </tbody>
</table>

## Usage
- You need to add class "aios-scroll-section" or you declare custom class on options "sectionClass".
- Require attribute section ID and data-aios-scroll-title


## Sample usage

###HTML
```html
<div id="scroll-down">
    <ul class="aios-section-nav"></ul>
    <span class="scroll-down-text">Scroll Down</span>
</div>

<section id="content-slider" class="aios-scroll-section" data-aios-scroll-title="Slider" style="height: 150vh; background: rgba(0,0,0,0.9)">
    <h2>Slider</h2>
</section>
<section id="content-about" class="aios-scroll-section" data-aios-scroll-title="About" style="height: 130vh; background: rgba(0,0,0,0.7)">
    <h2>About</h2>
</section>
<section id="content-listings" class="aios-scroll-section" data-aios-scroll-title="Listings" style="height: 30vh; background: rgba(0,0,0,0.5)">
    <h2>Listings</h2>
</section>
<section id="content-communities" class="aios-scroll-section" data-aios-scroll-title="Communities" style="height: 30vh; background: rgba(0,0,0,0.3)">
    <h2>Communities</h2>
</section>
<section id="content-testimonials" class="aios-scroll-section" data-aios-scroll-title="Testimonials" style="height: 30vh; background: rgba(0,0,0,0.1)">
    <h2>Testimonials</h2>
</section>
<section id="content-contact-form" class="aios-scroll-section" data-aios-scroll-title="Contact Form" style="height: 30vh; background: rgba(0,0,0,0.3)">
    <h2>Contact Form</h2>
</section>
<section id="content-the-team" class="aios-scroll-section" data-aios-scroll-title="The Team" style="height: 40vh; background: rgba(0,0,0,0.7)">
    <h2>The Team</h2>
</section>
<section id="content-faqs" class="aios-scroll-section" data-aios-scroll-title="FAQs" style="height: 40vh; background: rgba(0,0,0,0.2)">
    <h2>FAQs</h2>
</section>
<section id="content-footer" style="height: 10vh; background: rgba(0,0,0,0.5)">
    <h2>Footer</h2>
</section>
```

```css
#scroll-down {
	position: fixed;
	top: 50vh;
	right: 70px;
	z-index: 1003;
	transform: translateY(-50%);
	text-align: center;
	text-transform: uppercase;
	color: #888888;
}
	#scroll-down ul { display: inline-block; }
		#scroll-down ul li {
			display: block;
			position: relative;
			margin-bottom: 10px;
		}
			#scroll-down ul li .scroll-section-title {
				position: absolute;
				top: 9px;
				right: 46px;
				font-size: 11px;
				color: #888888;
				text-transform: uppercase;
				white-space: nowrap;
				visibility: hidden;
				opacity: 0;
				transition: visibility 0.3s, opacity 0.3s ease-in-out, top 0.3s;
			}
				#scroll-down ul li:hover .scroll-section-title,
				#scroll-down ul li.nav-active-section .scroll-section-title {
					visibility: visible;
					opacity: 1;
				}
			#scroll-down ul li a {
				position: relative;
				border: solid 1px transparent;
				display: block;
				width: 29px;
				height: 29px;
				border-radius: 50%;
				transition: all 0.3s ease-in-out, top 0.3s;
				cursor: pointer;
			}
				#scroll-down ul li.nav-active-section a,
				#scroll-down ul li a:hover,
				#scroll-down:not(.vertical-nav-active) ul li:first-child a {
					border: solid 1px #888888;
				}
				#scroll-down ul li a::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 50%;
					width: 7px;
					height: 7px;
					background: #888888;
					border-radius: 50%;
					transform: translate(-50%, -50%);
				}
					#scroll-down ul li.nav-active-section a::before {
						background: #582c4e;
					}
					#scroll-down:not(.vertical-nav-active) ul li:first-child a::before {
						background: #FFF;
					}
	#scroll-down .scroll-down-text {
		display: block;
		margin-top: 13px;
		font-size: 11px;
		letter-spacing: 0.1em;
	}
```

```javascript
( function() {
    jQuery( document ).ready( function() {
        jQuery('#scroll-down').sideNavigation();
    } );
} )();
```

## Support & Issues
File issues and label it `Featured Request`, `Erro`, or `Bug`.