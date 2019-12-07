export default function({ $axios, redirect, $auth }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onResponse((response) => {})

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    } else if (code === 402) {
      redirect('/402')
    }
  })
}
