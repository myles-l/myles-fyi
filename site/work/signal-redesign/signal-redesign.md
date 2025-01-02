---
title: "Signal Redesign"
when: "2018"
date: 2018-10-01
cover: {
  file: "image.png",
  alt: "Acrylic painting on white canvas of the Windows 95 icon that was displayed when a file was not found"
}
position: ""
tags:
 - Product Design
---
::: grid
{% pic "Hero - iPhone.png", "Signal for iPhone", "span-half expand-all" %}
{% pic "Hero - Android.png", "Signal for Android", "span-half align-right expand-all" %}
{% pic "Hero - Desktop.png", "Signal for desktop" %}
:::

{% link "https://signal.org", "Signal Messenger" %} is a secure communication platform designed to be as simple and easy to use as possible, without compromising privacy. I joined Signal in early 2018 as the first full-time designer, just as {% link "https://signal.org/blog/signal-foundation/", "Signal received substantial funding" %} for the first time and started to grow.

The challenges Signal faced were significant—it was primarily seen as a niche messenger, used for specific tasks that required privacy. The goal was to shift that perception: like privacy, Signal is for *everybody*. 

To do that, we focused on two things for the first year or so: shipping crucial features, and unifying the design with a focus on simplicity and accessibility. This case study will detail the efforts of the latter.

::: grid
{% pic "old signal.png", "Signal for iPhone", "span-half expand-all outline" %}
:::

The first thing we needed to do was build a strong foundation for the design. A unified color and type palette for all platforms was the first step, with a focus on improving accessibility (especially color contrast, which was a problem in the old design). Dark mode was also built into the new color scheme, which was already built into Android and desktop, and came to iOS soon after.

::: grid
{% pic "Visual Design Evolution.001.png", "UI color palette", "span-half expand-all outline" %}
{% pic "Visual Design Evolution.002.png", "Accent color palette", "span-half align-right expand-all outline" %}
{% pic "Visual Design Evolution.003.png", "Conversation color palette", "span-half expand-all outline" %}
{% pic "Visual Design Evolution.004.png", "Type styles", "span-half align-right expand-all outline" %}
:::

Once the foundation was built, our focus shifted to the message design. At the time each platform had its own unique design for the message bubble and supporting information (read receipt, timestamp, etc). The goal was to unify with one design for all platforms, simplifying both the design and development process, and improving the user experience.

Additionally, during this time we were quickly adding new message types (quoted replies, image albums, link previews, and contact shares all launched during this time) and needed a more robust system to support all the new formats.

::: grid
{% pic "incoming - light.png", "Sample of message formats", "outline" %}
{% pic "incoming - dark.png", "Dark mode message formats", null, "Sample of message formats" %}
{% pic "message status.png", "Message status indicator", "span-half expand-all outline", "Outgoing message status indicator" %}
{% pic "bubble collapse.png", "Message bubble collapse behavior", "span-half align-right expand-all outline", 'Message bubble "collapse"' %}
:::

The new design system (color, type, grid and message designs) shipped in late 2018, and has evolved since as we shipped new features and continued to improve the user experience.