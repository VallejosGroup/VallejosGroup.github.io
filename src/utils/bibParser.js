import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bibtexParse from 'bibtex-parse-js';

/**
 * Parse BibTeX file and return formatted publications grouped by year
 */
export function parseBibTeX() {
  try {
    // Get the current directory and construct path to BibTeX file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const bibPath = path.join(__dirname, '../../public/assets/papers.bib');
    const bibContent = fs.readFileSync(bibPath, 'utf8');
    
    // Parse the BibTeX content
    const entries = bibtexParse.toJSON(bibContent);
    
    // Process and format entries
    const publications = entries.map(entry => {
      return {
        id: entry.citationKey,
        type: entry.entryType,
        title: cleanBibTeXString(entry.entryTags?.title || ''),
        authors: cleanBibTeXString(entry.entryTags?.author || '').replace(/ and /g, ', '),
        journal: cleanBibTeXString(entry.entryTags?.journal || ''),
        year: parseInt(entry.entryTags?.year || '2025'),
        volume: entry.entryTags?.volume || '',
        number: entry.entryTags?.number || '',
        pages: entry.entryTags?.pages || '',
        doi: entry.entryTags?.doi || entry.entryTags?.DOI || '',
        url: entry.entryTags?.url || entry.entryTags?.URL || '',
        abstract: cleanBibTeXString(entry.entryTags?.abstract || ''),
        abbr: entry.entryTags?.abbr || '',
        selected: entry.entryTags?.selected === 'true' || entry.entryTags?.selected === true,
        bibtex_show: entry.entryTags?.bibtex_show === 'true' || entry.entryTags?.bibtex_show === true,
        pdf: entry.entryTags?.pdf || '',
        month: entry.entryTags?.month || ''
      };
    });
    
    // Group publications by year
    const publicationsByYear = publications.reduce((acc, pub) => {
      const year = pub.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(pub);
      return acc;
    }, {});
    
    // Sort within each year by selected status (selected first), then by month
    Object.keys(publicationsByYear).forEach(year => {
      publicationsByYear[year].sort((a, b) => {
        // Selected publications first
        if (a.selected && !b.selected) return -1;
        if (!a.selected && b.selected) return 1;
        
        // Then sort by month (latest first)
        const monthOrder = {
          'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
          'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
        };
        const aMonth = monthOrder[a.month?.toLowerCase()] || 12;
        const bMonth = monthOrder[b.month?.toLowerCase()] || 12;
        return bMonth - aMonth;
      });
    });
    
    return publicationsByYear;
    
  } catch (error) {
    console.error('Error parsing BibTeX file:', error);
    return {};
  }
}

/**
 * Clean BibTeX strings by removing extra whitespace and LaTeX commands
 */
function cleanBibTeXString(str) {
  return str
    .replace(/\{|\}/g, '') // Remove curly braces
    .replace(/\\textquoteright/g, "'") // Replace LaTeX quotes
    .replace(/\\textendash/g, "–") // Replace LaTeX en-dash
    .replace(/\\\\/g, '') // Remove LaTeX line breaks
    .replace(/\\'([aeiou])/g, '$1') // Remove accent marks
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

/**
 * Format authors string for display
 */
export function formatAuthors(authorsString) {
  const authors = authorsString.split(', ');
  if (authors.length === 1) {
    return authors[0];
  } else if (authors.length === 2) {
    return `${authors[0]} and ${authors[1]}`;
  } else if (authors.length > 2) {
    return `${authors.slice(0, -1).join(', ')}, and ${authors[authors.length - 1]}`;
  }
  return authorsString;
}

/**
 * Generate citation text for a publication
 */
export function generateCitation(pub) {
  let citation = `${formatAuthors(pub.authors)}. `;
  citation += `"${pub.title}." `;
  citation += `<em>${pub.journal}</em>`;
  
  if (pub.volume) {
    citation += ` ${pub.volume}`;
    if (pub.number) {
      citation += `(${pub.number})`;
    }
  }
  
  if (pub.pages) {
    citation += `: ${pub.pages}`;
  }
  
  citation += ` (${pub.year}).`;
  
  return citation;
}
