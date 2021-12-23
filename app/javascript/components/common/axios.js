import Axios from 'axios';

function getTag(tagName) {
    const tags = [...document.getElementsByTagName('meta')];
    const tag = tags.filter(metaTag => metaTag.getAttribute('name') === tagName)[0];
    if (tag) {
        return tag.getAttribute('content');
    }
    return '';
}

export const AxiosInstance = () => Axios.create({
    headers: {
        common: {
            'X-CSRF-Token': getTag('csrf-token'),
            accept: 'application/json',
        },
    },
});
