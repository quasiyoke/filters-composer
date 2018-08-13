import * as R from 'ramda';

export const fetchPicture = url => new Promise((resolve, reject) => {
  const picture = new Image();
  picture.onload = R.partial(resolve, [picture]);
  picture.onerror = R.partial(reject, [picture]);
  picture.src = url;
});
