import {curry, compose, map, trace, prop} from './util.js';

import $ from 'jquery';

const Impure = {
    getJSON: curry((callback, url) => $.getJSON(url, callback)),
    setHTML: curry((sel, html) => $(sel).html(html)),
};

const url = (term) => 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
    term + '&format=json&jsoncallback=?';

const img = (url) => $(`<img src="${url}"/>`);

const extractUrl = compose(prop('m'), prop('media'));
const mediaToImg = compose(img, extractUrl);
const images = compose(map(mediaToImg), prop('items'));

const renderImages = compose(Impure.setHTML('body'), images);

const app = compose(Impure.getJSON(renderImages), url);

app('cats');
