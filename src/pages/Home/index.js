import React, { useContext } from 'react';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import styled, { ThemeContext, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import SimpleHeader from 'components/headers/simple';
import FooterSection from './components/FooterSection';
import ProductShowcases from './components/ProductShowcases';
import AimatexMusicShowcase from './components/AimatexMusicShowcase';
import AimatexNasShowcase from './components/AimatexNasShowcase';
import AimatexSoulShowcase from './components/AimatexSoulShowcase';
import brandConfig from 'config/brand';
import {
  ArrowRightOutlined,
  CustomerServiceOutlined,
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

const HomePage = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  
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

          <AimatexMusicShowcase />

          <AimatexNasShowcase />

          <AimatexSoulShowcase />

        </PageContent>
        <FooterSection />
      </PageWrapper>
    </>
  );
};

export default HomePage;