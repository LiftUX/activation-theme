<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package Activation
 */
?>

		</div><!-- #content -->

		<?php do_action( 'primer_before_footer' ) ?>

		<footer id="colophon" class="site-footer" role="contentinfo">

			<div class="site-footer-widget-area">

				<div class="site-footer-inner">

					<?php get_sidebar( 'sidebar-footer' ); ?>

				</div>

			</div>

			<div class="site-footer-inner">

				<?php do_action( 'primer_footer' ) ?>

			</div><!-- .site-footer-inner -->

		</footer><!-- #colophon -->

		<?php do_action( 'primer_after_footer' ) ?>

	</div><!-- #page -->

	<?php wp_footer() ?>

</body>

</html>
