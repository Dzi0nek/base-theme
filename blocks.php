<?php
 // Register a new block.
      $banner = array(
        'name'            => 'banner',
        'title'           => __( 'Banner', 'mpc' ),
        'description'     => __( 'A custom banner.', 'mpc' ),
        'render_callback' => 'block_render_callback',
        'category'        => 'mpc-blocks',
        'icon'            => 'money',
        'keywords'        => array( 'banner' ),
      );
    $textimage = array(
      'name'            => 'textimage',
      'title'           => __( 'Text with image', 'mpc' ),
      'description'     => __( 'A custom text with image.', 'mpc' ),
    'render_callback' => 'block_render_callback',
      'category'        => 'mpc-blocks',
      'icon'            => 'table-col-before',
      'keywords'        => array( 'text image' ),
    );
    $reviews = array (
      'name'            => 'reviews',
      'title'           => __( 'Reviews', 'mpc' ),
      'description'     => __( 'Grab reviews from posts.', 'mpc' ),
    'render_callback' => 'block_render_callback',
      'category'        => 'mpc-blocks',
      'icon'            => 'table-col-before',
      'keywords'        => array( 'text image' ),
    );

  
  $blocks = [
    $banner,
    $textimage,
    $reviews
  ];
  return $blocks;