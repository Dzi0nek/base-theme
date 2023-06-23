<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

$templates = array('archive.twig', 'index.twig');
$context = Timber::context();

$context['title'] = 'Archive';
$context['posts'] = $posts;
if (is_day()) {
	$context['title'] = 'Archive: ' . get_the_date('D M Y');
} else if (is_month()) {
	$context['title'] = 'Archive: ' . get_the_date('M Y');
} else if (is_year()) {
	$context['title'] = 'Archive: ' . get_the_date('Y');
} else if (is_tag()) {
	$context['title'] = single_tag_title('', false);
	$context['post_tag'] = get_the_category($post);
	$term = get_queried_object('cat');
	$context['tag'] = new Timber\Term();
	$context['title_tag'] = get_field('title_tag', $term);
} else if (is_category()) {
	$context['title'] = single_cat_title('', false);
	$context['description'] = category_description('', false);
	$context['category'] = get_category(get_query_var('cat'), false);

	$categories = get_categories(array(
		'hide_empty' => '0',
		'exclude'    => '1',
		'orderby'    => 'id',
		'order'      => 'ASC',
		'parent'  => $child->cat_ID,
	));
	$context['categories'] = $categories;
	if (is_single()) {
		$cats =  get_the_category();
		$cat = $cats[0];
	
	
	} else {
		$cat = get_category(get_query_var('cat'));
	}
	$cat_slug = $cat->slug;
	$parent = $cat->parent;

	array_unshift($templates, 'archive-' . $cat_slug . '.twig');
}
$context['posts'] = new Timber\PostQuery();

Timber::render($templates, $context);

