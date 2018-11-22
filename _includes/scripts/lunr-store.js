{% assign collections = '' | split: ' ' %}{% for collection in site.collections %}{% assign collections = collections | push: collection.label %}{% endfor %}
window.lunrStore = {
{% for post in include.posts %}
  {{ post.url | slugify | jsonify }}: {
    "id": {{ post.url | slugify | jsonify }},
    "collection": {{ post.collection | jsonify }},{% if post.title %}
    "title": {{ post.title | jsonify }},{% endif %}{% if post.author %}
    "author": {{ post.author | jsonify }},{% endif %}{% if post.categories.length %}
    "categories": {{ post.categories | jsonify }},{% endif %}{% if post.tags.length %}
    "tags": {{ post.tags | jsonify }},{% endif %}{% for key in collections %}{% if post[key] %}
    "{{ key }}": {{ post[key] | jsonify }},{% endif %}{% endfor %}{% if post.description %}
    "description": {{ post.description | strip_html | strip_newlines | jsonify }},{% endif %}{% if post.excerpt %}
    "excerpt": {{ post.excerpt | strip_html | strip_newlines | jsonify }},{% endif %}
    "content": {{ post.content | strip_html | strip_newlines | jsonify }}
  }{% unless forloop.last %},{% endunless %}{% endfor %}
};

{% comment %}
{% assign collections = '' | split: ' ' %}{% for collection in site.collections %}{% assign collections = collections | push: collection.label %}{% endfor %}
window.lunrStore = [
{% for post in include.posts %}{% capture preview %}
  <div class="{% include filter-tags.html post=post %}">
    <input type="radio" id="flipcard_position_{{ post.url | slugify: 'default' }}" name="flipcard_position" value="{{ post.url }}" class="flipcard-position d-none" data-storage="false" />
    <div class="card card-flip m-1">
      {% if post.weight > 0 %}{% assign class = 'card-position-absolute bg-primary text-white' %}{% else %}{% assign class = 'card-position-absolute bg-white' %}{% endif %}
      {% include card.html face="front" post=post class=class img-class="card-img-faded card-img-grayscale" title-class="h2 font-weight-bold" %}
      {% include card.html face="back" post=post class="bg-white text-dark" %}
    </div>
  </div>{% endcapture %}
  {
    "id": {{ forloop.index0 | jsonify }},
    "collection": {{ post.collection | jsonify }},{% if post.title %}
    "title": {{ post.title | jsonify }},{% endif %}{% if post.author %}
    "author": {{ post.author | jsonify }},{% endif %}{% if post.categories.length %}
    "categories": {{ post.categories | jsonify }},{% endif %}{% if post.tags.length %}
    "tags": {{ post.tags | jsonify }},{% endif %}{% for key in collections %}{% if post[key] %}
    "{{ key }}": {{ post[key] | jsonify }},{% endif %}{% endfor %}{% if post.description %}
    "description": {{ post.description | strip_html | strip_newlines | jsonify }},{% endif %}{% if post.excerpt %}
    "excerpt": {{ post.excerpt | strip_html | strip_newlines | jsonify }},{% endif %}
    "content": {{ post.content | strip_html | strip_newlines | jsonify }},
    "preview": {{ preview | strip_newlines | normalize_whitespace | jsonify }}
  }{% unless forloop.last %},{% endunless %}{% endfor %}
];
{% endcomment %}
