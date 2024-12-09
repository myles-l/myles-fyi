---
title: "Facebook Lite"
date: 2017-01-01
cover: {
  file: "fb-lite-cover.png",
  alt: "Acrylic painting on white canvas of the Windows 95 icon that was displayed when a file was not found"
}
position: "span-five-sixths expand-all"
tags:
 - Product Design
---

{% pic "fb-lite-old.png", "", "alt text", "Before" %}
{% pic "fb-lite.png", "", "alt text", "After" %}
{% text %}

Facebook Lite is an Android app with a much smaller apk size (1.7 MB vs 88 MB) and performance and network requirements, designed for low-end Android devices. It has a large install base, especially in emerging markets.

In August 2017, the Interfaces and News Feed teams shipped an {% link "https://techcrunch.com/2017/08/15/facebook-instagram-comments/", "updated News Feed design" %} on the main iOS and Android apps. Soon after, {% link "https://www.brendonmanwaring.com", "Brendon Manwaring" %} and I (on the Interfaces design team) were tasked with adapting Facebook Lite to this new design.

{% endtext %}
{% pic "quip.png", "", "alt text goes here", "Work was iterative, with phased testing of each individual component" %}
{% text %}

The challenges were significant, as FB Lite has many design constraints: No animation, rounded corners come at performance expense, 3 type sizes with fallback for 1 type size, and icons are limited to type sizes.

{% endtext %}
{% pic "attachments.png", "", "alt text goes here" %}
{% pic "ufi.png", "", "alt text goes here" %}
{% pic "story-title.png", "span-half expand-all", "alt text goes here" %}
{% pic "story-text.png", "span-half align-right expand-all", "alt text goes here" %}
{% text %}

We worked closely with the News Feed and Facebook Lite design and engineering teams to create solutions that were both performant and an improved user experience. Most of the new components were in testing by December 2017, and shipped in early 2018.

{% endtext %}