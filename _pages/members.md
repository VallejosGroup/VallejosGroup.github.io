---
layout: page
title: People
permalink: /people/
description:
nav: true
horizontal: false
importance: 2
---

<div class="members">
    <!-- Display categorized projects -->
    <!-- Display projects without categories -->
    {%- assign sorted_members = site.members | sort: "importance" -%}
    <!-- Generate cards for each project -->
            {%- for member in sorted_members -%}
                {% include members.html %}
            {%- endfor %}
</div>

<p class = "text-3xl font-thin text-center">
<a  title="Alumni" href = "{{site.url}}/alumni/"> See  our alumni </a>
</p>

