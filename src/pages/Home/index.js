import React, { useContext } from 'react';
import { Layout, Button, Row, Col, Typography, Card } from 'antd';
import { Helmet } from 'react-helmet';
import styled, { ThemeContext, keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { motion } from 'framer-motion'; // 必须确保已安装 framer-motion
import SimpleHeader from 'components/headers/simple';
import FooterSection from './components/FooterSection';
import brandConfig from 'config/brand';
import {
  RobotOutlined,
  VideoCameraOutlined,
  BlockOutlined,
  RocketOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

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

// --- Products Section (Bento Grid Style) ---

const ProductsSection = styled.section`
  padding: 100px 32px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const ProductCard = styled(motion.div)`
  height: 100%;
  padding: 40px;
  border-radius: 32px; // 更大的圆角
  background: ${props => props.theme.mode === 'dark'
    ? 'rgba(30, 30, 30, 0.6)'
    : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid ${props => props.theme.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(255, 255, 255, 0.4)'};
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  // Hover Glow Effect
  &:hover {
    transform: translateY(-10px);
    border-color: ${props => props.theme.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.1)'};
    box-shadow: ${props => props.theme.mode === 'dark'
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      : '0 25px 50px -12px rgba(0, 0, 0, 0.1)'};
      
    .icon-wrapper {
      transform: scale(1.1) rotate(5deg);
    }
    
    .arrow-icon {
      transform: translateX(5px);
      opacity: 1;
    }
  }
`;

const CardIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 32px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
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

          {/* Products Section */}
          <ProductsSection>
            <SectionHeader>
              <Title level={2} style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em', color: theme.mode === 'dark' ? '#fff' : '#000' }}>
                <FormattedMessage id="home.products.title" defaultMessage="Powerhouse Tools." />
              </Title>
              <Paragraph style={{ fontSize: '20px', color: theme.mode === 'dark' ? '#86868b' : '#6e6e73' }}>
                <FormattedMessage id="home.products.subtitle" defaultMessage="Everything you need to create, compute, and connect." />
              </Paragraph>
            </SectionHeader>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <ProductCard 
                  theme={theme}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://seedance2.cn', '_blank')}
                >
                  <CardIconWrapper 
                    className="icon-wrapper"
                    $bg={theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#eef2ff'}
                    $color="#3b82f6"
                  >
                    <VideoCameraOutlined />
                  </CardIconWrapper>
                  <Title level={3} style={{ color: theme.mode === 'dark' ? '#fff' : '#000' }}>
                    <FormattedMessage id="home.products.seedance2.title" defaultMessage="Seedance2" />
                  </Title>
                  <Paragraph style={{ color: theme.mode === 'dark' ? '#a1a1a6' : '#6e6e73', fontSize: '16px' }}>
                    <FormattedMessage 
                      id="home.products.seedance2.description" 
                      defaultMessage="Turn static memories into moving experiences with our next-gen Image-to-Video engine." 
                    />
                  </Paragraph>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', color: '#3b82f6', fontWeight: 600 }}>
                    <FormattedMessage id="home.products.seedance2.cta" defaultMessage="Learn more" /> <ArrowRightOutlined className="arrow-icon" style={{ marginLeft: 8, opacity: 0.6, transition: 'all 0.3s' }} />
                  </div>
                </ProductCard>
              </Col>

              <Col xs={24} md={8}>
                <ProductCard 
                  theme={theme}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://ai2obj.com', '_blank')}
                >
                  <CardIconWrapper 
                    className="icon-wrapper"
                    $bg={theme.mode === 'dark' ? 'rgba(0, 212, 170, 0.2)' : '#ecfdf5'}
                    $color="#00d4aa"
                  >
                    <BlockOutlined />
                  </CardIconWrapper>
                  <Title level={3} style={{ color: theme.mode === 'dark' ? '#fff' : '#000' }}>
                    <FormattedMessage id="home.products.ai2obj.title" defaultMessage="AI2Obj" />
                  </Title>
                  <Paragraph style={{ color: theme.mode === 'dark' ? '#a1a1a6' : '#6e6e73', fontSize: '16px' }}>
                    <FormattedMessage 
                      id="home.products.ai2obj.description" 
                      defaultMessage="AI-powered comprehensive generation platform for creating diverse digital content." 
                    />
                  </Paragraph>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', color: '#00d4aa', fontWeight: 600 }}>
                    <FormattedMessage id="home.products.ai2obj.cta" defaultMessage="Visit Platform" /> <ArrowRightOutlined className="arrow-icon" style={{ marginLeft: 8, opacity: 0.6, transition: 'all 0.3s' }} />
                  </div>
                </ProductCard>
              </Col>

              <Col xs={24} md={8}>
                <ProductCard 
                  theme={theme}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://openrobotx.com', '_blank')}
                >
                  <CardIconWrapper 
                    className="icon-wrapper"
                    $bg={theme.mode === 'dark' ? 'rgba(255, 107, 107, 0.2)' : '#fef2f2'}
                    $color="#ff6b6b"
                  >
                    <RobotOutlined />
                  </CardIconWrapper>
                  <Title level={3} style={{ color: theme.mode === 'dark' ? '#fff' : '#000' }}>
                    <FormattedMessage id="home.products.openrobotx.title" defaultMessage="OpenRobotX" />
                  </Title>
                  <Paragraph style={{ color: theme.mode === 'dark' ? '#a1a1a6' : '#6e6e73', fontSize: '16px' }}>
                    <FormattedMessage 
                      id="home.products.openrobotx.description" 
                      defaultMessage="The global hub for Humanoid Robotics data, comparisons, and industry insights." 
                    />
                  </Paragraph>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', color: '#ff6b6b', fontWeight: 600 }}>
                    <FormattedMessage id="home.products.openrobotx.cta" defaultMessage="Explore Community" /> <ArrowRightOutlined className="arrow-icon" style={{ marginLeft: 8, opacity: 0.6, transition: 'all 0.3s' }} />
                  </div>
                </ProductCard>
              </Col>
            </Row>
          </ProductsSection>

        </PageContent>
        <FooterSection />
      </PageWrapper>
    </>
  );
};

export default HomePage;