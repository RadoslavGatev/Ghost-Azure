const should = require('should');
const serializers = require('../../../../../../../core/server/api/v3/utils/serializers');

describe('Unit: v3/utils/serializers/input/pages', function () {
    describe('browse', function () {
        it('default', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    context: {}
                }
            };

            serializers.input.pages.browse(apiConfig, frame);
            frame.options.filter.should.eql('type:page');
        });

        it('combine filters', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    filter: 'status:published+tag:eins',
                    context: {}
                }
            };

            serializers.input.pages.browse(apiConfig, frame);
            frame.options.filter.should.eql('(status:published+tag:eins)+type:page');
        });

        it('combine filters', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    filter: 'page:false+tag:eins',
                    context: {}
                }
            };

            serializers.input.pages.browse(apiConfig, frame);
            frame.options.filter.should.eql('(page:false+tag:eins)+type:page');
        });

        it('combine filters', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    filter: 'page:false',
                    context: {}
                }
            };

            serializers.input.pages.browse(apiConfig, frame);
            frame.options.filter.should.eql('(page:false)+type:page');
        });

        it('remove mobiledoc option from formats', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    formats: ['html', 'mobiledoc', 'plaintext'],
                    context: {}
                }
            };

            serializers.input.pages.browse(apiConfig, frame);
            frame.options.formats.should.not.containEql('mobiledoc');
            frame.options.formats.should.containEql('html');
            frame.options.formats.should.containEql('plaintext');
        });
    });

    describe('read', function () {
        it('content api default', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    context: {}
                },
                data: {}
            };

            serializers.input.pages.read(apiConfig, frame);
            frame.options.filter.should.eql('type:page');
        });

        it('content api default', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    context: {
                        user: 0,
                        api_key: {
                            id: 1,
                            type: 'content'
                        }
                    }
                },
                data: {}
            };

            serializers.input.pages.read(apiConfig, frame);
            frame.options.filter.should.eql('type:page');
        });

        it('admin api default', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'admin',
                options: {
                    context: {
                        user: 0,
                        api_key: {
                            id: 1,
                            type: 'admin'
                        }
                    }
                },
                data: {}
            };

            serializers.input.pages.read(apiConfig, frame);
            frame.options.filter.should.eql('(type:page)+status:[draft,published,scheduled]');
        });

        it('custom page filter', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    filter: 'page:false',
                    context: {}
                },
                data: {}
            };

            serializers.input.pages.read(apiConfig, frame);
            frame.options.filter.should.eql('(page:false)+type:page');
        });

        it('custom status filter', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'admin',
                options: {
                    filter: 'status:draft',
                    context: {
                        user: 0,
                        api_key: {
                            id: 1,
                            type: 'admin'
                        }
                    }
                },
                data: {}
            };

            serializers.input.pages.read(apiConfig, frame);
            frame.options.filter.should.eql('(status:draft)+type:page');
        });

        it('remove mobiledoc option from formats', function () {
            const apiConfig = {};
            const frame = {
                apiType: 'content',
                options: {
                    formats: ['html', 'mobiledoc', 'plaintext'],
                    context: {}
                },
                data: {
                    status: 'all',
                    page: false
                }
            };

            serializers.input.pages.read(apiConfig, frame);
            frame.options.formats.should.not.containEql('mobiledoc');
            frame.options.formats.should.containEql('html');
            frame.options.formats.should.containEql('plaintext');
        });
    });

    describe('Ensure relations format', function () {
        it('relations is array of objects', function () {
            const apiConfig = {};

            const frame = {
                apiType: 'content',
                options: {},
                data: {
                    pages: [
                        {
                            id: 'id1',
                            authors: [{id: 'id'}],
                            tags: [{slug: 'slug1', name: 'hey'}, {slug: 'slug2'}]
                        }
                    ]
                }
            };

            serializers.input.pages.edit(apiConfig, frame);

            frame.data.pages[0].authors.should.eql([{id: 'id'}]);
            frame.data.pages[0].tags.should.eql([{slug: 'slug1', name: 'hey'}, {slug: 'slug2'}]);
        });

        it('authors is array of strings', function () {
            const apiConfig = {};

            const frame = {
                apiType: 'content',
                options: {},
                data: {
                    pages: [
                        {
                            id: 'id1',
                            authors: ['email1', 'email2'],
                            tags: ['name1', 'name2']
                        }
                    ]
                }
            };

            serializers.input.pages.edit(apiConfig, frame);

            frame.data.pages[0].authors.should.eql([{email: 'email1'}, {email: 'email2'}]);
            frame.data.pages[0].tags.should.eql([{name: 'name1'}, {name: 'name2'}]);
        });
    });
});
