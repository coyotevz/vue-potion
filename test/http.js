import Vue from 'vue'

/* global describe,it,expect */
describe('Vue.http', function() {
  it('get("data/text.txt")', done => {
    Vue.http.get('data/text.txt').then(res => {
      expect(res.ok).toBe(true)
      expect(res.status).toBe(200)
      expect(res.body).toBe('text')
      expect(res.headers.get('Content-Type')).toBe('text/plain')
      expect(res.headers.get('Content-Length')).toBe('4')

      done()
    })
  })

  it('get("data/valid.json")', done => {
    Vue.http.get('data/valid.json').then(res => {
      expect(res.ok).toBe(true)
      expect(res.status).toBe(200)
      expect(typeof res.body).toBe('object')
      expect(res.body.foo).toBe('bar')

      done()
    })
  })
})
