import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import brandConfig from 'config/brand';
import {
  ArrowRightOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  HddOutlined,
  RobotOutlined,
} from '@ant-design/icons';

const scanLine = keyframes`
  0% { top: 10%; opacity: 0; }
  12% { opacity: 0.8; }
  88% { opacity: 0.8; }
  100% { top: 86%; opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const Section = styled.section`
  position: relative;
  margin: 0;
  color: #e8f4ef;
  background: #06110d;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 4%, 100% 100%, 0 96%);
  margin-top: -1px;

  @media (max-width: 768px) {
    clip-path: polygon(0 0, 100% 2%, 100% 100%, 0 98%);
  }
`;

const Shell = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  min-height: clamp(560px, 72vh, 720px);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const Rail = styled(motion.aside)`
  position: relative;
  padding: clamp(64px, 9vw, 100px) clamp(20px, 3.5vw, 40px) clamp(72px, 8vw, 96px);
  background:
    linear-gradient(180deg, rgba(62, 224, 176, 0.08), transparent 40%),
    #07140f;
  border-right: 1px solid rgba(62, 224, 176, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 960px) {
    border-right: none;
    border-bottom: 1px solid rgba(62, 224, 176, 0.18);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(62, 224, 176, 0.06));
    clip-path: polygon(100% 0, 0 8%, 0 92%, 100% 100%);
    pointer-events: none;

    @media (max-width: 960px) {
      display: none;
    }
  }
`;

const Deck = styled(motion.div)`
  position: relative;
  padding: clamp(56px, 8vw, 88px) clamp(20px, 4vw, 48px);
  background-image:
    linear-gradient(rgba(62, 224, 176, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(62, 224, 176, 0.05) 1px, transparent 1px);
  background-size: 36px 36px;
  background-color: #081812;
  overflow: hidden;
`;

const Watermark = styled.div`
  pointer-events: none;
  position: absolute;
  left: 4%;
  bottom: 6%;
  font-family: Syne, ui-monospace, monospace;
  font-size: clamp(72px, 14vw, 160px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.85;
  color: rgba(62, 224, 176, 0.05);
  z-index: 0;
`;

const Index = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #3ee0b0;

  .tick {
    width: 8px;
    height: 8px;
    background: #3ee0b0;
    animation: ${pulse} 2.4s ease-in-out infinite;
  }
`;

const Title = styled(motion.h2)`
  margin: 0 0 14px;
  font-family: Syne, system-ui, sans-serif;
  font-size: clamp(34px, 5.5vw, 52px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 800;
  color: #fff;
`;

const Subtitle = styled(motion.p)`
  margin: 0 0 28px;
  max-width: 28rem;
  font-size: 15px;
  line-height: 1.65;
  color: rgba(232, 244, 239, 0.62);
`;

const Cta = styled(motion.button)`
  align-self: flex-start;
  height: 50px;
  padding: 0 22px;
  border: 1px solid #3ee0b0;
  border-radius: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #04140f;
  background: #3ee0b0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: transparent;
    color: #3ee0b0;
  }
`;

const DeckHead = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(62, 224, 176, 0.25);

  .kicker {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(62, 224, 176, 0.7);
  }

  .meta {
    font-size: 12px;
    color: rgba(232, 244, 239, 0.4);
  }
`;

const Rows = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 20px 0 20px 14px;
  border-left: 2px solid transparent;
  border-bottom: 1px solid rgba(62, 224, 176, 0.12);
  transition: border-color 0.25s ease, background 0.25s ease, padding-left 0.25s ease;

  &:hover {
    border-left-color: #3ee0b0;
    background: rgba(62, 224, 176, 0.05);
    padding-left: 18px;
  }

  .code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 12px;
    color: #3ee0b0;
  }

  .label {
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    margin-bottom: 4px;
  }

  .desc {
    font-size: 13px;
    line-height: 1.5;
    color: rgba(232, 244, 239, 0.55);
    max-width: 36rem;
  }

  .ico {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    color: #3ee0b0;
    font-size: 18px;
    background: rgba(62, 224, 176, 0.08);
    clip-path: polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%);
  }
`;

const Vault = styled(motion.div)`
  position: absolute;
  right: 6%;
  bottom: 8%;
  width: min(42%, 220px);
  aspect-ratio: 1.15;
  z-index: 0;
  opacity: 0.55;
  background: linear-gradient(160deg, rgba(12, 32, 26, 0.9), rgba(6, 17, 13, 0.95));
  border: 1px solid rgba(62, 224, 176, 0.22);
  clip-path: polygon(0 0, 100% 0, 100% 78%, 86% 100%, 0 100%);
  padding: 14px;
  display: none;

  @media (min-width: 1100px) {
    display: block;
  }

  .scan {
    position: absolute;
    left: 8%;
    right: 8%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #3ee0b0, transparent);
    animation: ${scanLine} 4s ease-in-out infinite;
  }

  .layer {
    height: 28px;
    margin-bottom: 8px;
    background: linear-gradient(90deg, rgba(62, 224, 176, 0.16), transparent);
    border-left: 2px solid #3ee0b0;
  }
`;

const FEATURES = [
  {
    icon: <CloudServerOutlined />,
    titleId: 'home.nas.feature.cloud.title',
    titleDef: '官方云盘',
    descId: 'home.nas.feature.cloud.desc',
    descDef: '隔离的个人空间，文件随手上云、随处可取。',
  },
  {
    icon: <HddOutlined />,
    titleId: 'home.nas.feature.local.title',
    titleDef: '本地共享',
    descId: 'home.nas.feature.local.desc',
    descDef: '客户端接入家里电脑文件夹，网页远程管理。',
  },
  {
    icon: <DatabaseOutlined />,
    titleId: 'home.nas.feature.warehouse.title',
    titleDef: '个人数仓',
    descId: 'home.nas.feature.warehouse.desc',
    descDef: '元数据、标签与时间线，让散落数据成为资产。',
  },
  {
    icon: <RobotOutlined />,
    titleId: 'home.nas.feature.ai.title',
    titleDef: 'AI 数据专家',
    descId: 'home.nas.feature.ai.desc',
    descDef: '问答、整理与检索——在权限边界内帮你打理数据。',
  },
];

export default function AimatexNasShowcase() {
  return (
    <Section id="aimatex-nas">
      <Shell>
        <Rail
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Index>
            <span className="tick" />
            <span>02</span>
            <span>/</span>
            <FormattedMessage id="home.nas.eyebrow" defaultMessage="AIMATEX Suite" />
          </Index>

          <Title>
            <FormattedMessage id="home.nas.title" defaultMessage="AIMATEX-NAS / Cloud" />
          </Title>

          <Subtitle>
            <FormattedMessage
              id="home.nas.subtitle"
              defaultMessage="个人数仓与云盘：把云端与本地数据汇成一座只属于你的仓库，让 AI 成为你的数据管理专家。"
            />
          </Subtitle>

          <Cta
            type="button"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(brandConfig.products.aimatexNas, '_blank', 'noopener,noreferrer')}
          >
            <CloudServerOutlined />
            <FormattedMessage id="home.nas.cta" defaultMessage="体验 AIMATEX-NAS" />
            <ArrowRightOutlined />
          </Cta>
        </Rail>

        <Deck
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <Watermark aria-hidden>NAS</Watermark>
          <Vault aria-hidden>
            <div className="scan" />
            <div className="layer" />
            <div className="layer" style={{ width: '88%' }} />
            <div className="layer" style={{ width: '72%' }} />
          </Vault>

          <DeckHead>
            <div className="kicker">DATA LAYERS // ONLINE</div>
            <div className="meta">AI READY</div>
          </DeckHead>

          <Rows
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {FEATURES.map((f, i) => (
              <Row
                key={f.titleId}
                variants={{
                  hidden: { opacity: 0, x: 18 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
              >
                <span className="code">L{i + 1}</span>
                <div>
                  <div className="label">
                    <FormattedMessage id={f.titleId} defaultMessage={f.titleDef} />
                  </div>
                  <div className="desc">
                    <FormattedMessage id={f.descId} defaultMessage={f.descDef} />
                  </div>
                </div>
                <div className="ico">{f.icon}</div>
              </Row>
            ))}
          </Rows>
        </Deck>
      </Shell>
    </Section>
  );
}
