import gulp from 'gulp'
import gulpConcat from 'gulp-concat'
import gulpSass from 'gulp-sass'
import gulpRevAppend from 'gulp-rev-append'
import gulpImagemin from 'gulp-imagemin'
import gulpEnvironments from 'gulp-environments'
import gulpChanged from 'gulp-changed'
import purgecss from 'gulp-purgecss'
import critical from 'critical'
import webpack from 'webpack-stream'
import { exec } from 'child_process'
import * as fs from 'fs'

const production = gulpEnvironments.production

const CSS_FOLDER = '_css'
const CSS_HOME = 'style.home'
const CSS_BLOG = 'style.blog'
const CSS_BLOG_ARCHIVE = `${CSS_BLOG}.archive`
const CSS_BLOG_HOME = `${CSS_BLOG}.home`
const CSS_BLOG_POST = `${CSS_BLOG}.post`
const CSS_BLOG_TAGS = `${CSS_BLOG}.tags`
const CSS_PRIVACY_POLICY = 'style.privacypolicy'
const CSS_COOKIE_POLICY = 'style.cookiepolicy'
const CSS_ERROR = 'style.error'
const CSS_BASE_PATH = 'assets/styles'

const bundleCSSUsing = (cssName) => (
  gulp.src(`${CSS_FOLDER}/${cssName}.scss`)
    .pipe(gulpSass(production() ? { outputStyle: 'compressed' } : {}))
    .pipe(gulpConcat(`${cssName}.css`))
    .pipe(gulp.dest(CSS_BASE_PATH))
)
const bundleCss = () => Promise.all([
  bundleCSSUsing(CSS_HOME),
  bundleCSSUsing(CSS_BLOG_ARCHIVE),
  bundleCSSUsing(CSS_BLOG_HOME),
  bundleCSSUsing(CSS_BLOG_POST),
  bundleCSSUsing(CSS_BLOG_TAGS),
  bundleCSSUsing(CSS_PRIVACY_POLICY),
  bundleCSSUsing(CSS_COOKIE_POLICY),
  bundleCSSUsing(CSS_ERROR)
])

export const bundleJs = () => {
  const homeJs = './_js/index.home.ts'
  const blogJs = './_js/index.blog.ts'
  return gulp.src([homeJs, blogJs])
    .pipe(webpack({
      mode: production() ? 'production' : 'development',
      performance: { hints: production() ? false : 'warning' },
      entry: {
        'index.home': homeJs,
        'index.blog': blogJs
      },
      output: {
        filename: '[name].min.js'
      },
      module: {
        rules: [
          {
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js']
      }
    }))
    .pipe(gulp.dest('assets/js'))
}

const copyFiles = (folder) => {
  const destination = `assets/${folder}`
  return gulp
    .src([`_${folder}/**/*.*`])
    .pipe(gulpChanged(destination))
    .pipe(gulp.dest(destination))
}
const fonts = () => copyFiles('fonts')
const models = () => copyFiles('models')

const criticalCss = (src, dest, css) => (
  critical.generate({
    base: '_site/',
    src: `_site/${src}.html`,
    css: [`../assets/styles/${css}.css`],
    dimensions: [
      { width: 320, height: 480 },
      { width: 768, height: 1024 },
      { width: 1280, height: 1024 }
    ],
    extract: true,
    inline: true,
    penthouse: {
      // DEBUG: decomment to see critical screenshots
      // screenshots: { basePath: `_critical-screenshots/${dest}`, type: 'jpeg', quality: 20 },
      renderWaitTime: 30
    },
    ignore: { rule: [/footer-icon/, /icon-/, /phone-number/] }
  }, (err, result) => {
    if (err === null) {
      fs.writeFileSync(`assets/styles/${css}.css`, result.uncritical)
      fs.writeFileSync(`_includes/${dest}.css`, result.css)
    }
  })
)
const cssCritical = (done) => Promise.all([
  criticalCss('index', 'critical', CSS_HOME),
  criticalCss('blog/index', 'critical-blog', CSS_BLOG_HOME),
  criticalCss('blog/archive/index', 'critical-blog-post-archive', CSS_BLOG_ARCHIVE),
  criticalCss('blog/tags/index', 'critical-blog-tags', CSS_BLOG_TAGS),
  criticalCss('2017/08/25/how-to-calculate-reflection-vector.', 'critical-blog-post', CSS_BLOG_POST),
  criticalCss('privacy-policy', 'critical-privacy-policy', CSS_PRIVACY_POLICY),
  criticalCss('cookie-policy', 'critical-cookie-policy', CSS_COOKIE_POLICY),
  criticalCss('offline', 'critical-error', CSS_ERROR)
])

const purgeCssUsing = (cssName, content, whitelist = []) => (
  gulp
    .src(`_site/assets/styles/${cssName}.css`)
    .pipe(purgecss({ content: content, whitelist: whitelist }))
    .pipe(gulp.dest('assets/styles/'))
)
const purgeCss = () => Promise.all([
  purgeCssUsing(CSS_HOME, ['./_site/index.html', './_site/assets/js/index.home.min.js']),
  purgeCssUsing(CSS_BLOG_ARCHIVE, ['./_site/blog/archive/index.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_BLOG_HOME, ['./_site/blog/index.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_BLOG_TAGS, ['./_site/blog/tags/index.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_ERROR, ['./_site/offline.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_PRIVACY_POLICY, ['./_site/privacy-policy.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_COOKIE_POLICY, ['./_site/cookie-policy.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_BLOG_POST, ['./_site/20**/**/**.html', './_site/assets/js/index.blog.min.js'], ['katex-display'])
])

const revision = (section) => (
  gulp.src(`./dependencies-${section}.html`)
    .pipe(gulpRevAppend())
    .pipe(gulp.dest('_includes'))
)
const revAppend = () => Promise.all([
  revision('js-home'),
  revision('js-blog'),
  revision('css-home'),
  revision('css-blog-archive'),
  revision('css-blog-home'),
  revision('css-blog-post'),
  revision('css-blog-tags'),
  revision('css-privacy-policy'),
  revision('css-cookie-policy'),
  revision('css-error')
])

const serviceWorkerUrlFor = (section) => exec(`./_scripts/generate-service-worker-urls.sh ${section}`)
const serviceWorkerUrls = (done) => Promise.all([
  serviceWorkerUrlFor('js-home'),
  serviceWorkerUrlFor('js-blog'),
  serviceWorkerUrlFor('css-home'),
  serviceWorkerUrlFor('css-blog-archive'),
  serviceWorkerUrlFor('css-blog-home'),
  serviceWorkerUrlFor('css-blog-post'),
  serviceWorkerUrlFor('css-blog-tags'),
  serviceWorkerUrlFor('css-privacy-policy'),
  serviceWorkerUrlFor('css-cookie-policy'),
  serviceWorkerUrlFor('css-error')
]).then(() => done())

const jekyllBuild = (done) => exec('./_scripts/build.sh', (err, stdout, stderr) => done(err))

export const images = () => {
  const destination = 'assets/images'
  return gulp
    .src(['_images/**/*.*'])
    .pipe(gulpChanged(destination))
    .pipe(production(gulpImagemin()))
    .pipe(gulp.dest(destination))
}

export const watchCss = () => gulp.watch(`${CSS_FOLDER}/*.scss`, gulp.series(
  bundleCss,
  jekyllBuild, // First build for critical/purge css
  purgeCss,
  jekyllBuild, // Generate site with css critical path and purge from unused rules
  cssCritical
))

export const build = gulp.series(
  bundleCss,
  bundleJs,
  revAppend,
  serviceWorkerUrls,
  images,
  fonts,
  models,
  jekyllBuild, // First build for critical/purge css
  purgeCss,
  jekyllBuild, // Generate site with css critical path and purge from unused rules
  cssCritical,
  jekyllBuild // Site is ready
)
