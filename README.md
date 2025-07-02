# The Vallejos Group Website

![](https://img.shields.io/badge/Astro-3333FF?style=for-the-badge&logo=astro&logoColor=white)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
<br>
[![Deploy](https://github.com/VallejosGroup/VallejosGroup.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/VallejosGroup/VallejosGroup.github.io/actions/workflows/deploy.yml)

![screenshot.png](screenshot.png)

<p align="center"><em>Our group website</em></p>

## Table of Contents

- [About](#about)
- [Making edits to our site](#making-edits-to-our-site)
  - [New members](#new-members)
  - [Adding publications](#adding-publications)
- [Local setup](#local-setup)

## About

Our website is now an [Astro](https://astro.build) site, featuring a modern, responsive design powered by [Tailwind CSS](https://tailwindcss.com). W

If you have any questions or need help, feel free to contact me (Nathan/@nathansam), or create a branch and open a pull request tagging me.

The website is hosted at https://vallejosgroup.github.io.

## Making Edits to Our Site ✏️

Astro is a static site generator optimised for performance. The contents of this repository are used to generate the final HTML, CSS, and JavaScript needed for the website.

Edits are made via [GitHub Actions](https://github.com/features/actions), so you don't need to build the site locally. Just push changes to the `main` or `master` branch, and the action will build and deploy the site.

### New Members 👩‍🔬👨‍🔬

Welcome to the group! Follow these steps to add your profile:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VallejosGroup/VallejosGroup.github.io.git
   ```
   
2. **Add a 3:4 aspect ratio image to `public/assets/members`**:
   - Use tools like Photoshop or online crop tools. Images must be in `.jpg`, `.png`, or directly uploaded as `.webp`.

3. **Add your profile in `src/content/members/`**:
   - Create a markdown file for your profile in `src/content/members/`.

4. **Commit and push changes**:
   ```bash
   git add -A
   git commit -am "Add my profile"
   git push -u origin main
   ```

View the deployment status in the [Actions tab](https://github.com/VallejosGroup/VallejosGroup.github.io/actions).

### Adding Publications 📚

Publications are managed via a BibTeX file at `src/content/publications.bib`. Add your publication record here, along with optional fields like `abstract`. PDF hosting is supported in `public/assets/pdfs`.

## Local Setup 💻

Local development requires `node` and `npm`. Clone the repository and set it up:

```bash
npm install
npm run dev
```

This will start a local development server with hot reloading. You can view live changes as you edit the site.

---

**Note**: Partial edits or configuration updates might require restarting the development server.
