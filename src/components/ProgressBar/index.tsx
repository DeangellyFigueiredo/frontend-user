import React from 'react';
import { colors } from '../../shared/themes';

interface IProps {
    progress: string | number
}

const ProgressBar = ({ progress }: IProps) => {
    const normalizedProgress = Math.max(0, Math.min(100, +progress));

    return (
        <div style={{ marginBottom: '10px', width: '100%', height: '40px', border: `1px solid ${colors.neutral_base}`, borderRadius: '4px', overflow: 'hidden' }}>
            <div
                style={{
                    width: `${normalizedProgress}%`,
                    height: '100%',
                    backgroundColor: colors.primary_dark,
                    display: "flex",
                    alignItems: "center"
                }}
            >

                <span style={{ color: 'white', textAlign: 'center', lineHeight: '20px', marginLeft: '10px' }}>{`${normalizedProgress}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;