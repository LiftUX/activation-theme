<?php
/**
 * Displays the primary navigation.
 *
 * @package Primer
 */
?>

<div class="main-navigation-container">

	<nav id="site-navigation" class="main-navigation" role="navigation">

		<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ) ?>

		<?php get_search_form(); ?>

	</nav><!-- #site-navigation -->

</div>
