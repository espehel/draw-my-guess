import React, { FC } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const StyledBanner = styled.div`
border-bottom: 1px solid grey;
display: flex;
justify-content: left;
`;

export const Banner: FC = () => {

    return (
        <StyledBanner>
            <Typography variant="h4">Draw my Guess</Typography>
        </StyledBanner>)
}

