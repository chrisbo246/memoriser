---
---

{% assign lang = page.lang | default: site.lang | default: "en" %}
{% assign t = site.data.locales[lang] %}


{% include scripts/base64.js %}
{% include scripts/definition-lists.js %}
{% include scripts/filter.js %}
{% include scripts/cards.js %}
{% include scripts/index.js %}
{% include scripts/common.js %}
{% include scripts/bootstrap.js %}
{% include scripts/sound-player.js %}
{% include scripts/cookieconsent.js %}
{% include scripts/google-analytics.js %}
