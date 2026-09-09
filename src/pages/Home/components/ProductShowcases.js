import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import brandConfig from 'config/brand';
import {
  ArrowRightOutlined,
  BlockOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  ExperimentOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  ApiOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  RadarChartOutlined,
  CloudServerOutlined,
  HardDriveOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

const auroraDrift = keyframes`
  0% { transform: translate(-6%, -4%) scale(1); }
  50% { transform: translate(5%, 7%) scale(1.1); }
  100% { transform: translate(-6%, -4%) scale(1); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const scan = keyframes`
  0% { top: 8%; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { top: 88%; opacity: 0; }
`;

const sheen = keyframes`
  0% { transform: translateX(-120%) skewX(-18deg); }
  100% { transform: translateX(220%) skewX(-18deg); }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.85); opacity: 0.7; }
  70% { transform: scale(1.25); opacity: 0; }
  100% { opacity: 0; }
`;

const nodePulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.35); opacity: 1; }
`;

const Section = styled.section`
  padding: 12px 24px 28px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 8px 16px 20px;
  }
`;

const Intro = styled.div`
  text-align: center;
  padding: 48px 16px 36px;

  h2 {
    margin: 0 0 12px;
    font-size: clamp(32px, 5vw, 48px);
    letter-spacing: -0.02em;
    color: ${p => (p.$dark ? '#fff' : '#000')};
  }

  p {
    margin: 0 auto;
    max-width: 36rem;
    font-size: 18px;
    color: ${p => (p.$dark ? '#86868b' : '#6e6e73')};
  }
`;

const Panel = styled(motion.div)`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border-radius: 36px;
  min-height: clamp(480px, 56vh, 600px);
  padding: clamp(32px, 4.5vw, 56px);
  display: grid;
  grid-template-columns: ${p => (p.$flip ? '0.95fr 1.05fr' : '1.05fr 0.95fr')};
  gap: clamp(24px, 4vw, 52px);
  align-items: center;
  color: #f5f5f7;
  background:
    radial-gradient(ellipse 75% 55% at ${p => (p.$flip ? '15%' : '85%')} 18%, ${p => p.$glow}, transparent 55%),
    radial-gradient(ellipse 50% 45% at ${p => (p.$flip ? '85%' : '12%')} 88%, ${p => p.$glow2}, transparent 50%),
    linear-gradient(155deg, #0b0b0f 0%, #12141a 45%, #0a1018 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 36px 72px -28px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  margin-bottom: 28px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    min-height: auto;
    border-radius: 28px;
  }
`;

const Aurora = styled.div`
  pointer-events: none;
  position: absolute;
  inset: -25%;
  z-index: 0;
  background:
    radial-gradient(circle at 70% 28%, ${p => p.$a}, transparent 42%),
    radial-gradient(circle at 22% 72%, ${p => p.$b}, transparent 40%);
  filter: blur(48px);
  animation: ${auroraDrift} 14s ease-in-out infinite;
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
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 15%, transparent 75%);
`;

const Copy = styled(motion.div)`
  position: relative;
  z-index: 2;
  order: ${p => (p.$flip ? 2 : 1)};

  @media (max-width: 960px) {
    order: 2;
  }
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
  color: ${p => p.$accentSoft};
  background: ${p => p.$accentBg};
  border: 1px solid ${p => p.$accentBorder};
  margin-bottom: 18px;
`;

const Title = styled(motion.h3)`
  margin: 0 0 12px;
  font-size: clamp(34px, 5.5vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.035em;
  font-weight: 800;
  background: ${p => p.$grad};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  margin: 0;
  max-width: 34rem;
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.55;
  color: rgba(245, 245, 247, 0.7);
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 28px 0 32px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled(motion.div)`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;

  &:hover {
    background: ${p => p.$hoverBg};
    border-color: ${p => p.$hoverBorder};
    transform: translateY(-3px);
  }

  .icon-wrap {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 11px;
    display: grid;
    place-items: center;
    color: ${p => p.$accent};
    background: ${p => p.$accentBg};
    border: 1px solid ${p => p.$accentBorder};
    font-size: 15px;
  }

  .label {
    font-weight: 700;
    font-size: 13px;
    color: #fff;
    margin-bottom: 2px;
  }

  .desc {
    font-size: 12.5px;
    line-height: 1.45;
    color: rgba(245, 245, 247, 0.55);
  }
`;

const Cta = styled(motion.button)`
  position: relative;
  overflow: hidden;
  height: 52px;
  padding: 0 28px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background: ${p => p.$grad};
  box-shadow: 0 12px 28px ${p => p.$shadow};
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 38%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.32), transparent);
    animation: ${sheen} 3.4s ease-in-out infinite;
  }
`;

const Stage = styled(motion.div)`
  position: relative;
  z-index: 2;
  min-height: 300px;
  display: grid;
  place-items: center;
  order: ${p => (p.$flip ? 1 : 2)};

  @media (max-width: 960px) {
    order: 1;
    min-height: 260px;
  }
`;

/* --- Seedance visual: film frame + scan --- */
const FilmFrame = styled.div`
  position: relative;
  width: min(78%, 300px);
  aspect-ratio: 16 / 10;
  border-radius: 18px;
  background: linear-gradient(145deg, #1a2332, #0d121a);
  border: 1px solid rgba(59, 130, 246, 0.35);
  box-shadow: 0 24px 50px rgba(37, 99, 235, 0.28), 0 0 60px rgba(59, 130, 246, 0.15);
  overflow: hidden;
  animation: ${floatY} 5s ease-in-out infinite;

  .still {
    position: absolute;
    inset: 14px;
    border-radius: 12px;
    background:
      linear-gradient(135deg, rgba(59, 130, 246, 0.35), transparent 50%),
      linear-gradient(225deg, rgba(147, 197, 253, 0.2), transparent 45%),
      #152033;
  }

  .scanline {
    position: absolute;
    left: 14px;
    right: 14px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #60a5fa, transparent);
    box-shadow: 0 0 12px #3b82f6;
    animation: ${scan} 2.8s ease-in-out infinite;
  }

  .badge {
    position: absolute;
    right: 18px;
    bottom: 18px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.9);
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 18px;
  }
`;

/* --- AI2Obj visual: wire cube --- */
const CubeWrap = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  perspective: 700px;
  animation: ${floatY} 6s ease-in-out infinite;
`;

const Cube = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${spin} 14s linear infinite;

  .face {
    position: absolute;
    inset: 28px;
    border: 1.5px solid rgba(0, 212, 170, 0.65);
    background: rgba(0, 212, 170, 0.08);
    box-shadow: inset 0 0 24px rgba(0, 212, 170, 0.15);
  }
  .f1 { transform: translateZ(72px); }
  .f2 { transform: rotateY(180deg) translateZ(72px); }
  .f3 { transform: rotateY(90deg) translateZ(72px); }
  .f4 { transform: rotateY(-90deg) translateZ(72px); }
  .f5 { transform: rotateX(90deg) translateZ(72px); }
  .f6 { transform: rotateX(-90deg) translateZ(72px); }
`;

/* --- OpenRobotX visual: radar --- */
const Radar = styled.div`
  position: relative;
  width: min(72%, 260px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.12), transparent 60%);
  border: 1px solid rgba(255, 107, 107, 0.35);
  display: grid;
  place-items: center;
  box-shadow: 0 0 60px rgba(255, 107, 107, 0.2);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 18%;
    border-radius: 50%;
    border: 1px dashed rgba(255, 107, 107, 0.35);
  }
  &::after {
    inset: 34%;
    animation: ${pulseRing} 2.4s ease-out infinite;
    border-style: solid;
  }

  .core {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(145deg, #ff8a8a, #ff6b6b);
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 26px;
    box-shadow: 0 0 28px rgba(255, 107, 107, 0.55);
    animation: ${floatY} 4s ease-in-out infinite;
  }
`;

/* --- OpenClaw visual: nodes --- */
const NodeNet = styled.div`
  position: relative;
  width: min(78%, 280px);
  aspect-ratio: 1;

  .line {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.7), transparent);
    transform-origin: left center;
  }
  .n {
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #a78bfa;
    box-shadow: 0 0 16px #8b5cf6;
    animation: ${nodePulse} 2s ease-in-out infinite;
  }
  .hub {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 64px;
    height: 64px;
    margin: -32px 0 0 -32px;
    border-radius: 20px;
    background: linear-gradient(145deg, #8b5cf6, #6d28d9);
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 26px;
    box-shadow: 0 16px 40px rgba(109, 40, 217, 0.45);
  }
`;

/* --- NAS visual: vault --- */
const VaultMini = styled.div`
  position: relative;
  width: min(78%, 280px);
  aspect-ratio: 1;
  border-radius: 24px;
  padding: 18px;
  background: linear-gradient(160deg, rgba(16, 36, 30, 0.95), rgba(8, 16, 20, 0.92));
  border: 1px solid rgba(62, 224, 176, 0.3);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45), 0 0 48px rgba(62, 224, 176, 0.14);
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${floatY} 5.5s ease-in-out infinite;

  .row {
    height: 36px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(90deg, rgba(62, 224, 176, 0.16), rgba(255, 255, 255, 0.04));
  }
  .row:nth-child(2) {
    width: 90%;
    background: linear-gradient(90deg, rgba(56, 189, 248, 0.16), rgba(255, 255, 255, 0.04));
  }
  .row:nth-child(3) {
    width: 78%;
  }
  .core {
    margin-top: auto;
    align-self: flex-end;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    color: #052018;
    font-size: 20px;
    background: linear-gradient(145deg, #3ee0b0, #0ea5e9);
    box-shadow: 0 10px 24px rgba(62, 224, 176, 0.35);
  }
`;

const PRODUCTS = [
  {
    id: 'seedance2',
    href: brandConfig.products.seedance2,
    flip: false,
    accent: '#3b82f6',
    accentSoft: '#93c5fd',
    accentBg: 'rgba(59,130,246,0.14)',
    accentBorder: 'rgba(59,130,246,0.35)',
    glow: 'rgba(59,130,246,0.28)',
    glow2: 'rgba(14,165,233,0.16)',
    auroraA: 'rgba(59,130,246,0.35)',
    auroraB: 'rgba(56,189,248,0.2)',
    titleGrad: 'linear-gradient(105deg, #fff 8%, #93c5fd 48%, #3b82f6 95%)',
    ctaGrad: 'linear-gradient(105deg, #3b82f6 0%, #2563eb 55%, #1d4ed8 100%)',
    ctaShadow: 'rgba(37,99,235,0.4)',
    hoverBg: 'rgba(59,130,246,0.1)',
    hoverBorder: 'rgba(59,130,246,0.35)',
    Icon: VideoCameraOutlined,
    visual: 'film',
  },
  {
    id: 'ai2obj',
    href: brandConfig.products.ai2obj,
    flip: true,
    accent: '#00d4aa',
    accentSoft: '#5eead4',
    accentBg: 'rgba(0,212,170,0.14)',
    accentBorder: 'rgba(0,212,170,0.35)',
    glow: 'rgba(0,212,170,0.26)',
    glow2: 'rgba(45,212,191,0.14)',
    auroraA: 'rgba(0,212,170,0.32)',
    auroraB: 'rgba(34,197,94,0.16)',
    titleGrad: 'linear-gradient(105deg, #fff 8%, #5eead4 48%, #00d4aa 95%)',
    ctaGrad: 'linear-gradient(105deg, #00d4aa 0%, #0d9488 55%, #0f766e 100%)',
    ctaShadow: 'rgba(13,148,136,0.4)',
    hoverBg: 'rgba(0,212,170,0.1)',
    hoverBorder: 'rgba(0,212,170,0.35)',
    Icon: BlockOutlined,
    visual: 'cube',
  },
  {
    id: 'openrobotx',
    href: brandConfig.products.openrobotx,
    flip: false,
    accent: '#ff6b6b',
    accentSoft: '#fda4af',
    accentBg: 'rgba(255,107,107,0.14)',
    accentBorder: 'rgba(255,107,107,0.35)',
    glow: 'rgba(255,107,107,0.26)',
    glow2: 'rgba(251,113,133,0.14)',
    auroraA: 'rgba(255,107,107,0.32)',
    auroraB: 'rgba(244,63,94,0.16)',
    titleGrad: 'linear-gradient(105deg, #fff 8%, #fda4af 48%, #ff6b6b 95%)',
    ctaGrad: 'linear-gradient(105deg, #ff6b6b 0%, #ef4444 55%, #dc2626 100%)',
    ctaShadow: 'rgba(239,68,68,0.4)',
    hoverBg: 'rgba(255,107,107,0.1)',
    hoverBorder: 'rgba(255,107,107,0.35)',
    Icon: RobotOutlined,
    visual: 'radar',
  },
  {
    id: 'openclaw4j',
    href: brandConfig.products.openclaw4j,
    flip: true,
    accent: '#8b5cf6',
    accentSoft: '#c4b5fd',
    accentBg: 'rgba(139,92,246,0.14)',
    accentBorder: 'rgba(139,92,246,0.35)',
    glow: 'rgba(139,92,246,0.28)',
    glow2: 'rgba(167,139,250,0.14)',
    auroraA: 'rgba(139,92,246,0.34)',
    auroraB: 'rgba(99,102,241,0.16)',
    titleGrad: 'linear-gradient(105deg, #fff 8%, #c4b5fd 48%, #8b5cf6 95%)',
    ctaGrad: 'linear-gradient(105deg, #8b5cf6 0%, #7c3aed 55%, #6d28d9 100%)',
    ctaShadow: 'rgba(124,58,237,0.4)',
    hoverBg: 'rgba(139,92,246,0.1)',
    hoverBorder: 'rgba(139,92,246,0.35)',
    Icon: ThunderboltOutlined,
    visual: 'nodes',
  },
  {
    id: 'aimatexNas',
    href: brandConfig.products.aimatexNas,
    flip: false,
    accent: '#3ee0b0',
    accentSoft: '#7dd3fc',
    accentBg: 'rgba(62,224,176,0.14)',
    accentBorder: 'rgba(62,224,176,0.35)',
    glow: 'rgba(62,224,176,0.26)',
    glow2: 'rgba(56,189,248,0.16)',
    auroraA: 'rgba(62,224,176,0.32)',
    auroraB: 'rgba(56,189,248,0.18)',
    titleGrad: 'linear-gradient(105deg, #fff 8%, #e8fff6 40%, #3ee0b0 72%, #38bdf8 100%)',
    ctaGrad: 'linear-gradient(105deg, #14b8a6 0%, #0d9488 50%, #0284c7 100%)',
    ctaShadow: 'rgba(13,148,136,0.4)',
    hoverBg: 'rgba(62,224,176,0.1)',
    hoverBorder: 'rgba(62,224,176,0.35)',
    Icon: CloudServerOutlined,
    visual: 'vault',
  },
];

const FEATURE_ICONS = {
  seedance2: [<PictureOutlined />, <PlayCircleOutlined />, <ExperimentOutlined />, <ApartmentOutlined />],
  ai2obj: [<BlockOutlined />, <DeploymentUnitOutlined />, <ApiOutlined />, <ClusterOutlined />],
  openrobotx: [<GlobalOutlined />, <RadarChartOutlined />, <ApartmentOutlined />, <RobotOutlined />],
  openclaw4j: [<ThunderboltOutlined />, <ApiOutlined />, <ClusterOutlined />, <DeploymentUnitOutlined />],
  aimatexNas: [<CloudServerOutlined />, <HardDriveOutlined />, <DatabaseOutlined />, <RobotOutlined />],
};

function Visual({ type, Icon }) {
  if (type === 'film') {
    return (
      <FilmFrame>
        <div className="still" />
        <div className="scanline" />
        <div className="badge"><PlayCircleOutlined /></div>
      </FilmFrame>
    );
  }
  if (type === 'cube') {
    return (
      <CubeWrap>
        <Cube>
          <div className="face f1" /><div className="face f2" />
          <div className="face f3" /><div className="face f4" />
          <div className="face f5" /><div className="face f6" />
        </Cube>
      </CubeWrap>
    );
  }
  if (type === 'radar') {
    return (
      <Radar>
        <div className="core"><Icon /></div>
      </Radar>
    );
  }
  if (type === 'vault') {
    return (
      <VaultMini>
        <div className="row" />
        <div className="row" />
        <div className="row" />
        <div className="core"><CloudServerOutlined /></div>
      </VaultMini>
    );
  }
  return (
    <NodeNet>
      <div className="hub"><ThunderboltOutlined /></div>
      <div className="n" style={{ left: '18%', top: '22%', animationDelay: '0s' }} />
      <div className="n" style={{ left: '78%', top: '18%', animationDelay: '0.3s' }} />
      <div className="n" style={{ left: '82%', top: '68%', animationDelay: '0.6s' }} />
      <div className="n" style={{ left: '14%', top: '72%', animationDelay: '0.9s' }} />
      <div className="n" style={{ left: '50%', top: '10%', animationDelay: '0.45s' }} />
    </NodeNet>
  );
}

function ShowcaseCard({ product, dark }) {
  const { id, Icon } = product;
  const item = {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 16 },
    },
  };

  return (
    <Panel
      $flip={product.flip}
      $glow={product.glow}
      $glow2={product.glow2}
      initial={{ opacity: 0, y: 52, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      id={`product-${id}`}
    >
      <Aurora $a={product.auroraA} $b={product.auroraB} aria-hidden />
      <Grid aria-hidden />

      <Copy
        $flip={product.flip}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }}
      >
        <Eyebrow
          $accentSoft={product.accentSoft}
          $accentBg={product.accentBg}
          $accentBorder={product.accentBorder}
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
        >
          <Icon />
          <FormattedMessage id={`home.showcase.${id}.eyebrow`} defaultMessage="AIMATEX Product" />
        </Eyebrow>

        <Title
          $grad={product.titleGrad}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <FormattedMessage id={`home.showcase.${id}.title`} defaultMessage={id} />
        </Title>

        <Subtitle variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
          <FormattedMessage
            id={`home.showcase.${id}.subtitle`}
            defaultMessage="A flagship experience in the AIMATEX product family."
          />
        </Subtitle>

        <FeatureGrid variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
          {[1, 2, 3, 4].map((n, i) => (
            <Feature
              key={n}
              variants={item}
              $accent={product.accent}
              $accentBg={product.accentBg}
              $accentBorder={product.accentBorder}
              $hoverBg={product.hoverBg}
              $hoverBorder={product.hoverBorder}
            >
              <div className="icon-wrap">{FEATURE_ICONS[id][i]}</div>
              <div>
                <div className="label">
                  <FormattedMessage id={`home.showcase.${id}.f${n}.title`} defaultMessage={`Feature ${n}`} />
                </div>
                <div className="desc">
                  <FormattedMessage id={`home.showcase.${id}.f${n}.desc`} defaultMessage="Crafted for creators and teams." />
                </div>
              </div>
            </Feature>
          ))}
        </FeatureGrid>

        <Cta
          type="button"
          $grad={product.ctaGrad}
          $shadow={product.ctaShadow}
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(product.href, '_blank', 'noopener,noreferrer')}
        >
          <FormattedMessage id={`home.showcase.${id}.cta`} defaultMessage="Learn more" />
          <ArrowRightOutlined />
        </Cta>
      </Copy>

      <Stage
        $flip={product.flip}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.1 }}
        aria-hidden
      >
        <Visual type={product.visual} Icon={Icon} />
      </Stage>
    </Panel>
  );
}

export default function ProductShowcases({ dark }) {
  return (
    <>
      <Intro $dark={dark}>
        <h2>
          <FormattedMessage id="home.products.title" defaultMessage="Our Products" />
        </h2>
        <p>
          <FormattedMessage
            id="home.products.subtitle"
            defaultMessage="Explore innovative AI products under AIMATEX."
          />
        </p>
      </Intro>
      <Section>
        {PRODUCTS.map((p) => (
          <ShowcaseCard key={p.id} product={p} dark={dark} />
        ))}
      </Section>
    </>
  );
}
