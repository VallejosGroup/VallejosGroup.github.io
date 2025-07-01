#!/bin/bash
# This script is used to render the Jekyll site with Tailwind CSS and PostCSS.
source /etc/profile.d/rvm.sh
npm install
bundle install
bundle exec jekyll build
