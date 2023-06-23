<?php

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['reviews'] = Timber::get_terms('reviews', array('parent' => 0));

$args = array(
'numberposts' => -1,
'post_type' => 'review'
);
$context['reviews'] = Timber::get_posts($args);
Timber::render( $templates, $context );