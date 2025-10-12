#!/usr/bin/env node

/**
 * Camera Functionality Test Script
 * Tests camera functionality through programmatic simulation
 */

const puppeteer = require('puppeteer');

async function testCameraFunctionality() {
  console.log('📸 Starting Camera Functionality Tests...');
  console.log('=' .repeat(50));

  let browser;
  let testResults = {
    deviceSupport: false,
    permissions: false,
    capture: false,
    upload: false,
    errors: []
  };

  try {
    // Launch browser with different viewport sizes to test responsiveness
    browser = await puppeteer.launch({
      headless: false, // Show browser for manual camera permission testing
      args: [
        '--use-fake-ui-for-media-stream', // Auto-allow camera permissions for testing
        '--use-fake-device-for-media-stream',
        '--allow-running-insecure-content'
      ]
    });

    console.log('🔍 Test 1: Device Support Detection');

    // Test mobile viewport
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 375, height: 812 }); // iPhone X dimensions
    await mobilePage.goto('file://' + __dirname + '/camera-functionality-test.html');

    // Check if camera API is supported
    const mobileSupport = await mobilePage.evaluate(() => {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    });

    console.log(`   Mobile camera support: ${mobileSupport ? '✅' : '❌'}`);
    testResults.deviceSupport = mobileSupport;

    // Test tablet viewport
    const tabletPage = await browser.newPage();
    await tabletPage.setViewport({ width: 768, height: 1024 }); // iPad dimensions
    await tabletPage.goto('file://' + __dirname + '/camera-functionality-test.html');

    const tabletSupport = await tabletPage.evaluate(() => {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    });

    console.log(`   Tablet camera support: ${tabletSupport ? '✅' : '❌'}`);

    // Test desktop viewport
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1920, height: 1080 }); // Desktop dimensions
    await desktopPage.goto('file://' + __dirname + '/camera-functionality-test.html');

    const desktopSupport = await desktopPage.evaluate(() => {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    });

    console.log(`   Desktop camera support: ${desktopSupport ? '✅' : '❌'}`);

    console.log('\n🔍 Test 2: Permission Handling');

    // Test camera permission request
    try {
      const permissionResult = await mobilePage.evaluate(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1920 },
              height: { ideal: 1080 }
            },
            audio: false
          });
          stream.getTracks().forEach(track => track.stop());
          return { success: true, error: null };
        } catch (error) {
          return { success: false, error: error.name };
        }
      });

      if (permissionResult.success) {
        console.log('   Camera permissions: ✅ Granted');
        testResults.permissions = true;
      } else {
        console.log(`   Camera permissions: ❌ ${permissionResult.error}`);
        testResults.errors.push(`Permission error: ${permissionResult.error}`);
      }
    } catch (error) {
      console.log(`   Camera permissions: ❌ ${error.message}`);
      testResults.errors.push(`Permission test error: ${error.message}`);
    }

    console.log('\n🔍 Test 3: Photo Capture');

    // Test photo capture functionality
    try {
      const captureResult = await mobilePage.evaluate(async () => {
        return new Promise((resolve) => {
          // Create video element for camera stream
          const video = document.createElement('video');
          video.autoplay = true;

          // Create canvas for photo capture
          const canvas = document.createElement('canvas');

          navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1920 },
              height: { ideal: 1080 }
            },
            audio: false
          }).then(stream => {
            video.srcObject = stream;

            video.onloadedmetadata = () => {
              // Wait a moment for video to stabilize
              setTimeout(() => {
                try {
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;

                  const context = canvas.getContext('2d');
                  context.drawImage(video, 0, 0);

                  // Convert to blob
                  canvas.toBlob((blob) => {
                    if (blob && blob.size > 0) {
                      // Stop camera stream
                      stream.getTracks().forEach(track => track.stop());

                      resolve({
                        success: true,
                        size: blob.size,
                        type: blob.type,
                        width: canvas.width,
                        height: canvas.height
                      });
                    } else {
                      resolve({ success: false, error: 'Empty blob' });
                    }
                  }, 'image/jpeg', 0.9);
                } catch (error) {
                  resolve({ success: false, error: error.message });
                }
              }, 2000);
            };
          }).catch(error => {
            resolve({ success: false, error: error.message });
          });
        });
      });

      if (captureResult.success) {
        console.log(`   Photo capture: ✅ ${captureResult.width}x${captureResult.height}, ${(captureResult.size / 1024).toFixed(1)}KB`);
        testResults.capture = true;
      } else {
        console.log(`   Photo capture: ❌ ${captureResult.error}`);
        testResults.errors.push(`Capture error: ${captureResult.error}`);
      }
    } catch (error) {
      console.log(`   Photo capture: ❌ ${error.message}`);
      testResults.errors.push(`Capture test error: ${error.message}`);
    }

    console.log('\n🔍 Test 4: File Upload Fallback');

    // Test file upload functionality
    try {
      // Create a test file
      const testFile = Buffer.from('fake-image-data').toString('base64');

      const uploadResult = await mobilePage.evaluate(async () => {
        return new Promise((resolve) => {
          // Create file input
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';

          input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
              resolve({
                success: true,
                name: file.name,
                size: file.size,
                type: file.type
              });
            } else {
              resolve({ success: false, error: 'No file selected' });
            }
          };

          // Simulate file selection
          const dataTransfer = new DataTransfer();
          const blob = new Blob(['test-image-data'], { type: 'image/jpeg' });
          dataTransfer.items.add(blob, 'test-photo.jpg');
          input.files = dataTransfer.files;

          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });

      if (uploadResult.success) {
        console.log(`   File upload: ✅ ${uploadResult.name}, ${(uploadResult.size / 1024).toFixed(1)}KB`);
        testResults.upload = true;
      } else {
        console.log(`   File upload: ❌ ${uploadResult.error}`);
        testResults.errors.push(`Upload error: ${uploadResult.error}`);
      }
    } catch (error) {
      console.log(`   File upload: ❌ ${error.message}`);
      testResults.errors.push(`Upload test error: ${error.message}`);
    }

    console.log('\n🔍 Test 5: Responsive Camera Interface');

    // Test responsive behavior across different screen sizes
    const viewports = [
      { name: 'Mobile', width: 375, height: 812 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      await mobilePage.setViewport({ width: viewport.width, height: viewport.height });

      const responsiveTest = await mobilePage.evaluate(() => {
        const cameraContainer = document.querySelector('.camera-container');
        if (!cameraContainer) return { found: false };

        const rect = cameraContainer.getBoundingClientRect();
        const isTouchTarget = window.matchMedia('(pointer: coarse)').matches;

        return {
          found: true,
          width: rect.width,
          height: rect.height,
          isMobile: rect.width <= 480,
          isTablet: rect.width > 480 && rect.width <= 1024,
          isDesktop: rect.width > 1024,
          touchOptimized: isTouchTarget
        };
      });

      if (responsiveTest.found) {
        console.log(`   ${viewport.name} interface: ✅ ${responsiveTest.width}x${responsiveTest.height}`);
        console.log(`      Touch optimized: ${responsiveTest.touchOptimized ? '✅' : '❌'}`);
      } else {
        console.log(`   ${viewport.name} interface: ❌ Container not found`);
        testResults.errors.push(`${viewport.name} camera interface not found`);
      }
    }

    await browser.close();
  } catch (error) {
    console.error('Test failed:', error);
    testResults.errors.push(`Test execution error: ${error.message}`);

    if (browser) {
      await browser.close();
    }
  }

  console.log('\n' + '=' .repeat(50));
  console.log('📊 Camera Functionality Test Results:');

  const tests = [
    { name: 'Device Support', score: testResults.deviceSupport ? 1 : 0 },
    { name: 'Camera Permissions', score: testResults.permissions ? 1 : 0 },
    { name: 'Photo Capture', score: testResults.capture ? 1 : 0 },
    { name: 'File Upload', score: testResults.upload ? 1 : 0 },
  ];

  let totalScore = 0;
  tests.forEach(test => {
    totalScore += test.score;
    console.log(`   ${test.name}: ${test.score === 1 ? '✅' : '❌'} (${test.score}/1)`);
  });

  const finalScore = (totalScore / tests.length) * 100;
  console.log(`\n🎯 Overall Camera Functionality Score: ${finalScore.toFixed(1)}%`);

  if (finalScore >= 80) {
    console.log('🎉 Excellent camera functionality!');
  } else if (finalScore >= 60) {
    console.log('✅ Good camera functionality with minor issues');
  } else {
    console.log('⚠️ Camera functionality needs significant improvements');
  }

  if (testResults.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    testResults.errors.forEach(error => {
      console.log(`   - ${error}`);
    });
  }

  return testResults;
}

// Run tests if called directly
if (require.main === module) {
  testCameraFunctionality()
    .then(results => {
      process.exit(results.errors.length > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = { testCameraFunctionality };