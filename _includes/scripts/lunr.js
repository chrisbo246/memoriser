{% raw %}
(function() {
  'use strict';

  {% endraw %}
  {% comment %}{% include scripts/lunr-store.js posts=include.posts %}{% endcomment %}
  {% raw %}

  var data = window.lunrStore;
  var resultsContainer;
  var messageContainer;
  var input;



  /**
  *
  */

  var displayResults = function (results) {

    var html = '', item;
    var $container = $(resultsContainer);

    $container.html(html);

    if (results.length) {
      for (var i = 0; i < results.length; i++) {
        //item = data[results[i].ref];
        //if (item && item.preview) {
          //html += item.preview;
        //}
        $container.append($('<div>').load('{% endraw %}{{ "assets/data/cards.html" | relative_url }}{% raw %} #lunr-result-' + results[i].ref));
      }
      messageContainer.setAttribute('hidden', '');
    } else {
      messageContainer.removeAttribute('hidden');;
    }

    //resultsContainer.innerHTML = html;

  };



  /**
  * Display all
  */

  var displayAll = function () {

    var html = '', item;

    var $container = $(resultsContainer);

    $container.html(html);

    //for (var i = 0; i < data.length; i++) {
    for (var key in data) {
      //item = data[key];
      //if (item && item.preview) {
      //  html += item.preview;
      //}
      $container.append($('<div>').load('{% endraw %}{{ "assets/data/cards.html" | relative_url }}{% raw %} #lunr-result-' + key));
    }
    //resultsContainer.innerHTML = html;
    messageContainer.setAttribute('hidden', '');

  };



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


  var insertParameter = function (key, value) {

      key = encodeURI(key); value = encodeURI(value);
      var kvp = document.location.search.substr(1).split('&');
      var i=kvp.length; var x; while(i--) {
          x = kvp[i].split('=');
          if (x[0]==key) {
              x[1] = value;
              kvp[i] = x.join('=');
              break;
          }
      }

      if(i<0) {kvp[kvp.length] = [key,value].join('=');}

      //this will reload the page, it's likely better to store this until finished
      //document.location.search = kvp.join('&');
      //history.pushState(null, null, document.location + kvp.join('&'));
  };



  /**
  * Initialize lunr, definine search fields and data
  */

  var init = function (options) {

    return lunr(function () {

      if (options.lang && lunr[options.lang]) {
        this.use(lunr[options.lang]);
        console.log('lunr', options.lang);
      }

      this.field('collection');
      this.field('id');
      //this.field('url');
      //this.field('alias');
      this.field('title', { boost: 10 });
      //this.field('author');
      //this.field('category');
      this.field('categories', { boost: 5 });
      this.field('tags', { boost: 2 });
      this.field('content');
      this.field('description');
      this.field('excerpt');
      //this.field('preview');
      if (options.customFields.length) {
        for (var key in options.customFields) {
          this.field(key);
        }
      }

      for (var key in data) {
        this.add(data[key]);
      }

    });

  };



  if (typeof lunr === 'undefined') {
    throw new Error('Lunr is not present. Please include / require Lunr before this script.');
  }

  document.addEventListener("DOMContentLoaded", function(event) {

    if (typeof lunr === 'function' && data) {

      resultsContainer = document.querySelector('{% endraw %}{{ include.resultsSelector }}{% raw %}' || '#search-results');
      messageContainer = document.querySelector('{% endraw %}{{ include.messageSelector }}{% raw %}' || '#search-message');
      input = document.querySelector('{% endraw %}{{ include.inputSelector }}{% raw %}' || '#search-input');

      // Initialize lunr, definine search fields and data
      var idx = init({
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
      //searchFilters.push('collection:{{ page.collection }}');
      {% endif %}
      {% raw %}

      // Display results matching URL parameters
      var searchTerms = getUriParameter('q');
      if (searchTerms) {
        var results = idx.search(searchTerms); // Get lunr to perform a search
        displayResults(results);
        if (input) {
          input.setAttribute('value', searchTerms);
        }
      } else {
        displayAll();
      }

      // Filter from searchbox
      if (input) {
        input.oninput = function (e) {
          //console.log('event', e.type);
          var searchTerms = this.value.trim();

          if (searchTerms !== '') {
            var results = idx.search(searchTerms + ' ' + searchFilters.join(' '));
            displayResults(results);
            //insertParameter('q', searchTerms);
            history.pushState(null, null, encodeURI(decodeURI(location.href).replace(/([?&]q=)[^&]*/,'$1' + searchTerms)));
            //console.log('document.location', document.location);
          } else {
            displayAll();
            history.pushState(null, null, encodeURI(decodeURI(location.href).replace(/([?&]q=)[^&]*/,'')));
          }
        };
        /*var searchTerms = input.value;
        if (searchTerms !== '') {
          var results = idx.search(searchTerms + ' ' + searchFilters.join(' '));
          displayResults(results);
        }*/
        /*input.onfocus = function () {
          input.value = '';
          displayAll();
          //input.input();
          //displayAll();
        };*/
      }

      /*if (!results) {
        var searchTerms = '';
        if (searchFilters.length) {
          var results = idx.search(searchTerms + ' ' + searchFilters.join(' '));
          displayResults(results);
        } else {
          displayAll();
        }
      }*/

    }


  });


})();
{% endraw %}
