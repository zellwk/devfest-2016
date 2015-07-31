{% extends 'layout.swig' %}

{% block desc %} <meta name="description" content="{{metaDesc}}" />{% endblock %}
{% block canonical %} <link rel="canonical" href="{{permalink}}"> {% endblock %}
{% block OGType %}<meta property="og:type" content="article"/>{% endblock %}

{% block content %}

<h1>{{title}}</h1>
<p>Permalink is {{permalink}}</p>
<ul>
  {% for tag in tags %}
  <li><a href="{{tag.permalink}}">{{tag.tag}}</a></li>
  {% endfor %}
</ul>
<div class="content">
  {# {% autoescape false %}  #}
  {{body}} 
  {# {% endautoescape %} #}
</div>

{% endblock %}