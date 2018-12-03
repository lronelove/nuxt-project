import axios from 'axios'
import home from './home.js'
	
axios.defaults.baseURL = 'http://192.168.1.102:7001/'

export default {
  'home': home
}