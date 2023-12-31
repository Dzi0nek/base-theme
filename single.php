<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context         = Timber::context();
$timber_post     = Timber::get_post();
$context['post'] = $timber_post;
$context['post_tag'] = get_the_tags($timber_post);

// Get all long articles, but only their IDs
$articles = get_posts(array(
	'post_type' => 'post',
	'post_status' => 'publish',
	'orderby' => 'date',
	'order' => 'DESC',
	'has_password' => FALSE,
	'fields' => 'ids', // Only get post IDs
	'posts_per_page' => -1
  ));
  
  // Get the current index in the array of long article IDs
  $current_index = array_search($post->ID, $articles);
  
  // Get the previous post if it exists
  if (isset($articles[$current_index - 1])) {
	$context['previous_post'] = Timber::get_post($articles[$current_index - 1]);
  }
  
  // Get the next post if it exists
  if (isset($articles[$current_index + 1])) {
	$context['next_post'] = Timber::get_post($articles[$current_index + 1]);
  }

if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $timber_post->ID . '.twig', 'single-' . $timber_post->post_type . '.twig', 'single-' . $timber_post->slug . '.twig', 'single.twig' ), $context );
}