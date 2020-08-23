//import all animated icons from icons folder
import clear_sky_day from './icons/clear_sky_day.svg';
import clear_sky_night from './icons/clear_sky_night.svg';
import few_clouds_day from './icons/few_clouds_day.svg';
import few_clouds_night from './icons/few_clouds_night.svg';
import scattered_clouds_day from './icons/scattered_clouds_day.svg';
import scattered_clouds_night from './icons/scattered_clouds_night.svg';
import broken_clouds_day from './icons/broken_clouds_day.svg';
import broken_clouds_night from './icons/broken_clouds_night.svg';
import shower_rain_day from './icons/shower_rain_day.svg';
import shower_rain_night from './icons/shower_rain_night.svg';
import rain_day from './icons/rain_day.svg';
import rain_night from './icons/rain_night.svg';
import thunderstorm_day from './icons/thunderstorm.svg';
import thunderstorm_night from './icons/thunderstorm.svg';
import snow_day from './icons/snow_day.svg';
import snow_night from './icons/snow_night.svg';
import mist_day from './icons/mist.svg';
import mist_night from './icons/mist.svg';

// import all background images from background folder
import clear_sky_day_background from './background/clear_sky_day1.jpg';
import clear_sky_night_background from './background/clear_sky_night1.jpg';
import few_clouds_day_background from './background/few_clouds_day.jpg';
import few_clouds_night_background from './background/few_clouds_night.jpg';
import scattered_clouds_day_background from './background/scattered_clouds_day1.jpg';
import scattered_clouds_night_background from './background/scattered_clouds_night.jpg';
import broken_clouds_day_background from './background/broken_clouds_day.jpg';
import broken_clouds_night_background from './background/broken_clouds_night.jpg';
import rain_day_background from './background/rain_day.jpg';
import rain_night_background from './background/rain_night.jpg';
import shower_rain_day_background from './background/shower_rain_day.jpg';
import shower_rain_night_background from './background/shower_rain_night.jpg';
import thunderstorm_day_background from './background/thunderstorm_day.jpg';
import thunderstorm_night_bacground from './background/thunderstorm_night.jpg';
import snow_day_background from './background/snow_day.jpg';
import snow_night_background from './background/snow_night.jpg';
import mist_day_background from './background/mist_day.jpg';
import mist_night_background from './background/mist_night.jpg';

// icon codes of weather types
const CLEAR_SKY_DAY = "01d";
const CLEAR_SKY_NIGHT = "01n";
const FEW_CLOUDS_DAY = "02d";
const FEW_CLOUDS_NIGHT = "02n";
const SCATTERED_CLOUDS_DAY = "03d";
const SCATTERED_CLOUDS_NIGHT = "03n";
const BROKEN_CLOUDS_DAY = "04d";
const BROKEN_CLOUDS_NIGHT = "04n";
const SHOWER_RAIN_DAY = "09d";
const SHOWER_RAIN_NIGHT = "09n";
const RAIN_DAY = "10d";
const RAIN_NIGHT = "10n";
const THUNDERSTORM_DAY = "11d";
const THUNDERSTORM_NIGHT = "11n";
const SNOW_DAY = "13d";
const SNOW_NIGHT = "13n";
const MIST_DAY = "50d";
const MIST_NIGHT = "50n";

const weatherIcons = [
  {id: CLEAR_SKY_DAY, src: clear_sky_day , background: clear_sky_day_background, title:"clear sky"},
  {id: CLEAR_SKY_NIGHT, src: clear_sky_night,background: clear_sky_night_background, title:"clear sky"},
  {id: FEW_CLOUDS_DAY, src: few_clouds_day,background: few_clouds_day_background, title:"few clouds"},
  {id: FEW_CLOUDS_NIGHT, src: few_clouds_night,background: few_clouds_night_background, title:"few clouds"},
  {id: SCATTERED_CLOUDS_DAY, src: scattered_clouds_day,background: scattered_clouds_day_background, title:"scattered clouds"},
  {id: SCATTERED_CLOUDS_NIGHT, src: scattered_clouds_night, background: scattered_clouds_night_background, title:"scattered clouds"},
  {id: BROKEN_CLOUDS_DAY, src: broken_clouds_day, background: broken_clouds_day_background, title:"broken clouds"},
  {id: BROKEN_CLOUDS_NIGHT, src:broken_clouds_night, background: broken_clouds_night_background, title:"broken clouds"},
  {id: SHOWER_RAIN_DAY, src: shower_rain_day,background: shower_rain_day_background, title:"shower rain"},
  {id: SHOWER_RAIN_NIGHT, src: shower_rain_night, background: shower_rain_night_background, title:"shower rain"},
  {id: RAIN_DAY, src: rain_day, background: rain_day_background, title:"rain"},
  {id: RAIN_NIGHT, src: rain_night, background: rain_night_background, title:"rain"},
  {id: THUNDERSTORM_DAY, src:thunderstorm_day, background: thunderstorm_day_background, title:"thunderstorm"},
  {id: THUNDERSTORM_NIGHT, src:thunderstorm_night, background: thunderstorm_night_bacground, title:"thunderstorm"},
  {id: SNOW_DAY, src: snow_day, background: snow_day_background, title:"snow"},
  {id: SNOW_NIGHT, src: snow_night, background: snow_night_background, title:"snow"},
  {id: MIST_DAY, src:mist_day, background: mist_day_background, title:"mist"},
  {id: MIST_NIGHT, src:mist_night, background: mist_night_background, title:"mist"},
];


export default weatherIcons;
