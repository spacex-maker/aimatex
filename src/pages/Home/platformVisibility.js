/**
 * 主站板块与 Account 平台管理 code 的对应。
 * 公开接口 /api/site/platforms 只返回 enabled=true 的平台。
 * 没有对应平台的板块（Seedance、AI2Obj）不受开关控制。
 */
export const SECTION_PLATFORM_CODE = {
  seedance2: null,
  ai2obj: null,
  openrobotx: 'openrobotx',
  openclaw4j: 'chat',
  music: 'music',
  nas: 'nas',
  soul: 'soul',
  rank: 'rank',
  aimodel: 'aimodel',
};

export function isSectionVisible(section, gate) {
  const code = SECTION_PLATFORM_CODE[section];
  if (!code) return true;
  if (!gate?.loaded) return false;
  if (gate.failed) return true;
  return gate.codes.has(code);
}
