import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import brandConfig from 'config/brand';
import {
  ApiOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  KeyOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const drift = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-2%, 1.5%) scale(1.04); }
`;

const scan = keyframes`
  0% { transform: translateX(-120%); opacity: 0; }
  12% { opacity: 0.7; }
  88% { opacity: 0.7; }
  100% { transform: translateX(220%); opacity: 0; }
`;

const progress = keyframes`
  0% { width: 8%; }
  55% { width: 72%; }
  100% { width: 100%; }
`;

const framePulse = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.96); }
  50% { opacity: 1; transform: scale(1); }
`;

const flicker = keyframes`
  0%, 100% { opacity: 0.55; }
  40% { opacity: 1; }
  60% { opacity: 0.7; }
`;

const Section = styled.section`
  position: relative;
  margin: 0;
  margin-top: -2px;
  color: #e8eef8;
  background: #050914;
  overflow: hidden;
  clip-path: polygon(0 4%, 100% 0, 100% 100%, 0 100%);

  @media (max-width: 768px) {
    clip-path: polygon(0 2%, 100% 0, 100% 100%, 0 100%);
  }
`;

const Wash = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 52% 48% at 88% 16%, rgba(26, 124, 255, 0.28), transparent 58%),
    radial-gradient(ellipse 38% 42% at 6% 86%, rgba(0, 198, 255, 0.12), transparent 55%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 30%);
  animation: ${drift} 20s ease-in-out infinite;
`;

const Slash = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 22%;
  background: linear-gradient(168deg, rgba(26, 124, 255, 0.2), transparent 72%);
  clip-path: polygon(0 0, 100% 0, 100% 36%, 0 100%);
`;

const Grid = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 75% 65% at 70% 40%, #000 8%, transparent 72%);
`;

const Watermark = styled.div`
  pointer-events: none;
  position: absolute;
  right: -3%;
  top: 42%;
  transform: translateY(-50%);
  font-family: Syne, system-ui, sans-serif;
  font-size: clamp(96px, 20vw, 260px);
  font-weight: 800;
  letter-spacing: -0.07em;
  line-height: 0.8;
  color: rgba(232, 238, 248, 0.035);
  z-index: 0;
  user-select: none;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(80px, 11vw, 130px) clamp(20px, 4vw, 48px) clamp(88px, 10vw, 130px);
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const Index = styled(motion.div)`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 18px;
  font-family: Syne, system-ui, sans-serif;

  .num {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #60a5fa;
  }

  .rule {
    flex: 1;
    max-width: 72px;
    height: 1px;
    background: linear-gradient(90deg, #3b82f6, transparent);
  }

  .lab {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(96, 165, 250, 0.85);
  }
`;

const Title = styled(motion.h2)`
  margin: 0 0 16px;
  font-family: Syne, system-ui, sans-serif;
  font-size: clamp(40px, 7vw, 68px);
  line-height: 0.98;
  letter-spacing: -0.045em;
  font-weight: 800;
  color: #fff;
`;

const Accent = styled.span`
  background: linear-gradient(105deg, #60a5fa 0%, #38bdf8 45%, #1a7cff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled(motion.p)`
  margin: 0 0 36px;
  max-width: 36rem;
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.65;
  color: rgba(226, 232, 240, 0.68);
`;

const SpecList = styled(motion.ol)`
  list-style: none;
  margin: 0 0 40px;
  padding: 0;
  border-top: 1px solid rgba(59, 130, 246, 0.28);
`;

const Spec = styled(motion.li)`
  display: grid;
  grid-template-columns: 42px 28px 1fr;
  gap: 12px;
  align-items: start;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.25s ease, padding-left 0.25s ease;

  &:hover {
    background: linear-gradient(90deg, rgba(26, 124, 255, 0.1), transparent 70%);
    padding-left: 6px;
  }

  .idx {
    font-family: Syne, system-ui, sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(96, 165, 250, 0.7);
    padding-top: 3px;
  }

  .ico {
    color: #60a5fa;
    font-size: 16px;
    padding-top: 2px;
  }

  .label {
    font-weight: 700;
    font-size: 15px;
    color: #fff;
    margin-bottom: 4px;
  }

  .desc {
    font-size: 13px;
    line-height: 1.5;
    color: rgba(226, 232, 240, 0.55);
  }
`;

const Cta = styled(motion.button)`
  height: 54px;
  padding: 0 28px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #04101f;
  background: linear-gradient(105deg, #67e8f9, #38bdf8 40%, #1a7cff 100%);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%);
  padding-right: 40px;
  transition: filter 0.2s ease;
  box-shadow: 0 16px 40px rgba(26, 124, 255, 0.35);

  &:hover {
    filter: brightness(1.08);
  }
`;

const Stage = styled(motion.div)`
  position: relative;
  z-index: 2;
  min-height: 380px;
  display: grid;
  place-items: center;

  @media (max-width: 960px) {
    min-height: 300px;
    order: -1;
  }
`;

const StageCut = styled.div`
  position: absolute;
  inset: 6% -10% 6% 14%;
  background: linear-gradient(145deg, rgba(26, 124, 255, 0.18), rgba(5, 9, 20, 0.25));
  clip-path: polygon(16% 0, 100% 0, 100% 100%, 0 100%);
  border-left: 1px solid rgba(96, 165, 250, 0.32);
`;

const Console = styled(motion.div)`
  position: relative;
  width: min(100%, 420px);
  border-radius: 18px;
  padding: 18px 18px 16px;
  background:
    radial-gradient(ellipse at 18% 0%, rgba(56, 189, 248, 0.18), transparent 50%),
    linear-gradient(165deg, rgba(12, 20, 38, 0.96), rgba(6, 10, 22, 0.98));
  border: 1px solid rgba(96, 165, 250, 0.28);
  box-shadow:
    0 28px 70px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 42%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.12), transparent);
    animation: ${scan} 4.8s ease-in-out infinite;
    pointer-events: none;
  }
`;

const ConsoleHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;

  .dots {
    display: flex;
    gap: 6px;

    span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(148, 163, 184, 0.35);

      &:nth-child(1) { background: #f87171; }
      &:nth-child(2) { background: #fbbf24; }
      &:nth-child(3) { background: #34d399; }
    }
  }

  .tag {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(125, 211, 252, 0.85);
  }
`;

const FilmStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 14px;

  .frame {
    aspect-ratio: 4 / 3;
    border-radius: 8px;
    border: 1px solid rgba(96, 165, 250, 0.22);
    background:
      linear-gradient(145deg, rgba(30, 58, 138, 0.45), rgba(8, 15, 30, 0.9)),
      repeating-linear-gradient(
        -18deg,
        transparent,
        transparent 6px,
        rgba(56, 189, 248, 0.06) 6px,
        rgba(56, 189, 248, 0.06) 7px
      );
    position: relative;
    overflow: hidden;
    animation: ${framePulse} 2.8s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.35s; }
    &:nth-child(3) { animation-delay: 0.7s; }
    &:nth-child(4) { animation-delay: 1.05s; }

    &::after {
      content: '';
      position: absolute;
      inset: 22% 18%;
      border-radius: 4px;
      border: 1px dashed rgba(125, 211, 252, 0.35);
    }

    .mark {
      position: absolute;
      left: 6px;
      bottom: 5px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 9px;
      color: rgba(186, 230, 253, 0.75);
    }
  }
`;

const Prompt = styled.div`
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.14);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  line-height: 1.5;
  color: #cbd5e1;

  .k {
    color: #7dd3fc;
  }

  .v {
    color: #fde68a;
  }
`;

const JobRow = styled.div`
  display: grid;
  gap: 8px;

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: rgba(148, 163, 184, 0.9);

    .status {
      color: #67e8f9;
      font-weight: 700;
      letter-spacing: 0.06em;
      animation: ${flicker} 2.2s ease-in-out infinite;
    }
  }

  .bar {
    height: 6px;
    border-radius: 999px;
    background: rgba(30, 41, 59, 0.9);
    overflow: hidden;

    i {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #0ea5e9, #1a7cff 55%, #67e8f9);
      animation: ${progress} 3.6s ease-in-out infinite;
    }
  }
`;

const Modes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;

  span {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 8px;
    border-radius: 999px;
    border: 1px solid rgba(96, 165, 250, 0.28);
    color: rgba(186, 230, 253, 0.9);
    background: rgba(26, 124, 255, 0.1);
  }
`;

const FEATURES = [
  {
    icon: <AppstoreOutlined />,
    titleId: 'home.aimodel.feature.models.title',
    titleDef: 'Multi-model',
    descId: 'home.aimodel.feature.models.desc',
    descDef: 'One API across video models — Wan first, expanding by capability.',
  },
  {
    icon: <VideoCameraOutlined />,
    titleId: 'home.aimodel.feature.async.title',
    titleDef: 'Async API',
    descId: 'home.aimodel.feature.async.desc',
    descDef: 'OpenAI-style submit → poll → COS delivery.',
  },
  {
    icon: <KeyOutlined />,
    titleId: 'home.aimodel.feature.keys.title',
    titleDef: 'API Keys',
    descId: 'home.aimodel.feature.keys.desc',
    descDef: 'Notes, per-key toggle, and usage breakdown.',
  },
];

export default function AimatexAimodelShowcase() {
  const href = brandConfig.products?.aimatexAimodel || 'https://aimodel.aimatex.com';

  return (
    <Section id="aimatex-aimodel">
      <Wash aria-hidden />
      <Slash aria-hidden />
      <Grid aria-hidden />
      <Watermark aria-hidden>AIMODEL</Watermark>

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
          <Index variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}>
            <span className="num">05</span>
            <span className="rule" />
            <span className="lab">
              <FormattedMessage id="home.aimodel.eyebrow" defaultMessage="AIMATEX Suite" />
            </span>
          </Index>

          <Title
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
          >
            AIMATEX-<Accent>AIMODEL</Accent>
          </Title>

          <Subtitle variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            <FormattedMessage
              id="home.aimodel.subtitle"
              defaultMessage="Multi-model video API gateway for text, image, and video-ref. Wan ships first; more models follow. SSO, self-serve keys, usage billing."
            />
          </Subtitle>

          <SpecList variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
            {FEATURES.map((f, i) => (
              <Spec
                key={f.titleId}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <span className="idx">0{i + 1}</span>
                <span className="ico">{f.icon}</span>
                <div>
                  <div className="label">
                    <FormattedMessage id={f.titleId} defaultMessage={f.titleDef} />
                  </div>
                  <div className="desc">
                    <FormattedMessage id={f.descId} defaultMessage={f.descDef} />
                  </div>
                </div>
              </Spec>
            ))}
          </SpecList>

          <Cta
            type="button"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
          >
            <ApiOutlined />
            <FormattedMessage id="home.aimodel.cta" defaultMessage="Open Aimodel" />
            <ArrowRightOutlined />
          </Cta>
        </Copy>

        <Stage
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <StageCut />
          <Console whileHover={{ y: -4 }}>
            <ConsoleHead>
              <div className="dots">
                <span />
                <span />
                <span />
              </div>
              <span className="tag">v1 / videos</span>
            </ConsoleHead>
            <FilmStrip>
              <div className="frame">
                <span className="mark">01</span>
              </div>
              <div className="frame">
                <span className="mark">02</span>
              </div>
              <div className="frame">
                <span className="mark">03</span>
              </div>
              <div className="frame">
                <span className="mark">04</span>
              </div>
            </FilmStrip>
            <Prompt>
              <span className="k">prompt</span>
              <span>{`: `}</span>
              <span className="v">"橘猫奔跑 · 电影质感 · 704×480"</span>
            </Prompt>
            <JobRow>
              <div className="meta">
                <span>job_8f3a… · model · video</span>
                <span className="status">RUNNING</span>
              </div>
              <div className="bar">
                <i />
              </div>
            </JobRow>
            <Modes>
              <span>Multi-model</span>
              <span>Text</span>
              <span>Image</span>
              <span>Video-ref</span>
            </Modes>
          </Console>
        </Stage>
      </Inner>
    </Section>
  );
}
