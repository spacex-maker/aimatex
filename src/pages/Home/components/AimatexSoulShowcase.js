import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import brandConfig from 'config/brand';
import {
  ArrowRightOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const Svg = ({ children, ...rest }) => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden focusable="false" {...rest}>
    {children}
  </svg>
);

const IconCursor = () => (
  <Svg fill="currentColor"><path d="M11.5 2.5 4 20.5l5.2-.9 2.1 4.9 2.4-1-2.1-4.9L20 15.2z" /></Svg>
);
const IconClaude = () => (
  <Svg fill="currentColor"><path d="M12.8 2.2 16.3 12H22l-5.4 3.9 2.1 6.4L12.8 18l-5.9 4.3 2.1-6.4L3.6 12h5.7L12.8 2.2z" /></Svg>
);
const IconChatGPT = () => (
  <Svg fill="currentColor"><path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.06 6.06 0 0 0-6.55-2.91A5.99 5.99 0 0 0 10.06.5 6.03 6.03 0 0 0 4.6 4.05a5.99 5.99 0 0 0-4 5.4 6.01 6.01 0 0 0 .72 4.63 5.98 5.98 0 0 0 .52 4.91 6.06 6.06 0 0 0 6.55 2.91 5.99 5.99 0 0 0 5.15 1.5 6.03 6.03 0 0 0 5.46-3.55 5.99 5.99 0 0 0 4-5.4 6.01 6.01 0 0 0-.72-4.63zM12.1 21.48a4.48 4.48 0 0 1-2.87-1.04l.14-.08 4.78-2.76a.78.78 0 0 0 .38-.67v-6.74l2.02 1.17c.03.02.05.06.05.1v5.59a4.5 4.5 0 0 1-4.5 4.43zm-9.62-4.06a4.47 4.47 0 0 1-.54-3.01l.14.08 4.78 2.76c.23.14.53.14.77 0l5.83-3.37v2.33a.15.15 0 0 1-.06.12l-4.83 2.79a4.5 4.5 0 0 1-6.09-1.7zm-1.25-10.4a4.48 4.48 0 0 1 2.34-1.97l0 5.92a.78.78 0 0 0 .39.67l5.83 3.36-2.02 1.17a.15.15 0 0 1-.14 0l-4.83-2.79a4.5 4.5 0 0 1-1.57-6.36zm16.9 3.93-5.83-3.37 2.02-1.17a.15.15 0 0 1 .14 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.11v-5.92a.78.78 0 0 0-.38-.67zm2.04-3.03-.14-.08-4.78-2.76a.78.78 0 0 0-.77 0L8.55 9.67V7.34a.15.15 0 0 1 .06-.12l4.83-2.79a4.5 4.5 0 0 1 6.72 4.66zm-12.7 4.23-2.03-1.17v-5.59a.15.15 0 0 1 .06-.12l4.83-2.79a4.5 4.5 0 0 1 6.76 1.66l-.14.08-4.78 2.76a.78.78 0 0 0-.38.67l-.02 6.74z" /></Svg>
);
const IconDeepSeek = () => (
  <Svg fill="currentColor"><path d="M4.2 12c0-4.3 3.5-7.8 7.8-7.8 2.6 0 4.9 1.3 6.3 3.2-.9-.4-1.9-.6-2.9-.6-3.5 0-6.4 2.9-6.4 6.4S12.9 19.6 16.4 19.6c1 0 2-.2 2.9-.6-1.4 1.9-3.7 3.2-6.3 3.2-4.3 0-7.8-3.5-7.8-7.8zm11.5-3.2c1.9 0 3.5 1.1 4.3 2.7-.5-.2-1-.3-1.6-.3-2.3 0-4.1 1.8-4.1 4.1 0 .6.1 1.1.3 1.6-1.6-.8-2.7-2.4-2.7-4.3 0-2.7 2.2-4.8 4.8-4.8z" /></Svg>
);
const IconWorkBuddy = () => (
  <Svg fill="currentColor"><path d="M12 2.5a4.2 4.2 0 0 1 4.2 4.2v1.1h1.3A2.5 2.5 0 0 1 20 10.3v7.2a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 17.5v-7.2a2.5 2.5 0 0 1 2.5-2.5h1.3V6.7A4.2 4.2 0 0 1 12 2.5zm0 1.6a2.6 2.6 0 0 0-2.6 2.6v1.1h5.2V6.7A2.6 2.6 0 0 0 12 4.1zM9.2 12.2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zm5.6 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" /></Svg>
);
const IconGemini = () => (
  <Svg fill="currentColor"><path d="M12 2.2c.4 3.7 2.1 6.5 5.8 8-3.7 1.5-5.4 4.3-5.8 8-.4-3.7-2.1-6.5-5.8-8 3.7-1.5 5.4-4.3 5.8-8z" /></Svg>
);
const IconCopilot = () => (
  <Svg fill="currentColor"><path d="M12 2a5.5 5.5 0 0 0-5.5 5.5v.8A4.7 4.7 0 0 0 3 13v3.5A3.5 3.5 0 0 0 6.5 20H9v-6.2A2.8 2.8 0 0 1 11.8 11h.4A2.8 2.8 0 0 1 15 13.8V20h2.5a3.5 3.5 0 0 0 3.5-3.5V13a4.7 4.7 0 0 0-3.5-4.7v-.8A5.5 5.5 0 0 0 12 2zm-2.2 14.2a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0zm6.9 0a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z" /></Svg>
);
const IconKimi = () => (
  <Svg fill="currentColor"><path d="M12 3.2c-2.6 0-4.8 2-5.2 4.5C4.6 8.2 3 10.2 3 12.6c0 2.8 2.2 5 5 5h.4c.6 1.9 2.4 3.2 4.5 3.2 2.1 0 3.9-1.3 4.5-3.2h.1c3 0 5.5-2.5 5.5-5.5 0-2.6-1.8-4.8-4.2-5.4C17.9 4.6 15.3 3.2 12 3.2zm0 2c2.3 0 4.1 1.1 4.8 2.8l.3 1 .9.2c1.6.3 2.8 1.7 2.8 3.4 0 1.9-1.6 3.5-3.5 3.5h-1.1l-.3 1.1c-.4 1.2-1.5 2-2.9 2s-2.5-.8-2.9-2l-.3-1.1H8c-1.7 0-3-1.3-3-3 0-1.4 1-2.6 2.3-2.9l.9-.2.3-1C8.7 6.4 10.2 5.2 12 5.2z" /></Svg>
);
const IconQwen = () => (
  <Svg fill="currentColor"><path d="M12 2.5 4.5 7v10L12 21.5 19.5 17V7L12 2.5zm0 2.3 5.2 3.1v6.2L12 17.2l-5.2-3.1V7.9L12 4.8zm0 3.4-2.8 4.9h1.7l.6-1.1h2.9l.6 1.1h1.7L12 8.2zm-.7 5.1 1.4-2.5 1.4 2.5h-2.8z" /></Svg>
);
const IconDoubao = () => (
  <Svg fill="currentColor"><path d="M12 2.8c-5.1 0-9.2 3.4-9.2 7.6 0 2.6 1.5 4.9 3.9 6.3L5.5 21l4.1-2.2c.8.2 1.6.3 2.4.3 5.1 0 9.2-3.4 9.2-7.6S17.1 2.8 12 2.8zm-3.2 6.2a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zm6.4 0a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2z" /></Svg>
);
const IconTrae = () => (
  <Svg fill="currentColor"><path d="M4 5.5h16v2.2H13.6V19h-3.2V7.7H4V5.5zm2.4 14.2 3.2-5.6H7.2L4 19.7h2.4zm11.2 0H20l-3.2-5.6h-2.4l3.2 5.6z" /></Svg>
);
const IconPerplexity = () => (
  <Svg fill="currentColor"><path d="M12 2.4 4.8 6.6v10.8L12 21.6l7.2-4.2V6.6L12 2.4zm0 2.5 4.7 2.7v2.1L12 12.4 7.3 9.7V7.6L12 4.9zm-5.2 6.5 4.2 2.4v4.8l-4.2-2.5v-4.7zm6.2 7.2v-4.8l4.2-2.4v4.7l-4.2 2.5z" /></Svg>
);

const AI_TOOLS = [
  { id: 'cursor', name: 'Cursor', color: '#E8EEF7', Icon: IconCursor },
  { id: 'claude', name: 'Claude', color: '#D4A27F', Icon: IconClaude },
  { id: 'chatgpt', name: 'ChatGPT', color: '#10A37F', Icon: IconChatGPT },
  { id: 'deepseek', name: 'DeepSeek', color: '#4D6BFE', Icon: IconDeepSeek },
  { id: 'workbuddy', name: 'WorkBuddy', color: '#07C160', Icon: IconWorkBuddy },
  { id: 'gemini', name: 'Gemini', color: '#8E83F5', Icon: IconGemini },
  { id: 'copilot', name: 'Copilot', color: '#7EE787', Icon: IconCopilot },
  { id: 'kimi', name: 'Kimi', color: '#F5A623', Icon: IconKimi },
  { id: 'qwen', name: 'Qwen', color: '#615CED', Icon: IconQwen },
  { id: 'doubao', name: '豆包', color: '#3B7CFF', Icon: IconDoubao },
  { id: 'trae', name: 'Trae', color: '#FF5A36', Icon: IconTrae },
  { id: 'perplexity', name: 'Perplexity', color: '#22B8CF', Icon: IconPerplexity },
];

const breath = keyframes`
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50% { opacity: 0.95; transform: scale(1.06); }
`;

const filament = keyframes`
  0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.35; }
  50% { transform: rotate(8deg) scale(1.05); opacity: 0.75; }
`;

const Section = styled.section`
  position: relative;
  margin: 0;
  color: #eef3fb;
  background: #05070d;
  overflow: hidden;
  clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 100%);
  margin-top: -2px;

  @media (max-width: 768px) {
    clip-path: polygon(0 2.5%, 100% 0, 100% 100%, 0 100%);
  }
`;

const Diagonal = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    linear-gradient(118deg, transparent 42%, rgba(61, 224, 208, 0.07) 42.2%, rgba(61, 224, 208, 0.07) 58%, transparent 58.2%),
    radial-gradient(ellipse 50% 45% at 78% 30%, rgba(61, 224, 208, 0.16), transparent 60%),
    radial-gradient(ellipse 40% 40% at 12% 78%, rgba(245, 188, 98, 0.1), transparent 55%);
`;

const Watermark = styled.div`
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%) rotate(-12deg);
  font-family: Syne, system-ui, sans-serif;
  font-size: clamp(100px, 22vw, 280px);
  font-weight: 800;
  letter-spacing: -0.07em;
  color: rgba(238, 243, 251, 0.03);
  z-index: 0;
  white-space: nowrap;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(80px, 11vw, 130px) clamp(20px, 4vw, 48px) clamp(88px, 10vw, 130px);
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(36px, 6vw, 80px);
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
  color: #3de0d0;

  .slash {
    width: 1px;
    height: 14px;
    background: rgba(61, 224, 208, 0.5);
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
    background: linear-gradient(105deg, #3de0d0, #f5bc62);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled(motion.p)`
  margin: 0 0 28px;
  max-width: 38rem;
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.65;
  color: rgba(238, 243, 251, 0.68);
`;

const CompatLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(238, 243, 251, 0.38);
  margin-bottom: 14px;
`;

const Constellation = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 4px;
  margin-bottom: 36px;
  max-width: 40rem;
`;

const Tool = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 4px 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(238, 243, 251, 0.78);
  transition: color 0.2s ease;

  .dot {
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    color: ${p => p.$color};
    background: color-mix(in srgb, ${p => p.$color} 14%, transparent);
    clip-path: polygon(30% 0, 100% 0, 100% 70%, 70% 100%, 0 100%, 0 30%);
  }

  &:hover {
    color: #fff;
  }
`;

const Sep = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(238, 243, 251, 0.22);
  margin: 0 2px;
`;

const More = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #3de0d0;
  letter-spacing: 0.04em;
  padding-left: 4px;
`;

const Manifesto = styled(motion.div)`
  display: grid;
  gap: 0;
  margin-bottom: 36px;
  border-top: 1px solid rgba(61, 224, 208, 0.2);
`;

const Line = styled(motion.div)`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(238, 243, 251, 0.08);

  .n {
    font-family: Syne, system-ui, sans-serif;
    font-size: 13px;
    font-weight: 800;
    color: #f5bc62;
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
    color: rgba(238, 243, 251, 0.55);
  }
`;

const Cta = styled(motion.button)`
  height: 54px;
  padding: 0 26px 0 22px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #041512;
  background: linear-gradient(105deg, #3de0d0 0%, #f5bc62 100%);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 18px 100%);
  padding-left: 28px;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.06);
  }
`;

const Stage = styled(motion.div)`
  position: relative;
  min-height: 380px;
  display: grid;
  place-items: center;

  @media (max-width: 960px) {
    min-height: 280px;
    order: -1;
  }
`;

const StagePanel = styled.div`
  position: absolute;
  inset: 4% 0 4% 12%;
  background: rgba(61, 224, 208, 0.04);
  clip-path: polygon(22% 0, 100% 0, 100% 100%, 0 100%);
  border-left: 1px solid rgba(61, 224, 208, 0.22);
`;

const Orb = styled(motion.div)`
  position: relative;
  width: min(72%, 280px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 40% 35%, rgba(61, 224, 208, 0.4), transparent 45%),
    radial-gradient(circle at 65% 70%, rgba(245, 188, 98, 0.22), transparent 48%),
    #0b101a;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: center;

  .ring {
    position: absolute;
    inset: 14%;
    border-radius: 50%;
    border: 1px solid rgba(61, 224, 208, 0.2);
    animation: ${filament} 10s ease-in-out infinite;
  }

  .ring2 {
    position: absolute;
    inset: 26%;
    border-radius: 50%;
    border: 1px solid rgba(245, 188, 98, 0.2);
    animation: ${filament} 13s ease-in-out infinite reverse;
  }

  .core {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 26px;
    color: #041512;
    background: linear-gradient(145deg, #3de0d0, #f5bc62);
    animation: ${breath} 3.2s ease-in-out infinite;
    z-index: 1;
  }

  .tag {
    position: absolute;
    bottom: 18%;
    font-family: Syne, system-ui, sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: rgba(238, 243, 251, 0.55);
  }
`;

const Mark = styled.span`
  position: absolute;
  left: ${p => p.$l};
  top: ${p => p.$t};
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  color: ${p => p.$color};
  background: color-mix(in srgb, ${p => p.$color} 12%, transparent);
  clip-path: polygon(30% 0, 100% 0, 100% 70%, 70% 100%, 0 100%, 0 30%);
  opacity: 0.85;
`;

const PROMISES = [
  {
    titleId: 'home.soul.feature.soul.title',
    titleDef: '有灵魂',
    descId: 'home.soul.feature.soul.desc',
    descDef: '记得你是谁、你在意什么，而不只是上次聊了啥。',
  },
  {
    titleId: 'home.soul.feature.inject.title',
    titleDef: '可注入',
    descId: 'home.soul.feature.inject.desc',
    descDef: '任意 AI / Agent 用同一协议唤醒同一颗灵魂。',
  },
  {
    titleId: 'home.soul.feature.grow.title',
    titleDef: '可成长',
    descId: 'home.soul.feature.grow.desc',
    descDef: '你确认过的结论与承诺会沉淀，不是无脑灌聊天记录。',
  },
  {
    titleId: 'home.soul.feature.cross.title',
    titleDef: '跨工具延续',
    descId: 'home.soul.feature.cross.desc',
    descDef: 'Cursor、Claude、ChatGPT、DeepSeek、WorkBuddy…主流 AI 与自建 Agent——唤醒的都是同一个你。',
  },
];

const FLOAT = [
  { ...AI_TOOLS[0], l: '6%', t: '18%' },
  { ...AI_TOOLS[1], l: '78%', t: '12%' },
  { ...AI_TOOLS[2], l: '88%', t: '48%' },
  { ...AI_TOOLS[3], l: '4%', t: '62%' },
  { ...AI_TOOLS[4], l: '72%', t: '78%' },
  { ...AI_TOOLS[5], l: '18%', t: '82%' },
];

export default function AimatexSoulShowcase() {
  return (
    <Section id="aimatex-soul">
      <Diagonal aria-hidden />
      <Watermark aria-hidden>SOUL</Watermark>

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
            <span>03</span>
            <span className="slash" />
            <FormattedMessage id="home.soul.eyebrow" defaultMessage="AIMATEX Suite" />
          </Index>

          <Title variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}>
            AIMATEX <em>Soul</em>
          </Title>

          <Subtitle variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            <FormattedMessage
              id="home.soul.subtitle"
              defaultMessage="给 AI 注入灵魂。Cursor、Claude、ChatGPT、DeepSeek、WorkBuddy、Gemini、Copilot 等主流 AI 与任意 Agent——唤醒的是同一个你。"
            />
          </Subtitle>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <CompatLabel>
              <FormattedMessage id="home.soul.compat.label" defaultMessage="可接入主流 AI" />
            </CompatLabel>
            <Constellation>
              {AI_TOOLS.map((t, i) => (
                <React.Fragment key={t.id}>
                  {i > 0 && <Sep />}
                  <Tool $color={t.color} title={t.name} whileHover={{ y: -2 }}>
                    <span className="dot"><t.Icon /></span>
                    {t.name}
                  </Tool>
                </React.Fragment>
              ))}
              <More>
                <FormattedMessage id="home.soul.compat.more" defaultMessage="+ 任意 Agent" />
              </More>
            </Constellation>
          </motion.div>

          <Manifesto variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
            {PROMISES.map((p, i) => (
              <Line
                key={p.titleId}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
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
            onClick={() => window.open(brandConfig.products.aimatexSoul, '_blank', 'noopener,noreferrer')}
          >
            <HeartOutlined />
            <FormattedMessage id="home.soul.cta" defaultMessage="开始注入" />
            <ArrowRightOutlined />
          </Cta>
        </Copy>

        <Stage
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <StagePanel />
          {FLOAT.map((t) => (
            <Mark key={t.id} $l={t.l} $t={t.t} $color={t.color}>
              <t.Icon />
            </Mark>
          ))}
          <Orb whileHover={{ scale: 1.03 }}>
            <div className="ring" />
            <div className="ring2" />
            <div className="core"><HeartOutlined /></div>
            <div className="tag">ONE SOUL</div>
          </Orb>
        </Stage>
      </Inner>
    </Section>
  );
}
