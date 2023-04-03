// export const ROOT = 'https://www.thereactshow.com';
export const ROOT = process.env.SITE_ROOT;
export const FEED_ROOT = `${ROOT}/api/feed`;
export const REACTORS = `${ROOT}/reactors`;
export const REACTORS_ACCOUNT = `${REACTORS}/account`;
export const PODCAST_PAGE_ROOT = `${ROOT}/podcast`;
export const EPISODE_FILE_ROOT = `${ROOT}/files/episodes`;
export const API_ROOT = '/api';
export const API_ADMIN_ROOT = `${API_ROOT}/admin`;
export const API_USERS = `${API_ADMIN_ROOT}/users`;

export const accountFeedURL = (uuid) => `${FEED_ROOT}/${uuid}.rss`;
export const accountUnsubscribeURL = (uuid) => `${REACTORS_ACCOUNT}/${uuid}/unsubscribe`;

export const podcastPage = (slug) => `${PODCAST_PAGE_ROOT}/${slug}`;
export const episodeFile = (filename) => `${EPISODE_FILE_ROOT}/${filename}`;
