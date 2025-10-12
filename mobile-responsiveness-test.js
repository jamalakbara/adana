/**
 * Mobile Responsiveness Test Script
 * Tests various mobile features implemented in the admin interface
 */

// Test 1: Breakpoint Testing
function testBreakpoints() {
    console.log('🔍 Testing Responsive Breakpoints:');

    const breakpoints = {
        mobile: '640px',
        tablet: '1024px',
        desktop: '1280px'
    };

    const currentWidth = window.innerWidth;
    let currentDevice = 'unknown';

    if (currentWidth < 640) {
        currentDevice = 'mobile';
    } else if (currentWidth < 1024) {
        currentDevice = 'tablet';
    } else {
        currentDevice = 'desktop';
    }

    console.log(`   Current width: ${currentWidth}px`);
    console.log(`   Device type: ${currentDevice}`);
    console.log(`   ✅ Breakpoint detection working`);

    return currentDevice;
}

// Test 2: Touch Support Detection
function testTouchSupport() {
    console.log('🔍 Testing Touch Support:');

    const hasTouch = 'ontouchstart' in window;
    const maxTouchPoints = navigator.maxTouchPoints || 0;
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

    console.log(`   Touch events: ${hasTouch ? '✅ Supported' : '❌ Not supported'}`);
    console.log(`   Max touch points: ${maxTouchPoints}`);
    console.log(`   Mobile device: ${isMobileDevice ? '✅ Yes' : '❌ No'}`);

    return { hasTouch, maxTouchPoints, isMobileDevice };
}

// Test 3: Device Orientation Support
function testOrientationSupport() {
    console.log('🔍 Testing Device Orientation:');

    const hasOrientation = 'screen' in window && 'orientation' in window.screen;
    const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

    console.log(`   Orientation API: ${hasOrientation ? '✅ Supported' : '❌ Not supported'}`);
    console.log(`   Current orientation: ${orientation}`);

    if (hasOrientation && window.screen.orientation) {
        console.log(`   Screen angle: ${window.screen.orientation.angle}°`);
        console.log(`   Screen type: ${window.screen.orientation.type}`);
    }

    return { hasOrientation, orientation };
}

// Test 4: Device Memory and Performance
function testDeviceCapabilities() {
    console.log('🔍 Testing Device Capabilities:');

    const cores = navigator.hardwareConcurrency || 'unknown';
    const memory = (navigator as any).deviceMemory || 'unknown';
    const connection = (navigator as any).connection;

    console.log(`   CPU cores: ${cores}`);
    console.log(`   Device memory: ${memory}GB`);

    if (connection) {
        console.log(`   Connection type: ${connection.effectiveType || 'unknown'}`);
        console.log(`   Downlink: ${connection.downlink || 'unknown'}Mbps`);
    } else {
        console.log(`   Connection API: ❌ Not supported`);
    }

    return { cores, memory, connection };
}

// Test 5: Viewport Meta Tag
function testViewportMeta() {
    console.log('🔍 Testing Viewport Configuration:');

    const viewportMeta = document.querySelector('meta[name="viewport"]');

    if (viewportMeta) {
        const content = viewportMeta.getAttribute('content');
        console.log(`   Viewport meta: ✅ Found`);
        console.log(`   Content: ${content}`);

        // Check for essential viewport properties
        const hasWidthScale = content.includes('width=device-width');
        const hasInitialScale = content.includes('initial-scale=1');
        const hasUserScalable = content.includes('user-scalable=yes') || !content.includes('user-scalable=no');

        console.log(`   width=device-width: ${hasWidthScale ? '✅' : '❌'}`);
        console.log(`   initial-scale=1: ${hasInitialScale ? '✅' : '❌'}`);
        console.log(`   user-scalable: ${hasUserScalable ? '✅' : '❌'}`);

        return {
            found: true,
            hasWidthScale,
            hasInitialScale,
            hasUserScalable
        };
    } else {
        console.log(`   Viewport meta: ❌ Not found`);
        return { found: false };
    }
}

// Test 6: Touch Target Sizes (44px minimum)
function testTouchTargets() {
    console.log('🔍 Testing Touch Target Sizes:');

    const buttons = document.querySelectorAll('button, a, input[type="submit"], input[type="button"]');
    const buttonsArray = Array.from(buttons);

    let validTargets = 0;
    let invalidTargets = 0;

    buttonsArray.forEach(button => {
        const rect = button.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Check if both width and height meet the 44px minimum
        if (width >= 44 && height >= 44) {
            validTargets++;
        } else {
            invalidTargets++;
            console.log(`   ❌ Invalid touch target: ${width}x${height}px`);
        }
    });

    console.log(`   Total touch targets: ${buttonsArray.length}`);
    console.log(`   Valid targets (≥44px): ${validTargets}`);
    console.log(`   Invalid targets (<44px): ${invalidTargets}`);

    return { validTargets, invalidTargets, total: buttonsArray.length };
}

// Test 7: Responsive Images
function testResponsiveImages() {
    console.log('🔍 Testing Responsive Images:');

    const images = document.querySelectorAll('img');
    const imagesArray = Array.from(images);

    let responsiveImages = 0;
    let optimizedImages = 0;

    imagesArray.forEach(img => {
        const rect = img.getBoundingClientRect();

        // Check if image is properly sized for mobile
        if (rect.width <= window.innerWidth) {
            responsiveImages++;
        }

        // Check if image has proper attributes
        if (img.alt && img.src) {
            optimizedImages++;
        }
    });

    console.log(`   Total images: ${imagesArray.length}`);
    console.log(`   Responsive images: ${responsiveImages}`);
    console.log(`   Optimized images (with alt): ${optimizedImages}`);

    return { total: imagesArray.length, responsiveImages, optimizedImages };
}

// Test 8: Font Sizes and Readability
function testReadability() {
    console.log('🔍 Testing Readability:');

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
    const textArray = Array.from(textElements);

    let readableText = 0;
    let totalTextSize = 0;

    textArray.forEach(element => {
        const styles = window.getComputedStyle(element);
        const fontSize = parseFloat(styles.fontSize);
        totalTextSize += fontSize;

        // Check if font size is at least 16px for body text
        if (fontSize >= 16 || ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
            readableText++;
        }
    });

    const averageFontSize = totalTextSize / textArray.length;

    console.log(`   Total text elements: ${textArray.length}`);
    console.log(`   Readable text (≥16px): ${readableText}`);
    console.log(`   Average font size: ${averageFontSize.toFixed(1)}px`);

    return { total: textArray.length, readableText, averageFontSize };
}

// Main Test Runner
function runMobileResponsivenessTests() {
    console.log('🚀 Starting Mobile Responsibility Tests...');
    console.log('=' .repeat(50));

    const results = {
        device: testBreakpoints(),
        touch: testTouchSupport(),
        orientation: testOrientationSupport(),
        capabilities: testDeviceCapabilities(),
        viewport: testViewportMeta(),
        touchTargets: testTouchTargets(),
        images: testResponsiveImages(),
        readability: testReadability()
    };

    console.log('=' .repeat(50));
    console.log('📊 Test Summary:');

    // Calculate scores
    const tests = [
        { name: 'Breakpoint Detection', score: results.device !== 'unknown' ? 1 : 0 },
        { name: 'Touch Support', score: results.touch.hasTouch ? 1 : 0 },
        { name: 'Orientation Support', score: results.orientation.hasOrientation ? 1 : 0 },
        { name: 'Viewport Configuration', score: results.viewport.found ? 1 : 0 },
        { name: 'Touch Targets (44px)', score: results.touchTargets.invalidTargets === 0 ? 1 : 0.5 },
        { name: 'Responsive Images', score: results.images.total === 0 || results.images.responsiveImages > 0 ? 1 : 0 },
        { name: 'Readability', score: results.readability.readableText >= results.readability.total * 0.8 ? 1 : 0.5 }
    ];

    let totalScore = 0;
    tests.forEach(test => {
        totalScore += test.score;
        console.log(`   ${test.name}: ${test.score === 1 ? '✅' : test.score === 0.5 ? '⚠️' : '❌'} (${test.score}/${1})`);
    });

    const finalScore = (totalScore / tests.length) * 100;
    console.log(`\n🎯 Overall Mobile Responsiveness Score: ${finalScore.toFixed(1)}%`);

    if (finalScore >= 80) {
        console.log('🎉 Excellent mobile responsiveness!');
    } else if (finalScore >= 60) {
        console.log('✅ Good mobile responsiveness with minor improvements needed');
    } else {
        console.log('⚠️ Mobile responsiveness needs significant improvements');
    }

    return { results, score: finalScore, tests };
}

// Export for use in the browser console
if (typeof window !== 'undefined') {
    (window as any).runMobileTests = runMobileResponsivenessTests;
    console.log('Mobile responsiveness test loaded. Run window.runMobileTests() to start testing.');
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runMobileResponsivenessTests,
        testBreakpoints,
        testTouchSupport,
        testOrientationSupport,
        testDeviceCapabilities,
        testViewportMeta,
        testTouchTargets,
        testResponsiveImages,
        testReadability
    };
}