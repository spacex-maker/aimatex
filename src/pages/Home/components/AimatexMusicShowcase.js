import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import brandConfig from 'config/brand';
import {
  ArrowRightOutlined,
  CloudOutlined,
  HeartOutlined,
  PlayCircleOutlined,
  SearchOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const spinDisc = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const eqPulse = keyframes`
  0%, 100% { transform: scaleY(0.35); opacity: 0.5; }
  50% { transform: scaleY(1); opacity: 1; }
`;

const drift = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(2%, -1.5%); }
`;

const Section = styled.section`
  position: relative;
  margin: 0;
  padding: 0;
  color: #f6ecee;
  background: #12080c;
  overflow: hidden;
  clip-path: polygon(0 3.5%, 100% 0, 100% 100%, 0 100%);
  margin-top: -2px;

  @media (max-width: 768px) {
    clip-path: polygon(0 2%, 100% 0, 100% 100%, 0 100%);
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px) clamp(80px, 9vw, 120px);
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(28px, 5vw, 64px);
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding-top: clamp(56px, 12vw, 88px);
  }
`;

const Wash = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 55% 50% at 88% 18%, rgba(244, 63, 94, 0.28), transparent 60%),
    radial-gradient(ellipse 40% 45% at 8% 88%, rgba(251, 113, 133, 0.12), transparent 55%);
  animation: ${drift} 18s ease-in-out infinite;
`;

const Slash = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 18%;
  background: linear-gradient(168deg, rgba(244, 63, 94, 0.18), transparent 70%);
  clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%);
`;

const Watermark = styled.div`
  pointer-events: none;
  position: absolute;
  right: -2%;
  top: 8%;
  font-family: Syne, system-ui, sans-serif;
  font-size: clamp(88px, 18vw, 220px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.85;
  color: rgba(255, 255, 255, 0.035);
  user-select: none;
  z-index: 0;
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
    color: #fb7185;
  }

  .rule {
    flex: 1;
    max-width: 72px;
    height: 1px;
    background: linear-gradient(90deg, #fb7185, transparent);
  }

  .lab {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(251, 113, 133, 0.85);
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
  color: #fb7185;
`;

const Subtitle = styled(motion.p)`
  margin: 0 0 36px;
  max-width: 34rem;
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.65;
  color: rgba(246, 236, 238, 0.68);
`;

const SpecList = styled(motion.ol)`
  list-style: none;
  margin: 0 0 40px;
  padding: 0;
  border-top: 1px solid rgba(251, 113, 133, 0.22);
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
    background: linear-gradient(90deg, rgba(244, 63, 94, 0.08), transparent 70%);
    padding-left: 6px;
  }

  .idx {
    font-family: Syne, system-ui, sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(251, 113, 133, 0.7);
    padding-top: 3px;
  }

  .ico {
    color: #fb7185;
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
    color: rgba(246, 236, 238, 0.55);
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
  color: #1a060a;
  background: #fb7185;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%);
  padding-right: 40px;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.08);
  }
`;

const Stage = styled(motion.div)`
  position: relative;
  z-index: 2;
  min-height: 360px;
  display: grid;
  place-items: center;

  @media (max-width: 960px) {
    min-height: 280px;
    order: -1;
  }
`;

const StageCut = styled.div`
  position: absolute;
  inset: 8% -8% 8% 18%;
  background: linear-gradient(145deg, rgba(244, 63, 94, 0.16), rgba(18, 8, 12, 0.2));
  clip-path: polygon(18% 0, 100% 0, 100% 100%, 0 100%);
  border-left: 1px solid rgba(251, 113, 133, 0.28);
`;

const Vinyl = styled(motion.div)`
  position: relative;
  width: min(78%, 300px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, #1f1216 0 13%, transparent 14%),
    repeating-radial-gradient(circle at 50% 50%, #140c0f 0 2px, #1c1216 2px 4px);
  box-shadow:
    0 0 0 1px rgba(251, 113, 133, 0.35),
    0 36px 70px rgba(0, 0, 0, 0.55);
  animation: ${spinDisc} 14s linear infinite;
  display: grid;
  place-items: center;
  transform: translateX(8%);

  .label {
    width: 34%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fb7185, #be123c 72%);
    display: grid;
    place-items: center;
    color: #fff;
    font-size: clamp(18px, 3vw, 24px);
    animation: ${spinDisc} 14s linear infinite reverse;
  }
`;

const EqBars = styled.div`
  position: absolute;
  bottom: 10%;
  left: 42%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 44px;
  z-index: 3;

  span {
    width: 4px;
    height: 100%;
    background: #fb7185;
    transform-origin: bottom;
    animation: ${eqPulse} 1.05s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.12s; }
    &:nth-child(3) { animation-delay: 0.24s; }
    &:nth-child(4) { animation-delay: 0.08s; }
    &:nth-child(5) { animation-delay: 0.3s; }
    &:nth-child(6) { animation-delay: 0.18s; }
    &:nth-child(7) { animation-delay: 0.05s; }
  }
`;

const FEATURES = [
  { icon: <SearchOutlined />, titleId: 'home.music.feature.discover.title', titleDef: 'Discover', descId: 'home.music.feature.discover.desc', descDef: 'Search and import tracks into your cloud library.' },
  { icon: <TeamOutlined />, titleId: 'home.music.feature.playlist.title', titleDef: 'Playlists', descId: 'home.music.feature.playlist.desc', descDef: 'Create and share collaborative playlists.' },
  { icon: <HeartOutlined />, titleId: 'home.music.feature.nowPlaying.title', titleDef: 'Now Playing', descId: 'home.music.feature.nowPlaying.desc', descDef: 'Synced listening, hearts, and play history.' },
  { icon: <CloudOutlined />, titleId: 'home.music.feature.cloud.title', titleDef: 'Cloud Library', descId: 'home.music.feature.cloud.desc', descDef: 'High-quality audio stored securely in the cloud.' },
];

export default function AimatexMusicShowcase() {
  return (
    <Section id="aimatex-music">
      <Wash aria-hidden />
      <Slash aria-hidden />
      <Watermark aria-hidden>MUSIC</Watermark>

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
            <span className="num">01</span>
            <span className="rule" />
            <span className="lab">
              <FormattedMessage id="home.music.eyebrow" defaultMessage="AIMATEX Suite" />
            </span>
          </Index>

          <Title variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}>
            AIMATEX-<Accent>MUSIC</Accent>
          </Title>

          <Subtitle variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            <FormattedMessage
              id="home.music.subtitle"
              defaultMessage="Your personal cloud music space — discover, collect, and listen together."
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
            onClick={() => window.open(brandConfig.products.aimatexMusic, '_blank', 'noopener,noreferrer')}
          >
            <PlayCircleOutlined />
            <FormattedMessage id="home.music.cta" defaultMessage="Open AIMATEX-MUSIC" />
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
          <Vinyl whileHover={{ scale: 1.04 }}>
            <div className="label">
              <PlayCircleOutlined />
            </div>
          </Vinyl>
          <EqBars>
            <span /><span /><span /><span /><span /><span /><span />
          </EqBars>
        </Stage>
      </Inner>
    </Section>
  );
}
