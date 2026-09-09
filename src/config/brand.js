/**
 * 品牌配置
 * 统一管理所有品牌相关的名称、URL、邮箱等信息
 */

const brandConfig = {
  // 品牌名称
  name: 'AIMATEX',
  nameLowercase: 'aimatex',
  nameUppercase: 'AIMATEX',
  
  // 产品名称
  productName: 'AIMATEX',
  productNameFull: 'AIMATEX AI助手平台',
  
  // 网站信息
  siteUrl: 'https://aimatex.com',
  supportEmail: 'support@aimatex.com',

  // 主导航是否展示登录/注册（路由仍保留，便于直链访问）
  showAuthEntries: false,
  
  // SEO 默认信息
  seo: {
    defaultTitle: 'AIMATEX - AI助手、伴侣、伙伴',
    defaultDescription: 'AIMATEX 是您的AI助手、学习伙伴、创作伴侣。我们提供全方位的AI解决方案，让AI成为您工作、学习、创作中的最佳伙伴。',
    defaultImage: 'https://aimatex.com/landing.png',
  },
  
  // 版权信息
  copyright: {
    company: 'AIMATEX',
    year: new Date().getFullYear(),
  },
  
  // 社交媒体链接（如果需要）
  social: {
    github: 'https://github.com/aimatex',
    twitter: 'https://twitter.com/aimatex',
    discord: 'https://discord.gg/aimatex',
  },

  // 旗下产品外链
  products: {
    seedance2: 'https://seedance2.cn',
    ai2obj: 'https://ai2obj.com',
    openrobotx: 'https://openrobotx.com',
    openclaw4j: 'https://agent.aimatex.com',
    aimatexMusic: 'https://music.aimatex.com',
    aimatexNas: 'https://nas.aimatex.com',
  },
};

export default brandConfig;
