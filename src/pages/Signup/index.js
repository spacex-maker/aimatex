import React, { useState, useRef, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { useIntl } from "react-intl";
import { useTheme } from "styled-components";
import { useLocale } from "../../contexts/LocaleContext";
import { message } from "antd";
import { auth } from "../../api/auth";
import { base } from "../../api/base";
import axios from '../../api/axios';
import SimpleHeader from 'components/headers/simple';
import FooterSection from 'pages/Home/components/FooterSection';
import { RightSection } from './components/RightSection';
import { PageContainer } from './styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import brandConfig from 'config/brand';

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuffixDropdown, setShowSuffixDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const emailSuffixButtonRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();
  const { locale, changeLocale } = useLocale();
  const intl = useIntl();
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [captchaId, setCaptchaId] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const captchaRefreshRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const codeFromUrl = searchParams.get('inviteCode');
    if (codeFromUrl) {
      setInviteCode(codeFromUrl);
    }
  }, [searchParams]);

  // 获取支持的语言列表
  useEffect(() => {
    const fetchLanguages = async () => {
      const result = await base.getEnabledLanguages();
      if (result.success) {
        const sortedLanguages = result.data.sort((a, b) => b.usageCount - a.usageCount);
        setLanguages(sortedLanguages);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    // 获取国家列表
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/base/countries/list-all-enable');
        if (response.data.success) {
          let countriesList = response.data.data;
          
          // 语言与首选国家的映射
          const languageCountryMap = {
            'en': 'US',
            'zh': 'CN',
            'ja': 'JP',
            'fr': 'FR',
            'de': 'DE',
            'es': 'ES',
            'it': 'IT',
            'pt': 'PT',
            'ru': 'RU',
            'ko': 'KR',
            'ar': 'SA'
          };
          
          const getPreferredCountryCode = () => {
            for (const [langPrefix, countryCode] of Object.entries(languageCountryMap)) {
              if (locale.startsWith(langPrefix)) {
                return countryCode;
              }
            }
            return 'CN';
          };
          
          const preferredCountryCode = getPreferredCountryCode();
          
          countriesList = countriesList.sort((a, b) => {
            if (a.code === preferredCountryCode) return -1;
            if (b.code === preferredCountryCode) return 1;
            return 0;
          });
          
          setCountries(countriesList);
          
          const preferredCountry = countriesList.find(country => country.code === preferredCountryCode);
          if (preferredCountry) {
            setCountryCode(preferredCountry.code);
          }
        }
      } catch (error) {
        console.error('获取国家列表失败:', error);
        message.error('获取国家列表失败');
      }
    };

    fetchCountries();
  }, [locale]);

  const startCountdown = () => {
    setCountdown(300);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendCode = async () => {
    if (!email) {
      setError(intl.formatMessage({ id: 'signup.error.emailRequired' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(intl.formatMessage({ id: 'signup.error.emailInvalid' }));
      return;
    }

    setIsSending(true);

    try {
      const response = await axios.post('/base/productx/user/register-send-email', {
        email,
        locale: locale,
        captchaId,
        captchaCode,
      });

      if (response.data.success) {
        message.success(intl.formatMessage({ id: 'signup.verificationCode.success' }));
        startCountdown();
        captchaRefreshRef.current?.();
      } else {
        setError(response.data.message || intl.formatMessage({ id: 'signup.verificationCode.error' }));
        captchaRefreshRef.current?.();
      }
    } catch (error) {
      setError(error.response?.data?.message || intl.formatMessage({ id: 'signup.verificationCode.error' }));
      captchaRefreshRef.current?.();
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !countryCode || !code) {
      setError(intl.formatMessage({ id: 'signup.error.allFieldsRequired' }));
      return;
    }

    if (password !== confirmPassword) {
      setError(intl.formatMessage({ id: 'signup.error.passwordMismatch' }));
      return;
    }

    if (username.length < 4 || username.length > 10) {
      setError(intl.formatMessage({ id: 'signup.username.rule.length' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(intl.formatMessage({ id: 'signup.error.emailInvalid' }));
      return;
    }

    if (code.length !== 6) {
      setError(intl.formatMessage({ id: 'signup.verificationCode.invalid' }));
      return;
    }

    setLoading(true);

    try {
      const result = await auth.register({
        username,
        email,
        password,
        countryCode,
        code,
        inviteCode: inviteCode?.trim() || undefined,
      });

      if (result.success) {
        message.success(intl.formatMessage({ id: 'signup.success' }));
        navigate("/login");
      } else {
        setError(result.message || intl.formatMessage({ id: 'signup.error.default' }));
      }
    } catch (error) {
      console.error('注册错误:', error);
      setError(error.response?.data?.message || intl.formatMessage({ id: 'signup.error.default' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'signup.page.title' })}</title>
        <meta name="description" content={`注册 ${brandConfig.name}，开始您的 AI 创作`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <SimpleHeader />
      <PageContainer>
        <RightSection 
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          error={error}
          loading={loading}
          showSuffixDropdown={showSuffixDropdown}
          setShowSuffixDropdown={setShowSuffixDropdown}
          dropdownRef={dropdownRef}
          emailSuffixButtonRef={emailSuffixButtonRef}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          countries={countries}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          code={code}
          setCode={setCode}
          countdown={countdown}
          isSending={isSending}
          handleSendCode={handleSendCode}
          handleSubmit={handleSubmit}
          inviteCode={inviteCode}
          setInviteCode={setInviteCode}
          captchaId={captchaId}
          captchaCode={captchaCode}
          onCaptchaIdChange={setCaptchaId}
          onCaptchaCodeChange={setCaptchaCode}
          onRegisterCaptchaRefresh={(fn) => { captchaRefreshRef.current = fn; }}
        />
      </PageContainer>
      <FooterSection />
    </>
  );
};

export default SignupPage;
