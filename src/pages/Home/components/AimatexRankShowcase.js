import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import brandConfig from 'config/brand';
import { ArrowRightOutlined, TableOutlined } from '@ant-design/icons';

const sweep = keyframes`
  0% { transform: translateY(-120%); opacity: 0; }
  18% { opacity: 1; }
  82% { opacity: 1; }
  100% { transform: translateY(420%); opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(61, 206, 194, 0); }
  50% { box-shadow: 0 0 22px 0 rgba(61, 206, 194, 0.35); }
`;

const Section = styled.section`
  position: relative;
  margin: 0;
  margin-top: -2px;
  color: #e7eef2;
  background: #07090d;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 4.5%, 100% 100%, 0 100%);

  @media (max-width: 768px) {
    clip-path: polygon(0 0, 100% 2.2%, 100% 100%, 0 100%);
  }
`;

const Field = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 48% 42% at 82% 22%, rgba(61, 206, 194, 0.16), transparent 62%),
    radial-gradient(ellipse 36% 40% at 8% 86%, rgba(148, 163, 184, 0.1), transparent 58%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 28%);
`;

const Rules = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(231, 238, 242, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(231, 238, 242, 0.035) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 80% 70% at 70% 40%, #000 10%, transparent 72%);
`;

const Watermark = styled.div`
  pointer-events: none;
  position: absolute;
  right: -2%;
  top: 38%;
  transform: translateY(-50%);
  font-family: Syne, system-ui, sans-serif;
  font-size: clamp(120px, 22vw, 300px);
  font-weight: 800;
  letter-spacing: -0.08em;
  color: rgba(231, 238, 242, 0.035);
  z-index: 0;
  line-height: 0.8;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(88px, 12vw, 140px) clamp(20px, 4vw, 48px) clamp(96px, 11vw, 140px);
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(36px, 5vw, 72px);
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled(motion.div)``;

const Index = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  font-family: Syne, system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7ee8df;

  .slash {
    width: 1px;
    height: 14px;
    background: rgba(126, 232, 223, 0.5);
    transform: rotate(18deg);
  }
`;

const Title = styled(motion.h2)`
  margin: 0 0 18px;
  font-family: Syne, system-ui, sans-serif;
  font-size: clamp(42px, 7vw, 72px);
  line-height: 0.96;
  letter-spacing: -0.045em;
  font-weight: 800;
  color: #fff;

  em {
    font-style: normal;
    background: linear-gradient(105deg, #e7eef2 10%, #7ee8df 55%, #3dcec2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled(motion.p)`
  margin: 0 0 26px;
  max-width: 36rem;
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.65;
  color: rgba(231, 238, 242, 0.68);
`;

const Chips = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
`;

const Chip = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(231, 238, 242, 0.78);
  border: 1px solid rgba(126, 232, 223, 0.28);
  background: rgba(61, 206, 194, 0.06);
  padding: 6px 10px;
`;

const Manifesto = styled(motion.div)`
  display: grid;
  gap: 0;
  margin-bottom: 36px;
  border-top: 1px solid rgba(126, 232, 223, 0.22);
`;

const Line = styled(motion.div)`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(231, 238, 242, 0.08);

  .n {
    font-family: Syne, system-ui, sans-serif;
    font-size: 13px;
    font-weight: 800;
    color: #7ee8df;
    padding-top: 2px;
  }

  .h {
    font-weight: 700;
    font-size: 15px;
    color: #fff;
    margin-bottom: 4px;
  }

  .p {
    font-size: 13px;
    line-height: 1.5;
    color: rgba(231, 238, 242, 0.55);
  }
`;

const Cta = styled(motion.button)`
  height: 54px;
  padding: 0 26px 0 28px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #041614;
  background: linear-gradient(105deg, #d7f7f3 0%, #3dcec2 48%, #1aa89c 100%);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 100%, 0 100%);

  &:hover {
    filter: brightness(1.06);
  }
`;

const Stage = styled(motion.div)`
  position: relative;
  min-height: 420px;

  @media (max-width: 960px) {
    min-height: auto;
    order: -1;
  }
`;

const Board = styled.div`
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(18, 26, 30, 0.96), rgba(8, 12, 14, 0.96));
  border: 1px solid rgba(126, 232, 223, 0.22);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
  clip-path: polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px);

  .scan {
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    height: 72px;
    background: linear-gradient(180deg, transparent, rgba(61, 206, 194, 0.16), transparent);
    animation: ${sweep} 5.6s ease-in-out infinite;
    z-index: 2;
  }
`;

const BoardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(231, 238, 242, 0.08);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(231, 238, 242, 0.45);

  strong {
    color: #7ee8df;
    font-weight: 800;
    letter-spacing: 0.18em;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1fr 1fr;
`;

const Cell = styled.div`
  padding: 16px 14px;
  border-top: 1px solid rgba(231, 238, 242, 0.06);
  border-left: 1px solid rgba(231, 238, 242, 0.06);
  min-height: 72px;

  &:nth-child(3n + 1) {
    border-left: none;
    color: rgba(231, 238, 242, 0.45);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }

  .brand {
    display: block;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(231, 238, 242, 0.42);
    margin-bottom: 6px;
  }

  .model {
    font-family: Syne, system-ui, sans-serif;
    font-weight: 800;
    font-size: 16px;
    letter-spacing: -0.03em;
    color: #fff;
  }

  .val {
    font-family: Syne, system-ui, sans-serif;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.03em;
    color: #e7eef2;
  }

  &.lead .val {
    color: #7ee8df;
    animation: ${pulse} 3.4s ease-in-out infinite;
  }
`;

const Foot = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px 16px;
  border-top: 1px solid rgba(231, 238, 242, 0.08);
  font-size: 12px;
  color: rgba(231, 238, 242, 0.48);

  span:last-child {
    color: #7ee8df;
    font-weight: 700;
    letter-spacing: 0.08em;
  }
`;

const POINTS = [
  {
    titleId: 'home.rank.feature.sheet.title',
    titleDef: '同一张表',
    descId: 'home.rank.feature.sheet.desc',
    descDef: '一次挑选 2 到 4 个型号，规格并排，差别一眼能看清。',
  },
  {
    titleId: 'home.rank.feature.industries.title',
    titleDef: '多行业品类',
    descId: 'home.rank.feature.industries.desc',
    descDef: '从处理器到手机、家电、出行和运动，同一套对照方式。',
  },
  {
    titleId: 'home.rank.feature.specs.title',
    titleDef: '参数拆开存',
    descId: 'home.rank.feature.specs.desc',
    descDef: '品类、参数定义、型号和取值分开，对照项可以持续加厚。',
  },
  {
    titleId: 'home.rank.feature.open.title',
    titleDef: '先看处理器',
    descId: 'home.rank.feature.open.desc',
    descDef: '目前开放 Intel 与 AMD 桌面 CPU，其余品类沿用同一张表。',
  },
];

const INDUSTRIES = [
  ['home.rank.industry.compute', '计算'],
  ['home.rank.industry.carry', '随身设备'],
  ['home.rank.industry.image', '影像'],
  ['home.rank.industry.audio', '音频'],
  ['home.rank.industry.desk', '桌面外设'],
  ['home.rank.industry.home', '家电'],
  ['home.rank.industry.net', '网络'],
  ['home.rank.industry.move', '出行'],
  ['home.rank.industry.sport', '运动'],
];

const ROWS = [
  ['Cores', '24', '16'],
  ['Boost', '6.0 GHz', '5.7 GHz'],
  ['Cache', '36 MB', '80 MB'],
  ['TDP', '125 W', '170 W'],
];

export default function AimatexRankShowcase() {
  return (
    <Section id="aimatex-rank">
      <Field aria-hidden />
      <Rules aria-hidden />
      <Watermark aria-hidden>RANK</Watermark>

      <Inner>
        <Copy
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          <Index variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <span>04</span>
            <span className="slash" />
            <FormattedMessage id="home.rank.eyebrow" defaultMessage="AIMATEX Suite" />
          </Index>

          <Title variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}>
            AIMATEX <em>Rank</em>
          </Title>

          <Subtitle variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            <FormattedMessage
              id="home.rank.subtitle"
              defaultMessage="多行业产品对照台。把不同型号摆在同一张表上，看清核心、频率、缓存和功耗。"
            />
          </Subtitle>

          <Chips variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            {INDUSTRIES.map(([id, label]) => (
              <Chip key={id}>
                <FormattedMessage id={id} defaultMessage={label} />
              </Chip>
            ))}
          </Chips>

          <Manifesto variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
            {POINTS.map((p, i) => (
              <Line
                key={p.titleId}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              >
                <span className="n">0{i + 1}</span>
                <div>
                  <div className="h">
                    <FormattedMessage id={p.titleId} defaultMessage={p.titleDef} />
                  </div>
                  <div className="p">
                    <FormattedMessage id={p.descId} defaultMessage={p.descDef} />
                  </div>
                </div>
              </Line>
            ))}
          </Manifesto>

          <Cta
            type="button"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(brandConfig.products.aimatexRank, '_blank', 'noopener,noreferrer')}
          >
            <TableOutlined />
            <FormattedMessage id="home.rank.cta" defaultMessage="打开对照台" />
            <ArrowRightOutlined />
          </Cta>
        </Copy>

        <Stage
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <Board>
            <div className="scan" />
            <BoardHead>
              <strong>CPU</strong>
              <span>2 models · side by side</span>
            </BoardHead>
            <Table>
              <Cell />
              <Cell>
                <span className="brand">Intel</span>
                <span className="model">Core i9-14900K</span>
              </Cell>
              <Cell>
                <span className="brand">AMD</span>
                <span className="model">Ryzen 9 9950X</span>
              </Cell>
              {ROWS.map(([label, a, b]) => (
                <React.Fragment key={label}>
                  <Cell>{label}</Cell>
                  <Cell className={label === 'Boost' ? 'lead' : ''}><span className="val">{a}</span></Cell>
                  <Cell className={label === 'Cache' ? 'lead' : ''}><span className="val">{b}</span></Cell>
                </React.Fragment>
              ))}
            </Table>
            <Foot>
              <span>
                <FormattedMessage id="home.rank.board.meta" defaultMessage="计算 · 处理器" />
              </span>
              <span>COMPARE</span>
            </Foot>
          </Board>
        </Stage>
      </Inner>
    </Section>
  );
}
