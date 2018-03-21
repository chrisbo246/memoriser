{% if jekyll.environment == "production" %}

window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#237afc"
      },
      "button": {
        "background": "#fff",
        "text": "#237afc"
      }
    },
    "theme": "block",
    "position": "bottom-right",
    "content": {
      "header": "{{ t.cookieconsent_header }}",
      "message": "{{ t.cookieconsent_message }}",
      "dismiss": "{{ t.cookieconsent_dismiss }}",
      "link": "{{ t.cookieconsent_link }}",
      "allow": "{{ t.cookieconsent_allow }}",
      "deny": "{{ t.cookieconsent_deny }}"
    }/*,
    window: '<div role="dialog" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="-cc-window card {{classes}}"><div class="card-body">{{children}}</div></div>',
    elements: {
      header: '<h5 class="-cc-header card-title">{{header}}</h5>',
      message: '<p id="cookieconsent:desc" class="-cc-message card-text">{{message}}</p>',
      messagelink: '<span id="cookieconsent:desc" class="-cc-message card-text">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="-cc-link card-link" href="{{href}}" target="_blank">{{link}}</a></span>',
      dismiss: '<a aria-label="dismiss cookie message" tabindex="0" class="-cc-btn cc-dismiss btn btn-secondary">{{dismiss}}</a>',
      allow: '<a aria-label="allow cookies" tabindex="0" class="-cc-btn cc-allow btn btn-primary">{{allow}}</a>',
      deny: '<a aria-label="deny cookies" tabindex="0" class="-cc-btn cc-deny btn btn-secondary">{{deny}}</a>',
      link: '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',
      close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close">{{close}}</span>',
    }*/
  })
});

var d = document, s = d.createElement('script');
s.src = '{{ "/bower_components/cookieconsent/build/cookieconsent.min.js" | relative_url }}';
s.async = true;
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);

{% endif %}
