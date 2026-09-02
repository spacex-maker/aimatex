import React, { useContext } from 'react';
import { Layout, Button } from 'antd';
import { Helmet } from 'react-helmet';
import styled, { ThemeContext, keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { motion } from 'framer-motion'; // 必须确保已安装 framer-motion
import SimpleHeader from 'components/headers/simple';
import FooterSection from './components/FooterSection';
import ProductShowcases from './components/ProductShowcases';
import brandConfig from 'config/brand';
import {
  RocketOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
  CloudOutlined,
  TeamOutlined,
  SearchOutlined,
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

const floatAnim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
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
    // 使用径向渐变代替单一线性渐变，保留视频中心的清晰度，同时压暗四周
    background: ${props => props.theme.mode === 'dark'
      ? 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)'
      : 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.8) 100%)'};
    z-index: 1;
  }

  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.05); // 轻微放大以防止边缘漏光
    filter: ${props => props.theme.mode === 'dark' ? 'contrast(1.1) brightness(0.8)' : 'none'};
  }
`;

// 新增：极光背景层，增加科技氛围
const AuroraOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: ${props => props.theme.mode === 'dark' ? 0.4 : 0.6};
  background-image: 
    radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.3) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(0, 212, 170, 0.3) 0px, transparent 50%);
  filter: blur(80px);
  pointer-events: none;
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
  margin-top: 72px;
  width: 100%;
  overflow: visible;
  background: transparent;
`;

// --- Hero Section Redesign ---

const HeroSection = styled.section`
  position: relative;
  min-height: 85vh; // 增加高度，占据首屏
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 24px;
  perspective: 1000px;
  
  @media (max-width: 768px) {
    min-height: 70vh;
  }
`;

const HeroBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  border-radius: 100px;
  // Glassmorphism Ultimate
  background: ${props => props.theme.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.6)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.4)'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
  cursor: default;

  span {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background: ${props => props.theme.mode === 'dark'
      ? 'linear-gradient(90deg, #2997ff, #00d4aa)'
      : 'linear-gradient(90deg, #007aff, #00b894)'};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(48px, 10vw, 96px); // 极大的字体
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em; // Apple 风格的紧凑字间距
  margin-bottom: 32px;
  position: relative;
  
  // 高端渐变文字
  background: ${props => props.theme.mode === 'dark'
    ? 'linear-gradient(180deg, #FFFFFF 0%, #A5A5A5 100%)'
    : 'linear-gradient(180deg, #1d1d1f 0%, #424245 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  // 增加文字光晕，提升在复杂背景上的可读性
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.2));

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(20px, 4vw, 28px);
  color: ${props => props.theme.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)'};
  max-width: 800px;
  margin: 0 auto 48px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 16px;
  }
`;

// Primary Button - Apple Style "Call to Action"
const CtaButton = styled(Button)`
  && {
    height: 64px;
    padding: 0 48px;
    font-size: 19px;
    font-weight: 600;
    border-radius: 100px;
    border: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

    // 背景逻辑
    background: ${props => props.theme.mode === 'dark' ? '#fff' : '#1d1d1f'};
    color: ${props => props.theme.mode === 'dark' ? '#000' : '#fff'};

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
      
      &::after {
        opacity: 1;
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

// Secondary Button - Glass Style
const GlassButton = styled(Button)`
  && {
    height: 64px;
    padding: 0 48px;
    font-size: 19px;
    font-weight: 600;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.1); // 极度透明
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: ${props => props.theme.mode === 'dark' ? '#fff' : '#1d1d1f'};
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px);
    }
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
        <title>{brandConfig.name} - The Future of AI Interaction</title>
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
          {/* Hero Section with Framer Motion */}
          <HeroSection>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ width: '100%', maxWidth: '1200px' }}
            >
              <HeroBadge theme={theme} variants={itemVariants}>
                <span style={{ marginRight: 8 }}>✨</span>
                <span>
                  <FormattedMessage id="home.hero.badge" defaultMessage="Introducing AIMATEX Intelligence" />
                </span>
              </HeroBadge>

              <HeroTitle theme={theme} variants={itemVariants}>
                <FormattedMessage id="home.hero.title" defaultMessage="Your AI Companion." />
                <br />
                <span style={{ 
                  background: 'linear-gradient(90deg, #2997ff 0%, #d568fb 100%)', 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block' 
                }}>
                  Reimagined.
                </span>
              </HeroTitle>

              <HeroSubtitle theme={theme} variants={itemVariants}>
                <FormattedMessage 
                  id="home.hero.subtitle" 
                  defaultMessage="Experience the next evolution of interaction. Seamlessly blending Classmate, Soulmate, and Teammate into one unified intelligence." 
                />
              </HeroSubtitle>

              <HeroActions variants={itemVariants}>
                {isAuthenticated ? (
                  <CtaButton
                    theme={theme}
                    icon={<RocketOutlined />}
                    onClick={() => navigate('/seedance-video')}
                  >
                    <FormattedMessage id="home.hero.cta.workspace" defaultMessage="Launch Workspace" />
                  </CtaButton>
                ) : (
                  <>
                    <CtaButton
                      theme={theme}
                      onClick={() => navigate('/signup')}
                    >
                      <FormattedMessage id="home.hero.cta.signup" defaultMessage="Get Started Free" />
                    </CtaButton>
                    <GlassButton
                      theme={theme}
                      icon={<PlayCircleOutlined />}
                      onClick={() => navigate('/login')}
                    >
                      <FormattedMessage id="home.hero.cta.demo" defaultMessage="Watch Demo" />
                    </GlassButton>
                  </>
                )}
              </HeroActions>
            </motion.div>
          </HeroSection>

          <ProductShowcases dark={theme.mode === 'dark'} />

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

        </PageContent>
        <FooterSection />
      </PageWrapper>
    </>
  );
};

export default HomePage;