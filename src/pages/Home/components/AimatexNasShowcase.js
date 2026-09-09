import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import brandConfig from 'config/brand';
import {
  ArrowRightOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  HardDriveOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

const auroraDrift = keyframes`
  0% { transform: translate(-6%, -3%) scale(1); }
  50% { transform: translate(5%, 7%) scale(1.1); }
  100% { transform: translate(-6%, -3%) scale(1); }
`;

const orbitSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const sheen = keyframes`
  0% { transform: translateX(-120%) skewX(-18deg); }
  100% { transform: translateX(220%) skewX(-18deg); }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulseCore = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 0.95; transform: scale(1.06); }
`;

const scanLine = keyframes`
  0% { top: 12%; opacity: 0; }
  15% { opacity: 0.7; }
  85% { opacity: 0.7; }
  100% { top: 78%; opacity: 0; }
`;

const Section = styled.section`
  padding: 12px 24px 110px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4px 16px 72px;
  }
`;

const Panel = styled(motion.div)`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border-radius: 36px;
  min-height: clamp(520px, 62vh, 640px);
  padding: clamp(36px, 5vw, 64px);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(28px, 4vw, 56px);
  align-items: center;
  color: #eef5f1;
  background:
    radial-gradient(ellipse 75% 55% at 88% 18%, rgba(62, 224, 176, 0.22), transparent 55%),
    radial-gradient(ellipse 50% 45% at 8% 88%, rgba(56, 189, 248, 0.16), transparent 50%),
    linear-gradient(155deg, #070c0a 0%, #0d1613 42%, #081018 100%);
  border: 1px solid rgba(180, 205, 190, 0.12);
  box-shadow:
    0 40px 80px -28px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    min-height: auto;
    border-radius: 28px;
  }
`;

const Aurora = styled.div`
  pointer-events: none;
  position: absolute;
  inset: -20%;
  z-index: 0;
  background:
    radial-gradient(circle at 72% 28%, rgba(62, 224, 176, 0.32), transparent 42%),
    radial-gradient(circle at 18% 72%, rgba(56, 189, 248, 0.18), transparent 40%);
  filter: blur(48px);
  animation: ${auroraDrift} 15s ease-in-out infinite;
  opacity: 0.9;
`;

const Grid = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 75%);
  opacity: 0.55;
`;

const Copy = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const Eyebrow = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7dd3fc;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.35);
  margin-bottom: 20px;
  backdrop-filter: blur(12px);
`;

const Title = styled(motion.h2)`
  margin: 0 0 14px;
  font-family: Syne, system-ui, sans-serif;
  font-size: clamp(36px, 6.5vw, 58px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 800;
  background: linear-gradient(105deg, #fff 8%, #e8fff6 38%, #3ee0b0 72%, #38bdf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  margin: 0;
  max-width: 36rem;
  font-size: clamp(15px, 2.1vw, 18px);
  line-height: 1.65;
  color: rgba(238, 245, 241, 0.72);
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 32px 0 36px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled(motion.div)`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px 16px 16px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(62, 224, 176, 0.1);
    border-color: rgba(62, 224, 176, 0.35);
    transform: translateY(-3px);
  }

  .icon-wrap {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    color: #3ee0b0;
    background: rgba(62, 224, 176, 0.14);
    border: 1px solid rgba(62, 224, 176, 0.28);
    font-size: 16px;
  }

  .label {
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }

  .desc {
    font-size: 13px;
    line-height: 1.45;
    color: rgba(238, 245, 241, 0.58);
  }
`;

const Cta = styled(motion.button)`
  position: relative;
  overflow: hidden;
  height: 56px;
  padding: 0 34px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: #052018;
  background: linear-gradient(105deg, #3ee0b0 0%, #2dd4a8 55%, #0ea5e9 100%);
  box-shadow: 0 12px 32px rgba(62, 224, 176, 0.35);
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${sheen} 3.2s ease-in-out infinite;
  }

  &:hover {
    filter: brightness(1.06);
  }
`;

const Stage = styled(motion.div)`
  position: relative;
  z-index: 2;
  min-height: 340px;
  display: grid;
  place-items: center;
  animation: ${floatY} 7s ease-in-out infinite;

  @media (max-width: 960px) {
    min-height: 280px;
    order: -1;
  }
`;

const Orbit = styled.div`
  position: absolute;
  width: ${p => p.$size};
  height: ${p => p.$size};
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  animation: ${orbitSpin} ${p => p.$duration} linear infinite;
  animation-direction: ${p => p.$reverse || 'normal'};

  .bead {
    position: absolute;
    top: 0;
    left: 50%;
    width: 8px;
    height: 8px;
    margin: -4px 0 0 -4px;
    border-radius: 50%;
    background: ${p => p.$bead || '#3ee0b0'};
    box-shadow: 0 0 16px ${p => p.$bead || '#3ee0b0'};
  }
`;

const Vault = styled(motion.div)`
  position: relative;
  width: min(78%, 300px);
  aspect-ratio: 1;
  border-radius: 28px;
  background:
    linear-gradient(160deg, rgba(20, 40, 34, 0.95), rgba(8, 16, 20, 0.92));
  border: 1px solid rgba(62, 224, 176, 0.28);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 28px 60px rgba(0, 0, 0, 0.5),
    0 0 70px rgba(62, 224, 176, 0.16);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 18px 18px 16px;

  .scan {
    position: absolute;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(62, 224, 176, 0.85), transparent);
    animation: ${scanLine} 3.8s ease-in-out infinite;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    z-index: 1;
  }

  .badge {
    font-family: Syne, system-ui, sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.16em;
    color: #052018;
    background: linear-gradient(105deg, #3ee0b0, #38bdf8);
    padding: 4px 8px;
    border-radius: 8px;
  }

  .ai {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: rgba(238, 245, 241, 0.55);
    text-transform: uppercase;
  }

  .layers {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1;
  }

  .layer {
    height: 42px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(90deg, rgba(62, 224, 176, 0.14), rgba(255, 255, 255, 0.04));
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    color: rgba(238, 245, 241, 0.8);
    font-size: 12px;
    font-weight: 600;
  }

  .layer span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3ee0b0;
    box-shadow: 0 0 10px rgba(62, 224, 176, 0.7);
  }

  .layer:nth-child(2) {
    width: 92%;
    background: linear-gradient(90deg, rgba(56, 189, 248, 0.16), rgba(255, 255, 255, 0.04));
  }

  .layer:nth-child(2) span {
    background: #38bdf8;
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.7);
  }

  .layer:nth-child(3) {
    width: 84%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  }

  .core {
    position: absolute;
    right: 14%;
    bottom: 16%;
    width: 54px;
    height: 54px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    color: #052018;
    font-size: 22px;
    background: linear-gradient(145deg, #3ee0b0, #0ea5e9);
    box-shadow: 0 12px 28px rgba(62, 224, 176, 0.35);
    animation: ${pulseCore} 3.2s ease-in-out infinite;
    z-index: 2;
  }
`;

const GlowOrb = styled(motion.div)`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(62, 224, 176, 0.35), transparent 70%);
  filter: blur(8px);
  pointer-events: none;
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
    icon: <HardDriveOutlined />,
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
      <Panel
        initial={{ opacity: 0, y: 56, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <Aurora aria-hidden />
        <Grid aria-hidden />

        <Copy
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
          }}
        >
          <Eyebrow
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            <SafetyCertificateOutlined />
            <FormattedMessage id="home.nas.eyebrow" defaultMessage="AIMATEX Suite" />
          </Eyebrow>

          <Title
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
          >
            <FormattedMessage id="home.nas.title" defaultMessage="AIMATEX-NAS / Cloud" />
          </Title>

          <Subtitle
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <FormattedMessage
              id="home.nas.subtitle"
              defaultMessage="个人数仓与云盘：把云端与本地数据汇成一座只属于你的仓库，让 AI 成为你的数据管理专家。"
            />
          </Subtitle>

          <FeatureGrid
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {FEATURES.map((f) => (
              <Feature
                key={f.titleId}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 120, damping: 16 },
                  },
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="icon-wrap">{f.icon}</div>
                <div>
                  <div className="label">
                    <FormattedMessage id={f.titleId} defaultMessage={f.titleDef} />
                  </div>
                  <div className="desc">
                    <FormattedMessage id={f.descId} defaultMessage={f.descDef} />
                  </div>
                </div>
              </Feature>
            ))}
          </FeatureGrid>

          <Cta
            type="button"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(brandConfig.products.aimatexNas, '_blank', 'noopener,noreferrer')}
          >
            <CloudServerOutlined />
            <FormattedMessage id="home.nas.cta" defaultMessage="体验 AIMATEX-NAS" />
            <ArrowRightOutlined />
          </Cta>
        </Copy>

        <Stage
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <GlowOrb
            style={{ top: '10%', right: '16%' }}
            animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <GlowOrb
            style={{
              bottom: '14%',
              left: '12%',
              background: 'radial-gradient(circle, rgba(56,189,248,0.32), transparent 70%)',
            }}
            animate={{ scale: [1.1, 0.92, 1.1], opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <Orbit $size="92%" $duration="30s" $bead="#38bdf8">
            <span className="bead" />
          </Orbit>
          <Orbit $size="74%" $duration="20s" $reverse="reverse" $bead="#3ee0b0">
            <span className="bead" />
          </Orbit>
          <Orbit $size="56%" $duration="13s" $bead="#7dd3fc">
            <span className="bead" />
          </Orbit>

          <Vault whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
            <div className="scan" />
            <div className="head">
              <span className="badge">NAS</span>
              <span className="ai">AI Ready</span>
            </div>
            <div className="layers">
              <div className="layer"><span /> Cloud Drive</div>
              <div className="layer"><span /> Local Share</div>
              <div className="layer"><span /> Data Layer</div>
            </div>
            <div className="core">
              <RobotOutlined />
            </div>
          </Vault>
        </Stage>
      </Panel>
    </Section>
  );
}
