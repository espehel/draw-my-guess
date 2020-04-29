import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Button, Typography } from '@material-ui/core';

interface Props {
    canvas: CanvasDraw;
    storageKey: string;
}
const LoadableCanvas: React.FC<Props> = ({ canvas, storageKey
}) => {
    const [loadableCanvas, setLoadableCanvas] = React.useState<any>(canvas);

    return (
        <>
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={() => {
                    loadableCanvas.loadSaveData(localStorage.getItem(storageKey))
                }}
            >
                <Typography variant={'button'}>Load</Typography>
            </Button> {}
            <CanvasDraw
                disabled
                hideGrid
                ref={canvasDraw => (setLoadableCanvas(canvasDraw))}
                saveData={localStorage.getItem(storageKey)}
            />
        </>
    )
}

export default LoadableCanvas;