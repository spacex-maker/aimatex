import React, { useContext } from 'react';
import styled, { ThemeContext, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  ApiOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  GlobalOutlined,
  CustomerServiceOutlined,
  ArrowRightOutlined,
  AppstoreOutlined,
  PayCircleOutlined,
  CloudServerOutlined,
} from '@ant-design/icons';
import SimpleHeader from 'components/headers/simple';
import brandConfig from 'config/brand';

// --- Animations ---
const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.85); opacity: 0.65; }
  70% { transform: scale(1.35); opacity: 0; }
  100% { opacity: 0; }
`;

const dashFlow = keyframes`
  to { stroke-dashoffset: -24; }
`;

const barBounce = keyframes`
  0%, 100% { transform: scaleY(0.35); }
  50% { transform: scaleY(1); }
`;

const wave = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const meterFill = keyframes`
  0%, 100% { width: 42%; }
  50% { width: 78%; }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.45; }
  50% { opacity: 0.9; }
`;

const nodeBlink = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.25); }
`;

const sheen = keyframes`
  0% { transform: translateX(-120%) skewX(-16deg); }
  100% { transform: translateX(220%) skewX(-16deg); }
`;

const auroraDrift = keyframes`
  0% { transform: translate(-4%, -3%) scale(1); }
  50% { transform: translate(5%, 6%) scale(1.08); }
  100% { transform: translate(-4%, -3%) scale(1); }
`;

const spinCw = keyframes`
  to { transform: rotate(360deg); }
`;

const spinCcw = keyframes`
  to { transform: rotate(-360deg); }
`;

// --- Layout ---
const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background: ${p => (p.$dark ? '#07090f' : '#f4f6fb')};
  color: ${p => (p.$dark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.88)')};
`;

const BgGlow = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    animation: ${floatY} 18s ease-in-out infinite;
  }

  &::before {
    top: -12%;
    right: -8%;
    width: 520px;
    height: 520px;
    background: ${p =>
      p.$dark
        ? 'radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)'
        : 'radial-gradient(circle, rgba(59,130,246,0.14), transparent 70%)'};
  }

  &::after {
    bottom: -18%;
    left: -10%;
    width: 460px;
    height: 460px;
    background: ${p =>
      p.$dark
        ? 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)'
        : 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)'};
    animation-direction: reverse;
  }
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  padding: 108px 20px 72px;

  @media (min-width: 768px) {
    padding: 128px 28px 96px;
  }
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 18px;
  color: ${p => (p.$dark ? '#93c5fd' : '#1d4ed8')};
  background: ${p =>
    p.$dark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)'};
  border: 1px solid
    ${p => (p.$dark ? 'rgba(59,130,246,0.28)' : 'rgba(59,130,246,0.2)')};

  .anticon {
    font-size: 14px;
  }
`;

const HeroTitle = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(30px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  background: ${p =>
    p.$dark
      ? 'linear-gradient(135deg, #fff 0%, #93c5fd 55%, #6ee7b7 100%)'
      : 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #047857 100%)'};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroDesc = styled.p`
  margin: 0 auto;
  max-width: 36rem;
  font-size: 15px;
  line-height: 1.65;
  color: ${p => (p.$dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)')};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.a)`
  position: relative;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  overflow: hidden;
  min-height: 280px;
  border-radius: 24px;
  text-decoration: none;
  color: inherit;
  border: 1px solid ${p => p.$border};
  background: ${p => p.$bg};
  box-shadow: ${p => p.$shadow};
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${p => p.$borderHover};
    box-shadow: ${p => p.$shadowHover};

    .card-cta {
      gap: 12px;
      opacity: 1;
    }

    .card-sheen {
      animation: ${sheen} 1.1s ease;
    }
  }
`;

const CardAurora = styled.div`
  pointer-events: none;
  position: absolute;
  inset: -30%;
  z-index: 0;
  background:
    radial-gradient(circle at 72% 18%, ${p => p.$a}, transparent 42%),
    radial-gradient(circle at 18% 82%, ${p => p.$b}, transparent 40%);
  filter: blur(36px);
  animation: ${auroraDrift} 12s ease-in-out infinite;
`;

const CardSheen = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 3;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.12),
      transparent
    );
  }
`;

const CardBody = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 22px 22px 20px;
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 20px;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
  box-shadow: 0 8px 20px ${p => p.$glow};
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${p => p.$color};
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: ${p => p.$color};
`;

const VisualStage = styled.div`
  position: relative;
  z-index: 2;
  height: 110px;
  margin: 18px 0 8px;
  display: grid;
  place-items: center;
`;

const CardFooter = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid ${p => p.$border};
`;

const Host = styled.span`
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: ${p => p.$color};
  opacity: 0.75;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 68%;
`;

const Cta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${p => p.$color};
  opacity: 0.85;
  transition: gap 0.25s ease, opacity 0.25s ease;
`;

// --- FRP visual: tunnel nodes ---
const FrpVisual = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
  height: 88px;

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .flow {
    stroke-dasharray: 6 6;
    animation: ${dashFlow} 1.2s linear infinite;
  }

  .node {
    animation: ${nodeBlink} 2.4s ease-in-out infinite;
  }

  .node:nth-child(2) {
    animation-delay: 0.4s;
  }

  .node:nth-child(3) {
    animation-delay: 0.8s;
  }
`;

// --- Beszel visual: meters ---
const MonitorVisual = styled.div`
  width: 100%;
  max-width: 210px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MeterRow = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr 36px;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: rgba(167, 243, 208, 0.85);

  .label {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    opacity: 0.8;
  }

  .track {
    height: 7px;
    border-radius: 999px;
    background: rgba(16, 185, 129, 0.15);
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #34d399, #10b981);
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.45);
    animation: ${meterFill} ${p => p.$dur || '3.2s'} ease-in-out infinite;
    animation-delay: ${p => p.$delay || '0s'};
  }

  .val {
    text-align: right;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    color: #6ee7b7;
  }
`;

const StatusDot = styled.div`
  position: absolute;
  right: 18%;
  top: 8%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 12px #10b981;

  &::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(52, 211, 153, 0.55);
    animation: ${pulseRing} 2s ease-out infinite;
  }
`;

// --- DeepSeek visual: usage rings ---
const DeepSeekVisual = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  animation: ${floatY} 5s ease-in-out infinite;

  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid rgba(77, 107, 254, 0.25);
  }

  .ring-a {
    inset: 8px;
    border-color: rgba(77, 107, 254, 0.55);
    border-top-color: #4d6bfe;
    border-right-color: transparent;
    animation: ${spinCw} 3.2s linear infinite;
  }

  .ring-b {
    inset: 20px;
    border-color: rgba(77, 107, 254, 0.2);
    border-bottom-color: #8ea0ff;
    border-left-color: transparent;
    animation: ${spinCcw} 4.6s linear infinite;
  }

  .core {
    position: absolute;
    inset: 30px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #8ea0ff, #4d6bfe 60%, #2a3db8);
    box-shadow: 0 0 28px rgba(77, 107, 254, 0.45);
    animation: ${glowPulse} 2.8s ease-in-out infinite;
  }
`;

// --- Tongren visual: landscape bands ---
const TongrenVisual = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
  height: 88px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(180deg, #87ceeb 0%, #c8e6c9 42%, #81c784 70%, #2e7d32 100%);
  border: 1px solid rgba(46, 125, 50, 0.25);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);

  .sun {
    position: absolute;
    top: 10px;
    right: 22px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #fff59d, #ffb300);
    box-shadow: 0 0 16px rgba(255, 179, 0, 0.55);
  }

  .hill {
    position: absolute;
    bottom: -8px;
    width: 140%;
    height: 48px;
    border-radius: 50% 50% 0 0;
    background: #1b5e20;
    left: -20%;
    opacity: 0.9;
  }

  .hill-2 {
    bottom: 6px;
    height: 36px;
    left: -40%;
    background: #388e3c;
    opacity: 0.85;
  }

  .fog {
    position: absolute;
    bottom: 22px;
    left: 0;
    width: 200%;
    height: 18px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.35),
      transparent,
      rgba(255, 255, 255, 0.28),
      transparent
    );
    animation: ${wave} 8s linear infinite;
  }
`;

// --- Music visual: equalizer ---
const MusicVisual = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  height: 72px;
  width: 160px;
`;

const EqBar = styled.div`
  width: 10px;
  height: 100%;
  border-radius: 999px;
  transform-origin: bottom;
  background: linear-gradient(180deg, #f472b6, #a855f7 55%, #6366f1);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.35);
  animation: ${barBounce} ${p => p.$dur} ease-in-out infinite;
  animation-delay: ${p => p.$delay};
`;

const PORTALS = [
  {
    id: 'frp',
    title: 'FRP 内网穿透',
    desc: '反向代理与隧道管理，查看客户端、代理状态与流量统计。',
    url: 'https://frp.aimatex.com/',
    host: 'frp.aimatex.com',
    tag: '基础设施',
    icon: <ApiOutlined />,
    visual: 'frp',
    theme: {
      bg: 'linear-gradient(160deg, #07131f 0%, #0b1c2e 45%, #082033 100%)',
      border: 'rgba(56, 189, 248, 0.22)',
      borderHover: 'rgba(56, 189, 248, 0.55)',
      shadow: '0 18px 40px -24px rgba(14, 165, 233, 0.45)',
      shadowHover: '0 28px 56px -20px rgba(14, 165, 233, 0.55)',
      auroraA: 'rgba(14, 165, 233, 0.35)',
      auroraB: 'rgba(56, 189, 248, 0.18)',
      iconColor: '#38bdf8',
      iconBg: 'rgba(14, 165, 233, 0.16)',
      iconBorder: 'rgba(56, 189, 248, 0.35)',
      iconGlow: 'rgba(14, 165, 233, 0.25)',
      tagColor: '#7dd3fc',
      tagBg: 'rgba(14, 165, 233, 0.12)',
      tagBorder: 'rgba(56, 189, 248, 0.28)',
      title: '#e0f2fe',
      desc: 'rgba(186, 230, 253, 0.68)',
      host: 'rgba(125, 211, 252, 0.7)',
      cta: '#38bdf8',
      footerBorder: 'rgba(56, 189, 248, 0.16)',
    },
  },
  {
    id: 'monitor',
    title: 'Beszel 监控',
    desc: '服务器与容器指标看板，实时掌握 CPU、内存与磁盘健康度。',
    url: 'https://monitor.aimatex.com/',
    host: 'monitor.aimatex.com',
    tag: '运维监控',
    icon: <DashboardOutlined />,
    visual: 'monitor',
    theme: {
      bg: 'linear-gradient(160deg, #061410 0%, #0b1f18 48%, #0a1714 100%)',
      border: 'rgba(16, 185, 129, 0.22)',
      borderHover: 'rgba(52, 211, 153, 0.55)',
      shadow: '0 18px 40px -24px rgba(16, 185, 129, 0.4)',
      shadowHover: '0 28px 56px -20px rgba(16, 185, 129, 0.5)',
      auroraA: 'rgba(16, 185, 129, 0.32)',
      auroraB: 'rgba(52, 211, 153, 0.16)',
      iconColor: '#34d399',
      iconBg: 'rgba(16, 185, 129, 0.16)',
      iconBorder: 'rgba(52, 211, 153, 0.35)',
      iconGlow: 'rgba(16, 185, 129, 0.25)',
      tagColor: '#6ee7b7',
      tagBg: 'rgba(16, 185, 129, 0.12)',
      tagBorder: 'rgba(52, 211, 153, 0.28)',
      title: '#ecfdf5',
      desc: 'rgba(167, 243, 208, 0.68)',
      host: 'rgba(110, 231, 183, 0.7)',
      cta: '#34d399',
      footerBorder: 'rgba(16, 185, 129, 0.16)',
    },
  },
  {
    id: 'deepseek',
    title: 'DeepSeek Usage',
    desc: '模型用量与配额统计，追踪 API Platform 的调用与消费。',
    url: 'https://platform.deepseek.com/usage',
    host: 'platform.deepseek.com',
    tag: 'AI 平台',
    icon: <ExperimentOutlined />,
    visual: 'deepseek',
    theme: {
      bg: 'linear-gradient(160deg, #0e0e10 0%, #14161c 50%, #12131a 100%)',
      border: 'rgba(77, 107, 254, 0.28)',
      borderHover: 'rgba(77, 107, 254, 0.6)',
      shadow: '0 18px 40px -24px rgba(77, 107, 254, 0.4)',
      shadowHover: '0 28px 56px -20px rgba(77, 107, 254, 0.55)',
      auroraA: 'rgba(77, 107, 254, 0.32)',
      auroraB: 'rgba(142, 160, 255, 0.14)',
      iconColor: '#8ea0ff',
      iconBg: 'rgba(77, 107, 254, 0.16)',
      iconBorder: 'rgba(77, 107, 254, 0.4)',
      iconGlow: 'rgba(77, 107, 254, 0.28)',
      tagColor: '#c5cdff',
      tagBg: 'rgba(77, 107, 254, 0.14)',
      tagBorder: 'rgba(77, 107, 254, 0.32)',
      title: '#f5f6f8',
      desc: 'rgba(197, 205, 255, 0.65)',
      host: 'rgba(142, 160, 255, 0.7)',
      cta: '#4d6bfe',
      footerBorder: 'rgba(77, 107, 254, 0.18)',
    },
  },
  {
    id: 'tongren',
    title: '铜仁文旅后台',
    desc: '志愿同仁管理端，维护铜仁旅游内容与运营配置。',
    url: 'https://tongren-web.aimatex.com/manage',
    host: 'tongren-web.aimatex.com',
    tag: '业务后台',
    icon: <GlobalOutlined />,
    visual: 'tongren',
    theme: {
      bg: 'linear-gradient(160deg, #f3faf4 0%, #e8f5e9 45%, #f1f8e9 100%)',
      border: 'rgba(46, 125, 50, 0.18)',
      borderHover: 'rgba(46, 125, 50, 0.4)',
      shadow: '0 18px 40px -24px rgba(46, 125, 50, 0.28)',
      shadowHover: '0 28px 56px -20px rgba(46, 125, 50, 0.35)',
      auroraA: 'rgba(76, 175, 80, 0.28)',
      auroraB: 'rgba(255, 193, 7, 0.18)',
      iconColor: '#2e7d32',
      iconBg: 'rgba(46, 125, 50, 0.1)',
      iconBorder: 'rgba(46, 125, 50, 0.22)',
      iconGlow: 'rgba(46, 125, 50, 0.15)',
      tagColor: '#1b5e20',
      tagBg: 'rgba(46, 125, 50, 0.1)',
      tagBorder: 'rgba(46, 125, 50, 0.2)',
      title: '#1b5e20',
      desc: 'rgba(27, 94, 32, 0.7)',
      host: 'rgba(46, 125, 50, 0.65)',
      cta: '#2e7d32',
      footerBorder: 'rgba(46, 125, 50, 0.14)',
    },
  },
  {
    id: 'music',
    title: 'AIMATEX Music',
    desc: '云音乐用户管理，进入歌单、音库与账号运营后台。',
    url: 'https://music.aimatex.com/admin/users',
    host: 'music.aimatex.com',
    tag: '产品后台',
    icon: <CustomerServiceOutlined />,
    visual: 'music',
    theme: {
      bg: 'linear-gradient(160deg, #14081a 0%, #1a0f2e 48%, #12081c 100%)',
      border: 'rgba(168, 85, 247, 0.28)',
      borderHover: 'rgba(244, 114, 182, 0.55)',
      shadow: '0 18px 40px -24px rgba(168, 85, 247, 0.45)',
      shadowHover: '0 28px 56px -20px rgba(236, 72, 153, 0.5)',
      auroraA: 'rgba(168, 85, 247, 0.35)',
      auroraB: 'rgba(244, 114, 182, 0.2)',
      iconColor: '#f472b6',
      iconBg: 'rgba(168, 85, 247, 0.16)',
      iconBorder: 'rgba(244, 114, 182, 0.35)',
      iconGlow: 'rgba(168, 85, 247, 0.28)',
      tagColor: '#f9a8d4',
      tagBg: 'rgba(168, 85, 247, 0.14)',
      tagBorder: 'rgba(244, 114, 182, 0.3)',
      title: '#fdf4ff',
      desc: 'rgba(249, 168, 212, 0.68)',
      host: 'rgba(216, 180, 254, 0.7)',
      cta: '#e879f9',
      footerBorder: 'rgba(168, 85, 247, 0.18)',
    },
  },
  {
    id: 'xunhupay',
    title: '虎皮椒支付',
    desc: '支付商户后台，管理收款订单、应用配置与结算流水。',
    url: 'https://admin.xunhupay.com/',
    host: 'admin.xunhupay.com',
    tag: '支付中台',
    icon: <PayCircleOutlined />,
    visual: 'xunhupay',
    theme: {
      bg: 'linear-gradient(160deg, #1a0a08 0%, #2a120c 48%, #1c0d08 100%)',
      border: 'rgba(251, 146, 60, 0.28)',
      borderHover: 'rgba(251, 146, 60, 0.6)',
      shadow: '0 18px 40px -24px rgba(249, 115, 22, 0.45)',
      shadowHover: '0 28px 56px -20px rgba(249, 115, 22, 0.55)',
      auroraA: 'rgba(249, 115, 22, 0.35)',
      auroraB: 'rgba(251, 191, 36, 0.18)',
      iconColor: '#fb923c',
      iconBg: 'rgba(249, 115, 22, 0.16)',
      iconBorder: 'rgba(251, 146, 60, 0.35)',
      iconGlow: 'rgba(249, 115, 22, 0.28)',
      tagColor: '#fdba74',
      tagBg: 'rgba(249, 115, 22, 0.14)',
      tagBorder: 'rgba(251, 146, 60, 0.3)',
      title: '#fff7ed',
      desc: 'rgba(254, 215, 170, 0.7)',
      host: 'rgba(253, 186, 116, 0.7)',
      cta: '#fb923c',
      footerBorder: 'rgba(249, 115, 22, 0.18)',
    },
  },
  {
    id: 'flowercloud',
    title: 'FlowerCloud',
    desc: '云服务客户区，管理实例、账单与工单支持。',
    url: 'https://api-flowercloud.com/clientarea.php',
    host: 'api-flowercloud.com',
    tag: '云服务',
    icon: <CloudServerOutlined />,
    visual: 'flowercloud',
    theme: {
      bg: 'linear-gradient(160deg, #071018 0%, #0c1a28 48%, #08141f 100%)',
      border: 'rgba(56, 189, 248, 0.24)',
      borderHover: 'rgba(125, 211, 252, 0.55)',
      shadow: '0 18px 40px -24px rgba(14, 165, 233, 0.4)',
      shadowHover: '0 28px 56px -20px rgba(14, 165, 233, 0.5)',
      auroraA: 'rgba(14, 165, 233, 0.3)',
      auroraB: 'rgba(165, 243, 252, 0.14)',
      iconColor: '#7dd3fc',
      iconBg: 'rgba(14, 165, 233, 0.14)',
      iconBorder: 'rgba(56, 189, 248, 0.35)',
      iconGlow: 'rgba(14, 165, 233, 0.25)',
      tagColor: '#bae6fd',
      tagBg: 'rgba(14, 165, 233, 0.12)',
      tagBorder: 'rgba(56, 189, 248, 0.28)',
      title: '#e0f2fe',
      desc: 'rgba(186, 230, 253, 0.68)',
      host: 'rgba(125, 211, 252, 0.7)',
      cta: '#38bdf8',
      footerBorder: 'rgba(56, 189, 248, 0.16)',
    },
  },
];

function PortalVisual({ type }) {
  if (type === 'frp') {
    return (
      <FrpVisual>
        <svg viewBox="0 0 220 88" fill="none">
          <path
            className="flow"
            d="M28 44 H90 C110 44 110 22 130 22 H192"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity="0.85"
          />
          <path
            className="flow"
            d="M28 44 H90 C110 44 110 66 130 66 H192"
            stroke="#22d3ee"
            strokeWidth="2"
            opacity="0.55"
            style={{ animationDelay: '0.35s' }}
          />
          <circle className="node" cx="28" cy="44" r="7" fill="#0ea5e9" />
          <circle className="node" cx="110" cy="44" r="5" fill="#67e8f9" />
          <circle className="node" cx="192" cy="22" r="6" fill="#38bdf8" />
          <circle className="node" cx="192" cy="66" r="6" fill="#22d3ee" />
          <rect
            x="98"
            y="30"
            width="24"
            height="28"
            rx="6"
            stroke="rgba(56,189,248,0.55)"
            fill="rgba(14,165,233,0.12)"
          />
        </svg>
      </FrpVisual>
    );
  }

  if (type === 'monitor') {
    return (
      <MonitorVisual>
        <StatusDot />
        <MeterRow $dur="3.1s" $delay="0s">
          <span className="label">CPU</span>
          <div className="track">
            <div className="fill" />
          </div>
          <span className="val">62%</span>
        </MeterRow>
        <MeterRow $dur="3.8s" $delay="0.4s">
          <span className="label">MEM</span>
          <div className="track">
            <div className="fill" />
          </div>
          <span className="val">48%</span>
        </MeterRow>
        <MeterRow $dur="4.4s" $delay="0.8s">
          <span className="label">DSK</span>
          <div className="track">
            <div className="fill" />
          </div>
          <span className="val">71%</span>
        </MeterRow>
      </MonitorVisual>
    );
  }

  if (type === 'deepseek') {
    return (
      <DeepSeekVisual>
        <div className="ring" />
        <div className="ring ring-a" />
        <div className="ring ring-b" />
        <div className="core" />
      </DeepSeekVisual>
    );
  }

  if (type === 'tongren') {
    return (
      <TongrenVisual>
        <div className="sun" />
        <div className="fog" />
        <div className="hill hill-2" />
        <div className="hill" />
      </TongrenVisual>
    );
  }

  if (type === 'music') {
    const bars = [
      { dur: '1.1s', delay: '0s' },
      { dur: '0.9s', delay: '0.12s' },
      { dur: '1.35s', delay: '0.05s' },
      { dur: '0.85s', delay: '0.22s' },
      { dur: '1.2s', delay: '0.08s' },
      { dur: '1.05s', delay: '0.18s' },
      { dur: '0.95s', delay: '0.28s' },
      { dur: '1.28s', delay: '0.1s' },
    ];
    return (
      <MusicVisual>
        {bars.map((b, i) => (
          <EqBar key={i} $dur={b.dur} $delay={b.delay} />
        ))}
      </MusicVisual>
    );
  }

  if (type === 'xunhupay') {
    return (
      <FrpVisual>
        <svg viewBox="0 0 220 88" fill="none">
          <rect x="48" y="22" width="124" height="48" rx="12" fill="rgba(249,115,22,0.12)" stroke="rgba(251,146,60,0.45)" />
          <circle cx="110" cy="46" r="16" fill="rgba(251,146,60,0.2)" stroke="#fb923c" strokeWidth="2" />
          <path d="M104 40 L110 52 L116 40" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="72" cy="30" r="3" fill="#fbbf24" className="node" />
          <circle cx="148" cy="62" r="3" fill="#fb923c" className="node" />
          <path className="flow" d="M30 44 H48" stroke="#fb923c" strokeWidth="2" />
          <path className="flow" d="M172 44 H190" stroke="#fbbf24" strokeWidth="2" />
        </svg>
      </FrpVisual>
    );
  }

  if (type === 'flowercloud') {
    return (
      <FrpVisual>
        <svg viewBox="0 0 220 88" fill="none">
          <ellipse cx="110" cy="62" rx="48" ry="12" fill="rgba(56,189,248,0.12)" />
          <path
            d="M70 58 C70 36 90 22 110 22 C130 22 150 36 150 58"
            stroke="#38bdf8"
            strokeWidth="2.5"
            fill="rgba(14,165,233,0.14)"
          />
          <circle cx="92" cy="42" r="5" fill="#7dd3fc" className="node" />
          <circle cx="118" cy="36" r="6" fill="#38bdf8" className="node" />
          <circle cx="108" cy="50" r="4" fill="#bae6fd" className="node" />
        </svg>
      </FrpVisual>
    );
  }

  return null;
}

export default function AllManagePage() {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx?.mode === 'dark';

  return (
    <Page $dark={isDark}>
      <Helmet>
        <title>综合中台 · {brandConfig.name}</title>
        <meta
          name="description"
          content={`${brandConfig.name} 综合后台中台，快速进入各子项目管理页。`}
        />
      </Helmet>
      <BgGlow $dark={isDark} />
      <SimpleHeader />
      <Content
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <Hero>
          <HeroBadge $dark={isDark}>
            <AppstoreOutlined />
            Middle Platform
          </HeroBadge>
          <HeroTitle $dark={isDark}>综合后台中台</HeroTitle>
          <HeroDesc $dark={isDark}>
            统一入口管理基础设施、运维监控与各业务子项目后台。点击卡片即可跳转对应管理页。
          </HeroDesc>
        </Hero>

        <Grid>
          {PORTALS.map((portal, index) => {
            const t = portal.theme;
            return (
              <Card
                key={portal.id}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                $bg={t.bg}
                $border={t.border}
                $borderHover={t.borderHover}
                $shadow={t.shadow}
                $shadowHover={t.shadowHover}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 * index, ease: 'easeOut' }}
              >
                <CardAurora $a={t.auroraA} $b={t.auroraB} />
                <CardSheen className="card-sheen" />
                <CardBody>
                  <CardTop>
                    <IconBox
                      $color={t.iconColor}
                      $bg={t.iconBg}
                      $border={t.iconBorder}
                      $glow={t.iconGlow}
                    >
                      {portal.icon}
                    </IconBox>
                    <Tag $color={t.tagColor} $bg={t.tagBg} $border={t.tagBorder}>
                      {portal.tag}
                    </Tag>
                  </CardTop>
                  <CardTitle $color={t.title}>{portal.title}</CardTitle>
                  <CardDesc $color={t.desc}>{portal.desc}</CardDesc>
                  <VisualStage>
                    <PortalVisual type={portal.visual} />
                  </VisualStage>
                  <CardFooter $border={t.footerBorder}>
                    <Host $color={t.host}>{portal.host}</Host>
                    <Cta className="card-cta" $color={t.cta}>
                      进入
                      <ArrowRightOutlined />
                    </Cta>
                  </CardFooter>
                </CardBody>
              </Card>
            );
          })}
        </Grid>
      </Content>
    </Page>
  );
}
