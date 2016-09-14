import {curry, compose, map, trace} from '../shared/util.js';

import $ from 'jquery';

const Impure = {
    getJSON: curry((callback, url) => $.getJSON(url, callback)),
    setHTML: curry((sel, html) => $(sel).html(html)),
};

const url = (term) => 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
    term + '&format=json&jsoncallback=?';

const app = compose(Impure.getJSON(trace('response')), url);

app('cats');
