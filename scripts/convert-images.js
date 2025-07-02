#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

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
  ]
};

// Global variable to store the ImageMagick command
let imageMagickCommand = null;

/**
 * Check if ImageMagick is available and determine the correct command
 */
function checkImageMagick() {
  // Try ImageMagick 7+ syntax first (magick)
  try {
    execSync('magick -version', { stdio: 'pipe' });
    console.log('✓ ImageMagick is available (using "magick" command)');
    imageMagickCommand = 'magick';
    return true;
  } catch (error) {
    // Fall back to ImageMagick 6 syntax (convert)
    try {
      execSync('convert -version', { stdio: 'pipe' });
      console.log('✓ ImageMagick is available (using "convert" command)');
      imageMagickCommand = 'convert';
      return true;
    } catch (error2) {
      console.error('✗ ImageMagick not found.');
      console.error('Please install it with:');
      console.error('  - Ubuntu/Debian: sudo apt-get install imagemagick');
      console.error('  - macOS: brew install imagemagick');
      console.error('  - Windows: Download from https://imagemagick.org/script/download.php');
      process.exit(1);
    }
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
function convertToWebP(inputPath, outputPath) {
  try {
    let command;
    if (imageMagickCommand === 'magick') {
      // ImageMagick 7+ syntax
      command = `magick "${inputPath}" -quality ${config.quality} "${outputPath}"`;
    } else {
      // ImageMagick 6 syntax
      command = `convert "${inputPath}" -quality ${config.quality} "${outputPath}"`;
    }
    
    execSync(command, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`Failed to convert ${inputPath}:`, error.message);
    return false;
  }
}

/**
 * Copy non-excluded original files (cross-platform)
 */
function copyOriginalFile(inputPath, outputPath) {
  try {
    // Use Node.js built-in fs.copyFileSync for cross-platform compatibility
    copyFileSync(inputPath, outputPath);
    return true;
  } catch (error) {
    console.error(`Failed to copy ${inputPath}:`, error.message);
    return false;
  }
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
 * Main conversion process
 */
function convertImages() {
  console.log('🖼️  Starting image conversion to WebP...');
  
  checkImageMagick();
  
  const imageFiles = getImageFiles(config.inputDir);
  
  if (imageFiles.length === 0) {
    console.log('No images found to convert.');
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to process`);
  
  let converted = 0;
  let copied = 0;
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  
  for (const file of imageFiles) {
    const outputDir = join(config.outputDir, dirname(file.relativePath));
    ensureDir(outputDir);
    
    const originalBasename = basename(file.relativePath, file.ext);
    const webpOutputPath = join(outputDir, `${originalBasename}.webp`);
    const originalOutputPath = join(outputDir, basename(file.relativePath));
    
    // Get original file size
    const originalSize = getFileSize(file.fullPath);
    totalOriginalSize += originalSize;
    
    // Convert to WebP
    console.log(`🔄 Converting: ${file.relativePath}`);
    
    if (convertToWebP(file.fullPath, webpOutputPath)) {
      const webpSize = getFileSize(webpOutputPath);
      totalWebPSize += webpSize;
      
      const savings = Math.round(((originalSize - webpSize) / originalSize) * 100);
      console.log(`   ✓ ${originalBasename}.webp (${originalSize}KB → ${webpSize}KB, ${savings}% smaller)`);
      converted++;
    }
    
    // Also copy the original file for fallback
    if (copyOriginalFile(file.fullPath, originalOutputPath)) {
      console.log(`   📋 Copied original: ${basename(file.relativePath)}`);
      copied++;
    }
  }
  
  // Copy excluded files
  const excludedFiles = getExcludedFiles();
  for (const file of excludedFiles) {
    const outputDir = join(config.outputDir, dirname(file.relativePath));
    ensureDir(outputDir);
    
    const originalOutputPath = join(outputDir, basename(file.relativePath));
    if (copyOriginalFile(file.fullPath, originalOutputPath)) {
      console.log(`📋 Copied excluded file: ${file.relativePath}`);
      copied++;
    }
  }
  
  // Summary
  const totalSavings = Math.round(((totalOriginalSize - totalWebPSize) / totalOriginalSize) * 100);
  console.log('\n📊 Conversion Summary:');
  console.log(`   Converted: ${converted} images to WebP`);
  console.log(`   Copied: ${copied} original files`);
  console.log(`   Total size reduction: ${totalOriginalSize}KB → ${totalWebPSize}KB (${totalSavings}% smaller)`);
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
  convertImages();
}

export { convertImages };
