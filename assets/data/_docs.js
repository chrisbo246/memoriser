---
---
{% assign collections = '' | split: ' ' %}{% for collection in site.collections %}{% assign collections = collections | push: collection.label %}{% endfor %}
window.docs = {
{% for collection in site.collections %}{% if collection.docs.size != 0 %}{% for post in collection.docs %}
  "{{ post.url }}": {
    "url": {{ post.url | jsonify }},
    "title": {{ post.title | jsonify }},
    "collection": {{ post.collection | jsonify }},
    "author": {{ post.author | jsonify }},
    "category": {{ post.category | jsonify }},
    "categories": {{ post.categories | jsonify }},
    "tags": {{ post.tags | jsonify }},{% for key in collections %}{% if post[key] %}
    "{{ key }}": {{ post[key] | jsonify }},{% endif %}{% endfor %}
    "description": {{ post.description | strip_html | strip_newlines | jsonify }},
    "excerpt": {{ post.excerpt | strip_html | strip_newlines | jsonify }},
    "content": {{ post.content | strip_html | strip_newlines | jsonify }}
  }{% unless forloop.last %},{% endunless %}{% endfor %}{% unless forloop.last %},{% endunless %}{% endif %}
{% endfor %}
};

{% comment %}
window.lunrData = {
{% for collection in site.collections %}{% if collection.docs.size != 0 %}{% for post in collection.docs %}
  "{{ post.url | slugify }}": {
    "title": "{{ post.title | xml_escape }}",
    "author": "{{ post.author | xml_escape }}",
    "date": "{{ post.date | date: "%Y-%m-%d" }}",
    "category": "{{ post.category | xml_escape }}",
    "categories": "{{ post.categories | jsonify }}",
    "tags": "{{ post.tags | jsonify }}",
    "content": {{ post.content | strip_html | strip_newlines | xml_escape }},
    "content_ord": {{ post.content | strip_html | strip_newlines | jsonify }},
    "url": "{{ post.url | xml_escape }}",
    "description": "{{ post.description | xml_escape }}",
    "excerpt": "{{ post.excerpt | strip_html | strip_newlines }}"
  }{% unless forloop.last %},{% endunless %}{% endfor %}{% unless forloop.last %},{% endunless %}{% endif %}
{% endfor %}
};
{% endcomment %}
