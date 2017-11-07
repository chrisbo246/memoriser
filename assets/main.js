---
---

{% assign lang = page.lang | default: site.lang | default: "en" %}
{% assign t = site.data.locales[lang] %}

$('#disqus_thread').addClass('collapse show');

{% include scripts/base64.js %}
{% include scripts/definition-lists.js %}
{% include scripts/filter.js %}
{% include scripts/common.js %}
{% include scripts/bootstrap.js %}
{% include scripts/cookieconsent.js %}
{% include scripts/google-analytics.js %}
