import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { pageVariants } from 'constants/animations/pageTransitions';

type FadeAnimationProps = {
    children?: ReactNode;
};

const PageAnimatedWrapper = styled(motion.div)`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const FadeAnimation = ({
    children,
}: FadeAnimationProps): JSX.Element => {
    return (
        <PageAnimatedWrapper
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
        >
            {children}
        </PageAnimatedWrapper>
    );
};
