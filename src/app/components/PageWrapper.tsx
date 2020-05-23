import React, { FC } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    margin-right: 1em;
    margin-bottom: 1em;
    min-width: 400px;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageWrapper: FC<{ className?: string }> = ({ className, children }) => {
    return (
        <StyledWrapper className={className}>
            {children}
        </StyledWrapper>

    )
}

export default PageWrapper;