
export default {
  init(api_root_url, {
    schema_path = '/schema',
    fetch_schema = true,
  } = {}) {
    console.log('VuePotion inited!!, next we need to read api schemas')
    console.log('this are options received:', api_root_url, schema_path, fetch_schema)

    this._api_root_url = api_root_url
    this._schema_path = schema_path

    if (fetch_schema) {
      this._fetch_schema()
    }
  },

  _fetch_schema() {
    console.log('Needs to fetch:', this._api_root_url + this._schema_path)
  },
}
