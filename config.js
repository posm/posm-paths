const base = {
    db: "posm-paths.sqlite3"
};

const development = {
    port: '8080',
    mapillary: 'https://a.mapillary.com/v3/',
    injectDefaults: { simulate: { error: false }}
};

// for now...
const staging = development;
const production = development;

module.exports = {
    development: Object.assign(base, development),
    staging: Object.assign(base, staging),
    production: Object.assign(base, production)
}