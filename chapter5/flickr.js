import {curry, compose, map, trace, prop} from '../shared/util.js';

import $ from 'jquery';

const Impure = {
    getJSON: curry((callback, url) => $.getJSON(url, callback)),
    setHTML: curry((sel, html) => $(sel).html(html)),
};

const url = (term) => 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
    term + '&format=json&jsoncallback=?';

const img = (url) => $(`<img src="${url}"/>`);

const mediaUrl = compose(prop('m'), prop('media'));
const srcs = compose(map(mediaUrl), prop('items'));
const images = compose(map(img), srcs);
const renderImages = compose(Impure.setHTML('body'), images);

const app = compose(Impure.getJSON(renderImages), url);

app('cats');
