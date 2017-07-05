/**
 * service-worker.js
 * 这个文件之所以必须位于应用的根文件夹内，是因为服务工作线程的作用域由该文件所在的目录定义。
 */
let appShellCacheName = 'pwa-weather-app-shell-cache-2'
let appDataCacheName = 'pwa-weather-app-data-cache-1'

/**
 * 需要缓存的 App Shell 组件。 
 */
let filesToCache = [
	'/',
	'/index.html',
	'/app.js',
	'/style.css',
	'/images/clear.png',
	'/images/cloudy-scattered-showers.png',
	'/images/cloudy.png',
	'/images/fog.png',
	'/images/ic_add_white_24px.svg',
	'/images/ic_refresh_white_24px.svg',
	'/images/partly-cloudy.png',
	'/images/rain.png',
	'/images/scattered-showers.png',
	'/images/sleet.png',
	'/images/snow.png',
	'/images/thunderstorm.png',
	'/images/wind.png',
	'/manifest.json'
]

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install')
  e.waitUntil(caches.open(appShellCacheName).then((cache) => {
    console.log('[ServiceWorker] Caching app shell')
    return cache.addAll(filesToCache)
  }))
})

/**
 * service-worker.js sw 进程启动。
 */
self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
  	caches.keys().then((keyList) => {
  		console.log('keyList:', keyList)
  	  return Promise.all(keyList.map((key) => {
  	    if (key !== appShellCacheName && key !== appDataCacheName) {
  	    	console.log('[ServiceWorker] Removing old cache', key)
  	    	return caches.delete(key)
  	    }
  	  }))
  	})
  )
  return self.clients.claim()
})

/**
 * 从缓存中加载 App Shell, 处理 'fetch'。
 * 
 */
self.addEventListener('fetch', (e) => {
	let dataUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&q='

	if (e.request.url.indexOf(dataUrl) > -1) {
		// App Data Cache
		e.respondWith(
			caches.open(appDataCacheName).then((cache) => {
				// fetch 过后存储起来。返回请求后，我们的代码会打开缓存，克隆响应，将其存储在缓存内，最后将响应返回给原始请求者。
				return fetch(e.request).then((response) => {
				  cache.put(e.request.url, response.clone())
				  return response
				})
			})
		)
	} else {
		// App Shell Cache
	  e.respondWith(
	  	caches.match(e.request).then((response) => {
			  console.log('[ServiceWorker] Fetch ', response ? 'hit!' : 'miss!', e.request.url)
	  	  return response || fetch(e.request)
	  	})
	  )
	}
})





