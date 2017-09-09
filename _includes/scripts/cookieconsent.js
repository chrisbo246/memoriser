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
            "message": "{{ t.cookieconsent_message }}",
            "dismiss": "{{ t.cookieconsent_dismiss }}",
            "link": "{{ t.cookieconsent_link }}"
        }
    })
});

var d = document, s = d.createElement('script');
s.src = '{{ "/bower_components/cookieconsent/build/cookieconsent.min.js" | relative_url }}';
s.async = true;
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);

{% endif %}
