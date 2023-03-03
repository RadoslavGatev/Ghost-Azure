const _ = require('lodash');
const oneLineTrim = require('common-tags/lib/oneLineTrim');
const previousSpec = require('./v4');
const ghostVersions = require('../utils').versions;
const docsBaseUrl = `https://ghost.org/docs/api/handlebars-themes/`;
const prevDocsBaseUrl = `https://themes.ghost.org/v${ghostVersions.canary.docs}/docs/`;
const prevDocsBaseUrlRegEx = new RegExp(prevDocsBaseUrl, 'g');

const previousKnownHelpers = previousSpec.knownHelpers;
const previousTemplates = previousSpec.templates;
const previousRules = previousSpec.rules;

// assign new or overwrite existing knownHelpers, templates, or rules here:
let knownHelpers = [];
let templates = [];
let rules = {
    // New rules
    'GS010-PJ-GHOST-API-PRESENT': {
        level: 'error',
        rule: '<code>package.json</code> property <code>"engines.ghost-api"</code> is not supported.',
        details: oneLineTrim`Remove <code>"ghost-api"</code> from your <code>package.json</code>.<br>
        The <code>ghost-api</code> is not supported starting Ghost v5 and should not be used.
        Check the <a href="${docsBaseUrl}packagejson/" target=_blank><code>package.json</code> documentation</a> for further information.`
    },
    'GS090-NO-AUTHOR-HELPER-IN-POST-CONTEXT': {
        level: 'error',
        fatal: true,
        rule: 'The <code>{{author}}</code> helper should be replaces with <code>{{authors}}</code>',
        details: oneLineTrim`The <code>{{author}}</code> helper has been deprecated since Ghost 1.22.0 in favor of <code>{{<authors>}}</code><br>
        The <code>{{author}}</code> helper was removed in Ghost v5 and should not be used.
        Find more information about the <code>@site</code> property <a href="${docsBaseUrl}helpers/site/" target=_blank>here</a>.`,
        helper: '{{author}}'
    },

    // Updated v1 & v2 rules
    'GS001-DEPR-BLOG': {
        level: 'error',
        fatal: true,
        rule: 'The <code>{{@blog}}</code> helper should be replaced with <code>{{@site}}</code>',
        details: oneLineTrim`With the introduction of the Content API <code>{{@blog}}</code> became deprecated in favour of <code>{{@site}}</code>.<br>
        The <code>{{@blog}}</code> helper was removed in Ghost v5 and should not be used.
        Find more information about the <code>@site</code> property <a href="${docsBaseUrl}helpers/site/" target=_blank>here</a>.`,
        regex: /{{\s*?@blog\.[a-zA-Z0-9_]+\s*?}}/g,
        helper: '{{@blog}}'
    },
    'GS001-DEPR-AUTH-ID': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.id}}</code> helper with <code>{{primary_author.id}}</code> or <code>{{authors.[#].id}}</code>',
        details: oneLineTrim`The usage of <code>{{author.id}}</code> is deprecated and should be replaced with either <code>{{primary_author.id}}</code>
        or <code>{{authors.[#].id}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.id\s*?}}/g,
        helper: '{{author.id}}'
    },
    'GS001-DEPR-AUTH-SLUG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.slug}}</code> helper with <code>{{primary_author.slug}}</code> or <code>{{authors.[#].slug}}</code>',
        details: oneLineTrim`The usage of <code>{{author.slug}}</code> is deprecated and should be replaced with either <code>{{primary_author.slug}}</code>
        or <code>{{authors.[#].slug}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.slug\s*?}}/g,
        helper: '{{author.slug}}'
    },
    'GS001-DEPR-AUTH-MAIL': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.email}}</code> helper with <code>{{primary_author.email}}</code> or <code>{{authors.[#].email}}</code>',
        details: oneLineTrim`The usage of <code>{{author.email}}</code> is deprecated and should be replaced with either <code>{{primary_author.email}}</code>
        or <code>{{authors.[#].email}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.email\s*?}}/g,
        helper: '{{author.email}}'
    },
    'GS001-DEPR-AUTH-MT': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.meta_title}}</code> helper with <code>{{primary_author.meta_title}}</code> or <code>{{authors.[#].meta_title}}</code>',
        details: oneLineTrim`The usage of <code>{{author.meta_title}}</code> is deprecated and should be replaced with either <code>{{primary_author.meta_title}}</code>
        or <code>{{authors.[#].meta_title}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.meta_title\s*?}}/g,
        helper: '{{author.meta_title}}'
    },
    'GS001-DEPR-AUTH-MD': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.meta_description}}</code> helper with <code>{{primary_author.meta_description}}</code> or <code>{{authors.[#].meta_description}}</code>',
        details: oneLineTrim`The usage of <code>{{author.meta_description}}</code> is deprecated and should be replaced with either <code>{{primary_author.meta_description}}</code>
        or <code>{{authors.[#].meta_description}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.meta_description\s*?}}/g,
        helper: '{{author.meta_description}}'
    },
    'GS001-DEPR-AUTH-NAME': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.name}}</code> helper with <code>{{primary_author.name}}</code> or <code>{{authors.[#].name}}</code>',
        details: oneLineTrim`The usage of <code>{{author.name}}</code> is deprecated and should be replaced with either <code>{{primary_author.name}}</code>
        or <code>{{authors.[#].name}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.name\s*?}}/g,
        helper: '{{author.name}}'
    },
    'GS001-DEPR-AUTH-BIO': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.bio}}</code> helper with <code>{{primary_author.bio}}</code> or <code>{{authors.[#].bio}}</code>',
        details: oneLineTrim`The usage of <code>{{author.bio}}</code> is deprecated and should be replaced with either <code>{{primary_author.bio}}</code>
        or <code>{{authors.[#].bio}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.bio\s*?}}/g,
        helper: '{{author.bio}}'
    },
    'GS001-DEPR-AUTH-LOC': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.location}}</code> helper with <code>{{primary_author.location}}</code> or <code>{{authors.[#].location}}</code>',
        details: oneLineTrim`The usage of <code>{{author.location}}</code> is deprecated and should be replaced with either <code>{{primary_author.location}}</code>
        or <code>{{authors.[#].location}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.location\s*?}}/g,
        helper: '{{author.location}}'
    },
    'GS001-DEPR-AUTH-WEB': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.website}}</code> helper with <code>{{primary_author.website}}</code> or <code>{{authors.[#].website}}</code>',
        details: oneLineTrim`The usage of <code>{{author.website}}</code> is deprecated and should be replaced with either <code>{{primary_author.website}}</code>
        or <code>{{authors.[#].website}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.website\s*?}}/g,
        helper: '{{author.website}}'
    },
    'GS001-DEPR-AUTH-TW': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.twitter}}</code> helper with <code>{{primary_author.twitter}}</code> or <code>{{authors.[#].twitter}}</code>',
        details: oneLineTrim`The usage of <code>{{author.twitter}}</code> is deprecated and should be replaced with either <code>{{primary_author.twitter}}</code>
        or <code>{{authors.[#].twitter}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.twitter\s*?}}/g,
        helper: '{{author.twitter}}'
    },
    'GS001-DEPR-AUTH-FB': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.facebook}}</code> helper with <code>{{primary_author.facebook}}</code> or <code>{{authors.[#].facebook}}</code>',
        details: oneLineTrim`The usage of <code>{{author.facebook}}</code> is deprecated and should be replaced with either <code>{{primary_author.facebook}}</code>
        or <code>{{authors.[#].facebook}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.facebook\s*?}}/g,
        helper: '{{author.facebook}}'
    },
    'GS001-DEPR-AUTH-PIMG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.profile_image}}</code> helper with <code>{{primary_author.profile_image}}</code> or <code>{{authors.[#].profile_image}}</code>',
        details: oneLineTrim`The usage of <code>{{author.profile_image}}</code> is deprecated and should be replaced with either <code>{{primary_author.profile_image}}</code>
        or <code>{{authors.[#].profile_image}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.profile_image\s*?}}/g,
        helper: '{{author.profile_image}}'
    },
    'GS001-DEPR-AUTH-CIMG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.cover_image}}</code> helper with <code>{{primary_author.cover_image}}</code> or <code>{{authors.[#].cover_image}}</code>',
        details: oneLineTrim`The usage of <code>{{author.cover_image}}</code> is deprecated and should be replaced with either <code>{{primary_author.cover_image}}</code>
        or <code>{{authors.[#].cover_image}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.cover_image\s*?}}/g,
        helper: '{{author.cover_image}}'
    },
    'GS001-DEPR-AUTH-URL': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.url}}</code> helper with <code>{{primary_author.url}}</code> or <code>{{authors.[#].url}}</code>',
        details: oneLineTrim`The usage of <code>{{author.url}}</code> is deprecated and should be replaced with either <code>{{primary_author.url}}</code>
        or <code>{{authors.[#].url}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?author\.url\s*?}}/g,
        helper: '{{author.url}}'
    },
    'GS001-DEPR-PAUTH': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author}}</code> helper with <code>{{post.primary_author}}</code> or <code>{{authors.[#]}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author}}</code> is deprecated and should be replaced with either <code>{{post.primary_author}}</code>
        or <code>{{post.authors.[#]}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\s*?}}/g,
        helper: '{{post.author}}'
    },
    'GS001-DEPR-PAUTH-ID': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.id}}</code> helper with <code>{{post.primary_author.id}}</code> or <code>{{authors.[#].id}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.id}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.id}}</code>
        or <code>{{post.authors.[#].id}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.id\s*?}}/g,
        helper: '{{post.author.id}}'
    },
    'GS001-DEPR-PAUTH-SLUG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.slug}}</code> helper with <code>{{post.primary_author.slug}}</code> or <code>{{post.authors.[#].slug}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.slug}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.slug}}</code>
        or <code>{{post.authors.[#].slug}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.slug\s*?}}/g,
        helper: '{{post.author.slug}}'
    },
    'GS001-DEPR-PAUTH-MAIL': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.email}}</code> helper with <code>{{post.primary_author.email}}</code> or <code>{{post.authors.[#].email}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.email}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.email}}</code>
        or <code>{{post.authors.[#].email}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.email\s*?}}/g,
        helper: '{{post.author.email}}'
    },
    'GS001-DEPR-PAUTH-MT': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.meta_title}}</code> helper with <code>{{post.primary_author.meta_title}}</code> or <code>{{post.authors.[#].meta_title}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.meta_title}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.meta_title}}</code>
        or <code>{{post.authors.[#].meta_title}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.meta_title\s*?}}/g,
        helper: '{{post.author.meta_title}}'
    },
    'GS001-DEPR-PAUTH-MD': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.meta_description}}</code> helper with <code>{{post.primary_author.meta_description}}</code> or <code>{{post.authors.[#].meta_description}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.meta_description}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.meta_description}}</code>
        or <code>{{post.authors.[#].meta_description}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.meta_description\s*?}}/g,
        helper: '{{post.author.meta_description}}'
    },
    'GS001-DEPR-PAUTH-NAME': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.name}}</code> helper with <code>{{post.primary_author.name}}</code> or <code>{{post.authors.[#].name}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.name}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.name}}</code>
        or <code>{{post.authors.[#].name}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.name\s*?}}/g,
        helper: '{{post.author.name}}'
    },
    'GS001-DEPR-PAUTH-BIO': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.bio}}</code> helper with <code>{{post.primary_author.bio}}</code> or <code>{{post.authors.[#].bio}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.bio}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.bio}}</code>
        or <code>{{post.authors.[#].bio}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.bio\s*?}}/g,
        helper: '{{post.author.bio}}'
    },
    'GS001-DEPR-PAUTH-LOC': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.location}}</code> helper with <code>{{post.primary_author.location}}</code> or <code>{{post.authors.[#].location}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.location}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.location}}</code>
        or <code>{{post.authors.[#].location}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.location\s*?}}/g,
        helper: '{{post.author.location}}'
    },
    'GS001-DEPR-PAUTH-WEB': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.website}}</code> helper with <code>{{post.primary_author.website}}</code> or <code>{{post.authors.[#].website}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.website}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.website}}</code>
        or <code>{{post.authors.[#].website}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.website\s*?}}/g,
        helper: '{{post.author.website}}'
    },
    'GS001-DEPR-PAUTH-TW': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.twitter}}</code> helper with <code>{{post.primary_author.twitter}}</code> or <code>{{post.authors.[#].twitter}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.twitter}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.twitter}}</code>
        or <code>{{post.authors.[#].twitter}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.twitter\s*?}}/g,
        helper: '{{post.author.twitter}}'
    },
    'GS001-DEPR-PAUTH-FB': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.facebook}}</code> helper with <code>{{post.primary_author.facebook}}</code> or <code>{{post.authors.[#].facebook}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.facebook}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.facebook}}</code>
        or <code>{{post.authors.[#].facebook}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.facebook\s*?}}/g,
        helper: '{{post.author.facebook}}'
    },
    'GS001-DEPR-PAUTH-PIMG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.profile_image}}</code> helper with <code>{{post.primary_author.profile_image}}</code> or <code>{{post.authors.[#].profile_image}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.profile_image}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.profile_image}}</code>
        or <code>{{post.authors.[#].profile_image}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.profile_image\s*?}}/g,
        helper: '{{post.author.profile_image}}'
    },
    'GS001-DEPR-PAUTH-CIMG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.cover_image}}</code> helper with <code>{{post.primary_author.cover_image}}</code> or <code>{{post.authors.[#].cover_image}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.cover_image}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.cover_image}}</code>
        or <code>{{post.authors.[#].cover_image}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.cover_image\s*?}}/g,
        helper: '{{post.author.cover_image}}'
    },
    'GS001-DEPR-PAUTH-URL': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.url}}</code> helper with <code>{{post.primary_author.url}}</code> or <code>{{post.authors.[#].url}}</code>',
        details: oneLineTrim`The usage of <code>{{post.author.url}}</code> is deprecated and should be replaced with either <code>{{post.primary_author.url}}</code>
        or <code>{{post.authors.[#].url}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.url\s*?}}/g,
        helper: '{{post.author.url}}'
    },
    'GS001-DEPR-PAID': {
        level: 'error',
        fatal: true,
        rule: 'Replace <code>{{post.author_id}}</code> code with <code>{{post.primary_author.id}}</code>',
        details: oneLineTrim`The <code>{{post.author_id}}</code> attribute in post context was removed<br>
        Instead of <code>{{post.author_id}}</code> you need to use <code>{{post.primary_author.id}}</code>.<br>
        See the object attributes of <code>post</code> <a href="${docsBaseUrl}context/post/#post-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author_id\s*?}}/g,
        helper: '{{post.author_id}}'
    },
    'GS001-DEPR-NAUTH': {
        level: 'error',
        fatal: true,
        rule: 'Replace <code>../author</code> with <code>../primary_author</code> or <code>../authors.[#]</code>',
        details: oneLineTrim`The usage of <code>../author</code> is deprecated and should be replaced with either <code>../primary_author</code>
        or <code>../authors.[#]</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?(?:#|#if)?\s*?\.\.\/author(?:\.\S*?)?\s*?}}/g,
        helper: '{{../author}}'
    },
    'GS001-DEPR-IUA': {
        level: 'error',
        fatal: true,
        rule: 'Replace <code>{{img_url author.*}}</code> with <code>{{img_url primary_author.*}}</code> or <code>.{img_url author.[#].*}}</code>',
        details: oneLineTrim`The usage of <code>{{img_url author.*}}</code> is deprecated and should be replaced with either <code>{{img_url primary_author.*}}</code>
        or <code>{{img_url author.[#].*}}</code>.<br>
        Find more information about the <code>{{authors}}</code> helper <a href="${docsBaseUrl}helpers/authors/" target=_blank>here</a>.`,
        regex: /{{\s*?img_url\s*?(author.).*}}/g,
        helper: '{{img_url author.*}}'
    },
    'GS001-DEPR-AC': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.cover}}</code> helper with <code>{{primary_author.cover_image}}</code>',
        details: oneLineTrim`The <code>cover</code> attribute was replaced with <code>cover_image</code>.<br>
        Instead of <code>{{author.cover}}</code> you need to use
        <code>{{primary_author.cover_image}}</code> or <code>{{authors.[#].cover_image}}</code>.<br>
        See the object attributes of <code>author</code> <a href="${docsBaseUrl}context/author/#author-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?author\.cover\s*?}}/g,
        helper: '{{author.cover}}'
    },
    'GS001-DEPR-AIMG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{author.image}}</code> helper with <code>{{primary_author.profile_image}}</code> or <code>{{authors.[#].profile_image}}</code>',
        details: oneLineTrim`The <code>image</code> attribute was replaced with <code>profile_image</code>.<br>
        Instead of <code>{{author.image}}</code>, you need to use
        <code>{{primary_author.profile_image}}</code> or <code>{{authors.[#].profile_image}}</code>.<br>
        See the object attributes of <code>author</code> <a href="${docsBaseUrl}context/author/#author-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?author\.image\s*?}}/g,
        helper: '{{author.image}}'
    },
    'GS001-DEPR-PAC': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.cover}}</code> helper with <code>{{post.primary_author.cover_image}}</code> or <code>{{post.authors.[#].cover_image}}</code>',
        details: oneLineTrim`The <code>cover</code> attribute was replaced with <code>cover_image</code>.<br>
        Instead of <code>{{post.author.cover}}</code>, you need to use
        <code>{{post.primary_author.cover_image}}</code> or <code>{{post.authors.[#].cover_image}}</code>.<br>
        See the object attributes of <code>author</code> <a href="${docsBaseUrl}context/author/#author-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.cover\s*?}}/g,
        helper: '{{post.author.cover}}'
    },
    'GS001-DEPR-PAIMG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{post.author.image}}</code> helper with <code>{{post.primary_author.profile_image}}</code> or <code>{{post.authors.[#].profile_image}}</code>',
        details: oneLineTrim`The <code>image</code> attribute was replaced with <code>profile_image</code>.<br>
        Instead of <code>{{post.author.image}}</code>, you need to use
        <code>{{post.primary_author.profile_image}}</code> or <code>{{post.authors.[#].profile_image}}</code>.<br>
        See the object attributes of <code>author</code> <a href="${docsBaseUrl}context/author/#author-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?post\.author\.image\s*?}}/g,
        helper: '{{post.author.image}}'
    },
    'GS001-DEPR-CON-AC': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{#if author.cover}}</code> helper with <code>{{#if primary_author.cover_image}}</code> or <code>{{#if authors.[#].cover_image}}</code>',
        details: oneLineTrim`The <code>cover</code> attribute was replaced with <code>cover_image</code>.<br>
        Instead of <code>{{#if author.cover}}</code>, you need to use
        <code>{{#if primary_author.cover_image}}</code> or <code>{{#if authors.[#].cover_image}}</code>.<br>
        See the object attributes of <code>author</code> <a href="${docsBaseUrl}context/author/#author-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?#if\s*?author\.cover\s*?}}/g,
        helper: '{{#if author.cover}}'
    },
    'GS001-DEPR-CON-AIMG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{#if author.image}}</code> helper with <code>{{#if primary_author.profile_image}}</code> or <code>{{#if authors.[#].profile_image}}</code>',
        details: oneLineTrim`The <code>image</code> attribute was replaced with <code>profile_image</code>.<br>
        Instead of <code>{{#if author.image}}</code>, you need to use
        <code>{{#if primary_author.profile_image}}</code> or <code>{{#if authors.[#].profile_image}}</code>.<br>
        See the object attributes of <code>author</code> <a href="${docsBaseUrl}context/author/#author-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?#if\s*?author\.image\s*?}}/g,
        helper: '{{#if author.image}}'
    },
    'GS001-DEPR-CON-PAC': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{#if post.author.cover}}</code> helper with <code>{{#if post.primary_author.cover_image}}</code> or <code>{{#if post.authors.[#].cover_image}}</code>',
        details: oneLineTrim`The <code>cover</code> attribute was replaced with <code>cover_image</code>.<br>
        Instead of <code>{{#if post.author.cover}}</code>, you need to use
        <code>{{#if post.primary_author.cover_image}}</code> or <code>{{#if post.authors.[#].cover_image}}</code>.<br>
        See the object attributes of <code>author</code> <a href="${docsBaseUrl}context/author/#author-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?#if\s*?post\.author\.cover\s*?}}/g,
        helper: '{{#if post.author.cover}}'
    },
    'GS001-DEPR-CON-PAIMG': {
        level: 'error',
        fatal: true,
        rule: 'Replace the <code>{{#if post.author.image}}</code> helper with <code>{{#if post.primary_author.profile_image}}</code> or <code>{{#if post.authors.[#].profile_image}}</code>',
        details: oneLineTrim`The <code>image</code> attribute was replaced with <code>profile_image</code>.<br>
        Instead of <code>{{#if post.author.image}}</code>, you need to use
        <code>{{#if post.primary_author.profile_image}}</code> or <code>{{#if post.authors.[#].profile_image}}</code>.<br>
        See the object attributes of <code>author</code> <a href="${docsBaseUrl}context/author/#author-object-attributes" target=_blank>here</a>.`,
        regex: /{{\s*?#if\s*?post\.author\.image\s*?}}/g,
        helper: '{{#if post.author.image}}'
    }
};

knownHelpers = _.union(previousKnownHelpers, knownHelpers);
templates = _.union(previousTemplates, templates);

// Merge the previous rules into the new rules, but overwrite any specified property,
// as well as adding any new rule to the spec.
// Furthermore, replace the usage of the old doc URLs that we're linking to, with the
// new version.
rules = _.each(_.merge({}, previousRules, rules), function replaceDocsUrl(value) {
    value.details = value.details.replace(prevDocsBaseUrlRegEx, docsBaseUrl);
});

module.exports = {
    knownHelpers: knownHelpers,
    templates: templates,
    rules: rules
};
