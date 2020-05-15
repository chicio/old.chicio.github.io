/* @flow */
import { cookieConsent } from './common/cookie-consent'
import { lazyLoadImages } from './common/lazy-load-images'
import { disqus } from './blog/disqus'
import { tryToActivatePullToRefresh } from './blog/pull-to-refresh'
import { registerToServicerWorker } from './common/service-worker'
import { youtube } from './blog/youtube'

const ChicioCodingBlog = {
  init: (trackingCategory: string, shouldActivatePullToRefresh: boolean) => {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages('.blog-image')
    })
    window.addEventListener('load', () => {
      registerToServicerWorker()
      cookieConsent()
      tryToActivatePullToRefresh(trackingCategory, shouldActivatePullToRefresh)
      youtube()
      disqus()
    })
  }
}

window.ChicioCodingBlog = ChicioCodingBlog
