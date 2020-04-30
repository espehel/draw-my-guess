import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Button, Typography } from '@material-ui/core';
import { IDrawing } from '../models/drawing';

interface Props {
    drawing: IDrawing
}
const ViewDrawing: React.FC<Props> = ({ drawing
}) => {
    const { canvas, word, artist } = drawing;
    const [loadableCanvas, setLoadableCanvas] = React.useState<any>();
    return (
        <>
            <Typography variant={'h5'}>{artist} drawing of {word}</Typography>
            <CanvasDraw
                disabled
                ref={canvasDraw => (setLoadableCanvas(canvasDraw))}
                saveData={canvas}
            />

        </>
    )
}

export default ViewDrawing;