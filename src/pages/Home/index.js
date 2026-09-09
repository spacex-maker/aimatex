import React, { useContext } from 'react';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import styled, { ThemeContext, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import SimpleHeader from 'components/headers/simple';
import FooterSection from './components/FooterSection';
import ProductShowcases from './components/ProductShowcases';
import AimatexNasShowcase from './components/AimatexNasShowcase';
import brandConfig from 'config/brand';
import {
  ArrowRightOutlined,
  PlayCircleOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
  CloudOutlined,
  TeamOutlined,
  SearchOutlined,
  CloudServerOutlined,
} from '@ant-design/icons';

const { Content } = Layout;

const BACKGROUND_VIDEO_URL =
  'https://public-1258150206.cos.accelerate.myqcloud.com/home/homevideo.mp4';

// --- Animations ---
const auroraAnim = keyframes`
  0% { background-position: 50% 50%, 50% 50%; }
  50% { background-position: 100% 0%, 0% 100%; }
  100% { background-position: 50% 50%, 50% 50%; }
`;

const scrollCue = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.45; }
  50% { transform: translateY(8px); opacity: 0.9; }
`;

const brandSheen = keyframes`
  0% { background-position: 120% 50%; }
  100% { background-position: -40% 50%; }
`;

// --- Styled Components ---

const VideoBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.theme.mode === 'dark'
      ? 'radial-gradient(ellipse 70% 60% at 50% 42%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,0.88) 100%)'
      : 'radial-gradient(ellipse 70% 60% at 50% 42%, rgba(255,255,255,0.2) 0%, rgba(245,247,250,0.72) 70%, rgba(240,243,248,0.9) 100%)'};
    z-index: 1;
  }

  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.04);
    filter: ${props => props.theme.mode === 'dark' ? 'contrast(1.08) brightness(0.72)' : 'contrast(1.02) brightness(1.02)'};
  }
`;

const AuroraOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: ${props => props.theme.mode === 'dark' ? 0.35 : 0.45};
  background-image:
    radial-gradient(at 12% 18%, rgba(37, 99, 235, 0.28) 0px, transparent 48%),
    radial-gradient(at 88% 12%, rgba(13, 148, 136, 0.22) 0px, transparent 46%);
  filter: blur(72px);
  pointer-events: none;
  animation: ${auroraAnim} 18s ease-in-out infinite;
  background-size: 140% 140%;
`;

const PageWrapper = styled(Layout)`
  min-height: 100vh;
  background: transparent;
  position: relative;
  z-index: 1;
`;

const PageContent = styled(Content)`
  position: relative;
  z-index: 2;
  margin-top: 0;
  width: 100%;
  overflow: visible;
  background: transparent;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 96px 24px 72px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-height: 100svh;
    padding: 104px 20px 64px;
  }
`;

const HeroInner = styled(motion.div)`
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrandMark = styled(motion.h1)`
  margin: 0 0 28px;
  font-family: 'Syne', 'Manrope', sans-serif;
  font-size: clamp(56px, 14vw, 128px);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.055em;
  text-transform: uppercase;
  color: ${props => props.theme.mode === 'dark' ? '#f4f7fb' : '#0b1220'};
  position: relative;

  span {
    display: inline-block;
    background-image: linear-gradient(
      105deg,
      ${props => props.theme.mode === 'dark' ? '#f4f7fb' : '#0b1220'} 0%,
      ${props => props.theme.mode === 'dark' ? '#f4f7fb' : '#0b1220'} 38%,
      ${props => props.theme.mode === 'dark' ? '#7dd3fc' : '#2563eb'} 50%,
      ${props => props.theme.mode === 'dark' ? '#f4f7fb' : '#0b1220'} 62%,
      ${props => props.theme.mode === 'dark' ? '#f4f7fb' : '#0b1220'} 100%
    );
    background-size: 220% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${brandSheen} 5.5s ease-in-out infinite;
  }
`;

const HeroHeadline = styled(motion.p)`
  margin: 0 0 16px;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(20px, 3.2vw, 30px);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: ${props => props.theme.mode === 'dark' ? 'rgba(244,247,251,0.92)' : 'rgba(11,18,32,0.9)'};
  max-width: 18em;
`;

const HeroLead = styled(motion.p)`
  margin: 0 0 40px;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(15px, 2vw, 18px);
  font-weight: 500;
  line-height: 1.65;
  color: ${props => props.theme.mode === 'dark' ? 'rgba(226,232,240,0.62)' : 'rgba(51,65,85,0.78)'};
  max-width: 34rem;
`;

const HeroActions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  align-items: center;
`;

const CtaButton = styled.button`
  appearance: none;
  height: 52px;
  padding: 0 28px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.mode === 'dark' ? '#061018' : '#f8fafc'};
  background: ${props => props.theme.mode === 'dark' ? '#e8eef7' : '#0f172a'};
  transition: transform 0.25s ease, background 0.25s ease, opacity 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1e293b'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const GhostButton = styled.button`
  appearance: none;
  height: 52px;
  padding: 0 24px;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.mode === 'dark' ? 'rgba(248,250,252,0.92)' : 'rgba(15,23,42,0.88)'};
  background: ${props => props.theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.45)'};
  border: 1px solid ${props => props.theme.mode === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(15,23,42,0.12)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)'};
    border-color: ${props => props.theme.mode === 'dark' ? 'rgba(125,211,252,0.35)' : 'rgba(37,99,235,0.28)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const ScrollHint = styled(motion.div)`
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.mode === 'dark' ? 'rgba(226,232,240,0.45)' : 'rgba(71,85,105,0.55)'};
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;

  .line {
    width: 1px;
    height: 36px;
    background: linear-gradient(
      180deg,
      ${props => props.theme.mode === 'dark' ? 'rgba(148,163,184,0.7)' : 'rgba(100,116,139,0.55)'},
      transparent
    );
    animation: ${scrollCue} 1.8s ease-in-out infinite;
  }
`;

// --- AIMATEX-MUSIC showcase (bold stage + motion) ---

const spinDisc = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const eqPulse = keyframes`
  0%, 100% { transform: scaleY(0.35); opacity: 0.55; }
  50% { transform: scaleY(1); opacity: 1; }
`;

const orbitSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const auroraDrift = keyframes`
  0% { transform: translate(-8%, -4%) scale(1); }
  50% { transform: translate(6%, 8%) scale(1.12); }
  100% { transform: translate(-8%, -4%) scale(1); }
`;

const sheen = keyframes`
  0% { transform: translateX(-120%) skewX(-18deg); }
  100% { transform: translateX(220%) skewX(-18deg); }
`;

const MusicSection = styled.section`
  padding: 20px 24px 110px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 8px 16px 72px;
  }
`;

const MusicPanel = styled(motion.div)`
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
  color: #f5f5f7;
  background:
    radial-gradient(ellipse 80% 60% at 85% 20%, rgba(244, 63, 94, 0.28), transparent 55%),
    radial-gradient(ellipse 55% 50% at 10% 90%, rgba(14, 165, 233, 0.18), transparent 50%),
    linear-gradient(155deg, #0b0b0f 0%, #141018 42%, #0a1018 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 40px 80px -28px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    min-height: auto;
    border-radius: 28px;
  }
`;

const MusicAurora = styled.div`
  pointer-events: none;
  position: absolute;
  inset: -20%;
  z-index: 0;
  background:
    radial-gradient(circle at 70% 30%, rgba(244, 63, 94, 0.35), transparent 42%),
    radial-gradient(circle at 20% 70%, rgba(56, 189, 248, 0.2), transparent 40%);
  filter: blur(48px);
  animation: ${auroraDrift} 14s ease-in-out infinite;
  opacity: 0.9;
`;

const MusicGrid = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 75%);
  opacity: 0.55;
`;

const MusicCopy = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const MusicEyebrow = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fda4af;
  background: rgba(244, 63, 94, 0.12);
  border: 1px solid rgba(244, 63, 94, 0.35);
  margin-bottom: 20px;
  backdrop-filter: blur(12px);
`;

const MusicTitle = styled(motion.h2)`
  margin: 0 0 14px;
  font-size: clamp(40px, 7vw, 64px);
  line-height: 1.02;
  letter-spacing: -0.04em;
  font-weight: 800;
  background: linear-gradient(105deg, #fff 10%, #fecdd3 48%, #f43f5e 92%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MusicSubtitle = styled(motion.p)`
  margin: 0;
  max-width: 34rem;
  font-size: clamp(16px, 2.2vw, 19px);
  line-height: 1.55;
  color: rgba(245, 245, 247, 0.72);
`;

const MusicFeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 32px 0 36px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const MusicFeature = styled(motion.div)`
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
    background: rgba(244, 63, 94, 0.1);
    border-color: rgba(244, 63, 94, 0.35);
    transform: translateY(-3px);
  }

  .icon-wrap {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    color: #fb7185;
    background: rgba(244, 63, 94, 0.15);
    border: 1px solid rgba(244, 63, 94, 0.25);
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
    color: rgba(245, 245, 247, 0.58);
  }
`;

const MusicCta = styled(motion.button)`
  position: relative;
  overflow: hidden;
  height: 56px;
  padding: 0 34px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(105deg, #f43f5e 0%, #e11d48 55%, #be123c 100%);
  box-shadow: 0 12px 32px rgba(244, 63, 94, 0.4);
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
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    animation: ${sheen} 3.2s ease-in-out infinite;
  }

  &:hover {
    filter: brightness(1.06);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const MusicStage = styled(motion.div)`
  position: relative;
  z-index: 2;
  min-height: 340px;
  display: grid;
  place-items: center;

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
  border: 1px dashed rgba(255, 255, 255, 0.14);
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
    background: ${p => p.$bead || '#f43f5e'};
    box-shadow: 0 0 16px ${p => p.$bead || '#f43f5e'};
  }
`;

const Vinyl = styled(motion.div)`
  position: relative;
  width: min(72%, 280px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, #1f1f22 0 14%, transparent 15%),
    repeating-radial-gradient(circle at 50% 50%,
      #141416 0 2px,
      #1c1c1f 2px 4px);
  box-shadow:
    0 0 0 10px rgba(20, 20, 24, 0.9),
    0 0 0 12px rgba(244, 63, 94, 0.35),
    0 30px 60px rgba(0, 0, 0, 0.55),
    0 0 80px rgba(244, 63, 94, 0.22);
  animation: ${spinDisc} 10s linear infinite;
  display: grid;
  place-items: center;

  .label {
    width: 34%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fb7185, #be123c 70%);
    box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.35);
    display: grid;
    place-items: center;
    color: #fff;
    font-size: clamp(18px, 3vw, 24px);
  }
`;

const EqBars = styled.div`
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 42px;
  z-index: 3;

  span {
    width: 5px;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(180deg, #fda4af, #f43f5e);
    transform-origin: bottom;
    animation: ${eqPulse} 1.1s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.12s; }
    &:nth-child(3) { animation-delay: 0.24s; }
    &:nth-child(4) { animation-delay: 0.08s; }
    &:nth-child(5) { animation-delay: 0.3s; }
    &:nth-child(6) { animation-delay: 0.18s; }
    &:nth-child(7) { animation-delay: 0.05s; }
  }
`;

const GlowOrb = styled(motion.div)`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(244, 63, 94, 0.45), transparent 70%);
  filter: blur(8px);
  z-index: 1;
`;

const HomePage = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const intl = useIntl();
  
  const isAuthenticated = localStorage.getItem('token');
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{brandConfig.seo?.defaultTitle || `${brandConfig.name} - AI助手、伴侣、伙伴`}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      
      {/* Background Layer */}
      <VideoBackdrop theme={theme}>
        <video
          src={BACKGROUND_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
        />
        <AuroraOverlay theme={theme} />
      </VideoBackdrop>

      <PageWrapper>
        <SimpleHeader />
        
        <PageContent>
          <HeroSection>
            <HeroInner
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <BrandMark theme={theme} variants={itemVariants}>
                <span>
                  <FormattedMessage id="home.hero.title" defaultMessage="AIMATEX" />
                </span>
              </BrandMark>

              <HeroHeadline theme={theme} variants={itemVariants}>
                <FormattedMessage
                  id="home.hero.subtitle"
                  defaultMessage="Your Classmate, Soulmate, Teammate"
                />
              </HeroHeadline>

              <HeroLead theme={theme} variants={itemVariants}>
                <FormattedMessage
                  id="home.hero.lead"
                  defaultMessage="通往旗下 AI 产品的入口。发现音乐、创作与智能工具，从这里开始。"
                />
              </HeroLead>

              <HeroActions variants={itemVariants}>
                {isAuthenticated && brandConfig.showAuthEntries ? (
                  <CtaButton
                    theme={theme}
                    type="button"
                    onClick={() => navigate('/seedance-video')}
                  >
                    <FormattedMessage id="home.hero.cta.workspace" defaultMessage="进入工作台" />
                    <ArrowRightOutlined />
                  </CtaButton>
                ) : brandConfig.showAuthEntries ? (
                  <>
                    <CtaButton
                      theme={theme}
                      type="button"
                      onClick={() => navigate('/signup')}
                    >
                      <FormattedMessage id="home.hero.cta.signup" defaultMessage="免费开始" />
                      <ArrowRightOutlined />
                    </CtaButton>
                    <GhostButton
                      theme={theme}
                      type="button"
                      onClick={() => navigate('/login')}
                    >
                      <FormattedMessage id="home.hero.cta.login" defaultMessage="立即登录" />
                    </GhostButton>
                  </>
                ) : (
                  <>
                    <CtaButton
                      theme={theme}
                      type="button"
                      onClick={() => {
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <FormattedMessage id="home.hero.cta.explore" defaultMessage="探索产品" />
                      <ArrowRightOutlined />
                    </CtaButton>
                    <GhostButton
                      theme={theme}
                      type="button"
                      onClick={() => {
                        document.getElementById('aimatex-nas')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <CloudServerOutlined />
                      NAS
                    </GhostButton>
                    <GhostButton
                      theme={theme}
                      type="button"
                      onClick={() => {
                        window.open(brandConfig.products?.aimatexMusic || 'https://music.aimatex.com', '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <CustomerServiceOutlined />
                      Music
                    </GhostButton>
                  </>
                )}
              </HeroActions>
            </HeroInner>

            <ScrollHint
              theme={theme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <span>
                <FormattedMessage id="home.hero.scroll" defaultMessage="向下浏览" />
              </span>
              <div className="line" />
            </ScrollHint>
          </HeroSection>

          <div id="products">
            <ProductShowcases dark={theme.mode === 'dark'} />
          </div>

          {/* AIMATEX-MUSIC dedicated showcase */}
          <MusicSection id="aimatex-music">
            <MusicPanel
              initial={{ opacity: 0, y: 56, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <MusicAurora aria-hidden />
              <MusicGrid aria-hidden />

              <MusicCopy
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
                }}
              >
                <MusicEyebrow
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                >
                  <CustomerServiceOutlined />
                  <FormattedMessage id="home.music.eyebrow" defaultMessage="AIMATEX Suite" />
                </MusicEyebrow>

                <MusicTitle
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                  }}
                >
                  <FormattedMessage id="home.music.title" defaultMessage="AIMATEX-MUSIC" />
                </MusicTitle>

                <MusicSubtitle
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  <FormattedMessage
                    id="home.music.subtitle"
                    defaultMessage="Your personal cloud music space — discover, collect, and listen together."
                  />
                </MusicSubtitle>

                <MusicFeatureGrid
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08 } },
                  }}
                >
                  {[
                    { icon: <SearchOutlined />, titleId: 'home.music.feature.discover.title', titleDef: 'Discover', descId: 'home.music.feature.discover.desc', descDef: 'Search and import tracks into your cloud library.' },
                    { icon: <TeamOutlined />, titleId: 'home.music.feature.playlist.title', titleDef: 'Playlists', descId: 'home.music.feature.playlist.desc', descDef: 'Create and share collaborative playlists.' },
                    { icon: <HeartOutlined />, titleId: 'home.music.feature.nowPlaying.title', titleDef: 'Now Playing', descId: 'home.music.feature.nowPlaying.desc', descDef: 'Synced listening, hearts, and play history.' },
                    { icon: <CloudOutlined />, titleId: 'home.music.feature.cloud.title', titleDef: 'Cloud Library', descId: 'home.music.feature.cloud.desc', descDef: 'High-quality audio stored securely in the cloud.' },
                  ].map((f) => (
                    <MusicFeature
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
                    </MusicFeature>
                  ))}
                </MusicFeatureGrid>

                <MusicCta
                  type="button"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(brandConfig.products.aimatexMusic, '_blank')}
                >
                  <PlayCircleOutlined />
                  <FormattedMessage id="home.music.cta" defaultMessage="Open AIMATEX-MUSIC" />
                  <ArrowRightOutlined />
                </MusicCta>
              </MusicCopy>

              <MusicStage
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              >
                <GlowOrb
                  style={{ top: '12%', right: '18%' }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0.9, 0.55] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <GlowOrb
                  style={{ bottom: '16%', left: '14%', background: 'radial-gradient(circle, rgba(56,189,248,0.35), transparent 70%)' }}
                  animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.4, 0.75, 0.4] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <Orbit $size="92%" $duration="28s" $bead="#38bdf8">
                  <span className="bead" />
                </Orbit>
                <Orbit $size="74%" $duration="18s" $reverse="reverse" $bead="#fb7185">
                  <span className="bead" />
                </Orbit>
                <Orbit $size="56%" $duration="12s" $bead="#fda4af">
                  <span className="bead" />
                </Orbit>

                <Vinyl
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <div className="label">
                    <PlayCircleOutlined />
                  </div>
                </Vinyl>

                <EqBars>
                  <span /><span /><span /><span /><span /><span /><span />
                </EqBars>
              </MusicStage>
            </MusicPanel>
          </MusicSection>

          <AimatexNasShowcase />

        </PageContent>
        <FooterSection />
      </PageWrapper>
    </>
  );
};

export default HomePage;