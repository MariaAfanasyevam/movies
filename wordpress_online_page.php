<?php
/* Template Name: Online Page */
get_header(); // Подключаем header.php
?>

<main class="online-page">
  <section class="hero">
    <h1><?php the_title(); ?></h1>
    <p><?php the_content(); ?></p>
  </section>

  <section class="stats">
    <?php
    $subscribers = get_post_meta(get_the_ID(), 'subscribers', true);
    $views = get_post_meta(get_the_ID(), 'views', true);
    ?>
    <ul>
      <li>Подписчики: <?php echo esc_html($subscribers); ?></li>
      <li>Просмотры: <?php echo esc_html($views); ?></li>
    </ul>
  </section>
</main>

<?php get_footer(); ?>

<!-- header.php -->
<!DOCTYPE html>
<html <?php language_attributes(); ?> >
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="site-header">
  <div class="container">
    <h1><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></h1>
    <nav class="main-nav">
      <?php wp_nav_menu(['theme_location' => 'primary']); ?>
    </nav>
  </div>
</header>

<!-- footer.php -->
<footer class="site-footer">
  <div class="container">
    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>

<!-- functions.php -->
<?php
function theme_enqueue_assets() {
    wp_enqueue_style('theme-style', get_stylesheet_uri());
    wp_enqueue_script('theme-script', get_template_directory_uri() . '/js/main.js', [], false, true);
}
add_action('wp_enqueue_scripts', 'theme_enqueue_assets');

function theme_setup() {
    register_nav_menus([
        'primary' => __('Primary Menu', 'theme-textdomain'),
    ]);
}
add_action('after_setup_theme', 'theme_setup');

function add_custom_meta_boxes() {
    add_meta_box('online_stats', 'Статистика онлайн', 'render_online_stats', 'page', 'normal', 'high');
}
add_action('add_meta_boxes', 'add_custom_meta_boxes');

function render_online_stats($post) {
    $subscribers = get_post_meta($post->ID, 'subscribers', true);
    $views = get_post_meta($post->ID, 'views', true);
    ?>
    <label>Подписчики: <input type="text" name="subscribers" value="<?php echo esc_attr($subscribers); ?>"></label>
    <label>Просмотры: <input type="text" name="views" value="<?php echo esc_attr($views); ?>"></label>
    <?php
}

function save_online_stats($post_id) {
    if (isset($_POST['subscribers'])) {
        update_post_meta($post_id, 'subscribers', sanitize_text_field($_POST['subscribers']));
    }
    if (isset($_POST['views'])) {
        update_post_meta($post_id, 'views', sanitize_text_field($_POST['views']));
    }
}
add_action('save_post', 'save_online_stats');
