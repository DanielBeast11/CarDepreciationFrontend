const TZ_OFFSET = (new Date()).getTimezoneOffset() * 60000;

export const DEFAULT_DATE_FORMATION_START = (new Date(new Date().setFullYear(new Date().getFullYear() - 1) - TZ_OFFSET)).toISOString().split('T')[0]
export const DEFAULT_DATE_FORMATION_END = (new Date(Date.now() - TZ_OFFSET)).toISOString().split('T')[0];
