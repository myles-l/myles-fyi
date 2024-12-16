---
title: "Signal Messenger"
when: "2018—ongoing"
date: 2024-10-01
cover: {
  file: "image.png",
  alt: "Acrylic painting on white canvas of the Windows 95 icon that was displayed when a file was not found"
}
position: ""
tags:
 - Product Design
---
{% pic "Hero - iPhone.png", "span-half expand-all", "Signal for iPhone" %}
{% pic "Hero - Android.png", "span-half align-right expand-all ", "Signal for Android" %}
{% pic "Hero - Desktop.png", "", "Signal for desktop" %}

::: p
{% link "https://signal.org", "Signal Messenger" %} is a secure communication platform designed to be as simple and easy to use as possible, without compromising privacy. I joined Signal in 2018 as the first full-time designer, {% link "https://signal.org/blog/signal-foundation/", "Signal received substantial funding" %} for the first time and started to grow.

The challenges Signal faced were significant — it was primarily seen as a niche messenger, used for specific tasks that required privacy. The goal was to shift that perception: like privacy, Signal is for *everybody*. 

To do that, we focused on two things for the first year or so: shipping crucial features, and unifying the design with a focus on simplicity and accessibility. This case study will detail the efforts of the latter.
:::

{% pic "old signal.png", "span-half expand-all outline", "Signal for iPhone" %}

::: p
The first thing we needed to do was build a strong foundation for the design. A unified color and type palette for all platforms was the first step, with a focus on improving accessibility (especially color contrast, which was a problem in the old design). Dark mode was also built into the new color scheme, which was already built into Android and desktop, and came to iOS soon after.
:::

{% pic "Visual Design Evolution.001.png", "span-half expand-all outline", "UI color palette" %}
{% pic "Visual Design Evolution.002.png", "span-half align-right expand-all outline", "Accent color palette" %}
{% pic "Visual Design Evolution.003.png", "span-half expand-all outline", "Conversation color palette" %}
{% pic "Visual Design Evolution.004.png", "span-half align-right expand-all outline", "Type styles" %}

::: p
Once the foundation was built, our focus shifted to the message design. At the time each platform had its own unique design for the message bubble and supporting information (read receipt, timestamp, etc). The goal was to unify with one design for all platforms, simplifying both the design and development process, and improving the user experience.

Additionally, during this time we were quickly adding new message types (quoted replies, image albums, link previews, and contact shares all launched during this time) and needed a more robust system to support all the new formats.
:::

{% pic "incoming - light.png", "span-all outline", "Sample of message formats" %}
{% pic "incoming - dark.png", "span-all", "Dark mode message formats", "Sample of message formats" %}
{% pic "message status.png", "span-half expand-all outline", "Message status indicator", "Outgoing message status indicator" %}
{% pic "bubble collapse.png", "span-half align-right expand-all outline", "Message bubble collapse behavior", 'Message bubble "collapse"' %}

::: p
The new design system (color, type, grid and message designs) shipped in late 2018, and has evolved since as we shipped new features and continued to improve the user experience.
:::