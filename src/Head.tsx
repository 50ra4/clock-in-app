import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  og?: {
    url?: string;
    image?: string;
  };
};

const SITE_NAME = 'Clock in';
const DEFAULT_DESCRIPTION = `"${SITE_NAME}"はブラウザ上で勤怠管理ができるWebアプリケーション`;
const DEFAULT_IMAGE_FILEPATH = 'favicon.ico';

// eslint-disable-next-line complexity
export function Head({ title = SITE_NAME, description = DEFAULT_DESCRIPTION, og }: Props) {
  return (
    <Helmet>
      <title>{`${title} | ${description}`}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
      {/* OGP ここから */}
      <head prefix="og: http://ogp.me/ns#" />
      <meta property="og:url" content={og?.url || window.location.origin} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={og?.image || `${window.location.origin}/${DEFAULT_IMAGE_FILEPATH}`} />
    </Helmet>
  );
}
