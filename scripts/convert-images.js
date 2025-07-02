#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import async from 'async';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const config = {
  inputDir: join(__dirname, '../public/assets'),
  outputDir: join(__dirname, '../dist/assets'),
  quality: 80, // WebP quality (0-100)
  supportedFormats: ['.jpg', '.jpeg', '.png', '.gif'],
  excludePatterns: [
    'favicon.png', // Keep favicon as PNG
    'logo.png'     // Keep logo as PNG for compatibility
  ],
  concurrency: 4 // Number of parallel operations
};

/**
 * Check if ImageMagick is available
 */
function checkImageMagick() {
  try {
    execSync('magick -version', { stdio: 'pipe' });
    console.log('✓ ImageMagick is available');
    return true;
  } catch (error) {
    console.error('✗ ImageMagick not found. Please install it with: brew install imagemagick');
    process.exit(1);
  }
}

/**
 * Get all image files recursively
 */
function getImageFiles(dir, basePath = '') {
  const files = [];
  
  if (!existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return files;
  }
  
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const relativePath = join(basePath, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getImageFiles(fullPath, relativePath));
    } else if (stat.isFile()) {
      const ext = extname(item).toLowerCase();
      if (config.supportedFormats.includes(ext)) {
        // Check if file should be excluded
        const shouldExclude = config.excludePatterns.some(pattern => {
          if (pattern.includes('/')) {
            return relativePath.includes(pattern);
          }
          return basename(item) === pattern;
        });
        
        if (!shouldExclude) {
          files.push({
            fullPath,
            relativePath,
            ext
          });
        } else {
          console.log(`⏭️  Skipping excluded file: ${relativePath}`);
        }
      }
    }
  }
  
  return files;
}

/**
 * Convert image to WebP format
 */
async function convertToWebP(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const command = `magick "${inputPath}" -quality ${config.quality} "${outputPath}"`;
      execSync(command, { stdio: 'pipe' });
      resolve(true);
    } catch (error) {
      console.error(`Failed to convert ${inputPath}:`, error.message);
      resolve(false);
    }
  });
}

/**
 * Copy non-excluded original files
 */
async function copyOriginalFile(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const command = `cp "${inputPath}" "${outputPath}"`;
      execSync(command, { stdio: 'pipe' });
      resolve(true);
    } catch (error) {
      console.error(`Failed to copy ${inputPath}:`, error.message);
      resolve(false);
    }
  });
}

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
  const stats = statSync(filePath);
  return Math.round(stats.size / 1024);
}

/**
 * Process a single file (convert and copy)
 */
async function processFile(file, stats) {
  const outputDir = join(config.outputDir, dirname(file.relativePath));
  ensureDir(outputDir);
  
  const originalBasename = basename(file.relativePath, file.ext);
  const webpOutputPath = join(outputDir, `${originalBasename}.webp`);
  const originalOutputPath = join(outputDir, basename(file.relativePath));
  
  // Get original file size
  const originalSize = getFileSize(file.fullPath);
  stats.totalOriginalSize += originalSize;
  
  // Convert to WebP
  console.log(`🔄 Converting: ${file.relativePath}`);
  
  const webpSuccess = await convertToWebP(file.fullPath, webpOutputPath);
  if (webpSuccess) {
    const webpSize = getFileSize(webpOutputPath);
    stats.totalWebPSize += webpSize;
    
    const savings = Math.round(((originalSize - webpSize) / originalSize) * 100);
    console.log(`   ✓ ${originalBasename}.webp (${originalSize}KB → ${webpSize}KB, ${savings}% smaller)`);
    stats.converted++;
  }
  
  // Also copy the original file for fallback
  const copySuccess = await copyOriginalFile(file.fullPath, originalOutputPath);
  if (copySuccess) {
    console.log(`   📋 Copied original: ${basename(file.relativePath)}`);
    stats.copied++;
  }
}

/**
 * Main conversion process
 */
async function convertImages() {
  console.log('🖼️  Starting image conversion to WebP...');
  
  checkImageMagick();
  
  const imageFiles = getImageFiles(config.inputDir);
  
  if (imageFiles.length === 0) {
    console.log('No images found to convert.');
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to process with ${config.concurrency} concurrent operations`);
  
  const stats = {
    converted: 0,
    copied: 0,
    totalOriginalSize: 0,
    totalWebPSize: 0
  };
  
  // Process files in parallel using async.each
  await new Promise((resolve, reject) => {
    async.eachLimit(imageFiles, config.concurrency, async (file) => {
      await processFile(file, stats);
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  
  // Copy excluded files
  const excludedFiles = getExcludedFiles();
  await new Promise((resolve, reject) => {
    async.eachLimit(excludedFiles, config.concurrency, async (file) => {
      const outputDir = join(config.outputDir, dirname(file.relativePath));
      ensureDir(outputDir);
      
      const originalOutputPath = join(outputDir, basename(file.relativePath));
      const success = await copyOriginalFile(file.fullPath, originalOutputPath);
      if (success) {
        console.log(`📋 Copied excluded file: ${file.relativePath}`);
        stats.copied++;
      }
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  
  // Summary
  const totalSavings = stats.totalOriginalSize > 0 ? 
    Math.round(((stats.totalOriginalSize - stats.totalWebPSize) / stats.totalOriginalSize) * 100) : 0;
  console.log('\n📊 Conversion Summary:');
  console.log(`   Converted: ${stats.converted} images to WebP`);
  console.log(`   Copied: ${stats.copied} original files`);
  console.log(`   Total size reduction: ${stats.totalOriginalSize}KB → ${stats.totalWebPSize}KB (${totalSavings}% smaller)`);
  console.log('✅ Image conversion complete!');
}

/**
 * Get files that should be excluded from conversion
 */
function getExcludedFiles() {
  const files = [];
  const allFiles = getImageFiles(config.inputDir);
  
  for (const file of allFiles) {
    const shouldExclude = config.excludePatterns.some(pattern => {
      if (pattern.includes('/')) {
        return file.relativePath.includes(pattern);
      }
      return basename(file.relativePath) === pattern;
    });
    
    if (shouldExclude) {
      files.push(file);
    }
  }
  
  return files;
}

// Run the conversion if this script is executed directly
if (process.argv[1] === __filename) {
  convertImages().catch(error => {
    console.error('Error during conversion:', error);
    process.exit(1);
  });
}

export { convertImages };
