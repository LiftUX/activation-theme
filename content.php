<?php
/**
 * The template part for displaying general content.
 *
 * @link https://developer.wordpress.org/themes/template-files-section/partial-and-miscellaneous-template-files/#content-slug-php
 *
 * @package Activation
 */
?>
<article id="post-<?php the_ID() ?>" <?php post_class() ?>>

	<?php get_template_part( 'templates/parts/loop/post', 'thumbnail' ) ?>

	<?php if ( is_single() ) : ?>

		<?php get_template_part( 'templates/parts/loop/post', 'author' ) ?>

	<?php endif; ?>

	<div class="article-wrapper">

		<?php get_template_part( 'templates/parts/loop/post', 'title' ) ?>

		<?php if ( is_single() ) : ?>

			<?php get_template_part( 'templates/parts/loop/post', 'meta' ) ?>

			<?php get_template_part( 'templates/parts/loop/post', 'content' ) ?>

		<?php else : ?>

			<?php get_template_part( 'templates/parts/loop/post', 'excerpt' ) ?>

		<?php endif; ?>

		<?php get_template_part( 'templates/parts/loop/post', 'footer' ) ?>

	</div>

</article><!-- #post-## -->
