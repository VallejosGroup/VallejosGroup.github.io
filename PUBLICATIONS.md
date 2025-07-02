# Publications System

This document explains how the dynamic publications system works and how to maintain it.

## Overview

The publications page automatically generates content from the BibTeX file located at `public/assets/papers.bib`. This system eliminates the need to manually update the publications page when new papers are added.

## Files Structure

```
src/
├── components/
│   ├── Publication.astro          # Individual publication component
│   └── PublicationFilters.astro   # Search and filter functionality
├── pages/
│   └── publications.astro         # Main publications page
└── utils/
    └── bibParser.js              # BibTeX parsing utility

public/
└── assets/
    └── papers.bib               # BibTeX file with all publications
```

## Adding New Publications

1. **Add to BibTeX file**: Simply add your new publication entry to `public/assets/papers.bib`
2. **Build the site**: Run `npm run build` - the new publication will automatically appear
3. **No code changes needed**: The system automatically parses and displays the new entry

## BibTeX Entry Format

Each entry should include these fields for optimal display:

### Required Fields
- `title` - Publication title
- `author` - List of authors (separated by " and ")
- `journal` - Journal or venue name
- `year` - Publication year

### Optional Fields
- `abbr` - Journal abbreviation (displays as a badge)
- `selected = {true}` - Mark as a selected/featured publication (shows star)
- `bibtex_show = {true}` - Enable BibTeX display button
- `volume` - Journal volume
- `number` - Issue number
- `pages` - Page numbers
- `doi` - DOI identifier
- `url` - Direct URL to publication
- `abstract` - Publication abstract
- `pdf` - PDF filename (place PDFs in `public/assets/pdfs/`)
- `month` - Publication month

### Example Entry

```bibtex
@article{YourName2025,
  abbr = {NatMet},
  bibtex_show = {true},
  selected = {true},
  title = {Your Amazing Research Title},
  author = {Your Name and Catalina A. Vallejos and Other Authors},
  journal = {Nature Methods},
  volume = {22},
  number = {1},
  pages = {123-134},
  year = {2025},
  month = {jan},
  doi = {10.1038/s41592-025-01234-5},
  abstract = {This is the abstract of your paper...},
  pdf = {yourname2025.pdf}
}
```

## Features

### Automatic Sorting
- Publications are grouped by year (newest first)
- Within each year, selected publications appear first
- Then sorted by month (latest first)

### Group Member Highlighting
The system automatically bolds group member names in author lists. Current members:
- Catalina A. Vallejos
- Nathan Constantine-Cooke
- Karla Monterrubio-Gómez

To add new members, edit the `groupMembers` array in `src/components/Publication.astro`.

### Search and Filtering
- **Search**: By title, author, or journal name
- **Filter by year**: Dropdown to show specific years
- **Selected only**: Checkbox to show only featured publications

### Interactive Elements
- **Abstract toggle**: Click to expand/collapse abstracts
- **BibTeX display**: Click to show formatted BibTeX citation
- **External links**: DOI, URL, and PDF links when available

## Customization

### Styling
- Main styles in `src/components/Publication.astro`
- Filter styles in `src/components/PublicationFilters.astro`
- Page layout styles in `src/pages/publications.astro`

### Group Member Names
Edit the `groupMembers` array in `src/components/Publication.astro`:

```javascript
const groupMembers = [
  'Catalina A. Vallejos',
  'New Member Name',
  // Add more members here
];
```

### Journal Abbreviations
Add common abbreviations directly in BibTeX entries using the `abbr` field.

## Troubleshooting

### Build Errors
- Check BibTeX syntax - ensure all braces `{}` are balanced
- Verify the BibTeX file path is correct
- Look for special characters that need escaping

### Missing Publications
- Ensure the BibTeX entry has required fields (title, author, journal, year)
- Check that the file is saved as UTF-8 encoding
- Verify the BibTeX entry is properly formatted

### Display Issues
- Check browser console for JavaScript errors
- Ensure all special LaTeX characters are properly handled in `cleanBibTeXString()`

## Maintenance

### Regular Updates
1. Add new publications to the BibTeX file
2. Update group member list when team changes
3. Add new journal abbreviations as needed

### Performance
The system processes the entire BibTeX file at build time, so there's no runtime performance impact regardless of the number of publications.

### Backup
The BibTeX file contains all publication data, so ensure it's backed up and version controlled.
