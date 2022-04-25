---
layout: page
title: Alumni
permalink: /alumni/
description: Previous members of Vallejos group
nav: false
horizontal: false
---

<div class="members">
    <!-- Display categorized projects -->
    <!-- Display projects without categories -->
    {%- assign sorted_members = site.alumni | sort: "importance" -%}
    <!-- Generate cards for each project -->
            {%- for alumni in sorted_members -%}
                {% include alumni.html %}
            {%- endfor %}
</div>
