import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroPlaceholder = () => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <HeroImage src="/hero-proflr.svg" alt="Proflr Hero" />
      </motion.div>
      <Overlay />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  height: 480px;
  margin: 0 auto;
  background: #f8f8f8;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 360px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
`;

export default HeroPlaceholder; 