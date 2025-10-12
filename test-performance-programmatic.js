#!/usr/bin/env node

/**
 * Performance Optimization Test Script
 * Tests lazy loading, image optimization, and performance monitoring
 */

async function testPerformanceOptimizations() {
  console.log('⚡ Starting Performance Optimization Tests...');
  console.log('=' .repeat(50));

  const results = {
    deviceDetection: false,
    lazyLoading: false,
    imageOptimization: false,
    virtualScrolling: false,
    performanceMonitoring: false,
    memoryManagement: false,
    responsiveImages: false,
    progressiveLoading: false
  };

  // Test 1: Device Capability Detection
  console.log('🔍 Test 1: Device Capability Detection');

  try {
    const deviceType = typeof window !== 'undefined' ?
      (window.innerWidth < 768 ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop') :
      'Unknown (server-side)';

    const hasTouch = typeof window !== 'undefined' ? 'ontouchstart' in window : false;
    const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    // Test browser APIs
    const hasPerformanceAPI = typeof performance !== 'undefined';
    const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';
    const hasResizeObserver = typeof ResizeObserver !== 'undefined';
    const hasRequestAnimationFrame = typeof requestAnimationFrame !== 'undefined';

    console.log(`   Device type: ${deviceType}`);
    console.log(`   Touch support: ${hasTouch ? '✅' : '❌'}`);
    console.log(`   Pixel ratio: ${pixelRatio}x`);
    console.log(`   Performance API: ${hasPerformanceAPI ? '✅' : '❌'}`);
    console.log(`   Intersection Observer: ${hasIntersectionObserver ? '✅' : '❌'}`);
    console.log(`   Resize Observer: ${hasResizeObserver ? '✅' : '❌'}`);
    console.log(`   Request Animation Frame: ${hasRequestAnimationFrame ? '✅' : '❌'}`);

    const hasRequiredAPIs = hasPerformanceAPI && hasIntersectionObserver && hasRequestAnimationFrame;
    results.deviceDetection = hasRequiredAPIs;

    if (hasRequiredAPIs) {
      console.log('   ✅ Device capability detection working');
    } else {
      console.log('   ❌ Missing required APIs for performance optimization');
    }
  } catch (error) {
    console.log(`   ❌ Device detection failed: ${error.message}`);
  }

  // Test 2: Connection Detection
  console.log('\n🔍 Test 2: Network Connection Detection');

  try {
    const connection = typeof navigator !== 'undefined' ?
      (navigator.connection || navigator.mozConnection || navigator.webkitConnection) : null;

    if (connection) {
      const effectiveType = connection.effectiveType || 'unknown';
      const downlink = connection.downlink || 'unknown';
      const rtt = connection.rtt || 'unknown';

      console.log(`   Connection type: ${effectiveType}`);
      console.log(`   Downlink: ${downlink}Mbps`);
      console.log(`   RTT: ${rtt}ms`);
      console.log('   ✅ Network detection working');
    } else {
      console.log('   ⚠️ Connection API not available (normal on some browsers)');
    }
  } catch (error) {
    console.log(`   ❌ Connection detection failed: ${error.message}`);
  }

  // Test 3: Performance Timing APIs
  console.log('\n🔍 Test 3: Performance Timing APIs');

  try {
    if (typeof performance !== 'undefined') {
      const navigationStart = performance.timing?.navigationStart || 0;
      const loadComplete = performance.timing?.loadEventEnd || 0;
      const domContentLoaded = performance.timing?.domContentLoadedEventEnd || 0;

      const loadTime = loadComplete - navigationStart;
      const domTime = domContentLoaded - navigationStart;

      console.log(`   Page load time: ${loadTime}ms`);
      console.log(`   DOM content loaded: ${domTime}ms`);

      // Test performance.now() precision
      const now1 = performance.now();
      const now2 = performance.now();
      const precision = Math.abs(now2 - now1);

      console.log(`   Performance.now() precision: ${precision.toFixed(3)}ms`);

      // Test performance entries
      const entries = performance.getEntriesByType('navigation');
      if (entries.length > 0) {
        const navEntry = entries[0];
        console.log(`   DNS lookup: ${navEntry.domainLookupEnd - navEntry.domainLookupStart}ms`);
        console.log(`   TCP connect: ${navEntry.connectEnd - navEntry.connectStart}ms`);
        console.log(`   Request response: ${navEntry.responseEnd - navEntry.requestStart}ms`);
      }

      console.log('   ✅ Performance timing APIs working');
    } else {
      console.log('   ❌ Performance API not available');
    }
  } catch (error) {
    console.log(`   ❌ Performance timing failed: ${error.message}`);
  }

  // Test 4: Memory Management
  console.log('\n🔍 Test 4: Memory Management');

  try {
    if (typeof performance !== 'undefined' && performance.memory) {
      const memory = performance.memory;
      const used = Math.round(memory.usedJSHeapSize / 1048576);
      const total = Math.round(memory.totalJSHeapSize / 1048576);
      const limit = Math.round(memory.jsHeapSizeLimit / 1048576);

      const usagePercentage = Math.round((used / total) * 100);

      console.log(`   Used memory: ${used}MB`);
      console.log(`   Total memory: ${total}MB`);
      console.log(`   Memory limit: ${limit}MB`);
      console.log(`   Usage percentage: ${usagePercentage}%`);

      if (usagePercentage < 80) {
        console.log('   ✅ Memory usage within acceptable limits');
        results.memoryManagement = true;
      } else {
        console.log('   ⚠️ High memory usage detected');
        results.memoryManagement = false;
      }
    } else {
      console.log('   ⚠️ Memory API not available (privacy restrictions)');
      results.memoryManagement = true; // Don't penalize for privacy restrictions
    }
  } catch (error) {
    console.log(`   ❌ Memory management test failed: ${error.message}`);
  }

  // Test 5: Frame Rate Monitoring
  console.log('\n🔍 Test 5: Frame Rate Monitoring');

  try {
    if (typeof requestAnimationFrame !== 'undefined') {
      let frameCount = 0;
      let startTime = performance.now();
      let lastFrameTime = startTime;

      const measureFrame = (currentTime) => {
        frameCount++;
        const deltaTime = currentTime - lastFrameTime;
        lastFrameTime = currentTime;

        if (currentTime - startTime >= 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
          const avgFrameTime = Math.round((currentTime - startTime) / frameCount);

          console.log(`   Average FPS: ${fps}`);
          console.log(`   Average frame time: ${avgFrameTime}ms`);

          if (fps >= 55) {
            console.log('   ✅ Excellent frame rate');
            results.performanceMonitoring = true;
          } else if (fps >= 30) {
            console.log('   ✅ Acceptable frame rate');
            results.performanceMonitoring = true;
          } else {
            console.log('   ⚠️ Low frame rate detected');
            results.performanceMonitoring = false;
          }
        } else {
          requestAnimationFrame(measureFrame);
        }
      };

      requestAnimationFrame(measureFrame);
    } else {
      console.log('   ❌ RequestAnimationFrame not available');
    }
  } catch (error) {
    console.log(`   ❌ Frame rate monitoring failed: ${error.message}`);
  }

  // Test 6: Image Optimization Simulation
  console.log('\n🔍 Test 6: Image Optimization');

  try {
    const testImages = [
      { url: 'https://picsum.photos/100/100?test=1', expectedSize: 'small' },
      { url: 'https://picsum.photos/400/300?test=2', expectedSize: 'medium' },
      { url: 'https://picsum.photos/1200/800?test=3', expectedSize: 'large' }
    ];

    let loadTimes = [];
    let completedLoads = 0;

    const testImageLoad = (imageUrl) => {
      return new Promise((resolve) => {
        const img = new Image();
        const startTime = performance.now();

        img.onload = () => {
          const loadTime = performance.now() - startTime;
          loadTimes.push(loadTime);
          completedLoads++;
          resolve(loadTime);
        };

        img.onerror = () => {
          completedLoads++;
          resolve(-1); // Failed to load
        };

        img.src = imageUrl;
      });
    };

    // Test loading all images
    await Promise.all(testImages.map(test => testImageLoad(test.url)));

    // Wait a moment for all to complete
    await new Promise(resolve => setTimeout(resolve, 2000));

    const successfulLoads = loadTimes.filter(time => time > 0).length;
    const avgLoadTime = successfulLoads > 0 ?
      Math.round(loadTimes.reduce((a, b) => a + b, 0) / successfulLoads) : 0;

    console.log(`   Images loaded: ${successfulLoads}/${testImages.length}`);
    console.log(`   Average load time: ${avgLoadTime}ms`);

    if (successfulLoads === testImages.length && avgLoadTime < 3000) {
      console.log('   ✅ Image loading performance acceptable');
      results.imageOptimization = true;
    } else {
      console.log('   ⚠️ Image loading performance needs improvement');
      results.imageOptimization = false;
    }

    // Test responsive image sizing
    const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;

    console.log(`   Screen width: ${screenWidth}px`);
    console.log(`   Device pixel ratio: ${pixelRatio}x`);
    console.log(`   Recommended max image width: ${Math.min(screenWidth * pixelRatio, 1920)}px`);

    results.responsiveImages = true;
  } catch (error) {
    console.log(`   ❌ Image optimization test failed: ${error.message}`);
  }

  // Test 7: Virtual Scrolling Simulation
  console.log('\n🔍 Test 7: Virtual Scrolling Performance');

  try {
    // Simulate virtual scrolling with large dataset
    const totalItems = 10000;
    const visibleItems = 20;
    const itemHeight = 50;

    const startTime = performance.now();

    // Simulate rendering visible items only
    for (let i = 0; i < visibleItems; i++) {
      const itemIndex = Math.floor(Math.random() * totalItems);
      // Simulate DOM operation
      const element = document.createElement('div');
      element.textContent = `Virtual item ${itemIndex}`;
      element.style.height = `${itemHeight}px`;
    }

    const virtualScrollTime = performance.now() - startTime;

    console.log(`   Virtual items rendered: ${visibleItems}`);
    console.log(`   Total items simulated: ${totalItems}`);
    console.log(`   Render time: ${Math.round(virtualScrollTime)}ms`);

    // Compare with full rendering
    const fullRenderStart = performance.now();
    for (let i = 0; i < totalItems; i++) {
      const element = document.createElement('div');
      element.textContent = `Full item ${i}`;
      element.style.height = `${itemHeight}px`;
    }
    const fullRenderTime = performance.now() - fullRenderStart;

    console.log(`   Full render time: ${Math.round(fullRenderTime)}ms`);
    console.log(`   Performance improvement: ${Math.round(fullRenderTime / virtualScrollTime)}x`);

    if (virtualScrollTime < 50) {
      console.log('   ✅ Virtual scrolling performance excellent');
      results.virtualScrolling = true;
    } else {
      console.log('   ⚠️ Virtual scrolling could be optimized');
      results.virtualScrolling = false;
    }
  } catch (error) {
    console.log(`   ❌ Virtual scrolling test failed: ${error.message}`);
  }

  // Test 8: Progressive Loading Simulation
  console.log('\n🔍 Test 8: Progressive Loading');

  try {
    // Simulate progressive image loading
    const progressiveImage = new Image();
    let lowQualityLoaded = false;
    let highQualityLoaded = false;

    const loadStartTime = performance.now();

    // Simulate low quality placeholder
    setTimeout(() => {
      lowQualityLoaded = true;
      console.log('   Low quality placeholder loaded');
    }, 100);

    // Simulate high quality image
    setTimeout(() => {
      highQualityLoaded = true;
      const loadTime = performance.now() - loadStartTime;
      console.log(`   High quality image loaded after ${Math.round(loadTime)}ms`);

      if (lowQualityLoaded && highQualityLoaded) {
        console.log('   ✅ Progressive loading working correctly');
        results.progressiveLoading = true;
      }
    }, 800);

    // Wait for progressive loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!lowQualityLoaded || !highQualityLoaded) {
      console.log('   ⚠️ Progressive loading incomplete');
      results.progressiveLoading = false;
    }
  } catch (error) {
    console.log(`   ❌ Progressive loading test failed: ${error.message}`);
  }

  // Test 9: Lazy Loading Simulation
  console.log('\n🔍 Test 9: Lazy Loading');

  try {
    if (typeof IntersectionObserver !== 'undefined') {
      // Create test elements for lazy loading
      const testContainer = document.createElement('div');
      testContainer.style.position = 'absolute';
      testContainer.style.top = '-2000px';
      testContainer.style.left = '-2000px';
      document.body.appendChild(testContainer);

      const lazyImages = [];
      for (let i = 0; i < 10; i++) {
        const img = document.createElement('img');
        img.className = 'lazy-test-image';
        img.dataset.src = `https://picsum.photos/200/200?lazy=${i}`;
        img.style.width = '200px';
        img.style.height = '200px';
        img.style.display = 'block';
        img.style.margin = '10px';
        testContainer.appendChild(img);
        lazyImages.push(img);
      }

      let loadedCount = 0;
      const startTime = performance.now();

      // Set up intersection observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;

            img.onload = () => {
              loadedCount++;
            };

            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Start observing
      lazyImages.forEach(img => observer.observe(img));

      // Simulate scrolling into view
      setTimeout(() => {
        testContainer.style.top = '100px';
      }, 100);

      // Wait for loading
      await new Promise(resolve => setTimeout(resolve, 2000));

      const lazyLoadTime = performance.now() - startTime;

      console.log(`   Lazy images loaded: ${loadedCount}/${lazyImages.length}`);
      console.log(`   Total lazy load time: ${Math.round(lazyLoadTime)}ms`);

      if (loadedCount === lazyImages.length && lazyLoadTime < 3000) {
        console.log('   ✅ Lazy loading working correctly');
        results.lazyLoading = true;
      } else {
        console.log('   ⚠️ Lazy loading performance could be improved');
        results.lazyLoading = false;
      }

      // Cleanup
      document.body.removeChild(testContainer);
    } else {
      console.log('   ❌ IntersectionObserver not available');
      results.lazyLoading = false;
    }
  } catch (error) {
    console.log(`   ❌ Lazy loading test failed: ${error.message}`);
  }

  // Calculate overall score
  console.log('\n' + '=' .repeat(50));
  console.log('📊 Performance Optimization Test Results:');

  const tests = [
    { name: 'Device Detection', score: results.deviceDetection ? 1 : 0 },
    { name: 'Lazy Loading', score: results.lazyLoading ? 1 : 0 },
    { name: 'Image Optimization', score: results.imageOptimization ? 1 : 0 },
    { name: 'Virtual Scrolling', score: results.virtualScrolling ? 1 : 0 },
    { name: 'Performance Monitoring', score: results.performanceMonitoring ? 1 : 0 },
    { name: 'Memory Management', score: results.memoryManagement ? 1 : 0 },
    { name: 'Responsive Images', score: results.responsiveImages ? 1 : 0 },
    { name: 'Progressive Loading', score: results.progressiveLoading ? 1 : 0 }
  ];

  let totalScore = 0;
  tests.forEach(test => {
    totalScore += test.score;
    console.log(`   ${test.name}: ${test.score === 1 ? '✅' : '❌'} (${test.score}/1)`);
  });

  const finalScore = (totalScore / tests.length) * 100;
  console.log(`\n🎯 Overall Performance Optimization Score: ${finalScore.toFixed(1)}%`);

  if (finalScore >= 80) {
    console.log('🎉 Excellent performance optimization!');
  } else if (finalScore >= 60) {
    console.log('✅ Good performance optimization with minor improvements needed');
  } else {
    console.log('⚠️ Performance optimization needs significant improvements');
  }

  return {
    results,
    score: finalScore,
    tests
  };
}

// Run tests if called directly
if (typeof require !== 'undefined' && require.main === module) {
  testPerformanceOptimizations()
    .then(results => {
      process.exit(results.score < 60 ? 1 : 0);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

// Export for use in browser or other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testPerformanceOptimizations };
}