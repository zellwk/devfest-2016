<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {# SEO Tags #}
  {% block SEO %}
    {% block title %}<title> {{title}} | {{SITE_TITLE}} </title>{% endblock %}
    {# TODO: Meta description should describe the current page since they appear on the search results #}
    {% block desc %} <meta name="description" content="{% if %}{{metaDescription}}" />{% endblock %}
    {% block canonical %} {% endblock %}

    {# Possible to ensure Google doesn't index pages with ROBOTS #}
    {# Example: <meta name="robots" content="noindex, nofollow"> #}
    {% block robots %} {% endblock %}
  {% endblock %}
  
  {# Open Graph Tags #}
  {% block OG %}
    <meta property="og:site_name" content="{{SITE_TITLE}}"/>
    <meta property="og:title" content="{{title}} | {{SITE_TITLE}}"/>
    <meta property="og:description" content="{{SITE_DESC}}"/>
    <meta property="og:email" content="{{SITE_EMAIL}}">
    {% block OGType %}<meta property="og:type" content="website"/>{% endblock %}
    <meta property="og:url" content="{{SITE_URL}}"/>
    <meta property="og:image" content="{{OG_IMG}}"/>
    {# TODO: og:description should follow meta desc #}
  {% endblock %}
  
  {# Twitter Tags #}
  {% block twitter %}
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="{{TWITTER_HANDLE}}">
    <meta name="twitter:creator" content="{{TWITTER_HANDLE}}">  
    <meta name="twitter:title" content="{{title}} | {{SITE_TITLE}}">
    {# TODO: Twitter desc should follow meta desc #}
    <meta name="twitter:description" content="AppSumo promotes great products to help you in your career and life.">
    <meta name="twitter:image" content="{{TWITTER_IMG}}">
  {% block endblock %}

  {# Webmaster Tools #}
  <meta name="google-site verification" content="{{WEBMASTER_TOOLS}}">
  <meta name="msvalidate01" content="{{BING}}">

  <link rel="author" href="{{GPLUS_URL}}">
  
  {% block css %} 
    <!--build:css /css/styles.min.css-->
    <link rel="stylesheet" href="/css/styles.css">
    <!--endbuild-->
  {% endblock %}

  {% block headScripts %} 
    <!--build:js js/head.min.js -->
    <!--endbuild -->
  {% block endblock %}

</head>

<body>

  {% block content %} {% endblock %}

  {% block footerScripts %}
    <!--build:js /js/main.min.js-->
    <script src="/js/main.js"></script>
    <!--endbuild-->

    {# Google Analytics #}

  {% block endblock %}

</body>
</html>
