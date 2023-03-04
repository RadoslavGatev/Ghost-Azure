// ---------------------------------------------
// ---------------------------------------------
//
// WARNING!!
//
// THIS FILE IS DEPRECATED. PLEASE ALSO MAKE IDENTICAL CHANGES IN THE EMAIL-SERVICE PACKAGE -> email-templates/template.hbs
//
// WARNING!!
//
// ---------------------------------------------
// ---------------------------------------------

const {escapeHtml: escape} = require('@tryghost/string');
const feedbackButtons = require('./feedback-buttons');

/* eslint indent: warn, no-irregular-whitespace: warn */
const iff = (cond, yes, no) => (cond ? yes : no);

/**
 * @template {Object.<string, any>} Input
 * @param {Input} obj
 * @param {string[]} [keys]
 * @returns {Input}
 */
const sanitizeKeys = (obj, keys) => {
    const sanitized = Object.assign({}, obj);
    const keysToSanitize = keys || Object.keys(obj);

    for (const key of keysToSanitize) {
        if (typeof sanitized[key] === 'string') {
            // @ts-ignore
            sanitized[key] = escape(sanitized[key]);
        }
    }

    return sanitized;
};

module.exports = ({post, site, newsletter, templateSettings}) => {
    const date = new Date();
    const hasFeatureImageCaption = templateSettings.showFeatureImage && post.feature_image && post.feature_image_caption;
    const cleanPost = sanitizeKeys(post, ['url', 'published_at', 'title', 'excerpt', 'authors', 'feature_image', 'feature_image_alt']);
    const cleanSite = sanitizeKeys(site, ['title']);
    const cleanNewsletter = sanitizeKeys(newsletter, ['name']);

    return `<!doctype html>
<html>

<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<title>${cleanPost.title}</title>
<style>
/* -------------------------------------
    GLOBAL RESETS
------------------------------------- */

/*All the styling goes here*/

img {
    border: none;
    -ms-interpolation-mode: bicubic;
    max-width: 100%;
}

body {
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    -webkit-font-smoothing: antialiased;
    font-size: 18px;
    line-height: 1.4;
    margin: 0;
    padding: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    color: #15212A;
}

table {
    border-collapse: separate;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    width: 100%;
}

table td {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 18px;
    vertical-align: top;
    color: #15212A;
}

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */
.body {
    background-color: #fff;
    width: 100%;
}

/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
.container {
    display: block;
    margin: 0 auto !important;
    /* makes it centered */
    max-width: 600px;
}

/* This should also be a block element, so that it will fill 100% of the .container */
.content {
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    max-width: 600px;
}

.content a {
    overflow-wrap: anywhere;
}

/* -------------------------------------
    POST CONTENT
------------------------------------- */
hr {
    position: relative;
    display: block;
    width: 100%;
    margin: 3em 0;
    padding: 0;
    height: 1px;
    border: 0;
    border-top: 1px solid #e5eff5;
}

p,
ul,
ol,
dl,
blockquote {
    margin: 0 0 1.5em 0;
    line-height: 1.6em;
}

ol,
ul {
    padding-left: 1.3em;
    padding-right: 1.5em;
}

ol ol,
ul ul,
ul ol,
ol ul {
    margin: 0.5em 0 1em;
}

ul {
    list-style: disc;
}

ol {
    list-style: decimal;
}

ul,
ol {
    max-width: 100%;
}

li {
    margin: 0.5em 0;
    padding-left: 0.3em;
    line-height: 1.6em;
}

dt {
    float: left;
    margin: 0 20px 0 0;
    width: 120px;
    color: #15212A;
    font-weight: 500;
    text-align: right;
}

dd {
    margin: 0 0 5px 0;
    text-align: left;
}

blockquote {
    margin: 2em 0 2em 0;
    padding: 0 25px 0 25px;
    border-left: ${templateSettings.accentColor || '#15212A'} 2px solid;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.6em;
    letter-spacing: -0.2px;
}

blockquote.kg-blockquote-alt {
    border-left: 0 none;
    padding: 0 50px 0 50px;
    text-align: center;
    font-size: 1.2em;
    font-style: italic;
    color: #999999;
}

blockquote p {
    margin: 0.8em 0;
    font-size: 1em;
}

blockquote small {
    display: inline-block;
    margin: 0.8em 0 0.8em 1.5em;
    font-size: 0.9em;
    opacity: 0.8;
}

blockquote cite {
    font-weight: bold;
}
blockquote cite a {
    font-weight: normal;
}

a {
    color: ${templateSettings.accentColor || '#15212A'};
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    line-height: 1.11em;
    font-weight: 700;
    text-rendering: optimizeLegibility;
}

h1 {
    margin: 1.5em 0 0.5em 0;
    font-size: 42px;
    font-weight: 700;
}

h2 {
    margin: 1.5em 0 0.5em 0;
    font-size: 32px;
}

h3 {
    margin: 1.5em 0 0.5em 0;
    font-size: 26px;
}

h4 {
    margin: 1.8em 0 0.5em 0;
    font-size: 21px;
    line-height: 1.2em;
}

h5 {
    margin: 2em 0 0.5em 0;
    font-size: 19px;
    line-height: 1.3em;
}

h6 {
    margin: 2em 0 0.5em 0;
    font-size: 19px;
    line-height: 1.3em;
    font-weight: 700;
}

h1 strong,
h2 strong,
h3 strong,
h4 strong,
h5 strong,
h6 strong {
    font-weight: 800;
}

strong {
    font-weight: 700;
}

figure {
    margin: 0 0 1.5em;
    padding: 0;
}

figcaption {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 14px;
    padding-top: 5px;
    line-height: 1.5em;
}

code {
    font-size: 0.9em;
}

pre {
    white-space: pre-wrap;
    overflow: auto;
    background: #15212A;
    padding: 15px;
    border-radius: 3px;
    line-height: 1.2em;
    color: #ffffff;
}

p code {
    background: #F2F7FA;
    word-break: break-all;
    padding: 1px 7px;
    border-radius: 3px;
}

figure blockquote p {
    font-size: 1em;
}

.header-image {
    padding-top: 16px;
}

.site-icon {
    padding-bottom: 10px;
    padding-top: 20px;
    text-align: center;
    border-radius: 3px;
}

.site-icon img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
}

.site-info {
    padding-top: 50px;
}

.site-info-bordered {
    padding-top: 50px;
    border-bottom: 1px solid #e5eff5;
}

.site-url {
    color: #15212A;
    font-size: 16px;
    letter-spacing: -0.1px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
}

.site-url-bottom-padding {
    padding-bottom: 50px;
}

.site-title {
    color: #15212A;
}

.site-subtitle {
    color: #8695a4;
    font-size: 14px;
    font-weight: 400;
    text-transform: none;
}

.post-title {
    padding-bottom: 10px;
    font-size: 42px;
    line-height: 1.1em;
    font-weight: 700;
    text-align: center;
}
.post-title-serif {
    font-family: Georgia, serif;
    letter-spacing: -0.01em;
}
.post-title-left {
    text-align: left;
}

.post-title-link {
    color: #15212A;
    display: block;
    text-align: center;
    margin-top: 50px;
}
.post-title-link-left {
    text-align: left;
}

.post-meta,
.view-online {
    padding-bottom: 50px;
    white-space: nowrap;
    color: #738a94;
    font-size: 13px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    text-align: center;
}
.post-meta-left {
    text-align: left;
}

.view-online {
    text-align: right;
}

.view-online-link {
    word-wrap: none;
    white-space: nowrap;
    color: #15212A;
}

.feature-image {
    padding-bottom: 30px;
    width: 100%;
}

.feature-image-with-caption {
    padding-bottom: 10px;
}

.feature-image-caption {
    width: 100%;
    padding-bottom: 30px;
    text-align: center;
    font-size: 13px;
    color: #738a94;
}

.post-content {
    max-width: 600px !important;
    font-family: Georgia, serif;
    font-size: 18px;
    line-height: 1.5em;
    color: #15212A;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5eff5;
}

.post-content-sans-serif {
    max-width: 600px !important;
    font-size: 17px;
    line-height: 1.5em;
    color: #15212A;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5eff5;
}

.post-content a,
.post-content-sans-serif a {
    color: ${templateSettings.accentColor || '#08121A'};
    text-decoration: underline;
}

a[data-flickr-embed] img {
    height: auto;
}

.kg-bookmark-card {
    width: 100%;
    background: #ffffff;
}

.kg-bookmark-card a {
    text-decoration: none;
}

.kg-card + .kg-bookmark-card {
    margin-top: 0;
}

.kg-image-card img {
    display: block;
    margin: 0 auto;
    width: auto;
    height: auto !important;
}

.kg-bookmark-container {
    display: flex;
    min-height: 148px;
    color: #15212A;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid #e5eff5;
}

.kg-bookmark-content {
    display: inline-block;
    width: 100%;
    padding: 20px;
}

.kg-bookmark-title {
    color: #15212A;
    font-size: 15px;
    line-height: 1.5em;
    font-weight: 600;
}

.kg-bookmark-description {
    display: -webkit-box;
    overflow-y: hidden;
    margin-top: 12px;
    max-height: 40px;
    color: #738a94;
    font-size: 13px;
    line-height: 1.5em;
    font-weight: 400;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.kg-bookmark-thumbnail {
    min-width: 140px;
    max-width: 180px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 0 2px 2px 0;
}

.kg-bookmark-thumbnail img {
    display: none;
}

.kg-bookmark-metadata {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 14px;
    color: #15212A;
    font-size: 13px;
    font-weight: 400;
}

.kg-bookmark-icon {
    margin-right: 8px;
    width: 22px;
    height: 22px;
}

.kg-bookmark-author {
    line-height: 1.5em;
}

.kg-bookmark-publisher {
    overflow: hidden;
    max-width: 240px;
    line-height: 1.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.kg-bookmark-publisher:before {
    content: "•";
    margin: 0 6px;
}

.kg-gallery-container {
    margin-top: -20px;
}

.kg-gallery-image img {
    width: 100% !important;
    height: auto !important;
    padding-top: 20px;
}

.kg-video-preview {
    background-color: #1d1f21;
    background-image: radial-gradient(circle at center, #5b5f66, #1d1f21);
    display: block;
    text-decoration: none !important;
}

.kg-video-preview table {
    background-size: cover;
    min-height: 200px; /* for when images aren't loaded */
}

.kg-video-play-button {
    height: 2em;
    width: 3em;
    margin: 0 auto;
    border-radius: 10px;
    padding: 1em 0.8em 0.6em 1em;
    font-size: 1em; /* change this to resize */
    background-color: rgba(0,0,0,0.85);
}

.kg-video-play-button div {
    display: block;
    width: 0;
    height: 0;
    margin: 0 auto;
    line-height: 0px; /* fix for Yahoo Mail */
    border-color: transparent transparent transparent white;
    border-style: solid;
    border-width: 0.8em 0 0.8em 1.5em;
}

.kg-nft-link {
    display: block;
    text-decoration: none !important;
    color: #15212A !important;
    font-family: inherit !important;
    font-size: 14px;
    line-height: 1.3em;
    padding-top: 4px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 4px;
}

.kg-twitter-link {
    display: block;
    text-decoration: none !important;
    color: #15212A !important;
    font-family: inherit !important;
    font-size: 15px;
    padding: 8px;
    line-height: 1.3em;
}

.kg-audio-thumbnail.placeholder {
    background: ${templateSettings.accentColor || '#15212A'} !important;
}

.kg-callout-card {
    display: flex;
    margin: 0 0 1.5em 0;
    padding: 20px 28px;
    border-radius: 3px;
}

.kg-callout-card p {
    margin: 0
}

.kg-callout-card-grey {
    background: #eef0f2;
}

.kg-callout-card-white {
    background: #fff;
    box-shadow: inset 0 0 0 1px #dddedf;
}

.kg-callout-card-blue {
    background: #E9F6FB;
}

.kg-callout-card-green {
    background: #E8F8EA;
}

.kg-callout-card-yellow {
    background: #FCF4E3;
}

.kg-callout-card-red {
    background: #FBE9E9;
}

.kg-callout-card-pink {
    background: #FCEEF8;
}

.kg-callout-card-purple {
    background: #F2EDFC;
}

.kg-callout-card-accent {
    background: ${templateSettings.accentColor || '#15212A'};
    color: #fff;
}

.kg-callout-card-accent a {
    color: #fff;
}

.kg-callout-emoji {
    padding-right: 12px;
    font-size: 20px;
}

.kg-header-card {
    margin: 0 0 1.5em 0;
    padding: 110px 35px 110px 35px;
    text-align: center;
}

.kg-header-card.kg-size-small {
    padding-top: 75px;
    padding-bottom: 75px;
}

.kg-header-card.kg-size-large {
    padding-top: 140px;
    padding-bottom: 140px;
}

.kg-header-card.kg-align-left {
    text-align: left;
}

.kg-header-card.kg-style-dark {
    background: #15171a;
    color: #ffffff;
}

.kg-header-card.kg-style-light {
    background-color: #F9F9FA;
}

.kg-header-card.kg-style-accent {
    background: ${templateSettings.accentColor || '#15171a'};
    color: #ffffff;
}

.kg-header-card.kg-style-image {
    background-color: #e7e7eb;
    background-size: cover;
    background-position: center center;
    color: #ffffff;
}

.kg-header-card h2 {
    font-size: 3em;
    font-weight: 700;
    line-height: 1.1em;
    margin: 0 0 0.125em;
}

.kg-header-card h2 strong {
    font-weight: 800;
}

.kg-header-card.kg-size-small h2 {
    font-size: 2.5em;
}

.kg-header-card.kg-size-large h2 {
    font-size: 3.5em;
}

.kg-header-card h3 {
    font-size: 1.125em;
    font-weight: 500;
    line-height: 1.3em;
    margin: 0;
}

.kg-header-card h3 strong {
    font-weight: 700;
}

.kg-header-card.kg-size-large h3 {
    font-size: 1.25em;
}

.kg-header-card.kg-size-small h3 {
    font-size: 1em;
}

.kg-header-card-button {
    margin-top: 1.75em;
    background: #ffffff;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 8px 16px;
    text-decoration: none !important;
    color: #15171A !important;
}

.kg-size-large .kg-header-card-button {
    margin-top: 2em;
}

.kg-size-small .kg-header-card-button {
    margin-top: 1.5em;
}

.kg-style-light .kg-header-card-button {
    background: ${templateSettings.accentColor || '#15212A'} !important;
    color: #ffffff !important;
}


/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
    background: #ffffff;
    border-radius: 3px;
    width: 100%;
}

.wrapper {
    box-sizing: border-box;
    padding: 0 20px;
}

.content-block {
    padding-bottom: 10px;
    padding-top: 10px;
}

.footer {
    color: #738a94;
    margin-top: 20px;
    text-align: center;
    font-size: 13px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    line-height: 1.5em;
}

.footer a {
    color: #738a94;
    text-decoration: underline;
}

/* -------------------------------------
    BUTTONS
------------------------------------- */
.btn {
    box-sizing: border-box;
    width: 100%;
    display: table;
}

.btn>tbody>tr>td {
    padding-bottom: 15px;
}

.btn table {
    width: auto;
}

.btn table td {
    background-color: #ffffff;
    border-radius: 5px;
    text-align: center;
}

.btn a {
    background-color: #ffffff;
    border: solid 1px #3498db;
    border-radius: 5px;
    box-sizing: border-box;
    color: #3498db;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 12px 25px;
    text-decoration: none;
}

.btn-primary table td {
    background-color: #3498db;
}

.btn-primary a {
    background-color: #3498db;
    border-color: #3498db;
    color: #ffffff;
}

.btn-accent table td {
    background-color: ${templateSettings.adjustedAccentColor || '#3498db'};
}

.btn-accent a {
    background-color: ${templateSettings.adjustedAccentColor || '#3498db'};
    border-color: ${templateSettings.adjustedAccentColor || '#3498db'};
    color: ${templateSettings.adjustedAccentContrastColor || '#ffffff'};
}

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
    margin-bottom: 0;
}

.first {
    margin-top: 0;
}

.align-center {
    text-align: center;
}

.align-right {
    text-align: right;
}

.align-left {
    text-align: left;
}

.clear {
    clear: both;
}

.mt0 {
    margin-top: 0;
}

.mb0 {
    margin-bottom: 0;
}

.preheader {
    color: transparent;
    display: none;
    height: 0;
    max-height: 0;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    mso-hide: all;
    visibility: hidden;
    width: 0;
}

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 620px) {

    table.body {
        width: 100%;
        min-width: 100%;
    }

    table.body p,
    table.body ul,
    table.body ol,
    table.body td,
    table.body span {
        font-size: 16px !important;
    }

    table.body pre {
        white-space: pre-wrap !important;
        word-break: break-word !important;
    }

    table.body .wrapper,
    table.body .article {
        padding: 0 10px !important;
    }

    table.body .content {
        padding: 0 !important;
    }

    table.body .container {
        padding: 0 !important;
        width: 100% !important;
    }

    table.body .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
    }

    table.body .btn table {
        width: 100% !important;
    }

    table.body .btn a {
        width: 100% !important;
    }

    table.body .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
    }

    table.body .site-icon img {
        width: 40px !important;
        height: 40px !important;
    }

    table.body .site-url a {
        font-size: 14px !important;
        padding-bottom: 15px !important;
    }

    table.body .post-meta {
        white-space: normal !important;
        font-size: 12px !important;
        line-height: 1.5em;
    }

    table.body .view-online-link,
    table.body .footer,
    table.body .footer a {
        font-size: 12px !important;
    }

    table.body .post-title a {
        font-size: 32px !important;
        line-height: 1.15em !important;
    }

    table.body .kg-bookmark-card {
        width: 90vw;
    }

    table.body .kg-bookmark-thumbnail {
        display: none !important;
    }

    table.body .kg-bookmark-metadata span {
        font-size: 13px !important;
    }

    table.body .kg-embed-card {
        max-width: 90vw !important;
    }

    table.body h1 {
        font-size: 32px !important;
        line-height: 1.3em !important;
    }

    table.body h2 {
        font-size: 26px !important;
        line-height: 1.22em !important;
    }

    table.body h3 {
        font-size: 21px !important;
        line-height: 1.25em !important;
    }

    table.body h4 {
        font-size: 19px !important;
        line-height: 1.3em !important;
    }

    table.body h5 {
        font-size: 16px !important;
        line-height: 1.4em !important;
    }

    table.body h6 {
        font-size: 16px !important;
        line-height: 1.4em !important;
    }

    table.body blockquote {
        font-size: 17px;
        line-height: 1.6em;
        margin-bottom: 0;
        padding-left: 15px;
    }

    table.body blockquote.kg-blockquote-alt {
        border-left: 0 none !important;
        margin: 0 0 2.5em 0 !important;
        padding: 0 50px 0 50px !important;
        font-size: 1.2em;
    }

    table.body blockquote + * {
        margin-top: 1.5em !important;
    }

    table.body hr {
        margin: 2em 0 !important;
    }

    table.body figcaption,
    table.body figcaption a {
        font-size: 13px !important;
    }

}

/* -------------------------------------
    PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */
@media all {
    .ExternalClass {
        width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
    }

    .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
    }

    #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    .btn-primary table td:hover {
        background-color: #34495e !important;
    }

    .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important;
    }
}


${ templateSettings.showBadge ? `
.footer-powered {
    text-align: center;
    padding-top: 70px;
    padding-bottom: 40px;
}

.gh-powered {
    width: 142px;
    height: 30px;
}
` : ''}

</style>
</head>

<body>
    <span class="preheader">${ cleanPost.excerpt ? cleanPost.excerpt : `${cleanPost.title} – ` }</span>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">

        <!-- Outlook doesn't respect max-width so we need an extra centered table -->
        <!--[if mso]>
        <tr>
            <td>
                <center>
                    <table border="0" cellpadding="0" cellspacing="0" width="600">
        <![endif]-->

        <tr>
            <td>&nbsp;</td>
            <td class="container">
                <div class="content">
                    <!-- START CENTERED WHITE CONTAINER -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" width="100%">

                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                            <td class="wrapper">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    ${ templateSettings.headerImage ? `
                                    <tr>
                                        <td class="header-image" width="100%" align="center"><img src="${templateSettings.headerImage}"${templateSettings.headerImageWidth ? ` width="${templateSettings.headerImageWidth}"` : ''}></td>
                                    </tr>
                                    ` : ''}


                                    ${ templateSettings.showHeaderIcon || templateSettings.showHeaderTitle || templateSettings.showHeaderName ? `
                                    <tr>
                                        <td class="${templateSettings.showHeaderTitle ? `site-info-bordered` : `site-info`}" width="100%" align="center">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                ${ templateSettings.showHeaderIcon && cleanSite.iconUrl ? `
                                                <tr>
                                                    <td class="site-icon"><a href="${cleanSite.url}"><img src="${cleanSite.iconUrl}" alt="${cleanSite.title}" border="0"></a></td>
                                                </tr>
                                                ` : ``}
                                                ${ templateSettings.showHeaderTitle ? `
                                                <tr>
                                                    <td class="site-url ${!templateSettings.showHeaderName ? 'site-url-bottom-padding' : ''}"><div style="width: 100% !important;"><a href="${cleanSite.url}" class="site-title">${cleanSite.title}</a></div></td>
                                                </tr>
                                                ` : ``}
                                                ${ templateSettings.showHeaderName && templateSettings.showHeaderTitle ? `
                                                <tr>
                                                    <td class="site-url site-url-bottom-padding"><div style="width: 100% !important;"><a href="${cleanSite.url}" class="site-subtitle">${cleanNewsletter.name}</a></div></td>
                                                </tr>
                                                ` : ``}
                                                ${ templateSettings.showHeaderName && !templateSettings.showHeaderTitle ? `
                                                <tr>
                                                    <td class="site-url site-url-bottom-padding"><div style="width: 100% !important;"><a href="${cleanSite.url}" class="site-title">${cleanNewsletter.name}</a></div></td>
                                                </tr>
                                                ` : ``}

                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}


                                    <tr>
                                        <td class="post-title ${templateSettings.titleFontCategory === 'serif' ? `post-title-serif` : `` } ${templateSettings.titleAlignment === 'left' ? `post-title-left` : ``}">
                                            <a href="${cleanPost.url}" class="post-title-link ${templateSettings.titleAlignment === 'left' ? `post-title-link-left` : ``}">${cleanPost.title}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td class="post-meta ${templateSettings.titleAlignment === 'left' ? `post-meta-left` : ``}">
                                                        By ${cleanPost.authors} –
                                                        ${cleanPost.published_at} –
                                                        <a href="${cleanPost.url}" class="view-online-link">View online →</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ${ templateSettings.showFeatureImage && cleanPost.feature_image ? `
                                    <tr>
                                        <td class="feature-image ${hasFeatureImageCaption ? 'feature-image-with-caption' : ''}"><img src="${cleanPost.feature_image}"${cleanPost.feature_image_width ? ` width="${cleanPost.feature_image_width}"` : ''}${cleanPost.feature_image_alt ? ` alt="${cleanPost.feature_image_alt}"` : ''}></td>
                                    </tr>
                                    ` : ``}
                                    ${ hasFeatureImageCaption ? `
                                    <tr>
                                        <td class="feature-image-caption" align="center">${cleanPost.feature_image_caption}</td>
                                    </tr>
                                    ` : ``}
                                    <tr>
                                        <td class="${(templateSettings.bodyFontCategory === 'sans_serif') ? `post-content-sans-serif` : `post-content` }">
                                            <!-- POST CONTENT START -->
                                            ${cleanPost.html}
                                            <!-- POST CONTENT END -->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- END MAIN CONTENT AREA -->

                        ${iff(templateSettings.feedbackEnabled, feedbackButtons.getTemplate(), '')}

                        <tr>
                            <td class="wrapper" align="center">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 40px; padding-bottom: 30px;">
                                    ${iff(!!templateSettings.footerContent, `<tr><td class="footer">${templateSettings.footerContent}</td></tr>`, '')}
                                    <tr>
                                        <td class="footer">${cleanSite.title} &copy; ${date.getFullYear()} – <a href="%recipient.unsubscribe_url%">Unsubscribe</a></td>
                                    </tr>

                                    ${ templateSettings.showBadge ? `
                                    <tr>
                                        <td class="footer-powered"><a href="https://ghost.org/"><img src="https://static.ghost.org/v4.0.0/images/powered.png" border="0" width="142" height="30" class="gh-powered" alt="Powered by Ghost"></a></td>
                                    </tr>
                                    ` : '' }
                                </table>
                            </td>
                        </tr>

                    </table>
                    <!-- END CENTERED WHITE CONTAINER -->
                </div>
            </td>
            <td>&nbsp;</td>
        </tr>

    <!--[if mso]>
                    </table>
                </center>
            </td>
        </tr>
    <![endif]-->

    </table>
</body>

</html>`;
};
