// Define available disguise options
export const DISGUISE_OPTIONS = {
  NONE: 'none',
  CLEVER: 'clever',
  CLASSROOM: 'classroom',
  ABOUT_BLANK: 'about-blank'
};

// Configuration for each disguise option
export const DISGUISE_CONFIGS = {
  [DISGUISE_OPTIONS.NONE]: {
    title: 'SkTech',
    favicon: './img/Computer-980x980.png'
  },
  [DISGUISE_OPTIONS.CLEVER]: {
    title: 'Clever Portal',
    favicon: 'https://assets.clever.com/launchpad/favicon.ico'
  },
  [DISGUISE_OPTIONS.CLASSROOM]: {
    title: 'Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  [DISGUISE_OPTIONS.ABOUT_BLANK]: {
    title: 'about:blank',
    favicon: null
  }
};