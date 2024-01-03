# The Vallejos Group Website 

![](https://img.shields.io/badge/Jekyll-CC0000?style=for-the-badge&logo=Jekyll&logoColor=white)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
<br>
[![Deploy](https://github.com/VallejosGroup/VallejosGroup.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/VallejosGroup/VallejosGroup.github.io/actions/workflows/deploy.yml)

![screenshot.png](screenshot.png)

<p align = "center"> <em> Our group website </em> </p> 

 <h2>Table of Contents </h2>

- [The Vallejos Group Website](#the-vallejos-group-website)
  - [About](#about)
  - [Making edits to our site](#making-edits-to-our-site)
    - [New members](#new-members)
    - [Adding publications](#adding-publications)
  - [Local setup](#local-setup)

## About

Our website is a [Jekyll](https://jekyllrb.com) site adapted from the
[al-folio](https://github.com/alshedivat/al-folio) theme to be more suitable for
research groups and supports [Tailwind CSS](https://tailwindcss.com) for
responsive and modern web design. Crucially, none of this needs to be known (or
understood) in order to be able to make edits to the site. 

If you are uncertain if what you have done is correct, please feel free to
contact me (Nathan/@nathansam), or push to a branch and open a pull request
tagging me.

The website is hosted at https://vallejosgroup.github.io.

## Making edits to our site 
:pencil2:

Jekyll is a static site generator. This means that the files in this repository
are used to generate the HTML, CSS, and javascript needed to display our
website. This has the benefit of making it much easier to edit and maintain a
site compared to editing the HTML, CSS and javascript displayed to visitors
manually.  

Our site is built using [GitHub actions]((https://github.com/features/actions)).
This means edits to the site can be made without needing to build the website on
your own machine. Instead, you can just make changes to the files in this
repository and then push the changes. When a change is pushed to the `master`
branch, a GitHub action runs which builds the website (the final HTML, CSS and
javascript code) on the `gh-pages` branch. 

This is then deployed to https://vallejosgroup.github.io. If you are interested
in building the website on your own machine so you can see the changes made to
the website before they are pushed, please see the [Local setup](#local-setup)
section.

### New members
:woman: :man:

Welcome to the group! There are 5 steps to follow to add your profile
to the website:

1. Cloning the repository
2. Adding a 3:4 aspect ratio image to `img/members`
3. Adding your profile to `_members/`
4. Adding first and last names to the [_config.yml](_config.yml) file
5. Committing and pushing changes


**1. Cloning  the repository** 

If you have not already, clone this repository. This can be done via the
[GitHub Desktop app](https://desktop.github.com) (on Windows or MacOS) or by
running the following command in a terminal:

```bash
git clone https://github.com/VallejosGroup/VallejosGroup.github.io.git
```

**2. Adding a 3:4 aspect ratio image to `img/members`**

Images are assumed to be in a **3:4 aspect ratio**. Otherwise, they would disrupt
the layout of our [members page](https://vallejosgroup.github.io./people/) or
appear stretched.

Navigate to the `img/members` directory and add a `.jpg` or `.png` profile
image with a 3:4 aspect ratio.

If you have access to Photoshop, a 3:4 image can be generated using the crop
tool. Alternatively, there are many online tools which can generate a 3:4 image.

>  **Note**: a 3:4 aspect ratio image can be generated via `imagemagik` using
> the following command* (replacing < filename > with the  actual filename):

```bash
$ magick convert <filename>.jpg -gravity center -crop 3:4 <filename>.jpg
```

**3. Adding your profile to `_members/`**

Navigate to the `_members/` directory, duplicate the
[`Nathan.md`](_members/Nathan.md) file, rename it to your own name, and edit
the file to provide your own links. For any links you do not want,
comment the line out using `#`. When specifying the name of the profile image,
do not include the file extension (this is because the jpg or png file you have
added will be converted to a
[webp file](https://developers.google.com/speed/webp) when the site is built and
the correct extension will be automatically added).

**4. Adding first and last names to the [_config.yml](_config.yml) file**

Next, navigate to [_config.yml](_config.yml) and scroll to the Jekyll Scholar
section of the file. You should add your last name to the `last_name` array and
first names in the `first_name` array in the format they (will) appear
in publications. If your name appears in multiple formats, add all of these
formats. If you use any initials, then these should be included in the
first_name array (E.g "Catalina A."). When a publication you have authored is
added to the site, your name will now be underlined in the listing.  

**5. Committing and pushing changes**

Finally commit and push the changes either using the GitHub desktop app or via
a terminal command such as the one below,

```bash
git add -A
git commit -am "Add my profile"
git push -u origin master
```

You can watch the progress of the website
being built via the [actions tab](https://github.com/VallejosGroup/VallejosGroup.github.io/actions).
Once the `Deploy` and subsequent `pages-build-deployment` workflows are
finished, your changes should be on https://vallejosgroup.github.io

### Adding publications
:books:

The [publications section](https://vallejosgroup.github.io/publications/) of the
website is generated from the [_bibliography/papers.bib](_bibliography/papers.bib)
BibTeX file. Adding a record to this file will result in the publication
being added to the website. I recommend adding an abstract to the record, as
this abstract will then be visible on the website. Likewise, providing a url key
will produce a link to the manuscript on the journal's website. 

There are a few non-standard BibTeX keys used by this website. The first, `abbr`
can be used to provide a journal abbreviation which is then shown next to the
publication on the website. The second, `selected` denotes if the publication
appears on the homepage under the *Selected Publications* section. If this key
is not listed, then `selected = {false}` is assumed. 

Finally, PDFs can be hosted on the website. Simply copy the PDF file to the 
`assets/pdf` directory, create a pdf key in the BibTeX file, using the name of
the pdf file, and a link will be generated.  

## Local setup
:computer:

Building our website locally requires `ruby`, and `node`. If on macOS or Linux,
there is a high chance `ruby` is already installed and you may also have node
installed. To check if they are already installed, run 

``` bash 
$ ruby -v
$ node -v
``` 

If you don't already have them installed, you might find it handy to install
version managers like `nvm` or `rvm` - these hopefully automate parts of the
install process. You'll also need the ruby gem `bundler`.[^1] You can install
this by running `gem install bundler`.

Running the below commands will then download and install additional
dependencies and serve the site locally. As changes are detected in the
source files, the site will automatically re-generate.

>  **Note**: Edits to the config file might require re-running
> `bundle exec jekyll serve` for them to take effect 


```bash
$ mkdir node_modules
$ npm install
$ npm install tailwindcss@3.0.0 @tailwindcss/typography@latest postcss@latest postcss-scss@latest autoprefixer@latest cssnano@latest
$ bundle install
$ bundle exec jekyll serve
```

`npm`,  the node package manager, should install the files needed for Tailwind CSS
whilst `bundle` will install the Ruby modules used by the site (as
listed in [`Gemfile`](Gemfile))


[^1]: ruby gems are libraries, a bit like python modules or R packages.
