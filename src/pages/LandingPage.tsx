import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import HeroPlaceholder from '@/components/HeroPlaceholder';

// Styled Components
const BackgroundWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: url('/logos/hero-illustration.svg') no-repeat center center;
  background-size: cover;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  /* background: #F8F9FA; */
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  transition: background 0.3s, box-shadow 0.3s;
  box-shadow: none;

  &.scrolled {
    background: rgba(255,255,255,0.97);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
`;

const Logo = styled.img.attrs({
  src: '/proflr.svg',
  alt: 'Proflr Logo'
})`
  height: 28px;
  width: auto;
  
  @media (min-width: 768px) {
    height: 32px;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px 18px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: var(--font-satoshi);
  color: #1A1A1A;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  
  &:hover {
    color: #00CE93;
  }
`;

const NavButton = styled.button`
  font-family: var(--font-satoshi);
  background: #00CE93;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #00B883;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavSecondaryButton = styled.button`
  font-family: var(--font-satoshi);
  background: white;
  color: #1A1A1A;
  border: 1px solid #E5E5E5;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 16px;
  transition: all 0.2s ease;
  &:hover {
    background: #F8F9FA;
    border-color: #00CE93;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(0, 206, 147, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 206, 147, 0.03) 0%, transparent 50%),
      linear-gradient(45deg, rgba(0, 206, 147, 0.02) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(0, 206, 147, 0.02) 25%, transparent 25%);
    background-size: 100% 100%, 100% 100%, 60px 60px, 60px 60px;
    background-position: 0 0, 0 0, 0 0, 0 0;
    opacity: 0.8;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  margin-top: 220px;
  text-shadow: 0 2px 16px rgba(0,0,0,0.12);
  @media (max-width: 768px) {
    margin-top: 120px;
    padding: 0 16px;
    text-align: center;
  }
`;

const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #E8F7F2;
  color: #00CE93;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const BlinkingDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00CE93;
  margin-right: 2px;
  animation: blink 1.5s infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const LiveButton = styled.span`
  display: inline-block;
  background: #00CE93;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 100px;
  margin-left: 2px;
  letter-spacing: 0.02em;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-satoshi);
  font-size: 72px;
  line-height: 1.1;
  margin-bottom: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #1A1A1A;
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const HeroDescription = styled.p`
  font-family: var(--font-satoshi);
  font-size: 24px;
  color: #4A4A4A;
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    align-items: center;
    width: 100%;
    margin-top: 24px;
    & > button {
      width: 100%;
      max-width: 320px;
    }
  }
`;

const PrimaryButton = styled.button`
  font-family: var(--font-satoshi);
  background: #00CE93;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #00B883;
  }
`;

const SecondaryButton = styled.button`
  font-family: var(--font-satoshi);
  background: white;
  color: #1A1A1A;
  border: 1px solid #E5E5E5;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #F8F9FA;
    border-color: #00CE93;
  }
`;

const Metrics = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 80px 0;
  background: #F8F9FA;
  text-align: center;
`;

const MetricCardWrapper = styled.div`
  padding: 32px;
  text-align: center;
  background: transparent;
  border-radius: 12px;
  box-shadow: none;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const MetricNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #00CE93;
  margin-bottom: 16px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MetricLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 12px;
`;

const MetricDescription = styled.div`
  font-size: 16px;
  color: #4A4A4A;
  line-height: 1.5;
`;

interface MetricCardProps {
  number: string;
  label: string;
  description: string;
}

// Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({ number, label, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <MetricCardWrapper ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.5 }}
      >
        <MetricNumber>
          <motion.span
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  duration: 2,
                  ease: "easeOut"
                }
              }
            }}
          >
            {number}
          </motion.span>
        </MetricNumber>
        <MetricLabel>{label}</MetricLabel>
        <MetricDescription>{description}</MetricDescription>
      </motion.div>
    </MetricCardWrapper>
  );
};

// Add HeroBackground styled component
const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 700px;
  background: 
    linear-gradient(to bottom, rgba(255,255,255,0) 90%, #F8F9FA 99%, #F8F9FA 100%),
    url('/logos/hero_image2.svg') no-repeat center top;
  background-size: 100% auto, 100% auto;
  z-index: 0;

  @media (max-width: 768px) {
    height: 400px;
    background: 
      linear-gradient(to bottom, rgba(255,255,255,0) 85%, #F8F9FA 99%, #F8F9FA 100%),
      url('/logos/hero_image2.svg') no-repeat center top;
    background-size: 100% auto, 100% auto;
  }
`;

// Add HamburgerIcon styled component
const HamburgerIcon = styled.div`
  width: 32px;
  height: 32px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 768px) {
    display: flex;
  }
  & > span {
    display: block;
    width: 22px;
    height: 2px;
    background: #222;
    margin: 4px 0;
    border-radius: 2px;
    transition: 0.3s;
  }
`;

// Add CloseIcon styled component
const CloseIcon = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10001;
  @media (min-width: 769px) {
    display: none;
  }
  & > span {
    display: block;
    width: 22px;
    height: 2px;
    background: #222;
    border-radius: 2px;
    position: absolute;
    left: 5px;
    right: 5px;
  }
  & > span:first-child {
    transform: rotate(45deg);
  }
  & > span:last-child {
    transform: rotate(-45deg);
  }
`;

// Add MobileMenuOverlay styled component
const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255,0.98);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;
`;

const MobileMenuButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80vw;
  max-width: 320px;
`;

// Transparent SVG data URI for placeholder
const transparentSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'></svg>";

// Add dummy logo bar data
const logoBarLogos = [
  { src: '/nlmtd_logo.svg', alt: 'nlmtd' },
  { src: '/accenture_logo.svg', alt: 'accenture' },
  { src: '/elsevier_logo.svg', alt: 'Elsevier' },
  { src: '/capgemini_logo.svg', alt: 'Capgemini' },
  { src: '/dept_logo.svg', alt: 'Dept' },
  { src: '/berenschot_logo.svg', alt: 'Berenschot' },
];

// Update companyTiles to use transparentSvg for missing logos/avatars
const companyTiles = [
  {
    logo: transparentSvg,
    quote: '',
    person: null,
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: '',
    person: {
      name: 'Jane Doe',
      title: 'COO, Adyen',
      avatar: transparentSvg,
    },
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: "Business onboarding used to be a cost center for Plaid. Now, it's a revenue driver thanks to Proflr's intuitive onboarding flows, enterprise-grade UX and minimal engineering work.",
    person: {
      name: 'Zak Lambert',
      title: 'GM EMEA, Plaid',
      avatar: transparentSvg,
    },
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: "Proflr's policy engine and architecture systems are exceptional. I wish a platform like Proflr existed when we scaled Stripe across the globe.",
    person: {
      name: 'David Singleton',
      title: 'Former CTO, Stripe',
      avatar: transparentSvg,
    },
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: '',
    person: null,
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: '',
    person: {
      name: 'Wopke Dost',
      title: 'Director, nlmtd',
      avatar: transparentSvg,
    },
    bg: '',
  },
];

// Main Component
const LandingPage = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ctaRef.current) {
        const ctaBottom = ctaRef.current.getBoundingClientRect().bottom;
        setNavScrolled(ctaBottom <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <HeroBackground />
      <Nav className={navScrolled ? 'scrolled' : ''}>
        <NavContent>
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
            <Logo />
          </div>
          <NavLinks>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </NavLinks>
          <div style={{ flex: '0 0 auto', marginLeft: 32, display: 'flex', alignItems: 'center', gap: 0 }}>
            <NavSecondaryButton>Login</NavSecondaryButton>
            <NavButton>Schedule a Demo</NavButton>
          </div>
          {!mobileMenuOpen && (
            <HamburgerIcon onClick={() => setMobileMenuOpen(true)}>
              <span />
              <span />
              <span />
            </HamburgerIcon>
          )}
        </NavContent>
      </Nav>
      {mobileMenuOpen && (
        <MobileMenuOverlay onClick={() => setMobileMenuOpen(false)}>
          <MobileMenuLinks onClick={e => e.stopPropagation()}>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </MobileMenuLinks>
          <MobileMenuButtonGroup onClick={e => e.stopPropagation()}>
            <NavSecondaryButton style={{ display: 'block', width: '100%' }}>Login</NavSecondaryButton>
            <NavButton style={{ display: 'block', width: '100%' }}>Schedule a Demo</NavButton>
          </MobileMenuButtonGroup>
        </MobileMenuOverlay>
      )}
      <Container>
        <Hero>
          <HeroContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroTag>
                <BlinkingDot />
                Beta release
              </HeroTag>
              <HeroTitle>
                The new standard<br/>
                in expert matching
              </HeroTitle>
              <HeroDescription>
              AI-powered matching that connects your challenge with the right expert, promotes diversity, and accelerates both business and expert growth.
              </HeroDescription>
              <HeroButtons>
                <PrimaryButton>Schedule a Demo</PrimaryButton>
              </HeroButtons>
            </motion.div>
          </HeroContent>
        </Hero>

        <LogoBarSection>
          <LogoBarLabel>Built for businesses that lead with knowledge</LogoBarLabel>
          <LogoBarCarouselWrapper>
            <LogoBarGradient className="left" />
            <LogoBarGradient className="right" />
            <LogoBarCarousel>
              {[...logoBarLogos, ...logoBarLogos].map((logo, i) => (
                <LogoBarLogo key={i} src={logo.src} alt={logo.alt} />
              ))}
            </LogoBarCarousel>
          </LogoBarCarouselWrapper>
        </LogoBarSection>

        <Metrics>
          <MetricCard 
            number="10.3x"
            label="Faster matching"
            description="Reduce time-to-match by leveraging AI-powered algorithms"
          />
          <MetricCard 
            number="56%"
            label="Quality boost"
            description="Higher satisfaction rates with expert matches"
          />
          <MetricCard 
            number="4.3x"
            label="Growth insights"
            description="Experts discover new personal growth paths"
          />
        </Metrics>

        <Features id="features">
          <FeatureGrid>
            <FeatureCol>
              <FeatureIcon>🔍</FeatureIcon>
              <FeatureTitle>Staff the right people</FeatureTitle>
              <FeatureDescription>
                Find the perfect match between team members and project needs. Proflr gives you a structured approach to access the right talent and make everyone's skills visible, ensuring better matches and leveraging unique expertise within your team.
              </FeatureDescription>
            </FeatureCol>
            <FeatureCol>
              <FeatureIcon>⏰</FeatureIcon>
              <FeatureTitle>Up-to-date availability</FeatureTitle>
              <FeatureDescription>
                Manage team availability with real-time, accurate information. Proflr keeps your scheduling up to date and synchronised, so you can adapt swiftly to project needs and ensure optimal utilisation of your team members.
              </FeatureDescription>
            </FeatureCol>
            <FeatureCol>
              <FeatureIcon>🌱</FeatureIcon>
              <FeatureTitle>Grow the right skills</FeatureTitle>
              <FeatureDescription>
                Stay ahead by identifying and nurturing the skills that drive future success. Proflr helps you tailor training and development programs based on real growth areas, supporting both consultants and your business as a whole.
              </FeatureDescription>
            </FeatureCol>
          </FeatureGrid>
        </Features>

        <Testimonials>
          <SectionTitle>Trusted by leading companies</SectionTitle>
          <TestimonialGrid>
            <TestimonialCard>
              <TestimonialText>
                "Our scheduling overview makes it hard to see who is really looking for new projects, let alone what kind of projects."
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorName>Wopke Dost</AuthorName>
                <AuthorTitle>Director, nlmtd</AuthorTitle>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>
                "How might we shape perfect project team in less the 5 minutes? Proflr is giving us the tool to do so."
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorName>Leonard Bukenya</AuthorName>
                <AuthorTitle>Business Development, nlmtd</AuthorTitle>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialGrid>
        </Testimonials>

        <CompanyTilesSection>
          <TilesTitle>Trusted by leading companies</TilesTitle>
          <TilesSubtitle>Run your business onboarding like the world's best companies — without needing a 100+ people team.</TilesSubtitle>
          <TilesGrid>
            {companyTiles.map((tile, i) => (
              <Tile key={i} style={tile.bg ? { backgroundImage: `url(${tile.bg})` } : {}}>
                {tile.logo && <TileLogo src={tile.logo} alt="Company logo" />}
                {tile.quote && <TileQuote>{tile.quote}</TileQuote>}
                {tile.person && (
                  <TilePerson>
                    <TileAvatar src={tile.person.avatar} alt={tile.person.name} />
                    <TilePersonInfo>
                      <TileName>{tile.person.name}</TileName>
                      <TileTitle>{tile.person.title}</TileTitle>
                    </TilePersonInfo>
                  </TilePerson>
                )}
              </Tile>
            ))}
          </TilesGrid>
        </CompanyTilesSection>

        <CTA ref={ctaRef}>
          <CTAContent>
            <CTATitle>Ready to transform your consultant matching?</CTATitle>
            <CTADescription>
              Join leading companies who trust Proflr for their consultant matching needs.
            </CTADescription>
            <CTAButtons>
              <PrimaryButton>Get Started</PrimaryButton>
              <SecondaryButton>Schedule a Demo</SecondaryButton>
            </CTAButtons>
          </CTAContent>
        </CTA>
      </Container>
    </div>
  );
};

const LogoCloud = styled.section`
  text-align: center;
  padding: 80px 0;
  background: #F8F9FA;
`;

const TrustedBy = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 32px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 40px;
  align-items: center;
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const LogoImage = styled.img`
  max-width: 140px;
  height: auto;
  filter: grayscale(100%);
  transition: filter 0.2s ease;
  
  &:hover {
    filter: grayscale(0%);
  }
`;

const Features = styled.section`
  padding: 80px 0 40px 0;
  background: transparent;
`;

const FeaturesHeadline = styled.h2`
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 64px;
  color: #1A1A1A;
  text-align: left;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  max-width: 1100px;
  margin: 0 auto;
`;

const FeatureCol = styled.div`
  text-align: left;
`;

const FeatureIcon = styled.div`
  font-size: 32px;
  margin-bottom: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1A1A1A;
`;

const FeatureDescription = styled.p`
  color: #888;
  font-size: 17px;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  color: #1A1A1A;
`;

const Testimonials = styled.section`
  padding: 80px 0;
  background: #F8F9FA;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background: #FFFFFF;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TestimonialText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #4A4A4A;
  margin-bottom: 24px;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: #1A1A1A;
`;

const AuthorTitle = styled.div`
  color: #666;
  font-size: 14px;
`;

const CTA = styled.section`
  padding: 80px 0;
  background: #F8F9FA;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1A1A1A;
`;

const CTADescription = styled.p`
  font-size: 18px;
  color: #4A4A4A;
  margin-bottom: 32px;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

// Add CompanyTilesSection styled components
const CompanyTilesSection = styled.section`
  padding: 80px 0 40px 0;
  background: #fff;
`;
const TilesTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
`;
const TilesSubtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-bottom: 40px;
`;
const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;
const Tile = styled.div`
  background: #f6f6f6;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 220px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
`;
const TileLogo = styled.img`
  height: 32px;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  object-fit: contain;
`;
const TileQuote = styled.p`
  font-size: 17px;
  color: #222;
  margin-bottom: 16px;
`;
const TilePerson = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const TileAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
`;
const TilePersonInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const TileName = styled.div`
  font-weight: 600;
  color: #222;
  font-size: 15px;
`;
const TileTitle = styled.div`
  color: #888;
  font-size: 13px;
`;

// Add LogoBarSection styled components
const LogoBarSection = styled.section`
  padding: 48px 0 32px 0;
  background: #F8F9FA;
  text-align: center;
`;
const LogoBarLabel = styled.div`
  color: #888;
  font-size: 18px;
  margin-bottom: 32px;
`;
const LogoBarCarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
`;
const LogoBarCarousel = styled.div`
  display: flex;
  align-items: center;
  min-width: 1200px;
  animation: scroll-logos 32s linear infinite;
  will-change: transform;

  @keyframes scroll-logos {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;
const LogoBarGradient = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  pointer-events: none;
  z-index: 2;

  &.left {
    left: 0;
    background: linear-gradient(to right, #F8F9FA 80%, rgba(248,249,250,0) 100%);
  }
  &.right {
    right: 0;
    background: linear-gradient(to left, #F8F9FA 80%, rgba(248,249,250,0) 100%);
  }
`;
const LogoBarLogo = styled.img`
  height: 40px;
  opacity: 0.5;
  filter: grayscale(100%);
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
  margin: 0 20px;
`;

export default LandingPage; 