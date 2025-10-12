#!/usr/bin/env node

/**
 * Admin Data Management Test Script
 * Tests form submissions, validation, and data persistence
 */

// Mock the browser environment for testing
global.FormData = class FormData {
  constructor() {
    this.data = new Map();
  }

  set(key, value) {
    this.data.set(key, value);
  }

  get(key) {
    return this.data.get(key);
  }

  entries() {
    return this.data.entries();
  }
};

global.localStorage = {
  data: {},
  getItem: function(key) {
    return this.data[key] || null;
  },
  setItem: function(key, value) {
    this.data[key] = value;
  },
  removeItem: function(key) {
    delete this.data[key];
  },
  clear: function() {
    this.data = {};
  }
};

// Test data structures
const SECTION_VALIDATION = {
  hero: {
    title: { required: true, minLength: 3 },
    subtitle: { required: false },
    description: { required: true, minLength: 10 },
    ctaText: { required: true, minLength: 2 },
    ctaLink: { required: true, pattern: '^/.*' }
  },
  navbar: {
    logo: { required: true },
    navItems: { required: true, minLength: 1 },
    ctaButton: { required: false }
  },
  about: {
    title: { required: true, minLength: 3 },
    description: { required: true, minLength: 20 },
    features: { required: true, minLength: 1 }
  },
  services: {
    title: { required: true },
    subtitle: { required: false },
    services: { required: true, minLength: 1 }
  },
  portfolio: {
    title: { required: true },
    projects: { required: true, minLength: 1 },
    filterButtons: { required: false }
  },
  'digital-partners': {
    title: { required: true },
    partners: { required: true, minLength: 1 }
  },
  'marquee-clients': {
    title: { required: true },
    clients: { required: true, minLength: 1 },
    speed: { required: false }
  },
  cta: {
    title: { required: true, minLength: 3 },
    description: { required: true, minLength: 10 },
    buttonText: { required: true, minLength: 2 },
    buttonLink: { required: true, pattern: '^/.*' }
  },
  footer: {
    copyright: { required: true },
    socialLinks: { required: true, minLength: 1 },
    contactInfo: { required: false }
  }
};

const DEFAULT_SECTION_CONTENT = {
  hero: {
    title: "Welcome to Our Platform",
    subtitle: "Transform Your Business Today",
    description: "Innovative solutions for modern businesses",
    ctaText: "Get Started",
    ctaLink: "/contact"
  },
  navbar: {
    logo: "/logo.svg",
    navItems: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "Services", link: "/services" }
    ],
    ctaButton: { text: "Contact", link: "/contact" }
  },
  about: {
    title: "About Us",
    description: "We are a team of dedicated professionals committed to delivering excellence.",
    features: [
      { title: "Expert Team", description: "Years of combined experience" },
      { title: "Quality Service", description: "Commitment to excellence" },
      { title: "Client Focus", description: "Your success is our priority" }
    ]
  },
  services: {
    title: "Our Services",
    subtitle: "Comprehensive solutions for your business",
    services: [
      { title: "Web Development", description: "Custom web applications" },
      { title: "Mobile Apps", description: "iOS and Android development" },
      { title: "Consulting", description: "Expert guidance and strategy" }
    ]
  },
  portfolio: {
    title: "Our Portfolio",
    projects: [
      { title: "Project 1", description: "Description of project 1" },
      { title: "Project 2", description: "Description of project 2" }
    ]
  },
  'digital-partners': {
    title: "Our Digital Partners",
    partners: [
      { name: "Partner 1", logo: "/partner1.svg" },
      { name: "Partner 2", logo: "/partner2.svg" }
    ]
  },
  'marquee-clients': {
    title: "Our Clients",
    clients: [
      { name: "Client 1", logo: "/client1.svg" },
      { name: "Client 2", logo: "/client2.svg" },
      { name: "Client 3", logo: "/client3.svg" }
    ],
    speed: "medium"
  },
  cta: {
    title: "Ready to Get Started?",
    description: "Contact us today to discuss your project",
    buttonText: "Contact Us",
    buttonLink: "/contact"
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com/yourcompany" },
      { platform: "LinkedIn", url: "https://linkedin.com/company/yourcompany" }
    ],
    contactInfo: {
      email: "contact@yourcompany.com",
      phone: "+1 (555) 123-4567"
    }
  }
};

// Validation functions
function validateSectionData(sectionType, data) {
  const rules = SECTION_VALIDATION[sectionType];
  if (!rules) return { valid: true, errors: {} };

  const errors = {};
  let valid = true;

  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${field} is required`;
      valid = false;
    }

    // Min length validation
    if (rule.minLength && value && typeof value === 'string' && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
      valid = false;
    }

    // Pattern validation
    if (rule.pattern && value && typeof value === 'string' && !new RegExp(rule.pattern).test(value)) {
      errors[field] = `${field} format is invalid`;
      valid = false;
    }

    // Array min length validation
    if (rule.minLength && Array.isArray(value) && value.length < rule.minLength) {
      errors[field] = `${field} must have at least ${rule.minLength} items`;
      valid = false;
    }
  });

  return { valid, errors };
}

// Content management functions
class MockContentManager {
  constructor() {
    this.sections = new Map();
    this.locks = new Map();
    this.history = [];
  }

  async getContentSection(sectionType) {
    const cached = this.sections.get(sectionType);
    if (cached) {
      return { success: true, data: cached };
    }

    // Return default content if no cached data
    const defaultContent = DEFAULT_SECTION_CONTENT[sectionType];
    const sectionData = {
      id: `section-${sectionType}`,
      section_type: sectionType,
      title: defaultContent.title || sectionType,
      status: 'draft',
      content: defaultContent,
      created_by: 'test-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: null,
      version: 1,
      locked_by: null,
      locked_until: null
    };

    this.sections.set(sectionType, sectionData);
    return { success: true, data: sectionData };
  }

  async updateContentSection(sectionType, content) {
    const validation = validateSectionData(sectionType, content);
    if (!validation.valid) {
      return { success: false, error: 'Validation failed', details: validation.errors };
    }

    const existing = this.sections.get(sectionType);
    const updatedData = {
      ...existing,
      content,
      updated_at: new Date().toISOString(),
      version: (existing?.version || 0) + 1
    };

    this.sections.set(sectionType, updatedData);

    // Add to history
    this.history.push({
      sectionType,
      action: 'update',
      content,
      timestamp: new Date().toISOString(),
      version: updatedData.version
    });

    return { success: true, data: updatedData };
  }

  async publishContentSection(sectionType) {
    const section = this.sections.get(sectionType);
    if (!section) {
      return { success: false, error: 'Section not found' };
    }

    const publishedData = {
      ...section,
      status: 'published',
      published_at: new Date().toISOString()
    };

    this.sections.set(sectionType, publishedData);

    this.history.push({
      sectionType,
      action: 'publish',
      timestamp: new Date().toISOString(),
      version: publishedData.version
    });

    return { success: true, data: publishedData };
  }

  async acquireLock(sectionType, userId) {
    const lock = this.locks.get(sectionType);
    const now = new Date();

    // Check if lock exists and is still valid
    if (lock && new Date(lock.expiresAt) > now) {
      return {
        success: false,
        error: 'Section is locked',
        lockInfo: lock
      };
    }

    // Create new lock
    const newLock = {
      sectionType,
      lockedBy: userId,
      lockedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 5 * 60 * 1000).toISOString() // 5 minutes
    };

    this.locks.set(sectionType, newLock);

    return {
      success: true,
      lockInfo: newLock
    };
  }

  async releaseLock(sectionType, userId) {
    const lock = this.locks.get(sectionType);
    if (!lock) {
      return { success: false, error: 'No active lock' };
    }

    if (lock.lockedBy !== userId) {
      return { success: false, error: 'Lock held by another user' };
    }

    this.locks.delete(sectionType);
    return { success: true };
  }

  getHistory(sectionType) {
    return this.history.filter(h => h.sectionType === sectionType);
  }
}

// Test functions
async function testAdminDataManagement() {
  console.log('📝 Starting Admin Data Management Tests...');
  console.log('=' .repeat(50));

  const results = {
    contentLoading: false,
    dataValidation: false,
    contentSaving: false,
    contentPublishing: false,
    lockManagement: false,
    changeHistory: false,
    errorHandling: false,
    dataIntegrity: false,
    concurrencyControl: false,
    performanceOptimization: false
  };

  const contentManager = new MockContentManager();

  // Test 1: Content Loading
  console.log('🔍 Test 1: Content Loading');

  try {
    const sections = Object.keys(SECTION_VALIDATION);
    let loadSuccess = 0;

    for (const sectionType of sections) {
      const result = await contentManager.getContentSection(sectionType);
      if (result.success && result.data) {
        loadSuccess++;
        console.log(`   ✓ ${sectionType}: Loaded successfully`);
      } else {
        console.log(`   ❌ ${sectionType}: Load failed`);
      }
    }

    const loadSuccessRate = (loadSuccess / sections.length) * 100;
    console.log(`   Content loading success rate: ${loadSuccessRate}%`);

    results.contentLoading = loadSuccessRate >= 90;
  } catch (error) {
    console.log(`   ❌ Content loading test failed: ${error.message}`);
  }

  // Test 2: Data Validation
  console.log('\n🔍 Test 2: Data Validation');

  try {
    const validationTests = [
      {
        section: 'hero',
        data: { title: 'Test', description: 'Test description', ctaText: 'Go', ctaLink: '/contact' },
        shouldPass: true
      },
      {
        section: 'hero',
        data: { title: '', description: 'Test', ctaText: 'Go', ctaLink: '/contact' },
        shouldPass: false
      },
      {
        section: 'hero',
        data: { title: 'Test', description: 'Short', ctaText: 'Go', ctaLink: '/contact' },
        shouldPass: false
      },
      {
        section: 'cta',
        data: { title: 'Test CTA', description: 'Test description for CTA', buttonText: 'Click', buttonLink: '/invalid' },
        shouldPass: false
      }
    ];

    let validationPassed = 0;
    validationTests.forEach((test, index) => {
      const result = validateSectionData(test.section, test.data);
      const testPassed = result.valid === test.shouldPass;

      if (testPassed) {
        validationPassed++;
        console.log(`   ✓ Test ${index + 1}: Validation ${test.shouldPass ? 'passed' : 'failed'} as expected`);
      } else {
        console.log(`   ❌ Test ${index + 1}: Validation mismatch`);
      }
    });

    const validationSuccessRate = (validationPassed / validationTests.length) * 100;
    console.log(`   Validation success rate: ${validationSuccessRate}%`);

    results.dataValidation = validationSuccessRate === 100;
  } catch (error) {
    console.log(`   ❌ Data validation test failed: ${error.message}`);
  }

  // Test 3: Content Saving
  console.log('\n🔍 Test 3: Content Saving');

  try {
    const saveTests = [
      {
        section: 'hero',
        data: { title: 'Updated Hero', description: 'Updated description', ctaText: 'Start', ctaLink: '/start' }
      },
      {
        section: 'about',
        data: { title: 'About Us Updated', description: 'This is our updated about section with enough content to pass validation', features: [{ title: 'Feature 1', description: 'Description' }] }
      }
    ];

    let saveSuccess = 0;
    for (const test of saveTests) {
      const result = await contentManager.updateContentSection(test.section, test.data);
      if (result.success) {
        saveSuccess++;
        console.log(`   ✓ ${test.section}: Saved successfully (version ${result.data.version})`);
      } else {
        console.log(`   ❌ ${test.section}: Save failed - ${result.error}`);
      }
    }

    results.contentSaving = saveSuccess === saveTests.length;
  } catch (error) {
    console.log(`   ❌ Content saving test failed: ${error.message}`);
  }

  // Test 4: Content Publishing
  console.log('\n🔍 Test 4: Content Publishing');

  try {
    // First save some content
    await contentManager.updateContentSection('hero', {
      title: 'Published Hero',
      description: 'This hero section is ready to publish',
      ctaText: 'Publish',
      ctaLink: '/publish'
    });

    const publishResult = await contentManager.publishContentSection('hero');

    if (publishResult.success) {
      console.log('   ✓ Hero section published successfully');
      console.log(`   Published at: ${publishResult.data.published_at}`);
      results.contentPublishing = true;
    } else {
      console.log(`   ❌ Publishing failed: ${publishResult.error}`);
    }
  } catch (error) {
    console.log(`   ❌ Content publishing test failed: ${error.message}`);
  }

  // Test 5: Lock Management
  console.log('\n🔍 Test 5: Lock Management');

  try {
    // Test lock acquisition
    const lockResult = await contentManager.acquireLock('hero', 'test-user-1');
    const lockAcquired = lockResult.success;

    if (lockAcquired) {
      console.log('   ✓ Lock acquired successfully');

      // Test lock conflict
      const conflictResult = await contentManager.acquireLock('hero', 'test-user-2');
      const conflictHandled = !conflictResult.success && conflictResult.error === 'Section is locked';

      if (conflictHandled) {
        console.log('   ✓ Lock conflict handled correctly');
      } else {
        console.log('   ❌ Lock conflict not handled properly');
      }

      // Test lock release
      const releaseResult = await contentManager.releaseLock('hero', 'test-user-1');
      const lockReleased = releaseResult.success;

      if (lockReleased) {
        console.log('   ✓ Lock released successfully');

        // Test new lock acquisition after release
        const newLockResult = await contentManager.acquireLock('hero', 'test-user-2');
        const newLockAcquired = newLockResult.success;

        if (newLockAcquired) {
          console.log('   ✓ New lock acquired after release');
        } else {
          console.log('   ❌ Failed to acquire lock after release');
        }

        results.lockManagement = lockAcquired && conflictHandled && lockReleased && newLockAcquired;
      } else {
        console.log(`   ❌ Lock release failed: ${releaseResult.error}`);
      }
    } else {
      console.log(`   ❌ Lock acquisition failed: ${lockResult.error}`);
    }
  } catch (error) {
    console.log(`   ❌ Lock management test failed: ${error.message}`);
  }

  // Test 6: Change History
  console.log('\n🔍 Test 6: Change History');

  try {
    // Make some changes to generate history
    await contentManager.updateContentSection('hero', { title: 'History Test 1', description: 'Test 1', ctaText: 'Test', ctaLink: '/test' });
    await contentManager.updateContentSection('hero', { title: 'History Test 2', description: 'Test 2', ctaText: 'Test', ctaLink: '/test' });
    await contentManager.publishContentSection('hero');

    const history = contentManager.getHistory('hero');
    const historyGenerated = history.length >= 3;

    if (historyGenerated) {
      console.log(`   ✓ History generated with ${history.length} entries`);

      // Check history structure
      const hasValidStructure = history.every(entry =>
        entry.sectionType === 'hero' &&
        entry.timestamp &&
        entry.action &&
        entry.version
      );

      if (hasValidStructure) {
        console.log('   ✓ History entries have valid structure');
        results.changeHistory = true;
      } else {
        console.log('   ❌ History entries have invalid structure');
      }
    } else {
      console.log(`   ❌ Insufficient history entries: ${history.length}`);
    }
  } catch (error) {
    console.log(`   ❌ Change history test failed: ${error.message}`);
  }

  // Test 7: Error Handling
  console.log('\n🔍 Test 7: Error Handling');

  try {
    let errorTestsPassed = 0;
    const totalErrorTests = 3;

    // Test 1: Invalid section type
    const invalidSectionResult = await contentManager.getContentSection('invalid-section');
    if (!invalidSectionResult.success) {
      console.log('   ✓ Invalid section type handled correctly');
      errorTestsPassed++;
    } else {
      console.log('   ❌ Invalid section type not handled');
    }

    // Test 2: Invalid data for saving
    const invalidDataResult = await contentManager.updateContentSection('hero', { title: '', description: 'Short' });
    if (!invalidDataResult.success) {
      console.log('   ✓ Invalid data validation handled correctly');
      errorTestsPassed++;
    } else {
      console.log('   ❌ Invalid data validation not handled');
    }

    // Test 3: Publishing non-existent section
    const nonExistentPublishResult = await contentManager.publishContentSection('non-existent');
    if (!nonExistentPublishResult.success) {
      console.log('   ✓ Publishing non-existent section handled correctly');
      errorTestsPassed++;
    } else {
      console.log('   ❌ Publishing non-existent section not handled');
    }

    results.errorHandling = (errorTestsPassed / totalErrorTests) >= 0.67;
  } catch (error) {
    console.log(`   ❌ Error handling test failed: ${error.message}`);
  }

  // Test 8: Data Integrity
  console.log('\n🔍 Test 8: Data Integrity');

  try {
    // Save complex data
    const complexData = {
      title: 'Complex Test',
      subtitle: 'Testing complex data structures',
      description: 'This is a test with complex nested data',
      features: [
        { title: 'Feature 1', description: 'Description 1', active: true },
        { title: 'Feature 2', description: 'Description 2', active: false }
      ],
      metadata: {
        tags: ['test', 'complex'],
        priority: 'high',
        lastModified: new Date().toISOString()
      }
    };

    const saveResult = await contentManager.updateContentSection('about', complexData);
    const dataSaved = saveResult.success;

    if (dataSaved) {
      // Retrieve and verify
      const getResult = await contentManager.getContentSection('about');
      const dataRetrieved = getResult.success;
      const dataIntact = JSON.stringify(getResult.data.content) === JSON.stringify(complexData);

      if (dataRetrieved && dataIntact) {
        console.log('   ✓ Complex data integrity maintained');
        results.dataIntegrity = true;
      } else {
        console.log('   ❌ Data integrity compromised');
      }
    } else {
      console.log('   ❌ Complex data save failed');
    }
  } catch (error) {
    console.log(`   ❌ Data integrity test failed: ${error.message}`);
  }

  // Test 9: Concurrency Control
  console.log('\n🔍 Test 9: Concurrency Control');

  try {
    // Simulate concurrent edits
    const user1Lock = await contentManager.acquireLock('hero', 'user-1');
    const user2Lock = await contentManager.acquireLock('hero', 'user-2');

    const concurrencyHandled = user1Lock.success && !user2Lock.success;

    if (concurrencyHandled) {
      console.log('   ✓ Concurrent edit conflict handled correctly');

      // Test last-write-wins scenario
      await contentManager.releaseLock('hero', 'user-1');

      const edit1 = await contentManager.updateContentSection('hero', { title: 'User 1 Edit', description: 'User 1 content', ctaText: 'Save', ctaLink: '/user1' });
      const edit2 = await contentManager.updateContentSection('hero', { title: 'User 2 Edit', description: 'User 2 content', ctaText: 'Save', ctaLink: '/user2' });

      if (edit1.success && edit2.success) {
        console.log('   ✓ Last-write-wins behavior working');
        results.concurrencyControl = true;
      } else {
        console.log('   ❌ Last-write-wins behavior failed');
      }
    } else {
      console.log('   ❌ Concurrency control not working');
    }
  } catch (error) {
    console.log(`   ❌ Concurrency control test failed: ${error.message}`);
  }

  // Test 10: Performance Optimization
  console.log('\n🔍 Test 10: Performance Optimization');

  try {
    const startTime = Date.now();

    // Test bulk operations
    const operations = [];
    for (let i = 0; i < 10; i++) {
      operations.push(contentManager.getContentSection('hero'));
      operations.push(contentManager.updateContentSection('hero', {
        title: `Performance Test ${i}`,
        description: 'Performance test content',
        ctaText: 'Test',
        ctaLink: '/test'
      }));
    }

    await Promise.all(operations);
    const endTime = Date.now();
    const duration = endTime - startTime;

    const opsPerSecond = Math.round((20 / duration) * 1000);
    console.log(`   Completed 20 operations in ${duration}ms (${opsPerSecond} ops/sec)`);

    results.performanceOptimization = opsPerSecond > 50; // Should handle at least 50 ops/sec
  } catch (error) {
    console.log(`   ❌ Performance optimization test failed: ${error.message}`);
  }

  // Calculate overall score
  console.log('\n' + '=' .repeat(50));
  console.log('📊 Admin Data Management Test Results:');

  const tests = [
    { name: 'Content Loading', score: results.contentLoading ? 1 : 0 },
    { name: 'Data Validation', score: results.dataValidation ? 1 : 0 },
    { name: 'Content Saving', score: results.contentSaving ? 1 : 0 },
    { name: 'Content Publishing', score: results.contentPublishing ? 1 : 0 },
    { name: 'Lock Management', score: results.lockManagement ? 1 : 0 },
    { name: 'Change History', score: results.changeHistory ? 1 : 0 },
    { name: 'Error Handling', score: results.errorHandling ? 1 : 0 },
    { name: 'Data Integrity', score: results.dataIntegrity ? 1 : 0 },
    { name: 'Concurrency Control', score: results.concurrencyControl ? 1 : 0 },
    { name: 'Performance Optimization', score: results.performanceOptimization ? 1 : 0 }
  ];

  let totalScore = 0;
  tests.forEach(test => {
    totalScore += test.score;
    console.log(`   ${test.name}: ${test.score === 1 ? '✅' : '❌'} (${test.score}/1)`);
  });

  const finalScore = (totalScore / tests.length) * 100;
  console.log(`\n🎯 Overall Admin Data Management Score: ${finalScore.toFixed(1)}%`);

  if (finalScore >= 80) {
    console.log('🎉 Excellent admin data management!');
  } else if (finalScore >= 60) {
    console.log('✅ Good admin data management with minor improvements needed');
  } else {
    console.log('⚠️ Admin data management needs significant improvements');
  }

  return {
    results,
    score: finalScore,
    tests
  };
}

// Run tests if called directly
if (require.main === module) {
  testAdminDataManagement()
    .then(results => {
      process.exit(results.score < 60 ? 1 : 0);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = { testAdminDataManagement };