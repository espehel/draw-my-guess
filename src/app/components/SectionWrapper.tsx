import React, { FC } from 'react';
import styled from 'styled-components';

const StyledComponent = styled.section`
margin-top: 1rem;

&:first-child {
    margin-top:2rem
}

&:last-child {
    margin-bottom: 2rem;
}
`;

const SectionWrapper: FC = ({ children }) => {

    return (
        <StyledComponent>
            {children}
        </StyledComponent>
    )

};

export default SectionWrapper;