{% raw %}
var searchModule = (function() {
  'use strict';

  var idx;
  var data = {};

  if (typeof lunr === 'undefined') {
    throw new Error('Lunr is not present. Please include / require Lunr before this script.');
  }



  /**
  *
  */

  var displayResults = function (container, results) {

    if (container && results.length) { // Are there any results?
      var html = '';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = data[results[i].ref];

        /*
        html += '<li>'
        + '<div class="media">'
        + '<div class="media-body">'
        + '<h4>'
        + '<a href="' + item.url + '">' + item.title + '</a>'
        + ' <span class="label label-' + item.collection + '">' + item.collection + '</span>'
        + '</h4>'
        + '<p>' + item.content.substring(0, 150) + ((item.content.length > 150) ? '&#8230;' : '') + '</p>'
        + '</div>'
        + '</media>'
        + '</li>';
        */


        {% endraw %}
        {% comment %}
        {% if post.weight > 0 %}
        {% assign class = 'card-position-absolute bg-primary text-white' %}
        {% else %}
        {% assign class = 'card-position-absolute bg-white' %}
        {% endif %}

        id='flipcard_position_{{ post.url | slugify: "default" }}';
        url='{{ post.url }}';
        filterTags='{% include filter-tags.html post=post %}'

        {% capture flipcard %}
        '<div class="' + filterTags + '">'
        + '<input type="radio" id="' + id + '" name="flipcard_position" value="' + url + '" class="flipcard-position d-none" data-storage="false" />'
        + '<div class="card card-flip m-1">'
        {% include card.html face="front" post=post class=class img-class="card-img-faded card-img-grayscale" title-class="h2 font-weight-bold" %}
        {% include card.html face="back" post=post class="bg-white text-dark" %}
        + '</div>'
        + '</div>';
        {% endcapture %}
        {% endcomment %}
        {% raw %}

        if (item && item.preview) {
          html += item.preview;
        }

      }

      container.innerHTML = html;
    } else {
      container.innerHTML = '<div class="alert alert-info" role="alert">{% endraw %}{{ t.no_result_info }}{% raw %}</div>';
    }
  }



  /**
  * Extract URL parameters
  */

  var getUriParameter = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  };



  /**
  * Initialize lunr, definine search fields and data
  */

  var init = function (options) {


    /**
    * Define data object from Jekyll collections
    */
    data = window.docs;



    /**
    * Initalize lunr with the fields it will be searching on.
    */

    idx = lunr(function () {

      if (options.lang && lunr[options.lang]) {
        this.use(lunr[options.lang]);
      }

      //this.field('id');
      this.field('collection');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('categories');
      this.field('tags');
      this.field('content');
      this.field('description');
      this.field('excerpt');
      //this.field('alias');
      this.field('preview');
      if (options.customFields.length) {
        for (var key in options.customFields) {
          this.field(key);
        }
      }

      for (var key in data) {
        this.add(data[key]);
      }

    });




    /*
    data = {
      {% endraw %}
      {% comment %}
      {% for collection in site.collections %}
      {% if collection.docs.size != 0 %}
      {% for post in collection.docs %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "categories": "{{ post.categories }}",
        "tags": "{{ post.tags }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}",
        "description": "{{ post.description | xml_escape }}",
        "excerpt": "{{ post.excerpt | strip_html | strip_newlines }}"
        //"types": "{{ post.types | join: ' ' }}",
        //"brands": "{{ post.brands | join: ' ' }}",
        //"purposes": "{{ post.purposes | join: ' ' }}"
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
      {% unless forloop.last %},{% endunless %}
      {% endif %}
      {% endfor %}
      {% endcomment %}
      {% raw %}
    };
    */




      /**
      * Add the data to lunr
      */
      /*
      for (var key in data) {
        var o = {
          'id': key,
          'title': data[key].title,
          'author': data[key].author,
          'category': data[key].category,
          'categories': data[key].categories,
          'tags': data[key].tags,
          'content': data[key].content,
          'description': data[key].description,
          'excerpt': data[key].excerpt,
          'alias': data[key].alias
        }

        if (options.customFields.length) {
          for (var fieldName in options.customFields) {
            o[fieldName] = data[key][fieldName];
          }
        }

        idx.add(o);
    }
    */

  };


  document.addEventListener("DOMContentLoaded", function(event) {

    var resultsContainer = document.getElementById('search-results');
    var input = document.getElementById('searchbox');

    // Initialize lunr, definine search fields and data
    init({
      lang: '{% endraw %}{{ lang }}{% raw %}',
      collection: '{% endraw %}{{ page.collection }}{% raw %}',
      customFields: []
    });

    var searchFilters = [];
    {% endraw %}
    {% assign collections = '' | split: ' ' %}
    {% for collection in site.collections %}
    {% if page[collection.label].length %}

    {% endif %}
    {% endfor %}
    {% if page.collection %}
    searchFilters.push('collection:{{ page.collection }}');
    {% endif %}
    {% raw %}

    // Display results matching URL parameters
    var searchTerms = getUriParameter('q');
    if (searchTerms) {
      var results = idx.search(searchTerms); // Get lunr to perform a search
      displayResults(resultsContainer, results);
      if (input) {
        input.setAttribute('value', searchTerms + ' ' + searchFilters.join(' '));
      }
    }

    if (input) {
      input.onkeyup = function (e) {
        console.log('event', e.type);
        var searchTerms = this.value;
        var results = idx.search(searchTerms + ' ' + searchFilters.join(' '));
        displayResults(resultsContainer, results);
      };
    }


  });


})();
{% endraw %}
