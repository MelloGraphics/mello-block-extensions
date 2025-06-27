<?php

add_filter('render_block', function($block_content, $block) {
    // Only modify core/button blocks with icon enabled
    if ($block['blockName'] !== 'core/button' || !isset($block['attrs']['iconEnabled']) || !$block['attrs']['iconEnabled']) {
        return $block_content;
    }

    $iconType = isset($block['attrs']['iconType']) ? $block['attrs']['iconType'] : 'none';
    $iconGlyph = isset($block['attrs']['iconGlyph']) ? $block['attrs']['iconGlyph'] : '';
    $iconImageURL = isset($block['attrs']['iconImageURL']) ? $block['attrs']['iconImageURL'] : '';
    
    // Parse the existing button content to extract text and attributes
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML('<?xml encoding="UTF-8">' . $block_content);
    libxml_clear_errors();
    
    $xpath = new DOMXPath($dom);
    $buttonDiv = $xpath->query('//div[contains(@class, "wp-block-button")]')->item(0);
    $buttonLink = $xpath->query('//a[contains(@class, "wp-block-button__link")]')->item(0);
    
    if (!$buttonDiv || !$buttonLink) {
        return $block_content;
    }
    
    // Get the button text
    $buttonText = $buttonLink->textContent;
    
    // Get existing classes and attributes
    $divClasses = $buttonDiv->getAttribute('class');
    $divStyle = $buttonDiv->getAttribute('style');
    $linkClasses = $buttonLink->getAttribute('class');
    $linkHref = $buttonLink->getAttribute('href');
    $linkTarget = $buttonLink->getAttribute('target');
    $linkRel = $buttonLink->getAttribute('rel');
    
    // Build the icon HTML
    $iconHtml = '';
    if ($iconType === 'fa' && !empty($iconGlyph)) {
        // Handle Font Awesome glyph - can be unicode (\f238) or CSS content
        $glyphContent = $iconGlyph;
        if (strpos($iconGlyph, '\\f') === 0) {
            // Convert \f238 format to actual unicode character
            $glyphContent = json_decode('"' . $iconGlyph . '"');
        }
        $iconHtml = '<span class="mello-button-icon__fa-icon" aria-hidden="true" style="font-family: FontAwesome;">' . $glyphContent . '</span>';
    } elseif ($iconType === 'image' && !empty($iconImageURL)) {
        $iconHtml = '<img class="mello-button-icon__img-icon" src="' . esc_url($iconImageURL) . '" aria-hidden="true" />';
    }
    
    // Build the new structure
    $newContent = '<div class="' . esc_attr($divClasses) . '"';
    if (!empty($divStyle)) {
        $newContent .= ' style="' . esc_attr($divStyle) . '"';
    }
    $newContent .= '>';
    
    $newContent .= '<a class="' . esc_attr($linkClasses) . '"';
    if (!empty($linkHref)) {
        $newContent .= ' href="' . esc_url($linkHref) . '"';
    }
    if (!empty($linkTarget)) {
        $newContent .= ' target="' . esc_attr($linkTarget) . '"';
    }
    if (!empty($linkRel)) {
        $newContent .= ' rel="' . esc_attr($linkRel) . '"';
    }
    $newContent .= '>';
    
    if (!empty($iconHtml)) {
        $newContent .= '<span class="mello-button-icon__wrapper">' . $iconHtml . '</span>';
    }
    
    $newContent .= '<span class="mello-button-icon__button-text">' . esc_html($buttonText) . '</span>';
    $newContent .= '</a></div>';
    
    return $newContent;
}, 10, 2);