<a name="0.7.0"></a>
# 0.7.0 (2019-07-16)

* Support Mobiledoc 0.3.2 ([b4c48ab](https://github.com/bustle/mobiledoc-dom-renderer/commit/b4c48ab))
* Use project-specific "broccoli" executable rather than global ([578ef83](https://github.com/bustle/mobiledoc-dom-renderer/commit/578ef83))



<a name="0.6.6"></a>
## 0.6.6 (2019-02-13)

* 0.6.6 ([e57e186](https://github.com/bustle/mobiledoc-dom-renderer/commit/e57e186))
* add module path to package.json ([56b7e57](https://github.com/bustle/mobiledoc-dom-renderer/commit/56b7e57))
* Ignore case on bad protocols ([7ca17eb](https://github.com/bustle/mobiledoc-dom-renderer/commit/7ca17eb))



<a name="0.6.5"></a>
## 0.6.5 (2017-03-07)

* 0.6.5 ([53e705b](https://github.com/bustle/mobiledoc-dom-renderer/commit/53e705b))
* fix(href-sanitization): Improve protocol detection for href sanitization (#53) ([a91b257](https://github.com/bustle/mobiledoc-dom-renderer/commit/a91b257))



<a name="0.6.4"></a>
## 0.6.4 (2017-03-06)

* 0.6.4 ([cac185a](https://github.com/bustle/mobiledoc-dom-renderer/commit/cac185a))
* 0.6.4-0 ([d564abb](https://github.com/bustle/mobiledoc-dom-renderer/commit/d564abb))
* 0.6.4-1 ([c7cc41b](https://github.com/bustle/mobiledoc-dom-renderer/commit/c7cc41b))
* chore(markupSanitizer): Remove markupSanitizer in favor of markupElementRenderer (#51) ([8f359af](https://github.com/bustle/mobiledoc-dom-renderer/commit/8f359af))
* fix(href-sanitization): Accept markupSanitizer option, downcase tagName and attributeName (#50) ([aa1aedc](https://github.com/bustle/mobiledoc-dom-renderer/commit/aa1aedc)), closes [#49](https://github.com/bustle/mobiledoc-dom-renderer/issues/49) [#48](https://github.com/bustle/mobiledoc-dom-renderer/issues/48)



<a name="0.6.3"></a>
## 0.6.3 (2017-02-22)

* 0.6.3 ([a3d94c8](https://github.com/bustle/mobiledoc-dom-renderer/commit/a3d94c8))
* Revert usage of glimmer/build for building (for now) (#46) ([c23676a](https://github.com/bustle/mobiledoc-dom-renderer/commit/c23676a))



<a name="0.6.2"></a>
## 0.6.2 (2017-02-16)

* 0.6.2 ([49d56e7](https://github.com/bustle/mobiledoc-dom-renderer/commit/49d56e7))
* prepublish ([071bcbf](https://github.com/bustle/mobiledoc-dom-renderer/commit/071bcbf))



<a name="0.6.1"></a>
## 0.6.1 (2017-02-16)

* 0.6.1 ([0f8d5a6](https://github.com/bustle/mobiledoc-dom-renderer/commit/0f8d5a6))
* use forked glimmer-build without babel helpers (#45) ([f9882db](https://github.com/bustle/mobiledoc-dom-renderer/commit/f9882db))
* use typeof check (#42) ([2170c2b](https://github.com/bustle/mobiledoc-dom-renderer/commit/2170c2b)), closes [#41](https://github.com/bustle/mobiledoc-dom-renderer/issues/41)



<a name="0.6.0"></a>
# 0.6.0 (2017-02-14)

* 0.6.0 ([89a33b1](https://github.com/bustle/mobiledoc-dom-renderer/commit/89a33b1))
* Added tests for #reduceAndSanitizeAttributes ([1efce8e](https://github.com/bustle/mobiledoc-dom-renderer/commit/1efce8e))
* Cleanup for sanitization ([c81f512](https://github.com/bustle/mobiledoc-dom-renderer/commit/c81f512))
* Cover edge case. ([eb1a0d6](https://github.com/bustle/mobiledoc-dom-renderer/commit/eb1a0d6))
* Fix test that was not running. ([1a98c0e](https://github.com/bustle/mobiledoc-dom-renderer/commit/1a98c0e))
* Links with unsafe URIs are filtered out. ([ff17b95](https://github.com/bustle/mobiledoc-dom-renderer/commit/ff17b95))
* Refactor and extend to version 0.2 ([b89d508](https://github.com/bustle/mobiledoc-dom-renderer/commit/b89d508))
* Refactor href values to be sanitized ([003c749](https://github.com/bustle/mobiledoc-dom-renderer/commit/003c749))
* Use glimmer build (#40) ([8b82854](https://github.com/bustle/mobiledoc-dom-renderer/commit/8b82854))



<a name="0.5.4"></a>
## 0.5.4 (2016-11-15)

* 0.5.2 ([40cdbe5](https://github.com/bustle/mobiledoc-dom-renderer/commit/40cdbe5))
* 0.5.3 ([43f7908](https://github.com/bustle/mobiledoc-dom-renderer/commit/43f7908))
* 0.5.4 ([5730c65](https://github.com/bustle/mobiledoc-dom-renderer/commit/5730c65))
* Add a markup renderer option (#32) ([a368f34](https://github.com/bustle/mobiledoc-dom-renderer/commit/a368f34))
* Document markup renderer (#33) ([2614b4e](https://github.com/bustle/mobiledoc-dom-renderer/commit/2614b4e))
* Mobiledoc 0.3.1 ([93cd8ba](https://github.com/bustle/mobiledoc-dom-renderer/commit/93cd8ba))
* Support didRender for latest mobiledoc-kit ([70929c6](https://github.com/bustle/mobiledoc-dom-renderer/commit/70929c6))
* Update release instructions to use `np` ([014de03](https://github.com/bustle/mobiledoc-dom-renderer/commit/014de03))
* Update to use yarn ([e46b453](https://github.com/bustle/mobiledoc-dom-renderer/commit/e46b453))
* chore(scripts): Use version instead of postversion npm script (#36) ([17e35de](https://github.com/bustle/mobiledoc-dom-renderer/commit/17e35de))



<a name="0.5.1"></a>
## 0.5.1 (2016-05-12)

* [bugfix] Pass dom, isInEditor args to atoms ([6c98424](https://github.com/bustle/mobiledoc-dom-renderer/commit/6c98424))
* [docs] minor change to release process in readme ([b637a47](https://github.com/bustle/mobiledoc-dom-renderer/commit/b637a47))
* v0.5.1 ([5ddbf4c](https://github.com/bustle/mobiledoc-dom-renderer/commit/5ddbf4c))



<a name="0.5.0"></a>
# 0.5.0 (2016-04-14)

* Remove card wrappers ([c9632fa](https://github.com/bustle/mobiledoc-dom-renderer/commit/c9632fa))
* Update changelog ([1505a05](https://github.com/bustle/mobiledoc-dom-renderer/commit/1505a05))
* update conventional-changelog dep and change release steps in readme ([6fd519c](https://github.com/bustle/mobiledoc-dom-renderer/commit/6fd519c))
* Update mobiledoc version example to 0.3.0 ([22f2de3](https://github.com/bustle/mobiledoc-dom-renderer/commit/22f2de3))
* v0.5.0 ([e878ad5](https://github.com/bustle/mobiledoc-dom-renderer/commit/e878ad5))



<a name="0.4.1"></a>
## 0.4.1 (2016-03-11)

* 0.4.1 ([d350c73](https://github.com/bustle/mobiledoc-dom-renderer/commit/d350c73))
* Render pull-quote as <div class="pull-quote" ([638f46d](https://github.com/bustle/mobiledoc-dom-renderer/commit/638f46d)), closes [#26](https://github.com/bustle/mobiledoc-dom-renderer/issues/26)
* Update changelog ([72ed2a5](https://github.com/bustle/mobiledoc-dom-renderer/commit/72ed2a5))



<a name="0.4.0"></a>
# 0.4.0 (2016-02-21)

* 0.4.0 ([c426575](https://github.com/bustle/mobiledoc-dom-renderer/commit/c426575))
* Use strict in brocfile ([bba53ff](https://github.com/bustle/mobiledoc-dom-renderer/commit/bba53ff))



<a name="0.4.0-beta4"></a>
# 0.4.0-beta4 (2016-02-20)

* 0.4.0-beta4 ([dc07520](https://github.com/bustle/mobiledoc-dom-renderer/commit/dc07520))
* Create section element with correct args ([6f8df27](https://github.com/bustle/mobiledoc-dom-renderer/commit/6f8df27))



<a name="0.4.0-beta3"></a>
# 0.4.0-beta3 (2016-02-20)

* 0.4.0-beta3 ([4b83f54](https://github.com/bustle/mobiledoc-dom-renderer/commit/4b83f54))
* Document rendering HTML ([2d2a8f7](https://github.com/bustle/mobiledoc-dom-renderer/commit/2d2a8f7))
* Pass dom to sectionElementRenderers ([dc20d01](https://github.com/bustle/mobiledoc-dom-renderer/commit/dc20d01))



<a name="0.4.0-beta2"></a>
# 0.4.0-beta2 (2016-02-19)

* 0.4.0-beta2 ([387c331](https://github.com/bustle/mobiledoc-dom-renderer/commit/387c331))
* Node-safe window check ([6f0e6ce](https://github.com/bustle/mobiledoc-dom-renderer/commit/6f0e6ce))



<a name="0.4.0-beta1"></a>
# 0.4.0-beta1 (2016-02-11)

* Add dom option for renderer, SimpleDOM tests ([0ed823b](https://github.com/bustle/mobiledoc-dom-renderer/commit/0ed823b))
* Update changelog ([85c42e9](https://github.com/bustle/mobiledoc-dom-renderer/commit/85c42e9))
* v0.4.0-beta1 ([4fc9c2d](https://github.com/bustle/mobiledoc-dom-renderer/commit/4fc9c2d))



<a name="0.3.0"></a>
# 0.3.0 (2016-02-04)

* 0.3.0 ([c0f4364](https://github.com/bustle/mobiledoc-dom-renderer/commit/c0f4364))



<a name="0.3.0-beta3"></a>
# 0.3.0-beta3 (2016-01-21)

* 0.3.0-beta3 ([5f2e60e](https://github.com/bustle/mobiledoc-dom-renderer/commit/5f2e60e))
* Add sectionElementRenderer option ([fa2e9be](https://github.com/bustle/mobiledoc-dom-renderer/commit/fa2e9be))



<a name="0.3.0-beta2"></a>
# 0.3.0-beta2 (2015-12-17)

* 0.3.0-beta2 ([43e687c](https://github.com/bustle/mobiledoc-dom-renderer/commit/43e687c))



<a name="0.3.0-beta1"></a>
# 0.3.0-beta1 (2015-12-17)

* 0.3.0-beta1 ([ba05d16](https://github.com/bustle/mobiledoc-dom-renderer/commit/ba05d16))
* fix marker type util import ([3e11c33](https://github.com/bustle/mobiledoc-dom-renderer/commit/3e11c33))
* implement support for mobiledoc 0.3.0 and atoms ([a62b288](https://github.com/bustle/mobiledoc-dom-renderer/commit/a62b288))
* rearrange tests ([12f7f2b](https://github.com/bustle/mobiledoc-dom-renderer/commit/12f7f2b))
* Update changelog ([78b27a3](https://github.com/bustle/mobiledoc-dom-renderer/commit/78b27a3))
* Update README.md ([60aa048](https://github.com/bustle/mobiledoc-dom-renderer/commit/60aa048))
* Update README.md ([f26ee5d](https://github.com/bustle/mobiledoc-dom-renderer/commit/f26ee5d))
* Whitelist tag names for sections, marker types ([c693ed8](https://github.com/bustle/mobiledoc-dom-renderer/commit/c693ed8))



<a name="0.2.1"></a>
## 0.2.1 (2015-11-23)

* 0.2.1 ([cfd0a97](https://github.com/bustle/mobiledoc-dom-renderer/commit/cfd0a97))



<a name="0.2.0"></a>
# 0.2.0 (2015-11-23)

* 0.2.0 ([5849616](https://github.com/bustle/mobiledoc-dom-renderer/commit/5849616))
* refactor to handle new cards ([e6fd6fd](https://github.com/bustle/mobiledoc-dom-renderer/commit/e6fd6fd)), closes [#17](https://github.com/bustle/mobiledoc-dom-renderer/issues/17)
* Update changelog ([7f942c6](https://github.com/bustle/mobiledoc-dom-renderer/commit/7f942c6))



<a name="0.1.18"></a>
## 0.1.18 (2015-11-16)

* 0.1.18 ([172ba45](https://github.com/bustle/mobiledoc-dom-renderer/commit/172ba45))
* Add update-changelog ([2f7100c](https://github.com/bustle/mobiledoc-dom-renderer/commit/2f7100c))
* Do not share state when rendering ([b51510e](https://github.com/bustle/mobiledoc-dom-renderer/commit/b51510e)), closes [#11](https://github.com/bustle/mobiledoc-dom-renderer/issues/11)
* Make file structure more closely match HTML renderer ([2c6dcad](https://github.com/bustle/mobiledoc-dom-renderer/commit/2c6dcad))
* Render multiple spaces with nbsps to preserve whitespaces ([95c1719](https://github.com/bustle/mobiledoc-dom-renderer/commit/95c1719)), closes [#8](https://github.com/bustle/mobiledoc-dom-renderer/issues/8)
* Throw on Unexpected mobiledoc version ([858239d](https://github.com/bustle/mobiledoc-dom-renderer/commit/858239d)), closes [#13](https://github.com/bustle/mobiledoc-dom-renderer/issues/13)
* update brocfile ([5651e94](https://github.com/bustle/mobiledoc-dom-renderer/commit/5651e94))
* update renderer to accept options ([0b66b0d](https://github.com/bustle/mobiledoc-dom-renderer/commit/0b66b0d))



<a name="0.1.17"></a>
## 0.1.17 (2015-11-12)

* 0.1.17 ([0c35bcc](https://github.com/bustle/mobiledoc-dom-renderer/commit/0c35bcc))
* remove ember-addon index ([c857bf6](https://github.com/bustle/mobiledoc-dom-renderer/commit/c857bf6))
* remove ember-addon stuff ([f4b23d3](https://github.com/bustle/mobiledoc-dom-renderer/commit/f4b23d3))



<a name="0.1.16"></a>
## 0.1.16 (2015-10-24)

* 0.1.16 ([1a3eff2](https://github.com/bustle/mobiledoc-dom-renderer/commit/1a3eff2))
* Assert that `cards` is not passed as an array ([c7ea455](https://github.com/bustle/mobiledoc-dom-renderer/commit/c7ea455))



<a name="0.1.15"></a>
## 0.1.15 (2015-10-16)

* 0.1.15 ([955d8af](https://github.com/bustle/mobiledoc-dom-renderer/commit/955d8af))
* Add a main definition for ember-addon ([31b7991](https://github.com/bustle/mobiledoc-dom-renderer/commit/31b7991))



<a name="0.1.14"></a>
## 0.1.14 (2015-10-15)

* 0.1.14 ([29016e6](https://github.com/bustle/mobiledoc-dom-renderer/commit/29016e6))
* Build commonjs ([8d540f4](https://github.com/bustle/mobiledoc-dom-renderer/commit/8d540f4))



<a name="0.1.13"></a>
## 0.1.13 (2015-10-01)

* 0.1.12 ([7b90ad6](https://github.com/bustle/mobiledoc-dom-renderer/commit/7b90ad6))
* 0.1.13 ([f60bc90](https://github.com/bustle/mobiledoc-dom-renderer/commit/f60bc90))
* Permit no payload ([d1f36f4](https://github.com/bustle/mobiledoc-dom-renderer/commit/d1f36f4))
* Render ListSections and ListItems ([a838960](https://github.com/bustle/mobiledoc-dom-renderer/commit/a838960)), closes [#4](https://github.com/bustle/mobiledoc-dom-renderer/issues/4)



<a name="0.1.11"></a>
## 0.1.11 (2015-08-25)

* 0.1.11 ([455b8e7](https://github.com/bustle/mobiledoc-dom-renderer/commit/455b8e7))
* Make an addon ([c7ae737](https://github.com/bustle/mobiledoc-dom-renderer/commit/c7ae737))



<a name="0.1.10"></a>
## 0.1.10 (2015-08-05)

* 0.1.10 ([6a2fbcf](https://github.com/bustle/mobiledoc-dom-renderer/commit/6a2fbcf))
* Fix bad utils path and test ([3305634](https://github.com/bustle/mobiledoc-dom-renderer/commit/3305634))



<a name="0.1.9"></a>
## 0.1.9 (2015-08-05)

* 0.1.9 ([a4b5501](https://github.com/bustle/mobiledoc-dom-renderer/commit/a4b5501))
* Add a default image card implementation ([58adcf1](https://github.com/bustle/mobiledoc-dom-renderer/commit/58adcf1))
* Add cards to README ([109730f](https://github.com/bustle/mobiledoc-dom-renderer/commit/109730f))
* Tweak README ([c6a8155](https://github.com/bustle/mobiledoc-dom-renderer/commit/c6a8155))
* Update README.md ([caf23f3](https://github.com/bustle/mobiledoc-dom-renderer/commit/caf23f3))



<a name="0.1.8"></a>
## 0.1.8 (2015-07-29)

* 0.1.7 ([4782eee](https://github.com/bustle/mobiledoc-dom-renderer/commit/4782eee))
* 0.1.8 ([c6b0043](https://github.com/bustle/mobiledoc-dom-renderer/commit/c6b0043))
* Render with version ([0e1f645](https://github.com/bustle/mobiledoc-dom-renderer/commit/0e1f645))
* Tweak README ([d8064ae](https://github.com/bustle/mobiledoc-dom-renderer/commit/d8064ae))



<a name="0.1.6"></a>
## 0.1.6 (2015-07-27)

* 0.1.6 ([f13bbf8](https://github.com/bustle/mobiledoc-dom-renderer/commit/f13bbf8))



<a name="0.1.5"></a>
## 0.1.5 (2015-07-15)

* 0.1.5 ([45298d8](https://github.com/bustle/mobiledoc-dom-renderer/commit/45298d8))
* Render cards to DOM ([dfe3e96](https://github.com/bustle/mobiledoc-dom-renderer/commit/dfe3e96))



<a name="0.1.4"></a>
## 0.1.4 (2015-07-13)

* 0.1.4 ([eb11c5d](https://github.com/bustle/mobiledoc-dom-renderer/commit/eb11c5d))
* Add support for image sections ([5fd6d81](https://github.com/bustle/mobiledoc-dom-renderer/commit/5fd6d81))



<a name="0.1.3"></a>
## 0.1.3 (2015-07-09)

* 0.1.3 ([079e0c1](https://github.com/bustle/mobiledoc-dom-renderer/commit/079e0c1))
* add jshintrc ([cb0607a](https://github.com/bustle/mobiledoc-dom-renderer/commit/cb0607a))
* add readme ([de20a98](https://github.com/bustle/mobiledoc-dom-renderer/commit/de20a98))
* point main at global build ([6a9e697](https://github.com/bustle/mobiledoc-dom-renderer/commit/6a9e697))
* remove bower ([cc4b0d9](https://github.com/bustle/mobiledoc-dom-renderer/commit/cc4b0d9))
* run travis ([eff2cd0](https://github.com/bustle/mobiledoc-dom-renderer/commit/eff2cd0))
* travis ([9e1eeac](https://github.com/bustle/mobiledoc-dom-renderer/commit/9e1eeac))
* travis badge ([9e939d2](https://github.com/bustle/mobiledoc-dom-renderer/commit/9e939d2))
* use testem ([cf12376](https://github.com/bustle/mobiledoc-dom-renderer/commit/cf12376))



<a name="0.1.2"></a>
## 0.1.2 (2015-07-09)

* 0.1.2 ([6e57123](https://github.com/bustle/mobiledoc-dom-renderer/commit/6e57123))
* ignore npm-debug.log ([a652ce2](https://github.com/bustle/mobiledoc-dom-renderer/commit/a652ce2))



<a name="0.1.1"></a>
## 0.1.1 (2015-07-09)

* add "files" to package.json ([268841e](https://github.com/bustle/mobiledoc-dom-renderer/commit/268841e))
* v0.1.1 ([f74e486](https://github.com/bustle/mobiledoc-dom-renderer/commit/f74e486))



<a name="0.1.0"></a>
# 0.1.0 (2015-07-09)

* Add dom renderer, tests ([58a531e](https://github.com/bustle/mobiledoc-dom-renderer/commit/58a531e))
* initial project structure ([39a9b34](https://github.com/bustle/mobiledoc-dom-renderer/commit/39a9b34))



